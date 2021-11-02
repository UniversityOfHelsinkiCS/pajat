import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useClaimInstructorAccess = (options = {}) => {
  const mutation = useMutation(async (token) => {
    const { data } = await apiClient.post('/claim-instructor-access', {
      token,
    });

    return data;
  }, options);

  return mutation;
};

export default useClaimInstructorAccess;
