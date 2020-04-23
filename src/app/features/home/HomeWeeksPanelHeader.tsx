import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';

import { WeeksPanel } from '../weeks';

export const HomeWeeksPanelHeader = () => {
  // Week State
  const weeks = useSelector((state: AppState) => state.weeks.weeks);
  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);

  // Outdated Week State
  const outdatedWeekCount = useSelector((state: AppState) => state.weeks.outdatedWeeks.count);

  // Computed UI properties
  const selectedWeek = weeks.find((week) => week.id === selectedWeekId);
  const hasOutdatedWeeks = outdatedWeekCount > 0;

  const weeksPanelBaseTitle =
    selectedWeekId === 'live'
      ? 'Ao Vivo'
      : selectedWeek
      ? `Semana ${selectedWeek.weekNumber}`
      : 'Semanas';

  const weeksPanelTitleWithReminder = hasOutdatedWeeks
    ? `${weeksPanelBaseTitle} •`
    : weeksPanelBaseTitle;

  return <WeeksPanel.Header title={weeksPanelTitleWithReminder} />;
};
