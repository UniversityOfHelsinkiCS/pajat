import { merge } from 'lodash';

import theme from './theme';

const overrides = {
  components: {
    WeekCalendar: {
      styleOverrides: {
        dayCell: {
          fontSize: '1.2rem',
        },
        hourCell: {
          fontSize: '1.2rem',
        },
      },
    },
  },
};

const screenTheme = merge({}, theme, overrides);

export default screenTheme;
