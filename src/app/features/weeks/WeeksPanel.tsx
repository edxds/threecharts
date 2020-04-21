import React, { createContext } from 'react';

import { WeeksPanelHeader } from './WeeksPanelHeader';
import { WeeksPanelItem } from './WeeksPanelItem';
import {
  WeeksPanelProps,
  WeeksPanelContextState,
  WeeksPanelCompoundComponents,
} from './WeeksPanel.types';
import { Styled } from './WeeksPanel.styles';

export const WeeksPanelContext = createContext<WeeksPanelContextState | undefined>(undefined);

export const WeeksPanel: React.FC<WeeksPanelProps> & WeeksPanelCompoundComponents = ({
  isOpen,
  onOpen,
  onClose,
  value,
  onChange,
  children,
  isLoading,
  onRefresh,
}) => {
  return (
    <WeeksPanelContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        isLoading,
        onRefresh,
        onSelectWeek: onChange,
        selectedWeek: value,
      }}
    >
      {children}
    </WeeksPanelContext.Provider>
  );
};

WeeksPanel.Header = WeeksPanelHeader;
WeeksPanel.Content = Styled.WeekList;
WeeksPanel.Item = WeeksPanelItem;
