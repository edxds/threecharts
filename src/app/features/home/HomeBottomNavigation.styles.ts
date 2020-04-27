import styled from 'styled-components';
import { BottomNavigationAction, Paper } from '@material-ui/core';

const NoMinWidthBottomNavAction = styled(BottomNavigationAction)`
  min-width: unset;
` as typeof BottomNavigationAction;

const BottomNavContainer = styled(Paper)`
  padding-bottom: env(safe-area-inset-bottom);
  transition: 500ms padding-bottom;
`;

export const Styled = {
  NoMinWidthBottomNavAction,
  BottomNavContainer,
};
