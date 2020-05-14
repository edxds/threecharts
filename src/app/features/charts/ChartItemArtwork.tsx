import React from 'react';
import { LazyImage } from 'react-lazy-images';
import { CircularProgress } from '@material-ui/core';
import { MusicNoteRounded as BrokenImageIcon } from '@material-ui/icons';

import { Styled } from './ChartItemArtwork.styles';

export const ChartItemArtwork: React.FC<{ src: string }> = ({ src, ...other }) => (
  <LazyImage
    src={src}
    debounceDurationMs={500}
    actual={({ imageProps }) => <Styled.Artwork {...imageProps} {...other} />}
    placeholder={({ ref }) => (
      <Styled.ArtworkDecorContainer ref={ref} {...other}>
        <CircularProgress color="inherit" size={24} />
      </Styled.ArtworkDecorContainer>
    )}
    error={() => (
      <Styled.ArtworkDecorContainer {...other}>
        <BrokenImageIcon color="inherit" />
      </Styled.ArtworkDecorContainer>
    )}
  />
);
