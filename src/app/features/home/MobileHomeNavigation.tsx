import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { BottomNavigation, Paper } from '@material-ui/core';
import {
  AudiotrackRounded as TrackIcon,
  AlbumRounded as AlbumIcon,
  StarRounded as StarIcon,
  PersonRounded as PersonIcon,
} from '@material-ui/icons';

import { Styled } from './MobileHomeNavigation.styles';

export const HomeBottomNavigation: React.FC = (props) => {
  const match = useRouteMatch(['/tracks', '/albums', '/artists', '/profile']);

  return (
    <Paper elevation={2} square {...props}>
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
    </Paper>
  );
};
