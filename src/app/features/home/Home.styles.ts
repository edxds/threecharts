import styled from 'styled-components';

const HomeContainer = styled.div`
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > * {
    flex: 1;
  }
`;

const HomeContent = styled.div`
  overflow: auto;

  display: flex;
  & > * {
    flex: 1;
  }
`;

const HomeNavigationBar = styled.div<{ navBarHeight: number; isHidden: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  transition: transform 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  transform: translateY(${(p) => (p.isHidden ? p.navBarHeight : 0)}px);
`;

export const Styled = {
  HomeContainer,
  HomeContent,
  HomeNavigationBar,
};
