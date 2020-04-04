import styled from 'styled-components';

const HomeContainer = styled.div`
  overflow: auto;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'content'
    'nav-bar';
`;

const HomeContent = styled.div`
  overflow: auto;
  grid-area: content;
`;

const HomeNavigationBar = styled.div`
  grid-area: nav-bar;
`;

export const Styled = {
  HomeContainer,
  HomeContent,
  HomeNavigationBar,
};
