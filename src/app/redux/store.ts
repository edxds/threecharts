import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import { AuthLocalStorageMiddleware } from '../features/auth/middleware';

import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), AuthLocalStorageMiddleware],
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
