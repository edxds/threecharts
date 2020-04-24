import { ChartEntryStat } from './ChartEntryStat';

export interface ChartEntryDto {
  id: number;

  type: 'artist' | 'album' | 'track';

  rank: number;
  stat: ChartEntryStat;
  statText: string | null;

  title: string | null;
  artist: string;
}

export interface ChartsDto {
  ownerId: number;
  weekId: number;

  weekNumber: number;
  trackEntries: ChartEntryDto[];
  albumEntries: ChartEntryDto[];
  artistEntries: ChartEntryDto[];
}
