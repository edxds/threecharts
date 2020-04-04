import React from 'react';
import { StylesProvider } from '@material-ui/core';

import { GlobalStyle } from './global-styles';
import { RootNavigation } from './features/navigation/RootNavigation';
import { Styled } from './App.styles';

export const App: React.FC = () => (
  <Styled.AppContainer id="app">
    <StylesProvider injectFirst>
      <RootNavigation />
    </StylesProvider>
    <GlobalStyle />
  </Styled.AppContainer>
);
