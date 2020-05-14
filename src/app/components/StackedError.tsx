import 'styled-components/macro';

import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { Stack } from './Stack';

export interface StackedErrorProps {
  onRetry?(): void;
  onDismiss?(): void;
  message?: string;
  retryButtonTitle?: string;
}

export const StackedError: React.FC<StackedErrorProps> = ({
  onRetry,
  onDismiss,
  message = 'Algo deu errado',
  retryButtonTitle = 'Tentar Novamente',
  ...other
}) => (
  <Stack align="stretch" spacing={8} {...other}>
    <Typography color="textPrimary" variant="body1" css="opacity: 0.86">
      {message}
    </Typography>
    <Stack direction="row" justify="flex-end" spacing={8}>
      {onDismiss && (
        <Button color="primary" onClick={onDismiss}>
          Fechar
        </Button>
      )}
      {onRetry && (
        <Button color="primary" onClick={onRetry}>
          {retryButtonTitle}
        </Button>
      )}
    </Stack>
  </Stack>
);
