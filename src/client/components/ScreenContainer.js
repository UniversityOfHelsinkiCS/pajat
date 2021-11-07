import React from 'react';

import {
  ThemeProvider,
  CssBaseline,
  Container,
  Alert,
  Button,
  Box,
} from '@mui/material';

import { merge } from 'lodash';
import { Link } from 'react-router-dom';

import theme from '../theme';
import useScreenOptions from '../hooks/useScreenOptions';
import ExternalLink from './ExternalLink';

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
  const { gutters, showLink, linkUrl, showLogin } = useScreenOptions();

  return (
    <ThemeProvider theme={screenTheme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{ my: gutters ? 3 : 0 }}
        disableGutters={!gutters}
      >
        {showLogin && (
          <Box display="flex" justifyContent="center">
            <Alert
              severity="info"
              sx={{ mb: 2, display: 'inline-flex' }}
              action={
                <Button color="inherit" size="small" component={Link} to="/">
                  Login
                </Button>
              }
            >
              Login with your University of Helsinki account to see more!
            </Alert>
          </Box>
        )}

        {showLink && (
          <Box mb={1}>
            <ExternalLink href={linkUrl}>Open in new tab</ExternalLink>
          </Box>
        )}

        {children}
      </Container>
    </ThemeProvider>
  );
};

export default ScreenContainer;
