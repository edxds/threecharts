import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import * as measurements from '../../measurements';

const Container = styled.main`
  display: grid;
  column-gap: ${measurements.gapSize.sm}px;
  grid-template-columns: ${measurements.sidebarWidth}px 1fr;
  grid-template-areas: 'sidebar content';

  padding: 0 ${measurements.marginsSize.sm}px;
  padding-top: 64px;

  overflow-y: auto;

  @media (min-width: ${measurements.breakpoints.md}px) {
    column-gap: ${measurements.gapSize.md}px;

    padding: 0 ${measurements.marginsSize.md}px;
    padding-top: 64px;
  }

  @media (min-width: ${measurements.breakpoints.lg}px) {
    padding: 0 ${measurements.marginsSize.lg}px;
    padding-top: 64px;
  }

  @media (min-width: 1600px) {
    padding-right: ${measurements.gapSize.md +
    measurements.sidebarWidth +
    measurements.marginsSize.lg}px;
  }
`;

const WeeksFloatingTabPositionContainer = styled.div<{
  left: number;
  width: number;
  selfHeight: number;
  isHidden: boolean;
}>`
  pointer-events: none;

  z-index: 10;

  position: fixed;
  width: ${(p) => p.width}px;
  left: ${(p) => p.left}px;
  bottom: 32px;

  /* For popover */
  padding-top: 16px;

  transition: transform 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  transform: translateY(${(p) => (p.isHidden ? p.selfHeight + 32 + 1 : 0)}px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeeksFloatingTabContainer = styled(Paper)<{ isOpen: boolean }>`
  pointer-events: auto;

  transition: width 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  width: ${(p) => (p.isOpen ? 352 : 288)}px;

  border-radius: 100px;
`;

const WeeksContentContainer = styled(Paper)`
  display: flex;
  overflow: hidden;

  height: 80vh;
  width: 30vw;
  min-width: 560px;

  border-radius: 16px;

  & > * {
    flex: 1;
  }
`;

const WeeksContentInner = styled.div`
  overflow-y: auto;
`;

const Sidebar = styled.nav`
  position: relative;
  grid-area: sidebar;
`;

const Content = styled.div`
  position: relative;
  grid-area: content;

  & > * {
    overflow-y: visible;
  }
`;

export const Styled = {
  Container,
  Sidebar,
  Content,
  WeeksFloatingTabPositionContainer,
  WeeksFloatingTabContainer,
  WeeksContentContainer,
  WeeksContentInner,
};
