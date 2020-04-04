import { createMuiTheme } from '@material-ui/core';

export const LightMuiTheme = createMuiTheme({
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;`,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.825rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.425rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: 'hsl(280, 80%, 50%)',
      contrastText: '#FFF',
    },
  },
});

export const DarkMuiTheme = createMuiTheme({
  ...LightMuiTheme,
  palette: {
    type: 'dark',
    primary: {
      main: 'hsl(280, 80%, 70%)',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        position: 'relative',
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          content: "''",
          pointerEvents: 'none',
          boxShadow: '0px 0px 0px 1px rgba(255, 255, 255, 0.25)',
        },
      },
    },
  },
});
