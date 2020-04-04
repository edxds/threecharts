import React from 'react';
import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';

import { HomeBottomNavigation } from './HomeBottomNavigation';
import { Styled } from './Home.styles';

export const Home = () => {
  const match = useRouteMatch('/');

  // Set "default" tab to tracks by redirecting to /tracks
  // if we are at the base URL. Kinda hacky, no?
  if (match?.isExact) {
    return <Redirect to="/tracks" />;
  }

  return (
    <Styled.HomeContainer>
      <Styled.HomeContent>
        <Switch>
          <Route path="/tracks" render={() => <h1>Tracks</h1>} />
          <Route path="/albums" render={() => <h1>Albums</h1>} />
          <Route path="/artists" render={() => <h1>Artists</h1>} />
          <Route path="/profile" render={() => <h1>Profile</h1>} />
        </Switch>
      </Styled.HomeContent>
      <Styled.HomeNavigationBar>
        <HomeBottomNavigation />
      </Styled.HomeNavigationBar>
    </Styled.HomeContainer>
  );
};
