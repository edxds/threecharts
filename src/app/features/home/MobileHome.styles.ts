import styled from 'styled-components';

const MobileHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > * {
    flex: 1;
  }
`;

const MobileHomeContent = styled.div`
  overflow: auto;

  /* Fixes scrollbar appearing under content in iOS */
  transform: translate3d(0, 0, 0);

  display: flex;
  & > * {
    flex: 1;
  }
`;

const MobileNavigationContainer = styled.div<{ navBarHeight: number; isHidden: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  transition: transform 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  transform: translateY(${(p) => (p.isHidden ? p.navBarHeight : 0)}px);
`;

export const Styled = {
  MobileHomeContainer,
  MobileHomeContent,
  MobileNavigationContainer,
};
