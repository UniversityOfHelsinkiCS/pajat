import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useCurrentUser = (options = {}) => {
  const queryKey = 'currentUser';

  const { data: currentUser, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/users/me');

      return data;
    },
    options,
  );

  return { currentUser, ...rest };
};

export default useCurrentUser;
