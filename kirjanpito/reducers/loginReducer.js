import {
  storeAccessKey,
  getAccessKey,
  removeAccessKey,
} from '../utils/authStorage';
import * as Sentry from '@sentry/react-native';
import url from '../config/url';

const initialState = {
  isLoading: true,
  isLogin: false,
  user: null,
};

export const signIn = (key) => async (dispatch) => {
  try {
    const path = `${url}/api/login/`;
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
      }),
    });
    const json = await response.json();
    if (json.fullName) {
      storeAccessKey(key);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: json,
      });
    } else {
      Sentry.captureMessage('Authentication failed.');
    }
  } catch (e) {
    Sentry.captureException(e);
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const key = await getAccessKey();
    if (key) {
      const path = `${url}/api/auth/`;
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': key,
        },
      });
      const json = await response.json();
      if (json) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: json,
        });
      } else {
        removeAccessKey();
        Sentry.captureMessage('Authentication failed.');
        dispatch({
          type: 'LOGIN_FAIL',
        });
      }
    } else {
      dispatch({
        type: 'LOGIN_FAIL',
      });
    }
  } catch (e) {
    Sentry.captureException(e);
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

export const logOut = () => async (dispatch) => {
  removeAccessKey();
  dispatch({
    type: 'LOGOUT',
  });
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        isLogin: true,
        isLoading: false,
        user: payload,
      };
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      return {
        isLogin: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
