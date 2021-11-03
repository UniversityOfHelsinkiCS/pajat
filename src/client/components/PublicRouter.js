import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

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
  <Suspense fallback={<PageProgress />}>
    <Router />
  </Suspense>
);

export default PublicRouter;
