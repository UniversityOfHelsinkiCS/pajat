import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { merge } from 'lodash';

import theme from '../theme';

const overrides = {
  palette: {
    background: {
      default: '#fff',
    },
  },
  components: {
    WeekCalendar: {
      styleOverrides: {
        dayCell: {
          [theme.breakpoints.up('xl')]: {
            fontSize: '1.2rem',
          },
        },
        hourCell: {
          [theme.breakpoints.up('xl')]: {
            fontSize: '1.2rem',
          },
        },
      },
    },
  },
};

const screenTheme = merge({}, theme, overrides);

const ScreenContainer = ({ children, dense = false }) => (
  <ThemeProvider theme={screenTheme}>
    <CssBaseline />
    <Box p={dense ? 0 : 2}>{children}</Box>
  </ThemeProvider>
);

export default ScreenContainer;
