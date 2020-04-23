import React from 'react';

import { api, defaultClient } from '@threecharts/services/api';
import { TrackEntryDto, AlbumEntryDto, ArtistEntryDto } from '@threecharts/models/ChartsDto';

import { ChartContainer } from './ChartContainer';
import { ChartItem } from './ChartItem';

interface ChartProps {
  type: 'track' | 'album' | 'artist';
  data: Array<TrackEntryDto | AlbumEntryDto | ArtistEntryDto>;
}

export const Chart: React.FC<ChartProps> = ({ type, data, children, ...other }) => {
  return (
    <ChartContainer containerChildren={children} {...other}>
      {data.map((entry) => (
        <ChartItem
          key={
            entry.id ||
            ((entry as TrackEntryDto).trackId ??
              (entry as AlbumEntryDto).albumId ??
              (entry as ArtistEntryDto).artistId)
          }
          rank={entry.rank}
          stat={entry.stat}
          statText={entry.statText}
          title={(entry as TrackEntryDto | AlbumEntryDto).title ?? (entry as ArtistEntryDto).name}
          subtitle={(entry as TrackEntryDto | AlbumEntryDto).artistName}
          artworkSrc={api.getArtworkUrl(
            defaultClient,
            type,
            (entry as TrackEntryDto).trackId ??
              (entry as AlbumEntryDto).albumId ??
              (entry as ArtistEntryDto).artistId,
          )}
        />
      ))}
    </ChartContainer>
  );
};
