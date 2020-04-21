import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
`;

const NavigationItemFixedProps: React.FC<{
  isActive: boolean;
  activeColor: string;
  to: string;
  icon: React.ReactNode;
}> = ({ isActive, to, icon, ...props }) => (
  <Button color="inherit" component={Link} to={to} startIcon={icon} {...props} />
);

const NavigationItem = styled(NavigationItemFixedProps)`
  position: relative;

  padding: 8px;
  padding-left: 12px; /* To compensate for icon's negative margin */

  border-radius: 100px;
  justify-content: stretch;

  transition: color 500ms, opacity 500ms;

  color: black;
  ${(p) => p.isActive && `color: ${p.activeColor};`}

  @media (prefers-color-scheme: dark) {
    color: white;
    ${(p) => p.isActive && `color: ${p.activeColor};`}
  }

  opacity: ${(p) => (p.isActive ? 1 : 0.6)};

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;

    transition: opacity 500ms;
    background-color: ${(p) => p.activeColor};
    opacity: ${(p) => (p.isActive ? 0.2 : 0)};

    border-radius: inherit;
  }
`;

export const Styled = {
  Container,
  NavigationItem,
};
