import 'styled-components/macro';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { getBaseUrl } from '@threecharts/util/get-base-url';
import { api, defaultClient } from '@threecharts/services/api';
import { AppState } from '@threecharts/app/redux/store';
import { ReactComponent as Logo } from '@threecharts/assets/brand/3charts-white-bordered.svg';
import { LastFmLoginButton } from '@threecharts/app/components/LastFmLoginButton';

import { Styled } from './styles';

export const Login: React.FC = () => {
  const [authorizeUrl, setAuthorizeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser: user, status: userStatus } = useSelector((state: AppState) => state.user);
  const { status: authStatus } = useSelector((state: AppState) => state.auth);

  const didResolveUser = userStatus === 'resolved' && user !== null;

  useEffect(() => {
    let mounted = true;
    const getAuthorizeUrl = async () => {
      setIsLoading(true);

      const callback = `${getBaseUrl(window.location)}/authorize`;
      const result = await api.getAuthorizationUrl(defaultClient, callback);

      if (!mounted) {
        return;
      }

      if (result.isSuccess) {
        setAuthorizeUrl(result.value.url);
      }

      setIsLoading(false);
    };

    getAuthorizeUrl();
    return () => {
      mounted = false;
    };
  }, []);

  if (didResolveUser && authStatus !== 'rejected') {
    return <Redirect to="/" />;
  }

  return (
    <Styled.Container>
      <Styled.MessageContainer>
        <Logo />
        <Typography variant="h1" align="center">
          Para começar, entre com a sua conta do last.fm
        </Typography>
      </Styled.MessageContainer>
      <LastFmLoginButton
        isLoading={isLoading}
        href={authorizeUrl ?? undefined}
        css="grid-area: cta"
      />
    </Styled.Container>
  );
};
