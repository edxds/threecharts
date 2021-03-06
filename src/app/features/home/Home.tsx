import 'styled-components/macro';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';
import { AsyncStatus } from '@threecharts/models/AsyncStatus';
import { defaultClient, api } from '@threecharts/services/api';
import { breakpoints } from '@threecharts/app/measurements';
import { ChartsDto } from '@threecharts/models/ChartsDto';

import { ChartScreen } from '../charts/ChartScreen';
import { UserProfile } from '../user/UserProfile';

import { MobileHome } from './MobileHome';
import { WideHome } from './WideHome';

export const Home = () => {
  const [chartsStatus, setChartsStatus] = useState<AsyncStatus>('idle');
  const [charts, setCharts] = useState<ChartsDto | null>(null);

  const user = useSelector((state: AppState) => state.user.currentUser);
  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);
  const weeks = useSelector((state: AppState) => state.weeks.weeks);

  const location = useLocation();
  const indexMatch = useRouteMatch('/');

  const fetchCharts = useCallback(async () => {
    if (user === null || !selectedWeekId) {
      return;
    }

    setChartsStatus('pending');

    const result =
      selectedWeekId === 'live'
        ? await api.getLiveChart(defaultClient)
        : await api.getCharts(defaultClient, user.id, selectedWeekId);

    if (result.isFailure) {
      setChartsStatus('rejected');
    } else {
      setChartsStatus('resolved');
      setCharts(result.value);
    }
  }, [selectedWeekId, user]);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  const selectedWeek = weeks.find((week) => week.id === selectedWeekId);
  const commonChartScreenProps = {
    onRetry: fetchCharts,
    isLoading: chartsStatus === 'pending',
    hasError: chartsStatus === 'rejected',
    noWeekSelected: !selectedWeekId,
    weekTitle: selectedWeekId
      ? selectedWeekId === 'live'
        ? 'Ao Vivo'
        : `Semana ${selectedWeek?.weekNumber}`
      : undefined,
    userName: user?.userName,
    chartPadding: '0 0 calc(112px + env(safe-area-inset-bottom)) 0',
  };

  // Set "default" tab to tracks by redirecting to /tracks
  // if we are at the base URL. Kinda hacky, no?
  if (indexMatch?.isExact) {
    return <Redirect to="/tracks" />;
  }

  return (
    <ResponsiveHome>
      <Switch location={location}>
        <Route
          path="/tracks"
          render={() => (
            <ChartScreen
              type="track"
              data={charts?.trackEntries ?? []}
              {...commonChartScreenProps}
            />
          )}
        />
        <Route
          path="/albums"
          render={() => (
            <ChartScreen
              type="album"
              data={charts?.albumEntries ?? []}
              {...commonChartScreenProps}
            />
          )}
        />
        <Route
          path="/artists"
          render={() => (
            <ChartScreen
              type="artist"
              data={charts?.artistEntries ?? []}
              {...commonChartScreenProps}
            />
          )}
        />
        <Route path="/profile" component={UserProfile} />
      </Switch>
    </ResponsiveHome>
  );
};

const ResponsiveHome: React.FC = ({ children, ...other }) => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);

  if (isMobile) {
    return <MobileHome {...other}>{children}</MobileHome>;
  }

  return <WideHome {...other}>{children}</WideHome>;
};
