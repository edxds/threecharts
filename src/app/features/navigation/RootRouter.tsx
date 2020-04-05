import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RootNavigation } from './RootNavigation';

export const RootRouter = () => (
  <BrowserRouter>
    <RootNavigation />
  </BrowserRouter>
);
