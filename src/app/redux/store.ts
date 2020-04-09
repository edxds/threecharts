import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

export const store = configureStore({ reducer: rootReducer });
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
