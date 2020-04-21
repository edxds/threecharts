import 'styled-components/macro';

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { Typography, CircularProgress, ThemeProvider, Button } from '@material-ui/core';
import { ArrowBackRounded as ArrowBackIcon } from '@material-ui/icons';

import { defaultClient } from '@threecharts/services/api';
import { AppState } from '@threecharts/app/redux/store';
import { ColoredMuiTheme } from '@threecharts/app/mui-theme';
import { ReactComponent as Logo } from '@threecharts/assets/brand/3charts-white-bordered.svg';

import { authorize } from './slice';
import { Styled } from './styles';

export const Authorize: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state: AppState) => state.user);
  const { status } = useSelector((state: AppState) => state.auth);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const isLoading = status === 'pending';
  const didFail = status === 'rejected';
  const message = didFail ? 'Algo deu errado.' : 'Conectando ao last.fm...';

  const tryAuthorize = useCallback(() => {
    if (!token) {
      return;
    }

    dispatch(authorize(defaultClient, token));
  }, [dispatch, token]);

  useEffect(() => {
    tryAuthorize();
  }, [tryAuthorize]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <ThemeProvider theme={ColoredMuiTheme}>
      <Styled.BackgroundContainer>
        <Styled.ContentContainer>
          <Styled.MessageContainer>
            <Logo />
            <Typography variant="h1" align="center">
              {message}
            </Typography>
          </Styled.MessageContainer>
          <Styled.SpacedContainer>
            {didFail && (
              <>
                <Button color="primary" variant="contained" onClick={tryAuthorize}>
                  Tentar Novamente
                </Button>
                <Button color="primary" startIcon={<ArrowBackIcon />} component={Link} to="/login">
                  Voltar para Login
                </Button>
              </>
            )}
            {isLoading && <CircularProgress color="inherit" css="grid-area: cta" />}
          </Styled.SpacedContainer>
        </Styled.ContentContainer>
      </Styled.BackgroundContainer>
    </ThemeProvider>
  );
};
