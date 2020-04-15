import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/slice';
import userReducer from '../features/user/slice';
import weeksReducer from '../features/weeks/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  weeks: weeksReducer,
});
