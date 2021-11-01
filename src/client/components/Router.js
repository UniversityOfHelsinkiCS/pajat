import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Sessions = React.lazy(() => import('./Sessions'));
const Profile = React.lazy(() => import('./Profile'));

const Router = () => (
  <Switch>
    <Route path="/" exact>
      <Sessions />
    </Route>
    <Route path="/profile" exact>
      <Profile />
    </Route>
  </Switch>
);

export default Router;
