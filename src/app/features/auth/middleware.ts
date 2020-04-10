import { Middleware } from 'redux';

import { AppState } from '@threecharts/app/redux/store';

export const AuthLocalStorageMiddleware: Middleware<{}, AppState> = (store) => (next) => (
  action,
) => {
  if (!(action.type as string).includes('auth')) {
    return next(action);
  }

  const result = next(action);
  const { auth } = store.getState();
  const { status } = auth;

  if (status === 'rejected' || status === 'resolved') {
    localStorage.setItem('state.auth.status', status);
  }

  return result;
};
