import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';

type RouteProps = React.ComponentProps<typeof Route>;

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { status } = useSelector((state: AppState) => state.auth);
  const location = useLocation<{ modalBackground: Location }>();

  if (status === 'rejected') {
    if (!location.state?.modalBackground && location.pathname !== '/login') {
      return <Redirect to="/login" />;
    }
  }

  return <Route {...props} />;
};
