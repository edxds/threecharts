import 'styled-components/macro';

import React from 'react';
import { Typography, Button, IconButton } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import { Stack } from './Stack';

export interface ThinErrorProps {
  onRetry?(): void;
  onDismiss?(): void;
  message?: string;
  retryButtonTitle?: string;
}

export const ThinError: React.FC<ThinErrorProps> = ({
  onRetry,
  onDismiss,
  message = 'Algo deu errado',
  retryButtonTitle = 'Tentar Novamente',
}) => (
  <Stack direction="row" justify="center" align="center" padding="16px 0" spacing={8}>
    {onDismiss && (
      <IconButton edge="start" size="small" css="opacity: 0.6" onClick={onDismiss}>
        <CloseRounded fontSize="small" />
      </IconButton>
    )}
    <Typography color="textPrimary" variant="body1">
      {message}
    </Typography>
    {onRetry && (
      <Button color="primary" onClick={onRetry}>
        {retryButtonTitle}
      </Button>
    )}
  </Stack>
);
