import React from 'react';
import styled from 'styled-components';
import { Paper, List } from '@material-ui/core';

const Container = styled(({ isOpen, ...rest }) => <Paper {...rest} />)<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  transition: border-radius 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  border-radius: ${(p) => (p.isOpen ? 0 : '16px 16px 0 0')};
`;

const HeaderContainer = styled.div<{ color?: string }>`
  padding: 16px 32px;

  display: flex;
  justify-content: space-between;

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
  Container,
  HeaderContainer,
  HeaderActions,
  WeekList,
};
