import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useInstructionSession = (id, options = {}) => {
  const queryKey = ['instructionSession', id];

  const { data: instructionSession, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get(`/instruction-sessions/${id}`);

      return data;
    },
    {
      enabled: Boolean(id),
      ...options,
    },
  );

  return { instructionSession, ...rest };
};

export default useInstructionSession;
