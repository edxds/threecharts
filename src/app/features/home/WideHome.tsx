import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';

import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { AppState } from '@threecharts/app/redux/store';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';
import { TransitionSharedContainer } from '@threecharts/app/components/TransitionSharedContainer';
import { TransitionFadeThrough } from '@threecharts/app/components/TransitionFadeThrough';

import { Styled } from './WideHome.styles';
import { WideHomeWeeksPanel } from './WideHomeWeeksPanel';
import { WideHomeNavigation } from './WideHomeNavigation';

export const WideHome: React.FC = ({ children }) => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);

  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);

  const [scrollableElementRef, scrollDirection] = useScrollDirection(true);
  const [contentRef, contentEntry] = useResizeObserver<HTMLDivElement>();
  const [sidebarRef, sidebarEntry] = useResizeObserver<HTMLDivElement>();

  const profileMatch = useRouteMatch('/profile');
  const location = useLocation();

  useEffect(() => {
    setIsWeeksPanelOpen(false);
  }, [selectedWeekId]);

  const contentWidth = contentEntry?.contentRect.width ?? 0;
  const isWeeksPanelHidden = scrollDirection === 'DOWN' || !!profileMatch;

  const sidebarElement = sidebarEntry?.target as HTMLElement | null;
  const sidebarFrame = {
    top: sidebarElement?.offsetTop,
    left: sidebarElement?.offsetLeft,
    width: sidebarElement?.offsetWidth,
    height: sidebarElement?.offsetHeight,
  };

  return (
    <Styled.Container ref={scrollableElementRef}>
      <WideHomeWeeksPanel
        left={contentEntry?.target.getBoundingClientRect().left ?? 0}
        width={contentWidth}
        isHidden={isWeeksPanelHidden}
        isOpen={isWeeksPanelOpen}
        onOpen={() => setIsWeeksPanelOpen(true)}
        onClose={() => setIsWeeksPanelOpen(false)}
      />
      <Styled.Sidebar ref={sidebarRef}>
        <WideHomeNavigation frame={sidebarFrame} />
      </Styled.Sidebar>
      <Styled.Content ref={contentRef}>
        <TransitionGroup component={TransitionSharedContainer}>
          <TransitionFadeThrough key={location.key}>{children}</TransitionFadeThrough>
        </TransitionGroup>
      </Styled.Content>
    </Styled.Container>
  );
};
