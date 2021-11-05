import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { initShibbolethPinger } from 'unfuck-spa-shibboleth-session';

import PageProgress from './PageProgress';
import AppBar from './AppBar';
import Footer from './Footer';

const Sessions = React.lazy(() => import('./Sessions'));
const Profile = React.lazy(() => import('./Profile'));
const Courses = React.lazy(() => import('./Courses'));
const CreateCourse = React.lazy(() => import('./CreateCourse'));
const UserSessions = React.lazy(() => import('./UserSessions'));
const Instructors = React.lazy(() => import('./Instructors'));
const InstructorInvitation = React.lazy(() => import('./InstructorInvitation'));

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<Sessions />} exact />
    <Route path="profile" element={<Profile />} exact />
    <Route path="courses" element={<Courses />} exact />
    <Route path="courses/new" element={<CreateCourse />} exact />
    <Route path="my-sessions" element={<UserSessions />} exact />
    <Route path="instructors" element={<Instructors />} exact />

    <Route
      path="instructor-invitation/:token"
      element={<InstructorInvitation />}
      exact
    />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const PrivateRoutes = () => {
  useEffect(() => {
    initShibbolethPinger();
  }, []);

  return (
    <>
      <AppBar />
      <Container sx={{ my: 2 }}>
        <Suspense fallback={<PageProgress />}>
          <RoutesConfig />
        </Suspense>
      </Container>
      <Footer />
    </>
  );
};

export default PrivateRoutes;
