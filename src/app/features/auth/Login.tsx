import 'styled-components/macro';

import React from 'react';
import { Typography } from '@material-ui/core';

import { ReactComponent as Logo } from '@threecharts/assets/brand/3charts-white-bordered.svg';
import { LastFmLoginButton } from '@threecharts/app/components/LastFmLoginButton';

import { Styled } from './Login.styles';

export const Login: React.FC = () => {
  return (
    <Styled.Container>
      <Styled.MessageContainer>
        <Logo />
        <Typography variant="h1" align="center">
          Para começar, entre com a sua conta do last.fm
        </Typography>
      </Styled.MessageContainer>
      <LastFmLoginButton css="grid-area: cta" />
      {/* <Styled.LastFmButton css="grid-area: cta">Entrar com last.fm</Styled.LastFmButton> */}
    </Styled.Container>
  );
};
