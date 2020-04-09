import React, { useContext } from 'react';
import { ListItemText, ListItem } from '@material-ui/core';

import { WeeksPanelContext } from './WeeksPanel';
import { WeeksPanelItemProps } from './WeeksPanel.types';

export const WeeksPanelItem: React.FC<WeeksPanelItemProps> = ({ data }) => {
  const context = useContext(WeeksPanelContext);
  const selected = context?.selectedWeek === data.id;

  return (
    <ListItem button selected={selected} onClick={() => context?.onSelectWeek(data.id)}>
      <ListItemText primary={`Semana ${data.weekNumber}`} secondary={`${data.from} — ${data.to}`} />
    </ListItem>
  );
};
