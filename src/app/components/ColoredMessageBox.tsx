import 'styled-components/macro';

import React from 'react';
import { ThemeProvider, Paper, Typography } from '@material-ui/core';

import { ColoredMuiTheme } from '../mui-theme';

export interface ColoredMessageBoxProps {
  message: string;
}

export const ColoredMessageBox: React.FC<ColoredMessageBoxProps> = ({
  message,
  children,
  ...other
}) => {
  return (
    <ThemeProvider theme={ColoredMuiTheme}>
      <Paper css="padding: 16px" elevation={0} {...other}>
        <Typography variant="h4" component="span" color="textPrimary">
          {message}
        </Typography>
        {children}
      </Paper>
    </ThemeProvider>
  );
};
