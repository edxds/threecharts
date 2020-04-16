import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api, ApiError, isAuthorizationError } from '@threecharts/services/api';
import { AppThunk } from '@threecharts/app/redux/store';

import { userResolved, userRejected, userSignedOut } from '../user/slice';

type AuthStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type AuthState = {
  status: AuthStatusType;
  signOut: {
    status: AuthStatusType;
    error: ApiError | null;
  };
};

const initialState: AuthState = {
  status: 'idle',
  signOut: {
    status: 'idle',
    error: null,
  },
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
    signOutPending(state, _: Action) {
      state.signOut.status = 'pending';
    },
    signOutResolved(state, _: Action) {
      state.signOut.status = 'resolved';
    },
    signOutRejected(state, action: PayloadAction<ApiError>) {
      state.signOut.status = 'rejected';
      state.signOut.error = action.payload;
    },
  },
});

export const authorize = (instance: AxiosInstance, token: string): AppThunk => async (dispatch) => {
  dispatch(authorizePending());
  const result = await api.tryAuthorize(instance, token);

  if (result.isFailure) {
    dispatch(userRejected(result.error));
    return dispatch(authorizeRejected());
  }

  const user = result.value;
  dispatch(authorizeResolved());
  dispatch(userResolved(user));
};

export const signOut = (instance: AxiosInstance): AppThunk => async (dispatch) => {
  dispatch(signOutPending());
  const result = await api.signOut(instance);

  if (result.isFailure) {
    const { error } = result;
    if (!isAuthorizationError(error)) {
      return dispatch(signOutRejected(error));
    }
  }

  dispatch(signOutResolved());
  dispatch(userSignedOut());
};

export const {
  authorizePending,
  authorizeResolved,
  authorizeRejected,
  signOutPending,
  signOutResolved,
  signOutRejected,
} = authSlice.actions;
export default authSlice.reducer;
