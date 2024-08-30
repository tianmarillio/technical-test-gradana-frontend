import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './slices/mainSlice';
import { registerReducer } from './slices/registerSlice';
import { loginReducer } from './slices/loginSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    register: registerReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
