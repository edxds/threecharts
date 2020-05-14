import styled from 'styled-components';

import { ChartEntryStat } from '@threecharts/models/ChartEntryStat';

const Container = styled.div`
  display: grid;

  padding: 16px;
  column-gap: 16px;

  grid-template-columns: 1.75rem 1fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'stats info art';
`;

const RankText = styled.span`
  font-size: 1rem;
  text-align: center;
  color: black;

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const StatText = styled.span<{ stat: ChartEntryStat }>`
  font-size: 0.625rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-align: center;

  ${(p) => p.stat === 'NoDiff' && 'color: rgba(0, 0, 0, 0.5)'};
  ${(p) => p.stat === 'New' && 'color: hsl(211, 100%, 50%)'};
  ${(p) => p.stat === 'Increase' && 'color: hsl(120, 60%, 50%)'};
  ${(p) => p.stat === 'Decrease' && 'color: hsl(360, 60%, 50%)'};
  ${(p) => p.stat === 'Reentry' && 'color: hsl(40, 80%, 50%)'};

  @media (prefers-color-scheme: dark) {
    ${(p) => p.stat === 'NoDiff' && 'color: rgba(255, 255, 255, 0.5)'};
  }
`;

const TitleText = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: black;

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const SubtitleText = styled.span`
  font-size: 0.875rem;
  color: hsla(0, 0%, 0%, 0.6);

  @media (prefers-color-scheme: dark) {
    color: hsla(0, 0%, 100%, 0.6);
  }
`;

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
  Container,
  RankText,
  StatText,
  TitleText,
  SubtitleText,
  Artwork,
  ArtworkDecorContainer,
};
