import React, { Suspense } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

import AppBar from './AppBar';
import Router from './Router';

const SuspenseFallback = () => (
  <Box my={4} display="flex" justifyContent="center">
    <CircularProgress />
  </Box>
);

const App = () => (
  <>
    <AppBar />
    <Container sx={{ my: 2 }}>
      <Suspense fallback={<SuspenseFallback />}>
        <Router />
      </Suspense>
    </Container>
  </>
);

export default App;
