import 'styled-components/macro';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';
import { defaultClient, api } from '@threecharts/services/api';
import { breakpoints } from '@threecharts/app/measurements';
import { ChartsDto } from '@threecharts/models/ChartsDto';

import { ChartScreen } from '../charts/ChartScreen';
import { UserProfile } from '../user/UserProfile';

import { MobileHome } from './MobileHome';
import { WideHome } from './WideHome';

type AsyncStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

export const Home = () => {
  const [chartsStatus, setChartsStatus] = useState<AsyncStatus>('idle');
  const [charts, setCharts] = useState<ChartsDto | null>(null);

  const { currentUser: user } = useSelector((state: AppState) => state.user);
  const { selectedWeekId } = useSelector((state: AppState) => state.weeks);

  const location = useLocation();
  const indexMatch = useRouteMatch('/');

  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);

  const fetchCharts = useCallback(async () => {
    if (user === null || !selectedWeekId) {
      return;
    }

    setChartsStatus('pending');

    const result = await api.getCharts(defaultClient, user.id, selectedWeekId);
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

  const commonChartScreenProps = {
    onRetry: fetchCharts,
    isLoading: chartsStatus === 'pending',
    hasError: chartsStatus === 'rejected',
    noWeekSelected: !selectedWeekId,
  };

  // Set "default" tab to tracks by redirecting to /tracks
  // if we are at the base URL. Kinda hacky, no?
  if (indexMatch?.isExact) {
    return <Redirect to="/tracks" />;
  }

  if (isMobile) {
    return (
      <MobileHome>
        <Switch location={location}>
          <Route
            path="/tracks"
            render={() => (
              <ChartScreen
                title="Músicas"
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
                title="Álbuns"
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
                title="Artistas"
                type="artist"
                data={charts?.artistEntries ?? []}
                {...commonChartScreenProps}
              />
            )}
          />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </MobileHome>
    );
  }

  return (
    <WideHome>
      <Switch location={location}>
        <Route
          path="/tracks"
          render={() => (
            <ChartScreen
              title="Músicas"
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
              title="Álbuns"
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
              title="Artistas"
              type="artist"
              data={charts?.artistEntries ?? []}
              {...commonChartScreenProps}
            />
          )}
        />
        <Route path="/profile" component={UserProfile} />
      </Switch>
    </WideHome>
  );
};
