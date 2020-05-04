import styled from 'styled-components';

const DecorText = styled.p`
  margin: 0;

  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 1rem;

  color: rgba(0, 0, 0, 0.4);
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const DecorTextUser = styled.span`
  opacity: 0.6;
  font-weight: 700;
  font-size: inherit;

  color: rgba(0, 0, 0, 0.6);
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Styled = {
  DecorText,
  DecorTextUser,
};
