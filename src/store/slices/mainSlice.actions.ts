import api from '@/api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setBalanceHistory, setTotalBalance, setUser } from './mainSlice'
import { BalanceHistory, User } from './mainSlice.interfaces'

export const authMe = createAsyncThunk(
  'main/authMe',
  async (accessToken: string, { dispatch }) => {
    const response = await api.get<User>(`/auth-me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    dispatch(setUser(response.data))

    return response.data
  },
)

export const getTotalBalance = createAsyncThunk(
  'main/getTotalBalance',
  async (accessToken: string, { dispatch }) => {
    const response = await api.get<{ totalAmount: number }>(`/balances/total`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    dispatch(setTotalBalance(response.data.totalAmount))

    return response.data
  },
)

export const getBalanceHistory = createAsyncThunk(
  'main/getBalanceHistory',
  async (accessToken: string, { dispatch }) => {
    const response = await api.get<BalanceHistory[]>(`/balances/history`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    dispatch(setBalanceHistory(response.data))

    return response.data
  },
)

export const createMockToptup = createAsyncThunk(
  'main/createMockToptup',
  async (
    { accessToken, amount }: { accessToken: string; amount: number },
    { dispatch },
  ) => {
    const response = await api.post<{ _id: string }>(
      `/balances`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    dispatch(getBalanceHistory(accessToken))
    dispatch(getTotalBalance(accessToken))

    return response.data
  },
)
