import React, { createContext } from 'react';
import { useTheme, IconButton, Fade, Divider } from '@material-ui/core';
import { RefreshRounded as RefreshIcon, ExpandLess as ExpandIcon } from '@material-ui/icons';

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
  ...props
}) => {
  const theme = useTheme();

  return (
    <Styled.Container isOpen={isOpen} {...ContainerProps} {...props}>
      <Styled.HeaderContainer color={theme.palette.primary.main}>
        <span>{title ?? 'Semanas'}</span>
        <Styled.HeaderActions>
          <Fade in={isOpen}>
            <IconButton color="primary">
              <RefreshIcon />
            </IconButton>
          </Fade>
          <IconButton
            color="primary"
            onClick={isOpen ? onClose : onOpen}
            style={{
              transition: 'transform 500ms cubic-bezier(0.5, 0.5, 0.25, 1)',
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
            }}
          >
            <ExpandIcon />
          </IconButton>
        </Styled.HeaderActions>
      </Styled.HeaderContainer>
      <Divider />
      <Styled.WeekList>
        <WeeksPanelContext.Provider value={{ onSelectWeek: onChange, selectedWeek: value }}>
          {children}
        </WeeksPanelContext.Provider>
      </Styled.WeekList>
    </Styled.Container>
  );
};

WeeksPanel.Item = WeeksPanelItem;
