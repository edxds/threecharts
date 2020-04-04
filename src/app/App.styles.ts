import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: stretch;

  & > * {
    flex: 1;
  }
`;

export const Styled = {
  AppContainer,
};
