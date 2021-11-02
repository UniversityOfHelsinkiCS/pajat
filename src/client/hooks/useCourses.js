import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useCourses = (options = {}) => {
  const queryKey = 'courses';

  const { data: courses, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/courses');

      return data;
    },
    options,
  );

  return { courses, ...rest };
};

export default useCourses;
