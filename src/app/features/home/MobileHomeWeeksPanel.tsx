import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';
import { defaultClient } from '@threecharts/services/api';

import { WeeksPanel } from '../weeks';
import { selectWeek, getWeeks, getOutdatedWeeks } from '../weeks/slice';

import { Styled } from './Home.styles';
import { HomeWeeksPanelContent } from './HomeWeeksPanelContent';
import { HomeWeeksPanelHeader } from './HomeWeeksPanelHeader';

interface HomeWeeksPanelProps {
  navBarHeight: number;
  isHidden: boolean;
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const HomeWeeksPanel: React.FC<HomeWeeksPanelProps> = (props) => {
  const dispatch = useDispatch();

  // User State
  const currentUser = useSelector((state: AppState) => state.user.currentUser);

  const weekStatus = useSelector((state: AppState) => state.weeks.status);
  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);

  const outdatedWeekStatus = useSelector((state: AppState) => state.weeks.outdatedWeeks.status);

  // Dispatchers
  const setSelectedWeek = useCallback((weekId: number) => dispatch(selectWeek(weekId)), [dispatch]);

  const updateWeeks = useCallback(async () => {
    if (currentUser === null) {
      return;
    }

    dispatch(getWeeks(defaultClient, currentUser.id));
    dispatch(getOutdatedWeeks(defaultClient, currentUser.ianaTimezone));
  }, [dispatch, currentUser]);

  // Effects
  useEffect(() => {
    updateWeeks();
  }, [updateWeeks]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('overflow', props.isOpen ? 'hidden' : null);
  });

  const areWeeksLoading = weekStatus === 'pending' || outdatedWeekStatus === 'pending';

  return (
    <Styled.HomeWeeksPanelContainer
      windowHeight={window.innerHeight}
      navBarHeight={props.navBarHeight}
      isHidden={props.isHidden}
      isOpen={props.isOpen}
      alwaysVisibleHeight={56}
    >
      <WeeksPanel
        isOpen={props.isOpen}
        onOpen={props.onOpen}
        onClose={props.onClose}
        onRefresh={updateWeeks}
        isLoading={areWeeksLoading}
        value={selectedWeekId ?? null}
        onChange={setSelectedWeek}
      >
        <HomeWeeksPanelHeader />
        <Divider />
        <HomeWeeksPanelContent />
      </WeeksPanel>
    </Styled.HomeWeeksPanelContainer>
  );
};
