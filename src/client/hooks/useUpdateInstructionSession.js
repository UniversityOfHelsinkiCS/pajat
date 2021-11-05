import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useUpdateInstructionSession = (options = {}) => {
  const mutation = useMutation(async ({ id, ...session }) => {
    const { data } = await apiClient.put(
      `/instruction-sessions/${id}`,
      session,
    );

    return data;
  }, options);

  return mutation;
};

export default useUpdateInstructionSession;
