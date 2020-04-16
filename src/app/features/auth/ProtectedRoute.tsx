import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '@threecharts/app/redux/store';

type RouteProps = React.ComponentProps<typeof Route>;

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { status: authStatus } = useSelector((state: AppState) => state.auth);
  const { status: userStatus, currentUser } = useSelector((state: AppState) => state.user);
  const location = useLocation<{ modalBackground: Location }>();

  const didntResolveAnyUser = currentUser === null && userStatus === 'resolved';
  const didRejectAuth = authStatus === 'rejected';

  if (didRejectAuth || didntResolveAnyUser) {
    if (!location.state?.modalBackground && location.pathname !== '/login') {
      return <Redirect to="/login" />;
    }
  }

  return <Route {...props} />;
};
