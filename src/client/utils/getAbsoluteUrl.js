import { BASE_PATH } from '../config';

const getAbsoluteUrl = (path) => {
  const { origin } = new URL(window.location.href);

  return `${origin}${BASE_PATH}${path}`;
};

export default getAbsoluteUrl;
