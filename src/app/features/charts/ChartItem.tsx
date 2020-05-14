import React from 'react';
import { Divider } from '@material-ui/core';

import { Stack } from '@threecharts/app/components/Stack';
import { ChartEntryStat } from '@threecharts/models/ChartEntryStat';

import { Styled } from './ChartItem.styles';
import { ChartItemArtwork } from './ChartItemArtwork';

interface ChartItemProps {
  rank: number;
  statType: ChartEntryStat;
  stat: string | null;
  title: string;
  subtitle?: string;
  artworkSrc: string;
}

export const ChartItem: React.FC<ChartItemProps> = ({
  rank,
  statType,
  stat,
  title,
  subtitle,
  artworkSrc,
  ...other
}) => {
  const statText = stat ?? (statType === 'New' ? 'New' : 'Re');

  return (
    <>
      <Styled.Container {...other}>
        <Stack css="grid-area: stats" align="center" justify="center" spacing={2}>
          <Styled.RankText>{rank}</Styled.RankText>
          <Styled.StatText stat={statType}>{statText}</Styled.StatText>
        </Stack>
        <Stack css="grid-area: info" justify="center" spacing={2}>
          <Styled.TitleText>{title}</Styled.TitleText>
          {subtitle && <Styled.SubtitleText>{subtitle}</Styled.SubtitleText>}
        </Stack>
        <ChartItemArtwork src={artworkSrc} css="grid-area: art" />
      </Styled.Container>
      <Divider />
    </>
  );
};
