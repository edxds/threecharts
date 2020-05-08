import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api, isAuthorizationError, ApiError } from '@threecharts/services/api';
import { AsyncStatus } from '@threecharts/models/AsyncStatus';
import { UserDto } from '@threecharts/models/UserDto';
import { AppThunk } from '@threecharts/app/redux/store';

import { authorizeRejected } from '../auth/slice';

type UserState = {
  status: AsyncStatus;
  preferences: {
    status: AsyncStatus;
  };
  error: ApiError | null;
  currentUser: UserDto | null;
};

const initialState: UserState = {
  status: 'idle',
  preferences: {
    status: 'idle',
  },
  error: null,
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
    userRejected(state, action: PayloadAction<ApiError>) {
      state.status = 'rejected';
      state.error = action.payload;
      state.currentUser = null;
    },
    userSignedOut(state, _: Action) {
      state.status = 'resolved';
      state.currentUser = null;
    },
    preferencesPending(state, _: Action) {
      state.preferences.status = 'pending';
    },
    preferencesResolved(state, action: PayloadAction<UserDto>) {
      state.preferences.status = 'pending';
      state.currentUser = action.payload;
    },
    preferencesRejected(state, _: Action) {
      state.preferences.status = 'rejected';
    },
  },
});

export const getUserDetails = (instance: AxiosInstance): AppThunk => async (dispatch) => {
  dispatch(userPending());
  const result = await api.getUserDetails(instance);

  if (result.isFailure) {
    const { error } = result;

    dispatch(userRejected(error));
    if (isAuthorizationError(error)) {
      dispatch(authorizeRejected());
    }

    return;
  }

  const user = result.value;
  if (user.ianaTimezone === null) {
    dispatch(putUserDefaultPreferences(instance));
  }

  dispatch(userResolved(user));
};

export const putUserDefaultPreferences = (instance: AxiosInstance): AppThunk => async (
  dispatch,
) => {
  dispatch(preferencesPending());
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const result = await api.putUserPreferences(instance, { ianaTimezone: defaultTimezone });

  if (result.isFailure) {
    dispatch(preferencesRejected());

    if (isAuthorizationError(result.error)) {
      dispatch(authorizeRejected());
    }

    return;
  }

  const user = result.value;
  dispatch(preferencesResolved(user));
};

export const {
  userPending,
  userResolved,
  userRejected,
  userSignedOut,
  preferencesPending,
  preferencesResolved,
  preferencesRejected,
} = userSlice.actions;
export default userSlice.reducer;
