import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api } from '@threecharts/services/api';
import { UserDto } from '@threecharts/models/UserDto';
import { AppThunk } from '@threecharts/app/redux/store';

type AuthStatusType = 'pending' | 'resolved' | 'rejected';

type AuthState = {
  status: AuthStatusType;
  user: UserDto | null;
};

const initialState: AuthState = {
  status: (localStorage.getItem('state.auth.status') as AuthStatusType | null) ?? 'rejected',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
  dispatch(authSlice.actions.authorizePending());
  const result = await api.tryAuthorize(instance, token);

  if (result.isFailure) {
    return dispatch(authSlice.actions.authorizeRejected());
  }

  const user = result.value();
  dispatch(authSlice.actions.authorizeResolved(user));
};

export const { authorizeResolved, authorizeRejected } = authSlice.actions;
export default authSlice.reducer;
