import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PublicRouter from './PublicRouter';
import MainRouter from './MainRouter';

const Router = () => (
  <Switch>
    <Route path="/public">
      <PublicRouter />
    </Route>

    <Route>
      <MainRouter />
    </Route>
  </Switch>
);

export default Router;
