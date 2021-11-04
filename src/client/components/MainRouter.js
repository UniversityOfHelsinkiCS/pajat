import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { initShibbolethPinger } from 'unfuck-spa-shibboleth-session';

import PageProgress from './PageProgress';
import AppBar from './AppBar';

const Sessions = React.lazy(() => import('./Sessions'));
const Profile = React.lazy(() => import('./Profile'));
const Courses = React.lazy(() => import('./Courses'));
const CreateCourse = React.lazy(() => import('./CreateCourse'));
const UserSessions = React.lazy(() => import('./UserSessions'));
const Instructors = React.lazy(() => import('./Instructors'));
const InstructorInvitation = React.lazy(() => import('./InstructorInvitation'));

const Router = () => {
  useEffect(() => {
    initShibbolethPinger();
  }, []);

  return (
    <Switch>
      <Route path="/" exact>
        <Sessions />
      </Route>

      <Route path="/profile" exact>
        <Profile />
      </Route>

      <Route path="/courses" exact>
        <Courses />
      </Route>

      <Route path="/courses/new" exact>
        <CreateCourse />
      </Route>

      <Route path="/my-sessions" exact>
        <UserSessions />
      </Route>

      <Route path="/instructors" exact>
        <Instructors />
      </Route>

      <Route path="/instructor-invitation/:token" exact>
        <InstructorInvitation />
      </Route>
    </Switch>
  );
};

const MainRouter = () => (
  <>
    <AppBar />
    <Container sx={{ my: 2 }}>
      <Suspense fallback={<PageProgress />}>
        <Router />
      </Suspense>
    </Container>
  </>
);

export default MainRouter;
