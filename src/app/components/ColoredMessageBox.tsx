import 'styled-components/macro';

import React from 'react';
import { ThemeProvider, Paper, Typography } from '@material-ui/core';

import { ColoredMuiTheme } from '../mui-theme';

import { Stack } from './Stack';

export interface ColoredMessageBoxProps {
  message: React.ReactNode;
  submessage?: React.ReactNode;
}

export const ColoredMessageBox: React.FC<ColoredMessageBoxProps> = ({
  message,
  submessage,
  children,
  ...other
}) => {
  return (
    <ThemeProvider theme={ColoredMuiTheme}>
      <Paper css="padding: 16px" elevation={0} {...other}>
        <Stack spacing={4}>
          <Typography variant="h4" component="span" color="textPrimary">
            {message}
          </Typography>
          {submessage && (
            <Typography variant="body1" component="span" color="textPrimary" css="opacity: 0.6">
              {submessage}
            </Typography>
          )}
        </Stack>
        {children}
      </Paper>
    </ThemeProvider>
  );
};
