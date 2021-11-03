import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useCourse = (code, options = {}) => {
  const queryKey = ['course', code];

  const { data: course, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get(`/public/courses/${code}`);

      return data;
    },
    {
      enabled: Boolean(code),
      ...options,
    },
  );

  return { course, ...rest };
};

export default useCourse;
