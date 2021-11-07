import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import PageProgress from './PageProgress';
import ScreenContainer from './ScreenContainer';

const SessionsScreen = React.lazy(() => import('./SessionsScreen'));
const CourseSessionsScreen = React.lazy(() => import('./CourseSessionsScreen'));

const ScreenRoutes = () => (
  <ScreenContainer>
    <Routes>
      <Route path="/" element={<SessionsScreen />} exact />
      <Route path="/:code" element={<CourseSessionsScreen />} exact />
      <Route path="*" element={<Navigate to="screen" replace />} />
    </Routes>
  </ScreenContainer>
);

const RoutesConfig = () => (
  <Routes>
    <Route path="screen/*" element={<ScreenRoutes />} />
    <Route path="*" element={<Navigate to="screen" replace />} />
  </Routes>
);

const PublicRoutes = () => (
  <Suspense fallback={<PageProgress />}>
    <RoutesConfig />
  </Suspense>
);

export default PublicRoutes;
