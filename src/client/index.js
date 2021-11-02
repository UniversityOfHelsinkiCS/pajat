import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import queryClient from './utils/queryClient';
import App from './components/App';
import { BASE_PATH } from './config';
import theme from './theme';

render(
  <BrowserRouter basename={BASE_PATH}>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
