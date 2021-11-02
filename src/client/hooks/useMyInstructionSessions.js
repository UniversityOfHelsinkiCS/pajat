import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useMyInstructionSessions = (options = {}) => {
  const queryKey = 'myInstructionSessions';

  const { data: instructionSessions, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/users/me/instruction-sessions');

      return data;
    },
    options,
  );

  return { instructionSessions, ...rest };
};

export default useMyInstructionSessions;
