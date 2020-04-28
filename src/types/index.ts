export type UserT = {
  city?: string
  country?: string
  name: string
}

export type LeaderT = {
  rank: number
  streak: number
  user: UserT
}

export type UpdateUserT = {
  city?: string
  country?: string
  name: string
}
