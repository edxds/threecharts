import { Styled } from './WeeksPanel.styles';
import { WeeksPanelItem } from './WeeksPanelItem';

export type WeeksPanelItemData = {
  id: number;
  weekNumber: number;
  from: string;
  to: string;
};

export interface WeeksPanelContextState {
  selectedWeek: number | null;
  onSelectWeek(id: number): void;
}

export interface WeeksPanelCompoundComponents {
  Item: typeof WeeksPanelItem;
}

export interface WeeksPanelProps {
  onOpen(): void;
  onClose(): void;
  isOpen: boolean;
  title?: string;
  value: number | null;
  onChange(value: number): void;
  isLoading?: boolean;
  onRefresh?(): void;
  ContainerProps: React.ComponentProps<typeof Styled.Container>;
}

export interface WeeksPanelItemProps {
  data: WeeksPanelItemData;
}
