import React from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { merge } from 'lodash';

import theme from '../theme';
import useScreenOptions from '../hooks/useScreenOptions';

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
            fontSize: '1.1rem',
          },
        },
        hourCell: {
          [theme.breakpoints.up('xl')]: {
            fontSize: '1.1rem',
          },
        },
      },
    },
  },
};

const screenTheme = merge({}, theme, overrides);

const ScreenContainer = ({ children }) => {
  const { gutters } = useScreenOptions();

  return (
    <ThemeProvider theme={screenTheme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{ my: gutters ? 3 : 0 }}
        disableGutters={!gutters}
      >
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default ScreenContainer;
