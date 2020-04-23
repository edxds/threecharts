import { Styled } from './WeeksPanel.styles';
import { WeeksPanelItem } from './WeeksPanelItem';
import { WeeksPanelHeader } from './WeeksPanelHeader';
import { WeeksPanelLiveItem } from './WeeksPanelLiveItem';

export type WeeksPanelItemData = {
  id: number;
  weekNumber: number;
  from: string;
  to: string;
};

export interface WeeksPanelContextState {
  onOpen(): void;
  onClose(): void;
  isOpen: boolean;
  isLoading?: boolean;
  onRefresh?(): void;
  selectedWeek: number | 'live' | null;
  onSelectWeek(id: number | 'live'): void;
}

export interface WeeksPanelCompoundComponents {
  Header: typeof WeeksPanelHeader;
  Content: typeof Styled.WeekList;
  Item: typeof WeeksPanelItem;
  LiveItem: typeof WeeksPanelLiveItem;
}

export interface WeeksPanelProps {
  onOpen(): void;
  onClose(): void;
  isOpen: boolean;
  value: number | 'live' | null;
  onChange(value: number | 'live'): void;
  isLoading?: boolean;
  onRefresh?(): void;
}

export interface WeeksPanelItemProps {
  data: WeeksPanelItemData;
}
