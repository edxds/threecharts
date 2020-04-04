import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const TransitionContainer = styled.div<{ state: string }>`
  position: absolute;

  transition: all 200ms ease-in-out;
  opacity: ${(p) => (p.state === 'entered' ? 1 : 0)};
  transform: scale(${(p) => (p.state === 'entering' ? 0.92 : 1)});
`;

export const TransitionFadeThrough: React.FC = ({ children, ...rest }) => (
  <Transition timeout={200} {...rest}>
    {(state) => <TransitionContainer state={state}>{children}</TransitionContainer>}
  </Transition>
);
