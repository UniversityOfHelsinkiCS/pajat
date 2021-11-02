import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useAuthorizedUser = (options = {}) => {
  const queryKey = 'authorizedUser';

  const { data: authorizedUser, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/users/me');

      return data;
    },
    options,
  );

  return { authorizedUser, ...rest };
};

export default useAuthorizedUser;
