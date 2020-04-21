import 'styled-components/macro';

import React, { useCallback, useEffect } from 'react';
import { Collapse, Fade, CircularProgress, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseJSON } from 'date-fns';

import { Stack } from '@threecharts/app/components/Stack';
import { ColoredMessageBox } from '@threecharts/app/components/ColoredMessageBox';
import { AppState } from '@threecharts/app/redux/store';
import { defaultClient } from '@threecharts/services/api';

import { syncWeeks, syncDismiss, getWeeks, getOutdatedWeeks } from '../weeks/slice';
import { WeeksPanel } from '../weeks';

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
  const isSyncing = weekSyncStatus === 'pending';
  const didSyncFail = weekSyncStatus === 'rejected';

  const hasOutdatedWeeks = outdatedWeekCount > 0;
  const didWeeksFail = weekStatus === 'rejected' || outdatedWeekStatus === 'rejected';
  const areWeeksLoading = weekStatus === 'pending' || outdatedWeekStatus === 'pending';

  const shouldShowMessage =
    areWeeksLoading || didWeeksFail || hasOutdatedWeeks || isSyncing || didSyncFail;

  return (
    <>
      <Collapse in={shouldShowMessage}>
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
              <Button color="primary" variant="contained" onClick={updateWeeks}>
                Tentar Novamente
              </Button>
            </Stack>
          </ColoredMessageBox>
        </Fade>
        <Fade
          in={hasOutdatedWeeks && !areWeeksLoading && !didWeeksFail && !isSyncing && !didSyncFail}
          unmountOnExit
        >
          <ColoredMessageBox
            message={`Você tem ${outdatedWeekCount} ${
              outdatedWeekCount > 1
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
      <WeeksPanel.Content>
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
