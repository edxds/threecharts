import styled from 'styled-components';
import { List } from '@material-ui/core';

const HeaderContainer = styled.div<{ color?: string }>`
  padding: 16px 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 500;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  ${(p) => p.color && `color: ${p.color}`}
`;

const HeaderActions = styled.div`
  display: flex;
  margin: -12px;
`;

const WeekList = styled(List)`
  flex: 1;
  overflow: auto;
`;

export const Styled = {
  HeaderContainer,
  HeaderActions,
  WeekList,
};
