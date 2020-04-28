import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'
import { LeaderT } from '../types'

interface State {
  fetching: boolean
  leaders: LeaderT[]

  unsubscribe: () => void
}

const initialState: State = {
  fetching: true,
  leaders: [],
  unsubscribe: () => {}
}

type StoreApi = StoreActionApi<State>

const actions = {
  destroy: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribe } = getState()

    unsubscribe()

    setState(initialState)
  },
  fetch: () => async ({ getState, setState }: StoreApi) => {
    getState().unsubscribe()

    const unsubscribe = firebase
      .firestore()
      .collection('leaderboard')
      .orderBy('rank', 'asc')
      .onSnapshot(async ({ docs }) => {
        const leaders = await Promise.all(
          docs.map(async (doc) => {
            const { rank, streak, user } = doc.data()

            return {
              rank,
              streak,
              user: await user
                .get()
                .then((user: firebase.firestore.DocumentData) => user.data())
            } as LeaderT
          })
        )

        setState({
          fetching: false,
          leaders
        })
      })

    setState({
      unsubscribe
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'leaderboard'
})

export const useLeaderboard = createHook(Store)
