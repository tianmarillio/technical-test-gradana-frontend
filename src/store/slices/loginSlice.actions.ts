import api from '@/api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAccessToken } from './mainSlice'
import { setLoginError } from './loginSlice'

interface LoginPayload {
  email: string
  password: string
}

export const login = createAsyncThunk(
  'login/login',
  async (payload: LoginPayload, { dispatch }) => {
    try {
      const response = await api.post<{
        accessToken: string
      }>(`/login`, payload)

      dispatch(setAccessToken(response.data))

      return response.data
    } catch (error: any) {
      const errors = []

      if (error?.response?.data?.error?.message) {
        errors.push(error?.response?.data?.error?.message)
      }

      const errorDetails = error?.response?.data?.error?.details

      if (Array.isArray(errorDetails)) {
        for (const elem of errorDetails) {
          errors.push(elem)
        }
      }

      dispatch(setLoginError(errors.join(', ')))

      throw error
    }
  },
)
