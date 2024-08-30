import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegisterState } from './register.interfaces'
import { register } from './registerSlice.actions'

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterStates(state) {
      state.loading = false
      state.error = null
      state.success = false
    },
    setRegisterError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      // action: register/register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.success = false
        // TODO: pass backend errors
        // state.error = 'Error'
      }),
})

export const { resetRegisterStates, setRegisterError } = registerSlice.actions
export const registerReducer = registerSlice.reducer
