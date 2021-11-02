import { useMutation } from 'react-query';

import apiClient from '../utils/apiClient';

const useCreateInstructionSession = (options = {}) => {
  const mutation = useMutation(async (session) => {
    const { data } = await apiClient.post('/instruction-sessions', session);

    return data;
  }, options);

  return mutation;
};

export default useCreateInstructionSession;
