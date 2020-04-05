import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Location } from 'history';

import { Home } from '../home';
import { Login } from '../auth/Login';

export const RootNavigation = () => {
  const location = useLocation<{ modalBackground?: Location }>();
  const modalBackground = location.state?.modalBackground;

  return (
    <>
      <Switch location={modalBackground ?? location}>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>

      {/* Show modal routes */}
    </>
  );
};
