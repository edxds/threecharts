import React from 'react';
import { Provider } from 'react-redux';
import {
  useMediaQuery,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';

import { store } from './redux/store';
import { RootRouter } from './features/navigation';
import { UserManager } from './features/user/UserManager';
import { LightMuiTheme, DarkMuiTheme } from './mui-theme';
import { Styled } from './App.styles';

export const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? DarkMuiTheme : LightMuiTheme;

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Styled.AppContainer id="app">
          <StylesProvider injectFirst>
            <UserManager />
            <RootRouter />
          </StylesProvider>
        </Styled.AppContainer>
      </MuiThemeProvider>
    </Provider>
  );
};
