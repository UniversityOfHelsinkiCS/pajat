import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import PageProgress from './PageProgress';

const SessionsScreen = React.lazy(() => import('./SessionsScreen'));
const CourseSessionsScreen = React.lazy(() => import('./CourseSessionsScreen'));

const RoutesConfig = () => (
  <Routes>
    <Route path="screen" element={<SessionsScreen />} exact />
    <Route path="screen/:code" element={<CourseSessionsScreen />} exact />
    <Route path="*" element={<Navigate to="screen" replace />} />
  </Routes>
);

const PublicRoutes = () => (
  <Suspense fallback={<PageProgress />}>
    <RoutesConfig />
  </Suspense>
);

export default PublicRoutes;
