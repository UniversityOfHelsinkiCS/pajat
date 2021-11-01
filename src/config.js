const IN_PRODUCTION = process.env.NODE_ENV === 'production';

const IN_STAGING = process.env.REACT_APP_STAGING === 'true';

const IN_E2E = process.env.REACT_APP_E2E === 'true';

const BASE_PATH = process.env.PUBLIC_URL || '';

const GIT_SHA = process.env.REACT_APP_GIT_SHA || '';

const ADMIN_USERS = ['mluukkai', 'kalleilv', 'jakousa'];

module.exports = {
  IN_PRODUCTION,
  IN_STAGING,
  IN_E2E,
  BASE_PATH,
  GIT_SHA,
  ADMIN_USERS,
};
