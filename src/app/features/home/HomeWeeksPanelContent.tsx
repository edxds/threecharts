import 'styled-components/macro';

import React, { useCallback, useEffect } from 'react';
import { Collapse, Fade, CircularProgress, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseJSON } from 'date-fns';

import { Stack } from '@threecharts/app/components/Stack';
import { StackedError } from '@threecharts/app/components/StackedError';
import { ThinError } from '@threecharts/app/components/ThinError';
import { ThinLoading } from '@threecharts/app/components/ThinLoading';
import { ColoredMessageBox } from '@threecharts/app/components/ColoredMessageBox';
import { AppState } from '@threecharts/app/redux/store';
import { defaultClient } from '@threecharts/services/api';

import { syncWeeks, syncDismiss, getWeeks, getOutdatedWeeks } from '../weeks/slice';
import { WeeksPanel } from '../weeks';

type WeeksPanelMessageState =
  | 'weeks_loading'
  | 'weeks_failed'
  | 'outdated_weeks'
  | 'syncing'
  | 'syncing_failed'
  | 'none';

export const HomeWeeksPanelContent = () => {
  const dispatch = useDispatch();

  // User State
  const currentUser = useSelector((state: AppState) => state.user.currentUser);

  // Week State
  const weeks = useSelector((state: AppState) => state.weeks.weeks);
  const weekStatus = useSelector((state: AppState) => state.weeks.status);

  // Week Sync State
  const weekSyncStatus = useSelector((state: AppState) => state.weeks.syncStatus);

  // Outdated Week State
  const outdatedWeekCount = useSelector((state: AppState) => state.weeks.outdatedWeeks.count);
  const outdatedWeekStatus = useSelector((state: AppState) => state.weeks.outdatedWeeks.status);

  const updateWeeks = useCallback(async () => {
    if (currentUser === null) {
      return;
    }

    dispatch(getWeeks(defaultClient, currentUser.id));
    dispatch(getOutdatedWeeks(defaultClient, currentUser.ianaTimezone));
  }, [dispatch, currentUser]);

  const trySyncWeeks = useCallback(() => {
    if (currentUser?.ianaTimezone === null) {
      return;
    }

    dispatch(syncWeeks(defaultClient, currentUser?.ianaTimezone ?? null));
  }, [dispatch, currentUser]);

  const dismissSyncWeeks = useCallback(() => {
    dispatch(syncDismiss());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    updateWeeks();
  }, [updateWeeks]);

  // Computed UI properties
  const areWeeksLoading = weekStatus === 'pending' || outdatedWeekStatus === 'pending';
  const didWeeksFail = weekStatus === 'rejected' || outdatedWeekStatus === 'rejected';

  const isSyncing = weekSyncStatus === 'pending';
  const didSyncFail = weekSyncStatus === 'rejected';

  const hasOutdatedWeeks = outdatedWeekCount > 0;

  const messageState = ((): WeeksPanelMessageState => {
    switch (true) {
      case didWeeksFail:
        return 'weeks_failed';
      case didSyncFail:
        return 'syncing_failed';
      case areWeeksLoading:
        return 'weeks_loading';
      case isSyncing:
        return 'syncing';
      case hasOutdatedWeeks:
        return 'outdated_weeks';
      default:
        return 'none';
    }
  })();

  return (
    <>
      <Collapse in={messageState !== 'none'}>
        <WeeksLoadingMessage in={messageState === 'weeks_loading'} />
        <WeeksFailMessage in={messageState === 'weeks_failed'} tryAgain={updateWeeks} />
        <SyncingWeeksMessage in={messageState === 'syncing'} />
        <SyncFailMessage
          in={messageState === 'syncing_failed'}
          tryAgain={trySyncWeeks}
          dismiss={dismissSyncWeeks}
        />
        <OutdatedWeeksMessage
          in={messageState === 'outdated_weeks'}
          count={outdatedWeekCount}
          act={trySyncWeeks}
        />
      </Collapse>
      <WeeksPanel.Content>
        <WeeksPanel.LiveItem />
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
      </WeeksPanel.Content>
    </>
  );
};

const WeeksLoadingMessage: React.FC<{ in: boolean }> = (props) => (
  <Fade in={props.in} unmountOnExit>
    <ThinLoading />
  </Fade>
);

const WeeksFailMessage: React.FC<{ in: boolean; tryAgain(): void }> = (props) => (
  <Fade in={props.in} unmountOnExit>
    <ThinError onRetry={props.tryAgain} />
  </Fade>
);

const OutdatedWeeksMessage: React.FC<{ in: boolean; count: number; act(): void }> = (props) => (
  <Fade in={props.in} unmountOnExit>
    <ColoredMessageBox
      message={`Você tem ${props.count} ${
        props.count > 1 ? 'semanas para serem sincronizadas' : 'semana para ser sincronizada'
      }`}
      css="margin: 16px"
    >
      <Stack direction="row" justify="flex-end" padding="32px 0 0">
        <Button color="primary" variant="contained" onClick={props.act}>
          Sincronizar Agora
        </Button>
      </Stack>
    </ColoredMessageBox>
  </Fade>
);

const SyncingWeeksMessage: React.FC<{ in: boolean }> = (props) => (
  <Fade in={props.in} unmountOnExit>
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
);

const SyncFailMessage: React.FC<{ in: boolean; dismiss(): void; tryAgain(): void }> = (props) => (
  <Fade in={props.in} unmountOnExit>
    <StackedError
      message="Algo deu errado ao sincronizar suas semanas."
      onDismiss={props.dismiss}
      onRetry={props.tryAgain}
      css="margin: 16px"
    />
  </Fade>
);
