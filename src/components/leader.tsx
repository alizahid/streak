import React, { FunctionComponent } from 'react'

import { LeaderT } from '../types'

interface Props {
  leader: LeaderT
}

export const Leader: FunctionComponent<Props> = ({ leader }) => (
  <article className="flex items-center leading-none mt-8">
    <aside className="bg-teal-800 h-12 w-12 flex items-center text-white justify-center rounded-full text-xl">
      {leader.rank}
    </aside>
    <div className="flex-1 ml-4">
      <div className="text-2xl font-medium break-all">{leader.user?.name}</div>
      <div className="mt-2 text-gray-700">{leader.streak} days</div>
    </div>
  </article>
)
