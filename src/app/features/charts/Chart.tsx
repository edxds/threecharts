import React from 'react';

import { api, defaultClient } from '@threecharts/services/api';
import { ChartEntryDto } from '@threecharts/models/ChartsDto';

import { ChartContainer } from './ChartContainer';
import { ChartItem } from './ChartItem';

interface ChartProps {
  type: 'track' | 'album' | 'artist';
  data: Array<ChartEntryDto>;
}

export const Chart: React.FC<ChartProps> = ({ type, data, children, ...other }) => {
  return (
    <ChartContainer containerChildren={children} {...other}>
      {data.map((entry) => (
        <ChartItem
          key={entry.id}
          rank={entry.rank}
          stat={entry.stat}
          statText={entry.statText}
          title={entry.title ?? entry.artist}
          subtitle={entry.artist}
          artworkSrc={api.getArtworkUrl(defaultClient, type, entry.artist, entry.title)}
        />
      ))}
    </ChartContainer>
  );
};
