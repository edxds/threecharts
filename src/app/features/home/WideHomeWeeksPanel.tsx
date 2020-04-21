import React, { useCallback, useEffect } from 'react';
import { Popper, Grow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';
import { defaultClient } from '@threecharts/services/api';
import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';

import { WeeksPanel } from '../weeks';
import { selectWeek, getWeeks, getOutdatedWeeks } from '../weeks/slice';

import { Styled } from './WideHome.styles';
import { HomeWeeksPanelHeader } from './HomeWeeksPanelHeader';
import { HomeWeeksPanelContent } from './HomeWeeksPanelContent';

interface WideHomeWeeksPanelProps {
  left: number;
  width: number;
  isHidden: boolean;
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const WideHomeWeeksPanel: React.FC<WideHomeWeeksPanelProps> = (props) => {
  // User State
  const currentUser = useSelector((state: AppState) => state.user.currentUser);

  const weekStatus = useSelector((state: AppState) => state.weeks.status);
  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);

  const outdatedWeekStatus = useSelector((state: AppState) => state.weeks.outdatedWeeks.status);

  // Dispatchers
  const dispatch = useDispatch();
  const setSelectedWeek = useCallback((weekId: number) => dispatch(selectWeek(weekId)), [dispatch]);

  const [tabPositionContainerRef, tabPositionContainerEntry] = useResizeObserver<HTMLDivElement>();

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

  const areWeeksLoading = weekStatus === 'pending' || outdatedWeekStatus === 'pending';

  return (
    <Styled.WeeksFloatingTabPositionContainer
      left={props.left}
      width={props.width}
      selfHeight={tabPositionContainerEntry?.contentRect.height ?? 0}
      isHidden={props.isHidden && !props.isOpen}
      ref={tabPositionContainerRef}
    >
      <Styled.WeeksFloatingTabContainer isOpen={props.isOpen} elevation={4}>
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
          <Popper
            open={props.isOpen}
            anchorEl={tabPositionContainerRef.current}
            placement="top"
            transition
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: '50% 100% 0' }}>
                <Styled.WeeksContentContainer>
                  <Styled.WeeksContentInner>
                    <HomeWeeksPanelContent />
                  </Styled.WeeksContentInner>
                </Styled.WeeksContentContainer>
              </Grow>
            )}
          </Popper>
        </WeeksPanel>
      </Styled.WeeksFloatingTabContainer>
    </Styled.WeeksFloatingTabPositionContainer>
  );
};
