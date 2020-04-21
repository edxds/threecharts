import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { AppState } from '@threecharts/app/redux/store';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';

import { Styled } from './WideHome.styles';
import { WideHomeWeeksPanel } from './WideHomeWeeksPanel';
import { WideHomeNavigation } from './WideHomeNavigation';

export const WideHome: React.FC = ({ children }) => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);

  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);

  const [scrollHandler, scrollDirection] = useScrollDirection();
  const [contentRef, contentEntry] = useResizeObserver<HTMLDivElement>();
  const [sidebarRef, sidebarEntry] = useResizeObserver<HTMLDivElement>();

  const profileMatch = useRouteMatch('/profile');

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
    <Styled.Container onScroll={scrollHandler}>
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
      <Styled.Content ref={contentRef}>{children}</Styled.Content>
    </Styled.Container>
  );
};
