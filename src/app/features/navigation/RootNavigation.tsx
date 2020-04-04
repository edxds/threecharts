import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from '../home';

export const RootNavigation = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
