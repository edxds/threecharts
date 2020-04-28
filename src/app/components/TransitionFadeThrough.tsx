import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const TransitionContainer = styled.div<{ state: string }>`
  position: ${(p) => (p.state === 'entered' ? 'static' : 'absolute')};
  min-height: var(--window-height);

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: all 200ms ease-in-out;
  opacity: ${(p) => (p.state === 'entered' ? 1 : 0)};
  transform: scale(${(p) => (p.state === 'entering' ? 0.98 : 1)});
`;

export const TransitionFadeThrough: React.FC = ({ children, ...rest }) => {
  return (
    <Transition timeout={200} {...rest}>
      {(state) => <InnerTransitionContainer state={state}>{children}</InnerTransitionContainer>}
    </Transition>
  );
};

const InnerTransitionContainer: React.FC<{ state: string }> = ({ state, children, ...rest }) => {
  const [latestValidScroll, setLatestValidScroll] = useState(0);

  const scrollHandler = useCallback(() => {
    // Because the window's scrollY is only accurate when the
    // position of the container is 'static', we check for the
    // state that makes the container static.
    if (state === 'entered') {
      setLatestValidScroll(window.scrollY);
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  return (
    <TransitionContainer
      state={state}
      style={{
        transformOrigin: `50% ${window.innerHeight / 2 + window.scrollY}px`,
        // This value is set to prevent scroll jumping to the top
        // when the transition starts
        top: -latestValidScroll,
      }}
      {...rest}
    >
      {children}
    </TransitionContainer>
  );
};
