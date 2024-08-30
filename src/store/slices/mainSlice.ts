import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BalanceHistory, MainState, User } from './mainSlice.interfaces'

const initialState: MainState = {
  loading: false,
  error: null,
  accessToken: null,
  user: null,
  totalBalance: 0,
  balanceHistory: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
      state.accessToken = null
    },
    setTotalBalance(state, action: PayloadAction<number>) {
      state.totalBalance = action.payload
    },
    setBalanceHistory(state, action: PayloadAction<BalanceHistory[]>) {
      state.balanceHistory = action.payload
    },
  },
})

export const {
  setAccessToken,
  setUser,
  logout,
  setTotalBalance,
  setBalanceHistory,
} = mainSlice.actions
export const mainReducer = mainSlice.reducer
