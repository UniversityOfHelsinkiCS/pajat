import axios from 'axios';
import { BASE_PATH, IN_PRODUCTION } from '../config';
import storage from './storage';

const FALLBACK_DEVELOPMENT_USER_HEADERS = {
  uid: 'mluukkai',
  givenname: 'Matti',
  sn: 'Luukkainen',
  mail: 'matti.luukkainen@helsinki.fi',
};

const getUserHeaders = () => {
  if (IN_PRODUCTION) {
    return {};
  }

  return (
    storage.get('developmentUserHeaders') ?? FALLBACK_DEVELOPMENT_USER_HEADERS
  );
};

const getLoggedInAsHeaders = () => {
  const loggedInAs = storage.get('adminLoggedInAs');

  return loggedInAs ? { 'x-admin-logged-in-as': loggedInAs } : {};
};

const apiClient = axios.create({ baseURL: `${BASE_PATH}/api` });

apiClient.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    ...getUserHeaders(),
    ...getLoggedInAsHeaders(),
  };

  const newConfig = { ...config, headers };

  return newConfig;
});

export default apiClient;
