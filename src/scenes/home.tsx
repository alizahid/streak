import React, { FunctionComponent, useEffect } from 'react'

import { Leader, Spinner } from '../components'
import { useLeaderboard } from '../store'

export const Home: FunctionComponent = () => {
  const [{ fetching, leaders }, { destroy, fetch }] = useLeaderboard()

  useEffect(() => {
    fetch()

    return () => {
      destroy()
    }
  }, [destroy, fetch])

  return (
    <main>
      <h1>Leaderboard</h1>
      {fetching ? (
        <Spinner className="my-12" />
      ) : leaders.length > 0 ? (
        <section className="mt-8">
          {leaders.map((leader, index) => (
            <Leader key={index} leader={leader} />
          ))}
        </section>
      ) : null}
    </main>
  )
}
