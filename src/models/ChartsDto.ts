import { ChartEntryStat } from './ChartEntryStat';

export type TrackEntryDto = {
  id: number;
  trackId: number;

  rank: number;
  stat: ChartEntryStat;
  statText: string | null;

  title: string;
  artistName: string;
};

export type AlbumEntryDto = {
  id: number;
  albumId: number;

  rank: number;
  stat: ChartEntryStat;
  statText: string | null;

  title: string;
  artistName: string;
};

export type ArtistEntryDto = {
  id: number;
  artistId: number;

  rank: number;
  stat: ChartEntryStat;
  statText: string | null;

  name: string;
};

export type ChartsDto = {
  ownerId: number;
  weekId: number;

  weekNumber: number;
  trackEntries: TrackEntryDto[];
  albumEntries: AlbumEntryDto[];
  artistEntries: ArtistEntryDto[];
};
