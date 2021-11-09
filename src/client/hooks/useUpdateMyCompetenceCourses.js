import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useUpdateMyCompetenceCourses = (options = {}) => {
  const mutation = useMutation(async (courseIds) => {
    const { data } = await apiClient.put(
      '/users/me/competence-courses',
      courseIds,
    );

    return data;
  }, options);

  return mutation;
};

export default useUpdateMyCompetenceCourses;
