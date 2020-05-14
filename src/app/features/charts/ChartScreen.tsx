import React from 'react';
import styled from 'styled-components/macro';
import { Typography, Collapse } from '@material-ui/core';
import { ArrowDownwardRounded as ArrowIcon } from '@material-ui/icons';

import { Stack } from '@threecharts/app/components/Stack';
import { ThinLoading } from '@threecharts/app/components/ThinLoading';
import { ThinError } from '@threecharts/app/components/ThinError';

import { Chart } from './Chart';
import { Styled } from './ChartScreen.styles';

type ChartProps = React.ComponentProps<typeof Chart>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(var(--window-height) * 1.1);
`;

interface ChartScreenProps {
  userName?: string;
  weekTitle?: string;
  onRetry?(): void;
  hasError?: boolean;
  isLoading?: boolean;
  noWeekSelected?: boolean;
  chartPadding?: string;
  ContainerProps?: React.ComponentProps<typeof Container>;
}

export const ChartScreen: React.FC<ChartScreenProps & ChartProps> = (props) => {
  const { data, type, ...others } = props;
  const { userName, weekTitle } = props;
  const { chartPadding, ContainerProps } = props;
  const { onRetry, hasError, isLoading, noWeekSelected } = props;

  const title = type === 'track' ? 'Músicas' : type === 'album' ? 'Álbuns' : 'Artistas';

  const shouldShowDecorText = userName && weekTitle;
  const shouldShowError = !isLoading && hasError;
  const shouldShowLoading = isLoading && !hasError;
  const shouldShowSelectWeek = noWeekSelected;
  const shouldShowEmptyWeek = !noWeekSelected && data.length === 0;

  return (
    <Container {...ContainerProps}>
      <Stack padding="16px" spacing={2}>
        {shouldShowDecorText && (
          <Styled.DecorText>
            {weekTitle} de <Styled.DecorTextUser>{userName}</Styled.DecorTextUser>
          </Styled.DecorText>
        )}
        <Typography variant="h1" color="textPrimary">
          {title}
        </Typography>
      </Stack>
      <Chart
        css={`
          flex: 1;
          padding: ${chartPadding};
        `}
        data={data}
        type={type}
        {...others}
      >
        <Collapse in={shouldShowError} unmountOnExit>
          <ThinError onRetry={onRetry} />
        </Collapse>
        <Collapse in={shouldShowLoading} unmountOnExit>
          <ThinLoading />
        </Collapse>
        {shouldShowSelectWeek && (
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
        {shouldShowEmptyWeek && (
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
};
