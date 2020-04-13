import 'styled-components/macro';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { Typography, CircularProgress, Collapse, Button, Fade } from '@material-ui/core';
import { format, parseJSON } from 'date-fns';

import { AppState } from '@threecharts/app/redux/store';
import { defaultClient } from '@threecharts/services/api';
import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';
import { TransitionSharedContainer } from '@threecharts/app/components/TransitionSharedContainer';
import { TransitionFadeThrough } from '@threecharts/app/components/TransitionFadeThrough';
import { ColoredMessageBox } from '@threecharts/app/components/ColoredMessageBox';
import { Stack } from '@threecharts/app/components/Stack';

import { WeeksPanel } from '../weeks';
import { getWeeks } from '../weeks/slice';
import { getUserDetails } from '../auth/slice';

import { HomeBottomNavigation } from './HomeBottomNavigation';
import { Styled } from './Home.styles';

export const Home = () => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);

  const { user } = useSelector((state: AppState) => state.auth);
  const { status: weekStatus, weeks } = useSelector((state: AppState) => state.weeks);

  const [scrollHandler, scrollDirection] = useScrollDirection();
  const [navBarRef, navBarEntry] = useResizeObserver();

  const location = useLocation();
  const match = useRouteMatch('/');

  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(async () => {
    dispatch(getUserDetails(defaultClient));
  }, [dispatch]);

  const fetchWeeks = useCallback(async () => {
    if (user === null) {
      return;
    }

    dispatch(getWeeks(defaultClient, user.id));
  }, [dispatch, user]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    fetchWeeks();
  }, [fetchWeeks]);

  const didWeeksFail = weekStatus === 'rejected';
  const areWeeksLoading = weekStatus === 'pending';

  const navBarHeight = navBarEntry?.contentRect.height ?? 56;
  const isNavBarHidden = scrollDirection === 'DOWN';

  const selectedWeek = weeks.find((week) => week.id === selectedWeekId);

  // Set "default" tab to tracks by redirecting to /tracks
  // if we are at the base URL. Kinda hacky, no?
  if (match?.isExact) {
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
                  <Typography variant="h1" color="textPrimary" style={{ height: 1000 }}>
                    Tracks
                  </Typography>
                )}
              />
              <Route
                path="/albums"
                render={() => (
                  <Typography variant="h1" color="textPrimary">
                    Albums
                  </Typography>
                )}
              />
              <Route
                path="/artists"
                render={() => (
                  <Typography variant="h1" color="textPrimary">
                    Artists
                  </Typography>
                )}
              />
              <Route
                path="/profile"
                render={() => (
                  <Typography variant="h1" color="textPrimary">
                    Profile
                  </Typography>
                )}
              />
            </Switch>
          </TransitionFadeThrough>
        </TransitionGroup>
      </Styled.HomeContent>
      <Styled.HomeWeeksPanelContainer
        windowHeight={window.innerHeight}
        navBarHeight={navBarHeight}
        isHidden={isNavBarHidden}
        isOpen={isWeeksPanelOpen}
        alwaysVisibleHeight={56}
      >
        <WeeksPanel
          isOpen={isWeeksPanelOpen}
          onOpen={() => setIsWeeksPanelOpen(true)}
          onClose={() => setIsWeeksPanelOpen(false)}
          onRefresh={fetchWeeks}
          isLoading={areWeeksLoading}
          value={selectedWeekId}
          onChange={setSelectedWeekId}
          title={selectedWeek && `Semana ${selectedWeek.weekNumber}`}
          ContainerProps={{ elevation: 2 }}
        >
          <Collapse in={areWeeksLoading || didWeeksFail}>
            <Fade in={areWeeksLoading} unmountOnExit>
              <Stack direction="row" justify="center" align="center" padding="16px 0" spacing={16}>
                <CircularProgress color="inherit" size={16} />
                <Typography color="textPrimary" variant="body1">
                  Carregando semanas...
                </Typography>
              </Stack>
            </Fade>
            <Fade in={didWeeksFail} unmountOnExit>
              <ColoredMessageBox
                message="Algo deu errado. Verifique sua conexão e tente novamente."
                css="margin: 16px"
              >
                <Stack direction="row" justify="flex-end" padding="32px 0 0">
                  <Button color="primary" variant="contained" onClick={fetchWeeks}>
                    Tentar Novamente
                  </Button>
                </Stack>
              </ColoredMessageBox>
            </Fade>
          </Collapse>
          {[...weeks] // You can't run sort() on Redux arrays!
            .sort((a, b) => b.weekNumber - a.weekNumber)
            .map((week) => ({
              id: week.id,
              weekNumber: week.weekNumber,
              from: format(parseJSON(week.from), 'dd/MM/yyyy'),
              to: format(parseJSON(week.to), 'dd/MM/yyyy'),
            }))
            .map((week) => (
              <WeeksPanel.Item key={week.id} data={week} />
            ))}
        </WeeksPanel>
      </Styled.HomeWeeksPanelContainer>
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
