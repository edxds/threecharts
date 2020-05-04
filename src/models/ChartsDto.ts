import { ChartEntryStat } from './ChartEntryStat';
import { MusicalEntityType } from './MusicalEntityType';

export interface ChartEntryDto {
  id: number;

  type: MusicalEntityType;

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
