import { Styled } from './WeeksPanel.styles';
import { WeeksPanelItem } from './WeeksPanelItem';
import { WeeksPanelHeader } from './WeeksPanelHeader';

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
  selectedWeek: number | null;
  onSelectWeek(id: number): void;
}

export interface WeeksPanelCompoundComponents {
  Header: typeof WeeksPanelHeader;
  Content: typeof Styled.WeekList;
  Item: typeof WeeksPanelItem;
}

export interface WeeksPanelProps {
  onOpen(): void;
  onClose(): void;
  isOpen: boolean;
  value: number | null;
  onChange(value: number): void;
  isLoading?: boolean;
  onRefresh?(): void;
}

export interface WeeksPanelItemProps {
  data: WeeksPanelItemData;
}
