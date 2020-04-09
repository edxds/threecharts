import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import { useResizeObserver } from '@threecharts/hooks/useResizeObserver';
import { useScrollDirection } from '@threecharts/hooks/useScrollDirection';
import { TransitionSharedContainer } from '@threecharts/app/components/TransitionSharedContainer';
import { TransitionFadeThrough } from '@threecharts/app/components/TransitionFadeThrough';

import { WeeksPanel } from '../weeks/WeeksPanel';

import { HomeBottomNavigation } from './HomeBottomNavigation';
import { Styled } from './Home.styles';

export const Home = () => {
  const [isWeeksPanelOpen, setIsWeeksPanelOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const [scrollHandler, scrollDirection] = useScrollDirection();
  const [navBarRef, navBarEntry] = useResizeObserver();

  const location = useLocation();
  const match = useRouteMatch('/');

  const navBarHeight = navBarEntry?.contentRect.height ?? 56;
  const isNavBarHidden = scrollDirection === 'DOWN';

  // Set "default" tab to tracks by redirecting to /tracks
  // if we are at the base URL. Kinda hacky, no?
  if (match?.isExact) {
    return <Redirect to="/tracks" />;
  }

  return (
    <Styled.HomeContainer>
      <Styled.HomeContent onScroll={scrollHandler}>
        <TransitionGroup component={TransitionSharedContainer}>
          <TransitionFadeThrough key={location.key}>
            <Switch location={location}>
              <Route
                path="/tracks"
                render={() => (
                  <Typography variant="h1" color="textPrimary" style={{ height: 1000 }}>
                    Tracks
                  </Typography>
                )}
              />
              <Route
                path="/albums"
                render={() => (
                  <Typography variant="h1" color="textPrimary">
                    Albums
                  </Typography>
                )}
              />
              <Route
                path="/artists"
                render={() => (
                  <Typography variant="h1" color="textPrimary">
                    Artists
                  </Typography>
                )}
              />
              <Route
                path="/profile"
                render={() => (
                  <Typography variant="h1" color="textPrimary">
                    Profile
                  </Typography>
                )}
              />
            </Switch>
          </TransitionFadeThrough>
        </TransitionGroup>
      </Styled.HomeContent>
      <Styled.HomeWeeksPanelContainer
        windowHeight={window.innerHeight}
        navBarHeight={navBarHeight}
        isHidden={isNavBarHidden}
        isOpen={isWeeksPanelOpen}
        alwaysVisibleHeight={56}
      >
        <WeeksPanel
          isOpen={isWeeksPanelOpen}
          onOpen={() => setIsWeeksPanelOpen(true)}
          onClose={() => setIsWeeksPanelOpen(false)}
          value={selectedWeek}
          onChange={setSelectedWeek}
          ContainerProps={{ elevation: 2 }}
        ></WeeksPanel>
      </Styled.HomeWeeksPanelContainer>
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
