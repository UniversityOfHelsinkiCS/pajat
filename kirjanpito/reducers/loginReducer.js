import {
  storeAccessKey,
  getAccessKey,
  removeAccessKey,
} from '../utils/authStorage';

const initialState = {
  isLoading: true,
  isLogin: false,
  user: null,
};

export const signIn = (key) => async (dispatch) => {
  try {
    const url = 'https://study.cs.helsinki.fi/pajat/api/login/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
      }),
    });
    const json = await response.json();
    if (json) {
      storeAccessKey(key);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: json,
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const key = await getAccessKey();
    if (key) {
      const url = 'https://study.cs.helsinki.fi/pajat/api/auth/';
      const response = await fetch(url, {
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
    console.log(e);
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
        ...payload,
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
