import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const OuterContainer = styled(Paper)`
  display: flex;
  flex-direction: column;

  border-radius: 16px 16px 0 0;

  @media (prefers-color-scheme: dark) {
    background-color: hsl(0, 0%, 14%);
  }

  .MuiCircularProgress-circleIndeterminate {
    /* Fix animations borking iOS elastic scroll (wtf? 🤯) */
    animation: none;
  }
`;

const ItemsContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 8px 0;
`;

export const Styled = {
  OuterContainer,
  ItemsContainer,
};
