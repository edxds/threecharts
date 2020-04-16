import React, { useContext } from 'react';
import { useTheme, IconButton, Fade } from '@material-ui/core';
import { RefreshRounded as RefreshIcon, ExpandLess as ExpandIcon } from '@material-ui/icons';

import { Styled } from './WeeksPanel.styles';
import { WeeksPanelContext } from './WeeksPanel';

export const WeeksPanelHeader = () => {
  const theme = useTheme();
  const context = useContext(WeeksPanelContext);

  if (!context) {
    throw new Error('WeeksPanelContext not provided!');
  }

  const { title, isOpen, isLoading, onOpen, onClose, onRefresh } = context;

  return (
    <Styled.HeaderContainer color={theme.palette.primary.main}>
      <span>{title ?? 'Semanas'}</span>
      <Styled.HeaderActions>
        <Fade in={isOpen}>
          <IconButton color="primary" disabled={isLoading} onClick={onRefresh}>
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
  );
};
