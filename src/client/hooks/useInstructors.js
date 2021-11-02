import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useInstructors = (options = {}) => {
  const queryKey = 'instructors';

  const { data: instructors, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/users/instructors');

      return data;
    },
    options,
  );

  return { instructors, ...rest };
};

export default useInstructors;
