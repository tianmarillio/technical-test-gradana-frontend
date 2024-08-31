import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginState } from './loginSlice.interfaces'
import { login } from './loginSlice.actions'

const initialState: LoginState = {
  loading: false,
  error: null,
  success: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginStates(state) {
      state.loading = false
      state.error = null
      state.success = false
    },
    setLoginError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      // action: login/login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.success = false
        // state.error = 'Error login';
      }),
})

export const { resetLoginStates, setLoginError } = loginSlice.actions
export const loginReducer = loginSlice.reducer
