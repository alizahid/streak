import moment from 'moment'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { firebase } from '../lib'

interface State {
  checkedInToday: boolean
  checkingIn: boolean
  fetching: boolean

  unsubscribe: () => void
}

const initialState: State = {
  checkedInToday: false,
  checkingIn: false,
  fetching: true,
  unsubscribe: () => {}
}

type StoreApi = StoreActionApi<State>

const actions = {
  checkIn: (left: boolean) => async ({ setState }: StoreApi) => {
    const user = firebase.auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      checkingIn: true
    })

    await firebase.firestore().collection('checkIns').add({
      day: new Date(),
      left,
      userId: user.uid
    })

    setState({
      checkingIn: false
    })
  },
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
      .collection('checkIns')
      .where('userId', '==', user.uid)
      .orderBy('day', 'desc')
      .limit(1)
      .onSnapshot(async ({ docs }) => {
        docs.forEach((doc) => {
          const data = doc.data()

          const day = moment(data.day.toDate())

          const today = moment()

          const checkedInToday =
            today.startOf('day').isBefore(day) &&
            today.endOf('day').isAfter(day)

          setState({
            checkedInToday
          })
        })

        setState({
          fetching: false
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
  name: 'checkIn'
})

export const useCheckIn = createHook(Store)
