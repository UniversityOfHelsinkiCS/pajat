import React, { Suspense } from 'react';

import Router from './Router';
import PageProgress from './PageProgress';

const App = () => (
  <Suspense fallback={<PageProgress />}>
    <Router />
  </Suspense>
);

export default App;
