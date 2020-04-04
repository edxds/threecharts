import { createMuiTheme } from '@material-ui/core';

export const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;`,
  },
  palette: {
    primary: {
      main: '#A219E6',
      contrastText: '#FFF',
    },
  },
});
