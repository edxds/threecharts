import 'styled-components/macro';

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import { AppState } from '@threecharts/app/redux/store';
import { defaultClient, api } from '@threecharts/services/api';
import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';
import { TransitionSharedContainer } from '@threecharts/app/components/TransitionSharedContainer';
import { TransitionFadeThrough } from '@threecharts/app/components/TransitionFadeThrough';
import { ChartsDto } from '@threecharts/models/ChartsDto';

import { ChartScreen } from '../charts/ChartScreen';
import { UserProfile } from '../user/UserProfile';

import { HomeBottomNavigation } from './HomeBottomNavigation';
import { HomeWeeksPanel } from './HomeWeeksPanel';
import { Styled } from './Home.styles';

type AsyncStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

export const Home = () => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);
  const [chartsStatus, setChartsStatus] = useState<AsyncStatus>('idle');
  const [charts, setCharts] = useState<ChartsDto | null>(null);

  const { currentUser: user } = useSelector((state: AppState) => state.user);
  const { selectedWeekId } = useSelector((state: AppState) => state.weeks);

  const [scrollHandler, scrollDirection] = useScrollDirection();
  const [navBarRef, navBarEntry] = useResizeObserver();

  const location = useLocation();
  const indexMatch = useRouteMatch('/');
  const profileMatch = useRouteMatch('/profile');

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

  useEffect(() => {
    setIsWeeksPanelOpen(false);
  }, [selectedWeekId]);

  const navBarHeight = navBarEntry?.contentRect.height ?? 56;
  const isNavBarHidden = scrollDirection === 'DOWN';
  const isWeeksPanelHidden = isNavBarHidden || !!profileMatch;

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

  return (
    <Styled.HomeContainer>
      <Styled.HomeContent onScroll={scrollHandler}>
        <TransitionGroup component={TransitionSharedContainer}>
          <TransitionFadeThrough key={location.key}>
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
          </TransitionFadeThrough>
        </TransitionGroup>
      </Styled.HomeContent>
      <HomeWeeksPanel
        navBarHeight={navBarHeight}
        isHidden={isWeeksPanelHidden}
        isOpen={isWeeksPanelOpen}
        onOpen={() => setIsWeeksPanelOpen(true)}
        onClose={() => setIsWeeksPanelOpen(false)}
      />
      <Styled.HomeNavigationBar
        ref={navBarRef}
        navBarHeight={navBarHeight}
        isHidden={isNavBarHidden || isWeeksPanelOpen}
      >
        <HomeBottomNavigation />
      </Styled.HomeNavigationBar>
    </Styled.HomeContainer>
  );
};
