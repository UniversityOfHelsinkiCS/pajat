import { merge } from 'lodash';

import theme from './theme';

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

export default screenTheme;
