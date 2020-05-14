import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

import { Stack } from './Stack';

export const ThinLoading: React.FC = (props) => (
  <Stack direction="row" justify="center" align="center" padding="16px 0" spacing={16} {...props}>
    <CircularProgress color="inherit" size={16} />
    <Typography color="textPrimary" variant="body1">
      Carregando...
    </Typography>
  </Stack>
);
