import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { defaultClient } from '@threecharts/services/api';

import { getUserDetails } from './slice';

export const UserManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(defaultClient));
  }, [dispatch]);

  return null;
};
