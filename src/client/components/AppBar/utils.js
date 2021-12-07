import apiClient from '../../utils/apiClient';

// eslint-disable-next-line import/prefer-default-export
export const logout = async () => {
  const {
    data: { url },
  } = await apiClient.get('/logout');

  if (url) {
    window.location.replace(url);
  }
};
