import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

import { defaultClient, isAuthorizationError } from '@threecharts/services/api';
import { AppState } from '@threecharts/app/redux/store';

import { getUserDetails } from './slice';

export const UserManager = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: AppState) => state.user);

  const fetchUserDetails = useCallback(() => {
    dispatch(getUserDetails(defaultClient));
  }, [dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const shouldShowErrorDialog = status === 'rejected' && !isAuthorizationError(error ?? undefined);

  return <UserErrorDialog isOpen={shouldShowErrorDialog} onTryAgain={fetchUserDetails} />;
};

const UserErrorDialog: React.FC<{ isOpen: boolean; onTryAgain(): void }> = ({
  isOpen,
  onTryAgain,
}) => (
  <Dialog open={isOpen}>
    <DialogTitle>Ops!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Não conseguimos se conectar com o servidor. Pode haver um problema com sua conexão ou com
        nosso servidor. Tente novamente e, se o problema persistir, verifique suas configuração de
        rede ou entre em contato com o desenvolvedor.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onTryAgain}>
        Tentar Novamente
      </Button>
    </DialogActions>
  </Dialog>
);
