import 'styled-components/macro';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { Typography, CircularProgress, Collapse, Button, Fade } from '@material-ui/core';
import { format, parseJSON } from 'date-fns';

import { AppState } from '@threecharts/app/redux/store';
import { defaultClient, api } from '@threecharts/services/api';
import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';
import { TransitionSharedContainer } from '@threecharts/app/components/TransitionSharedContainer';
import { TransitionFadeThrough } from '@threecharts/app/components/TransitionFadeThrough';
import { ColoredMessageBox } from '@threecharts/app/components/ColoredMessageBox';
import { Stack } from '@threecharts/app/components/Stack';
import { ChartsDto } from '@threecharts/models/ChartsDto';

import { WeeksPanel } from '../weeks';
import { getWeeks, getOutdatedWeeks, syncWeeks, syncDismiss } from '../weeks/slice';
import { ChartScreen } from '../charts/ChartScreen';

import { HomeBottomNavigation } from './HomeBottomNavigation';
import { Styled } from './Home.styles';

type AsyncStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

export const Home = () => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
  const [chartsStatus, setChartsStatus] = useState<AsyncStatus>('idle');
  const [charts, setCharts] = useState<ChartsDto | null>(null);

  const { currentUser: user } = useSelector((state: AppState) => state.user);
  const { weeks, outdatedWeeks, status: weekStatus, syncStatus } = useSelector(
    (state: AppState) => state.weeks,
  );

  const [scrollHandler, scrollDirection] = useScrollDirection();
  const [navBarRef, navBarEntry] = useResizeObserver();

  const location = useLocation();
  const match = useRouteMatch('/');

  const dispatch = useDispatch();

  const fetchWeeks = useCallback(async () => {
    if (user === null) {
      return;
    }

    dispatch(getWeeks(defaultClient, user.id));
    dispatch(getOutdatedWeeks(defaultClient, user.ianaTimezone));
  }, [dispatch, user]);

  const fetchCharts = useCallback(async () => {
    if (user === null || selectedWeekId === null) {
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

  const trySyncWeeks = useCallback(() => {
    if (user?.ianaTimezone === null) {
      return;
    }

    dispatch(syncWeeks(defaultClient, user?.ianaTimezone ?? null));
  }, [dispatch, user]);

  const dismissSyncWeeks = useCallback(() => {
    dispatch(syncDismiss());
  }, [dispatch]);

  useEffect(() => {
    fetchWeeks();
  }, [fetchWeeks]);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  useEffect(() => {
    setIsWeeksPanelOpen(false);
  }, [selectedWeekId]);

  const isSyncing = syncStatus === 'pending';
  const didSyncFail = syncStatus === 'rejected';

  const hasOutdatedWeeks = outdatedWeeks.count > 0 && !isSyncing;
  const didWeeksFail = weekStatus === 'rejected' || outdatedWeeks.status === 'rejected';
  const areWeeksLoading = weekStatus === 'pending' || outdatedWeeks.status === 'pending';

  const navBarHeight = navBarEntry?.contentRect.height ?? 56;
  const isNavBarHidden = scrollDirection === 'DOWN';

  const selectedWeek = weeks.find((week) => week.id === selectedWeekId);
  const weeksPanelBaseTitle = selectedWeek ? `Semana ${selectedWeek.weekNumber}` : 'Semanas';
  const weeksPanelTitleWithReminder = hasOutdatedWeeks
    ? `${weeksPanelBaseTitle} •`
    : weeksPanelBaseTitle;

  const commonChartScreenProps = {
    onRetry: fetchCharts,
    isLoading: chartsStatus === 'pending',
    hasError: chartsStatus === 'rejected',
    noWeekSelected: !selectedWeekId,
  };

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
          title={weeksPanelTitleWithReminder}
          ContainerProps={{ elevation: 2 }}
        >
          <Collapse
            in={areWeeksLoading || didWeeksFail || hasOutdatedWeeks || isSyncing || didSyncFail}
          >
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
            <Fade
              in={hasOutdatedWeeks && !areWeeksLoading && !didWeeksFail && !didSyncFail}
              unmountOnExit
            >
              <ColoredMessageBox
                message={`Você tem ${outdatedWeeks.count} ${
                  outdatedWeeks.count > 1
                    ? 'semanas para serem sincronizadas'
                    : 'semana para ser sincronizada'
                }`}
                css="margin: 16px"
              >
                <Stack direction="row" justify="flex-end" padding="32px 0 0">
                  <Button color="primary" variant="contained" onClick={trySyncWeeks}>
                    Sincronizar Agora
                  </Button>
                </Stack>
              </ColoredMessageBox>
            </Fade>
            <Fade in={isSyncing} unmountOnExit>
              <ColoredMessageBox
                css="margin: 16px"
                message={
                  <Stack direction="row" align="center" spacing={16}>
                    <CircularProgress color="inherit" size={16} />
                    <span>Sincronizando semanas...</span>
                  </Stack>
                }
                submessage="Isso pode demorar um pouco. Evite sair da página."
              />
            </Fade>
            <Fade in={didSyncFail && !didWeeksFail} unmountOnExit>
              <ColoredMessageBox
                css="margin: 16px"
                message="Algo deu errado ao sincronizar suas semanas."
              >
                <Stack
                  direction="row"
                  justify="flex-end"
                  align="stretch"
                  padding="32px 0 0"
                  spacing={8}
                >
                  <Button color="primary" onClick={dismissSyncWeeks}>
                    Fechar
                  </Button>
                  <Button color="primary" variant="contained" onClick={trySyncWeeks}>
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
