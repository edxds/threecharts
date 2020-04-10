import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Container = styled.div`
  display: grid;

  align-items: center;
  justify-items: center;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'message'
    'cta';

  padding: 64px 16px;

  color: white;
  background: linear-gradient(to bottom right, #220033, #330022);
`;

const MessageContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;

  grid-area: message;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const SpacedContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Styled = {
  Container,
  MessageContainer,
  SpacedContainer,
};
