import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => (
  <RouterRoutes>
    <Route path="public/*" element={<PublicRoutes />} />
    <Route path="*" element={<PrivateRoutes />} />
  </RouterRoutes>
);

export default Routes;
