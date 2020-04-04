import styled from 'styled-components';
import { BottomNavigationAction } from '@material-ui/core';

const NoMinWidthBottomNavAction = styled(BottomNavigationAction)`
  min-width: unset;
` as typeof BottomNavigationAction;

export const Styled = {
  NoMinWidthBottomNavAction,
};
