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
  ContainerProps,
  onOpen,
  onClose,
  isOpen,
  value,
  onChange,
  title,
  children,
  isLoading,
  onRefresh,
  ...props
}) => {
  return (
    <Styled.Container isOpen={isOpen} {...ContainerProps} {...props}>
      <WeeksPanelContext.Provider
        value={{
          title,
          isOpen,
          isLoading,
          onOpen,
          onClose,
          onRefresh,
          onSelectWeek: onChange,
          selectedWeek: value,
        }}
      >
        {children}
      </WeeksPanelContext.Provider>
    </Styled.Container>
  );
};

WeeksPanel.Header = WeeksPanelHeader;
WeeksPanel.Content = Styled.WeekList;
WeeksPanel.Item = WeeksPanelItem;
