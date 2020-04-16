import 'styled-components/macro';

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Collapse,
  CircularProgress,
  Typography,
  Fade,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { ExitToAppRounded as ExitIcon } from '@material-ui/icons';

import { AppState } from '@threecharts/app/redux/store';
import { Stack } from '@threecharts/app/components/Stack';
import { defaultClient } from '@threecharts/services/api';

import { signOut } from '../auth/slice';

import { Styled } from './UserProfile.styles';

export const UserProfile = () => {
  const [isSignoutErrorOpen, setIsSignoutErrorOpen] = useState(false);

  const dispatch = useDispatch();
  const { currentUser, status: userStatus } = useSelector((state: AppState) => state.user);
  const { status: signOutStatus } = useSelector((state: AppState) => state.auth.signOut);

  const dispatchSignOut = useCallback(() => {
    dispatch(signOut(defaultClient));
  }, [dispatch]);

  useEffect(() => {
    if (signOutStatus === 'rejected') {
      setIsSignoutErrorOpen(true);
    }
  }, [signOutStatus]);

  const isLoading = userStatus === 'pending';

  return (
    <Styled.Container>
      <SignOutErrorDialog
        isOpen={isSignoutErrorOpen}
        onClose={() => setIsSignoutErrorOpen(false)}
      />
      <Collapse in={isLoading} unmountOnExit>
        <Stack direction="row" justify="center" align="center" css="width: 100%">
          <CircularProgress color="inherit" size={16} />
          <Typography variant="body1" component="span" color="textPrimary">
            Carregando...
          </Typography>
        </Stack>
      </Collapse>
      <Fade in={!!currentUser} unmountOnExit>
        <Stack spacing={16} align="stretch">
          <Typography variant="h1" color="textPrimary">
            Meu Perfil
          </Typography>
          <Paper elevation={2}>
            <Stack direction="row" align="center" padding="16px" spacing={16}>
              <Styled.ProfilePicture src={currentUser?.profilePicture || undefined} />
              <Stack>
                <Styled.UserName>{currentUser?.userName}</Styled.UserName>
                {currentUser?.realName && (
                  <Styled.UserDisplayName>{currentUser?.realName}</Styled.UserDisplayName>
                )}
              </Stack>
            </Stack>
            <Divider />
            <Stack direction="row" justify="flex-end" align="center" padding="16px" spacing={16}>
              <Button
                color="primary"
                as="a"
                href={currentUser?.lastFmUrl}
                {...({ target: '_blank' } as never)}
              >
                Ver no Last.fm
              </Button>
              <Button
                color="primary"
                variant="contained"
                startIcon={<ExitIcon />}
                onClick={dispatchSignOut}
              >
                Sair
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Fade>
    </Styled.Container>
  );
};

const SignOutErrorDialog: React.FC<{ isOpen: boolean; onClose(): void }> = ({
  isOpen,
  onClose,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Ops!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Não conseguimos te desconectar. Por favor tente novamente e, se o problema persistir,
        verifique sua conexão ou entre em contato com o desenvolvedor.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Fechar
      </Button>
    </DialogActions>
  </Dialog>
);
