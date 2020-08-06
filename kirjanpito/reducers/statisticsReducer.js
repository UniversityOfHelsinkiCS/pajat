import url from '../config/url';
import * as Sentry from '@sentry/react-native';

export const loadStatistics = (date, courseId) => async (dispatch) => {
  try {
    const parsedDate = date.toISOString().split('T')[0];
    const result = await fetch(
      `${url}/api/statistics/${courseId}/${parsedDate}/`
    );
    let json = await result.json();
    dispatch({
      type: 'LOAD_STATISTICS',
      payload: json,
    });
  } catch (e) {
    Sentry.captureException(e);
  }
};

const initialState = {
  statistics: [],
};

const statisticsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_STATISTICS':
      return {
        statistics: payload,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
