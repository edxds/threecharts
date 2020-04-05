import 'styled-components/macro';

import React, { useMemo } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { useTheme, Theme, createMuiTheme } from '@material-ui/core/styles';
import { ArrowForwardRounded as ArrowForwardIcon } from '@material-ui/icons';

import { ReactComponent as LastFmIcon } from '@threecharts/assets/icons/lastfm-icon.svg';

type ButtonProps = React.ComponentProps<typeof Button>;

export const LastFmLoginButton: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();
  const overrideTheme = useMemo<Theme>(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          ...theme.palette,
          primary: {
            main: '#D51007',
          },
        },
      }),
    [theme],
  );

  return (
    <ThemeProvider theme={overrideTheme}>
      <Button color="primary" variant="contained" endIcon={<ArrowForwardIcon />} {...props}>
        Entrar com <LastFmIcon css="margin-left: 8px" />
      </Button>
    </ThemeProvider>
  );
};
