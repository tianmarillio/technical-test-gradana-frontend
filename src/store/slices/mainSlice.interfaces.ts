export interface User {
  _id: string
  name: string
  phoneNumber: string
  email: string
}

export interface BalanceHistory {
  amount: number
  createdAt: string
}

export interface MainState {
  loading: boolean
  error: string | null
  accessToken: string | null
  user: User | null
  totalBalance: number
  balanceHistory: BalanceHistory[]
}
