import styled from 'styled-components';

export interface StackProps {
  spacing?: number;
  padding?: string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${(p) => p.direction};

  align-items: ${(p) => p.align};
  justify-content: ${(p) => p.justify};

  padding: ${(p) => p.padding};

  & > *:not(:last-child) {
    ${(p) =>
      p.spacing &&
      `
      ${p.direction?.includes('row') ? `margin-right: ${p.spacing}px` : ''}
      ${p.direction?.includes('column') ? `margin-bottom: ${p.spacing}px` : ''}
    `}
  }
`;

Stack.defaultProps = {
  padding: '0px',
  direction: 'column',
  align: 'flex-start',
  justify: 'flex-start',
};
