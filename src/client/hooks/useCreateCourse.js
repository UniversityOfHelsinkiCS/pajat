import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useCreateCourse = (options = {}) => {
  const mutation = useMutation(async (course) => {
    const { data } = await apiClient.post('/courses', course);

    return data;
  }, options);

  return mutation;
};

export default useCreateCourse;
