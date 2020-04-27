import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { BottomNavigation } from '@material-ui/core';
import {
  AudiotrackRounded as TrackIcon,
  AlbumRounded as AlbumIcon,
  StarRounded as StarIcon,
  PersonRounded as PersonIcon,
} from '@material-ui/icons';

import { Styled } from './HomeBottomNavigation.styles';

export const HomeBottomNavigation: React.FC = () => {
  const match = useRouteMatch(['/tracks', '/albums', '/artists', '/profile']);

  return (
    <Styled.BottomNavContainer elevation={2} square>
      <BottomNavigation showLabels value={match?.path}>
        <Styled.NoMinWidthBottomNavAction
          label="Músicas"
          value="/tracks"
          icon={<TrackIcon />}
          component={Link}
          to="/tracks"
        />
        <Styled.NoMinWidthBottomNavAction
          label="Albuns"
          value="/albums"
          icon={<AlbumIcon />}
          component={Link}
          to="/albums"
        />
        <Styled.NoMinWidthBottomNavAction
          label="Artistas"
          value="/artists"
          icon={<StarIcon />}
          component={Link}
          to="/artists"
        />
        <Styled.NoMinWidthBottomNavAction
          label="Eu"
          value="/profile"
          icon={<PersonIcon />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    </Styled.BottomNavContainer>
  );
};
