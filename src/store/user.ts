import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { UpdateUserT, UserT } from '../types'

interface State {
  fetching: boolean
  updating: boolean
  user?: UserT

  unsubscribe: () => void
}

const initialState: State = {
  fetching: true,
  unsubscribe: () => {},
  updating: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  destroy: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribe } = getState()

    unsubscribe()

    setState(initialState)
  },
  fetch: () => async ({ getState, setState }: StoreApi) => {
    const user = firebase.auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    getState().unsubscribe()

    setState({
      fetching: true
    })

    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        const user = doc.data() as UserT

        setState({
          fetching: false,
          user
        })
      })

    setState({
      unsubscribe
    })
  },
  update: (data: UpdateUserT) => async ({ setState }: StoreApi) => {
    const user = firebase.auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      updating: true
    })

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        ...data,
        updatedAt: new Date()
      })

    setState({
      updating: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'user'
})

export const useUser = createHook(Store)
