import styled from 'styled-components';

import { breakpoints } from '@threecharts/app/measurements';

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  background: linear-gradient(to bottom right, #220033, #330022);
`;

const ContentContainer = styled.div`
  display: grid;
  flex: 1;

  align-items: center;
  justify-items: center;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'message'
    'cta';

  padding: 64px 16px;

  @media (min-width: ${breakpoints.sm}px) {
    flex: 0;
    flex-basis: 400px;
  }
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
  BackgroundContainer,
  ContentContainer,
  MessageContainer,
  SpacedContainer,
};
