import React from 'react';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core';

import { RootNavigation } from './features/navigation/RootNavigation';
import { GlobalStyle } from './global-styles';
import { MuiTheme } from './mui-theme';
import { Styled } from './App.styles';

export const App: React.FC = () => (
  <MuiThemeProvider theme={MuiTheme}>
    <Styled.AppContainer id="app">
      <StylesProvider injectFirst>
        <RootNavigation />
      </StylesProvider>
      <GlobalStyle />
    </Styled.AppContainer>
  </MuiThemeProvider>
);
