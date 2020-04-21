import 'styled-components/macro';

import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';

import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';
import { TransitionSharedContainer } from '@threecharts/app/components/TransitionSharedContainer';
import { TransitionFadeThrough } from '@threecharts/app/components/TransitionFadeThrough';
import { AppState } from '@threecharts/app/redux/store';

import { HomeBottomNavigation } from './HomeBottomNavigation';
import { HomeWeeksPanel } from './MobileHomeWeeksPanel';
import { Styled } from './Home.styles';

export const MobileHome: React.FC = ({ children }) => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);

  const selectedWeekId = useSelector((state: AppState) => state.weeks.selectedWeekId);

  const [scrollHandler, scrollDirection] = useScrollDirection();
  const [navBarRef, navBarEntry] = useResizeObserver<HTMLDivElement>();

  const location = useLocation();
  const profileMatch = useRouteMatch('/profile');

  const navBarHeight = navBarEntry?.contentRect.height ?? 56;
  const isNavBarHidden = scrollDirection === 'DOWN';
  const isWeeksPanelHidden = isNavBarHidden || !!profileMatch;

  useEffect(() => {
    setIsWeeksPanelOpen(false);
  }, [selectedWeekId]);

  return (
    <Styled.HomeContainer>
      <Styled.HomeContent onScroll={scrollHandler}>
        <TransitionGroup component={TransitionSharedContainer}>
          <TransitionFadeThrough key={location.key}>{children}</TransitionFadeThrough>
        </TransitionGroup>
      </Styled.HomeContent>
      <HomeWeeksPanel
        navBarHeight={navBarHeight}
        isHidden={isWeeksPanelHidden}
        isOpen={isWeeksPanelOpen}
        onOpen={() => setIsWeeksPanelOpen(true)}
        onClose={() => setIsWeeksPanelOpen(false)}
      />
      <Styled.HomeNavigationBar
        ref={navBarRef}
        navBarHeight={navBarHeight}
        isHidden={isNavBarHidden || isWeeksPanelOpen}
      >
        <HomeBottomNavigation />
      </Styled.HomeNavigationBar>
    </Styled.HomeContainer>
  );
};
