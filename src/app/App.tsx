import React from 'react';
import {
  useMediaQuery,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';

import { RootRouter } from './features/navigation';
import { LightMuiTheme, DarkMuiTheme } from './mui-theme';
import { GlobalStyle } from './global-styles';
import { Styled } from './App.styles';

export const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? DarkMuiTheme : LightMuiTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <Styled.AppContainer id="app">
        <StylesProvider injectFirst>
          <RootRouter />
        </StylesProvider>
        <GlobalStyle />
      </Styled.AppContainer>
    </MuiThemeProvider>
  );
};
