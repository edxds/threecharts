import React, { useContext } from 'react';
import { ListItem, useTheme } from '@material-ui/core';
import { WhatshotRounded as LiveChartIcon } from '@material-ui/icons';
import styled from 'styled-components/macro';

import { Stack } from '@threecharts/app/components/Stack';

import { WeeksPanelContext } from './WeeksPanel';

const Text = styled.span<{ color: string }>`
  color: ${(p) => p.color};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 700;
  font-size: 1rem;
`;

export const WeeksPanelLiveItem: React.FC = () => {
  const theme = useTheme();

  const context = useContext(WeeksPanelContext);
  const selected = context?.selectedWeek === 'live';

  return (
    <ListItem button selected={selected} onClick={() => context?.onSelectWeek('live')}>
      <Stack direction="row" align="center" justify="flex-start" padding="8px 0" spacing={16}>
        <LiveChartIcon color="primary" />
        <Text color={theme.palette.primary.main}>AO VIVO</Text>
      </Stack>
    </ListItem>
  );
};
