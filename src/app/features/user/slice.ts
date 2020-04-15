import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api } from '@threecharts/services/api';
import { UserDto } from '@threecharts/models/UserDto';
import { AppThunk } from '@threecharts/app/redux/store';

type UserStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type UserState = {
  status: UserStatusType;
  currentUser: UserDto | null;
};

const initialState: UserState = {
  status: 'idle',
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userPending(state, _: Action) {
      state.status = 'pending';
    },
    userResolved(state, action: PayloadAction<UserDto>) {
      state.status = 'resolved';
      state.currentUser = action.payload;
    },
    userRejected(state, _: Action) {
      state.status = 'rejected';
      state.currentUser = null;
    },
  },
});

export const getUserDetails = (instance: AxiosInstance): AppThunk => async (dispatch) => {
  dispatch(userPending());
  const result = await api.getUserDetails(instance);

  if (result.isFailure) {
    return dispatch(userRejected());
  }

  const user = result.value();
  dispatch(userResolved(user));
};

export const { userPending, userResolved, userRejected } = userSlice.actions;
export default userSlice.reducer;
