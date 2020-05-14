import styled from 'styled-components';

const Artwork = styled.img`
  border-radius: 8px;
  width: 78px;
  height: 78px;
`;

const ArtworkDecorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 78px;
  height: 78px;
  border-radius: 8px;

  color: hsla(0, 0%, 0%, 0.2);
  background-color: hsl(0, 0%, 86%);

  @media (prefers-color-scheme: dark) {
    color: hsla(0, 0%, 100%, 0.6);
    background-color: hsl(0, 0%, 30%);
  }
`;

export const Styled = {
  Artwork,
  ArtworkDecorContainer,
};
