export type UserT = {
  name: string
}

export type LeaderT = {
  rank: number
  streak: number
  user: UserT
}
