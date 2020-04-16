import React from 'react';
import styled from 'styled-components/macro';
import { Typography, Collapse, CircularProgress, Button } from '@material-ui/core';
import { ArrowDownwardRounded as ArrowIcon } from '@material-ui/icons';

import { Stack } from '@threecharts/app/components/Stack';

import { Chart } from './Chart';

type ChartProps = React.ComponentProps<typeof Chart>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 110%;
  overflow-y: auto;
`;

interface ChartScreenProps {
  title: string;
  onRetry?(): void;
  hasError?: boolean;
  isLoading?: boolean;
  noWeekSelected?: boolean;
  ContainerProps?: React.ComponentProps<typeof Container>;
}

export const ChartScreen: React.FC<ChartScreenProps & ChartProps> = ({
  title,
  data,
  onRetry,
  hasError,
  isLoading,
  noWeekSelected,
  ContainerProps,
  ...others
}) => (
  <Container {...ContainerProps}>
    <Typography variant="h1" color="textPrimary" css="margin: 16px">
      {title}
    </Typography>
    <Chart css="flex: 1" data={data} {...others}>
      <Collapse in={!isLoading && hasError} unmountOnExit>
        <Stack direction="row" justify="center" align="center" padding="16px 0" spacing={8}>
          <Typography color="textPrimary" variant="body1">
            Algo deu errado
          </Typography>
          <Button color="primary" onClick={onRetry}>
            Tentar Novamente
          </Button>
        </Stack>
      </Collapse>
      <Collapse in={isLoading && !hasError} unmountOnExit>
        <Stack direction="row" justify="center" align="center" padding="16px 0" spacing={16}>
          <CircularProgress color="inherit" size={16} />
          <Typography color="textPrimary" variant="body1">
            Carregando...
          </Typography>
        </Stack>
      </Collapse>
      {noWeekSelected && (
        <Stack
          justify="center"
          align="center"
          spacing={32}
          padding="32px"
          css="flex: 1; opacity: 0.6"
        >
          <Typography variant="h4" component="span" color="textPrimary" align="center">
            Selecione uma semana na aba Semanas
          </Typography>
          <ArrowIcon color="inherit" fontSize="large" css="margin-bottom: 128px" />
        </Stack>
      )}
      {!noWeekSelected && data.length === 0 && (
        <Stack justify="center" align="center" padding="32px" css="flex: 1; opacity: 0.6">
          <Typography
            variant="h4"
            component="span"
            color="textPrimary"
            align="center"
            css="margin-bottom: 128px"
          >
            Nenhuma informação para a semana selecionada
          </Typography>
        </Stack>
      )}
    </Chart>
  </Container>
);
