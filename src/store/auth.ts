import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase, username } from '../lib'

interface State {
  initialising: boolean
  signedIn: boolean
  signingIn: boolean
  signingOut: boolean

  unsubscribe: () => void
}

const initialState: State = {
  initialising: true,
  signedIn: false,
  signingIn: false,
  signingOut: false,
  unsubscribe: () => {}
}

type StoreApi = StoreActionApi<State>

const actions = {
  destroy: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribe } = getState()

    unsubscribe()

    setState(initialState)
  },
  initialise: () => async ({ getState, setState }: StoreApi) => {
    getState().unsubscribe()

    firebase
      .auth()
      .getRedirectResult()
      .then(async (result) => {
        setState({
          signingIn: true
        })

        if (result.additionalUserInfo?.isNewUser && result.user) {
          await firebase
            .firestore()
            .collection('users')
            .doc(result.user.uid)
            .set({
              createdAt: new Date(),
              name: username()
            })
        }

        setState({
          signingIn: false
        })
      })

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) =>
      setState({
        initialising: false,
        signedIn: !!user
      })
    )

    setState({
      unsubscribe
    })
  },
  signIn: () => async ({ setState }: StoreApi) => {
    setState({
      signingIn: true
    })

    const provider = new firebase.auth.GoogleAuthProvider()

    await firebase.auth().signInWithRedirect(provider)

    setState({
      signingIn: false
    })
  },
  signOut: () => async ({ setState }: StoreApi) => {
    setState({
      signingOut: true
    })

    await firebase.auth().signOut()

    setState({
      signingOut: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)
