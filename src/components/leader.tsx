import React, { FunctionComponent } from 'react'

import { LeaderT } from '../types'

interface Props {
  leader: LeaderT
}

export const Leader: FunctionComponent<Props> = ({ leader }) => (
  <article className="flex items-center leading-none mt-8">
    <aside className="bg-yellow-500 h-10 w-10 flex items-center text-black font-medium justify-center rounded-full text-xl">
      {leader.rank}
    </aside>
    <div className="flex-1 ml-8">
      <div className="text-2xl font-medium break-all">{leader.user.name}</div>
      {leader.user.country && leader.user.city && (
        <div className="mt-2">
          {leader.user.city}, {leader.user.country}
        </div>
      )}
      <div className="mt-4 text-gray-700">{leader.streak} days</div>
    </div>
  </article>
)
