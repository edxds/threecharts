import 'styled-components/macro';

import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@material-ui/core';
import {
  AudiotrackRounded as TrackIcon,
  AlbumRounded as AlbumIcon,
  StarRounded as StarIcon,
  PersonRounded as PersonIcon,
} from '@material-ui/icons';

import { Stack } from '@threecharts/app/components/Stack';
import { ReactComponent as ThreeChartsLogo } from '@threecharts/assets/brand/3charts-purple-bordered.svg';
import { ReactComponent as LightThreeChartsLogo } from '@threecharts/assets/brand/3charts-purple-light-bordered.svg';

import { Styled } from './WideHomeNavigation.styles';

interface WideHomeNavigationProps {
  frame?: { top?: number; left?: number; width?: number; height?: number };
}

export const WideHomeNavigation: React.FC<WideHomeNavigationProps> = ({ frame }) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const match = useRouteMatch(['/tracks', '/albums', '/artists', '/profile']);
  const theme = useTheme();

  const navItemProps = (path: string) => ({
    activeColor: theme.palette.primary.main,
    isActive: match?.path === path,
    to: path,
  });

  return (
    <Styled.Container
      style={{ top: frame?.top, left: frame?.left, width: frame?.width, height: frame?.height }}
    >
      <Stack align="stretch" spacing={64}>
        {isDarkMode ? (
          <LightThreeChartsLogo css="margin-left: 8px; width:44px; height: 44px;" />
        ) : (
          <ThreeChartsLogo css="margin-left: 8px; width: 44px; height: 44px;" />
        )}
        <Stack align="stretch" spacing={16}>
          <Styled.NavigationItem
            icon={<TrackIcon style={{ fontSize: 44 }} />}
            {...navItemProps('/tracks')}
          >
            Músicas
          </Styled.NavigationItem>
          <Styled.NavigationItem
            icon={<AlbumIcon style={{ fontSize: 44 }} />}
            {...navItemProps('/albums')}
          >
            Álbuns
          </Styled.NavigationItem>
          <Styled.NavigationItem
            icon={<StarIcon style={{ fontSize: 44 }} />}
            {...navItemProps('/artists')}
          >
            Artistas
          </Styled.NavigationItem>
          <Styled.NavigationItem
            icon={<PersonIcon style={{ fontSize: 44 }} />}
            {...navItemProps('/profile')}
          >
            Eu
          </Styled.NavigationItem>
        </Stack>
      </Stack>
    </Styled.Container>
  );
};
