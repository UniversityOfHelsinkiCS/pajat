import * as Sentry from '@sentry/react-native';

export const setDate = (date) => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_DATE',
      payload: date,
    });
  } catch (e) {
    Sentry.captureException(e);
  }
};

const initialState = {
  date: new Date(),
};

const datePickerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DATE':
      return {
        date: payload,
      };
    default:
      return state;
  }
};

export default datePickerReducer;
