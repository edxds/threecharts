import { createSlice, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api } from '@threecharts/services/api';
import { AppThunk } from '@threecharts/app/redux/store';

import { userResolved, userRejected } from '../user/slice';

type AuthStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type AuthState = {
  status: AuthStatusType;
};

const initialState: AuthState = {
  status: (localStorage.getItem('state.auth.status') as AuthStatusType | null) ?? 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorizePending(state, _: Action) {
      state.status = 'pending';
    },
    authorizeResolved(state, _: Action) {
      state.status = 'resolved';
    },
    authorizeRejected(state, _: Action) {
      state.status = 'rejected';
    },
  },
});

export const authorize = (instance: AxiosInstance, token: string): AppThunk => async (dispatch) => {
  dispatch(authorizePending());
  const result = await api.tryAuthorize(instance, token);

  if (result.isFailure) {
    dispatch(userRejected());
    return dispatch(authorizeRejected());
  }

  const user = result.value();
  dispatch(authorizeResolved());
  dispatch(userResolved(user));
};

export const { authorizePending, authorizeResolved, authorizeRejected } = authSlice.actions;
export default authSlice.reducer;
