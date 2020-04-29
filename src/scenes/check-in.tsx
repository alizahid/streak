import React, { FunctionComponent, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Spinner } from '../components'
import { useAuth, useCheckIn } from '../store'

export const CheckIn: FunctionComponent = () => {
  const [{ signedIn }] = useAuth()
  const [
    { checkedInToday, checkingIn, fetching },
    { checkIn, destroy, fetch }
  ] = useCheckIn()

  const [left, setLeft] = useState('no')

  useEffect(() => {
    if (signedIn) {
      fetch()
    }

    return () => {
      destroy()
    }
  }, [destroy, fetch, signedIn])

  if (!signedIn) {
    return <Redirect to="/sign-in" />
  }

  return (
    <main>
      <h1>Check in</h1>
      {fetching ? (
        <Spinner className="my-12" />
      ) : checkedInToday ? (
        <p className="mt-8">You have already checked in today.</p>
      ) : (
        <form
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault()

            checkIn(left === 'yes')
          }}>
          <label>
            <span>Did you leave the house today for non-emergency things?</span>
            <select
              onChange={(event) => setLeft(event.target.value)}
              value={left}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <button disabled={checkingIn}>
            {checkingIn ? 'Checking in' : 'Check in'}
          </button>
        </form>
      )}
    </main>
  )
}
