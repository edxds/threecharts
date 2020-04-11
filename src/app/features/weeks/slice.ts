import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api } from '@threecharts/services/api';
import { AppThunk } from '@threecharts/app/redux/store';
import { UserWeekDto, UserWeeksDto } from '@threecharts/models/UserWeeksDto';

import { authorizeRejected } from '../auth/slice';

type WeeksStatusType = 'idle' | 'pending' | 'resolved' | 'rejected';

type WeeksState = {
  status: WeeksStatusType;
  weeks: UserWeekDto[];
};

const initialState: WeeksState = { status: 'idle', weeks: [] };

const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
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
  },
});

export const getWeeks = (axios: AxiosInstance, userId: number): AppThunk => async (dispatch) => {
  dispatch(getWeeksPending());
  const result = await api.getWeeks(axios, userId);

  if (result.isFailure) {
    dispatch(getWeeksRejected());

    const { error } = result;
    if (error?.type === 'API_ERROR') {
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        return dispatch(authorizeRejected());
      }
    }

    // Handle unknown errors
    return;
  }

  const weeks = result.value();
  dispatch(getWeeksResolved(weeks));
};

export const { getWeeksPending, getWeeksResolved, getWeeksRejected } = weeksSlice.actions;
export default weeksSlice.reducer;
