import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useInstructionLocations = (options = {}) => {
  const queryKey = 'instructionLocations';

  const { data: instructionLocations, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/instruction-locations');

      return data;
    },
    options,
  );

  return { instructionLocations, ...rest };
};

export default useInstructionLocations;
