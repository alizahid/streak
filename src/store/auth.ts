import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'

interface State {
  initialising: boolean
  signedIn: boolean
  signingOut: boolean

  unsubscribe: () => void
}

const initialState: State = {
  initialising: true,
  signedIn: false,
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
