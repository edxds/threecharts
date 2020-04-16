import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api, isAuthorizationError } from '@threecharts/services/api';
import { AppThunk } from '@threecharts/app/redux/store';
import { UserWeekDto, UserWeeksDto } from '@threecharts/models/UserWeeksDto';

import { authorizeRejected } from '../auth/slice';

import { WeeksErrorType } from './types';

type PromiseStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type WeeksState = {
  status: PromiseStatusType;
  error?: WeeksErrorType;
  weeks: UserWeekDto[];
  selectedWeekId?: number;
  outdatedWeeks: {
    status: PromiseStatusType;
    count: number;
  };
  syncStatus: PromiseStatusType;
};

const initialState: WeeksState = {
  status: 'idle',
  weeks: [],
  outdatedWeeks: { status: 'idle', count: 0 },
  syncStatus: 'idle',
};

const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    selectWeek(state, action: PayloadAction<number>) {
      state.selectedWeekId = action.payload;
    },
    getOutdatedWeeksPending(state, _: Action) {
      state.outdatedWeeks.status = 'pending';
    },
    getOutdatedWeeksResolved(state, action: PayloadAction<number>) {
      state.outdatedWeeks.status = 'resolved';
      state.outdatedWeeks.count = action.payload;
    },
    getOutdatedWeeksRejected(state, action: PayloadAction<WeeksErrorType>) {
      state.outdatedWeeks.status = 'rejected';
      state.error = action.payload;
    },
    getWeeksPending(state, _: Action) {
      state.status = 'pending';
    },
    getWeeksResolved(state, action: PayloadAction<UserWeeksDto>) {
      state.status = 'resolved';
      state.weeks = action.payload.weeks;
    },
    getWeeksRejected(state, _: Action) {
      state.status = 'rejected';
    },
    syncPending(state, _: Action) {
      state.syncStatus = 'pending';
    },
    syncResolved(state, action: PayloadAction<UserWeeksDto>) {
      state.syncStatus = 'resolved';
      state.outdatedWeeks.count = 0;
      state.weeks = action.payload.weeks;
    },
    syncRejected(state, _: Action) {
      state.syncStatus = 'rejected';
    },
    syncDismiss(state, _: Action) {
      state.syncStatus = 'idle';
    },
  },
});

export const getWeeks = (axios: AxiosInstance, userId: number): AppThunk => async (dispatch) => {
  dispatch(getWeeksPending());
  const result = await api.getWeeks(axios, userId);

  if (result.isFailure) {
    dispatch(getWeeksRejected());

    const { error } = result;
    if (isAuthorizationError(error)) {
      return dispatch(authorizeRejected());
    }

    // Handle unknown errors
    return;
  }

  const weeks = result.value;
  dispatch(getWeeksResolved(weeks));
};

export const getOutdatedWeeks = (
  axios: AxiosInstance,
  userTimezone: string | null,
): AppThunk => async (dispatch) => {
  if (!userTimezone) {
    return dispatch(getOutdatedWeeksRejected(WeeksErrorType.NoTimeZoneDefined));
  }

  dispatch(getOutdatedWeeksPending());
  const result = await api.getOutdatedWeeks(axios);

  if (result.isFailure) {
    if (isAuthorizationError(result.error)) {
      dispatch(getOutdatedWeeksRejected(WeeksErrorType.Unauthorized));
      dispatch(authorizeRejected());

      return;
    }

    return dispatch(getOutdatedWeeksRejected(WeeksErrorType.Unspecified));
  }

  const weekCount = result.value.weeks.length;
  dispatch(getOutdatedWeeksResolved(weekCount));
};

export const syncWeeks = (axios: AxiosInstance, userTimezone: string | null): AppThunk => async (
  dispatch,
) => {
  if (!userTimezone) {
    return dispatch(syncRejected());
  }

  dispatch(syncPending());
  const result = await api.postSyncWeeks(axios);

  if (result.isFailure) {
    dispatch(syncRejected());

    if (isAuthorizationError(result.error)) {
      dispatch(authorizeRejected());
    }

    return;
  }

  dispatch(syncResolved(result.value));
};

export const {
  selectWeek,
  getWeeksPending,
  getWeeksResolved,
  getWeeksRejected,
  getOutdatedWeeksPending,
  getOutdatedWeeksResolved,
  getOutdatedWeeksRejected,
  syncPending,
  syncResolved,
  syncRejected,
  syncDismiss,
} = weeksSlice.actions;
export default weeksSlice.reducer;
