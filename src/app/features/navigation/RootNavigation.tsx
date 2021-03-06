import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Location } from 'history';

import { FullscreenModal } from '@threecharts/app/components/FullscreenModal';

import { Home } from '../home';
import { Login } from '../auth/Login';
import { Authorize } from '../auth/Authorize';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export const RootNavigation = () => {
  const location = useLocation<{ modalBackground?: Location }>();
  const modalBackground = location.state?.modalBackground;

  return (
    <>
      <Switch location={modalBackground ?? location}>
        <Route path="/login" component={Login} />
        <Route path="/authorize" component={Authorize} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>

      {/* Show modals */}
      <Route path="/login">
        {({ match }) => (
          <FullscreenModal open={!!modalBackground && !!match}>
            <Login />
          </FullscreenModal>
        )}
      </Route>
    </>
  );
};
