import React, { FunctionComponent } from 'react'

import { username } from '../lib'
import { LeaderT } from '../types'

interface Props {
  leader: LeaderT
}

export const Leader: FunctionComponent<Props> = ({ leader }) => (
  <article className="flex items-center leading-none mt-8">
    <aside className="bg-yellow-500 h-10 w-10 flex items-center text-black font-medium justify-center rounded-full text-xl">
      {leader.rank}
    </aside>
    <div className="flex-1 ml-4">
      <div className="text-2xl font-medium break-all">
        {leader.user?.name ?? username()}
      </div>
      <div className="mt-2 text-gray-700">{leader.streak} days</div>
    </div>
  </article>
)
