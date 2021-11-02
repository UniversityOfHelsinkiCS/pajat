import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useUpdateCompetenceCourses = (options = {}) => {
  const mutation = useMutation(async (courseIds) => {
    const { data } = await apiClient.put(
      '/users/me/competence-courses',
      courseIds,
    );

    return data;
  }, options);

  return mutation;
};

export default useUpdateCompetenceCourses;
