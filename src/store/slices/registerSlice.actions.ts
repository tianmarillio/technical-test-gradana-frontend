import api from '@/api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setRegisterError } from './registerSlice'

interface RegisterPayload {
  name: string
  phoneNumber: string
  email: string
  password: string
}

export const register = createAsyncThunk(
  'register/register',
  async (payload: RegisterPayload, { dispatch }) => {
  
    try {
      const response = await api.post<{
        _id: string
      }>(`/register`, payload)

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

      dispatch(setRegisterError(errors.join(', ')))

      throw error
    }
  },
)
