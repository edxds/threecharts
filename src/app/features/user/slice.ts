import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api, isAuthorizationError } from '@threecharts/services/api';
import { UserDto } from '@threecharts/models/UserDto';
import { AppThunk } from '@threecharts/app/redux/store';

import { authorizeRejected } from '../auth/slice';

type PromiseStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type UserState = {
  status: PromiseStatusType;
  preferences: {
    status: PromiseStatusType;
  };
  currentUser: UserDto | null;
};

const initialState: UserState = {
  status: 'idle',
  preferences: {
    status: 'idle',
  },
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
    dispatch(userRejected());

    const { error } = result;
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
  preferencesPending,
  preferencesResolved,
  preferencesRejected,
} = userSlice.actions;
export default userSlice.reducer;
