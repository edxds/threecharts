import React from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

interface HomeWeeksPanelContainerProps {
  windowHeight: number;
  navBarHeight: number;
  alwaysVisibleHeight: number;
  isHidden: boolean;
  isOpen: boolean;
}

const MobileWeeksPanelContainer = styled(({ isOpen, ...rest }) => (
  <Paper elevation={2} {...rest} />
))<HomeWeeksPanelContainerProps>`
  display: flex;
  flex-direction: column;

  position: fixed;
  bottom: calc(var(--window-height) * -1);
  left: 0;
  right: 0;

  height: var(--window-height);

  transition: transform 500ms cubic-bezier(0.5, 0.5, 0.25, 1),
    border-radius 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  border-radius: ${(p) => (p.isOpen ? 0 : '16px 16px 0 0')};
  transform: translateY(
    ${(p) => {
      const translateYOpen = 'calc(var(--window-height) * -1)';
      const translateYVisible = `-${p.navBarHeight + p.alwaysVisibleHeight}px`;
      const translateYHidden = '0px';

      return p.isOpen ? translateYOpen : p.isHidden ? translateYHidden : translateYVisible;
    }}
  );
`;

export const Styled = {
  MobileWeeksPanelContainer,
};
