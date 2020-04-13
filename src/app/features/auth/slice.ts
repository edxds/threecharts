import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api } from '@threecharts/services/api';
import { UserDto } from '@threecharts/models/UserDto';
import { AppThunk } from '@threecharts/app/redux/store';

type AuthStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type AuthState = {
  status: AuthStatusType;
  user: UserDto | null;
};

const initialState: AuthState = {
  status: (localStorage.getItem('state.auth.status') as AuthStatusType | null) ?? 'idle',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    detailsPending(state, _: Action) {
      state.status = 'pending';
    },
    detailsResolved(state, action: PayloadAction<UserDto>) {
      state.status = 'resolved';
      state.user = action.payload;
    },
    detailsRejected(state, _: Action) {
      state.status = 'rejected';
      state.user = null;
    },
    authorizePending(state, _: Action) {
      state.status = 'pending';
    },
    authorizeResolved(state, action: PayloadAction<UserDto>) {
      state.status = 'resolved';
      state.user = action.payload;
    },
    authorizeRejected(state, _: Action) {
      state.status = 'rejected';
      state.user = null;
    },
  },
});

export const authorize = (instance: AxiosInstance, token: string): AppThunk => async (dispatch) => {
  dispatch(authorizePending());
  const result = await api.tryAuthorize(instance, token);

  if (result.isFailure) {
    return dispatch(authorizeRejected());
  }

  const user = result.value();
  dispatch(authorizeResolved(user));
};

export const getUserDetails = (instance: AxiosInstance): AppThunk => async (dispatch) => {
  dispatch(detailsPending());
  const result = await api.getUserDetails(instance);

  if (result.isFailure) {
    return dispatch(detailsRejected());
  }

  const user = result.value();
  dispatch(detailsResolved(user));
};

export const {
  authorizePending,
  authorizeResolved,
  authorizeRejected,
  detailsPending,
  detailsResolved,
  detailsRejected,
} = authSlice.actions;
export default authSlice.reducer;
