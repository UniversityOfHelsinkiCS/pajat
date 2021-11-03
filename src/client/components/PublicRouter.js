import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';

import PageProgress from './PageProgress';

const SessionsScreen = React.lazy(() => import('./SessionsScreen'));
const CourseSessionsScreen = React.lazy(() => import('./CourseSessionsScreen'));

const Router = () => (
  <Switch>
    <Route path="/public/screen" exact>
      <SessionsScreen />
    </Route>

    <Route path="/public/screen/:code" exact>
      <CourseSessionsScreen />
    </Route>
  </Switch>
);

const PublicRouter = () => (
  <Container sx={{ my: 2 }} maxWidth="xl">
    <Suspense fallback={<PageProgress />}>
      <Router />
    </Suspense>
  </Container>
);

export default PublicRouter;
