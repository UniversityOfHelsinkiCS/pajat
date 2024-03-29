import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useUpdateCompetenceCourses = (options = {}) => {
  const mutation = useMutation(async ({ userId, courseIds }) => {
    const { data } = await apiClient.put(
      `/users/${userId}/competence-courses`,
      courseIds,
    );

    return data;
  }, options);

  return mutation;
};

export default useUpdateCompetenceCourses;
