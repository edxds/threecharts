import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
