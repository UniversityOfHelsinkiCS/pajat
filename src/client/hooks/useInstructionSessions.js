import { format as formatDate } from 'date-fns';

import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useInstructionSessions = (options = {}) => {
  const { from, to } = options;

  const params = {
    ...(from && { from: formatDate(from, 'yyyy-MM-dd') }),
    ...(to && { to: formatDate(to, 'yyyy-MM-dd') }),
  };

  const queryKey = ['instructionSessions', params];

  const { data: instructionSessions, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/instruction-sessions', {
        params,
      });

      return data;
    },
    options,
  );

  return { instructionSessions, ...rest };
};

export default useInstructionSessions;
