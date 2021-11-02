import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useDeleteInstructionSession = (options = {}) => {
  const mutation = useMutation(async (sessionId) => {
    const { data } = await apiClient.delete(
      `/instruction-sessions/${sessionId}`,
    );

    return data;
  }, options);

  return mutation;
};

export default useDeleteInstructionSession;
