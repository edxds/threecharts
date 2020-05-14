import React from 'react';

import { api, defaultClient } from '@threecharts/services/api';
import { ChartEntryDto } from '@threecharts/models/ChartsDto';
import { MusicalEntityType } from '@threecharts/models/MusicalEntityType';

import { ChartItem } from './ChartItem';
import { Styled } from './Chart.styles';

interface ChartProps {
  type: MusicalEntityType;
  data: Array<ChartEntryDto>;
}

export const Chart: React.FC<ChartProps> = ({ type, data, children, ...other }) => {
  return (
    <Styled.OuterContainer {...other}>
      {children}
      <Styled.ItemsContainer>
        {data.map((entry) => (
          <ChartItem
            key={entry.id}
            rank={entry.rank}
            statType={entry.stat}
            stat={entry.statText}
            title={entry.title ?? entry.artist}
            subtitle={entry.type.toLowerCase() !== 'artist' ? entry.artist : undefined}
            artworkSrc={api.getArtworkUrl(defaultClient, type, entry.artist, entry.title)}
          />
        ))}
      </Styled.ItemsContainer>
    </Styled.OuterContainer>
  );
};
