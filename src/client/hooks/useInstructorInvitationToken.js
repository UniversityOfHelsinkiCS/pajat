import useQuery from './useQuery';
import apiClient from '../utils/apiClient';

const useInstructorInvitationToken = (options = {}) => {
  const queryKey = 'instructorInvitationToken';

  const { data: token, ...rest } = useQuery(
    queryKey,
    async () => {
      const { data } = await apiClient.get('/instructor-invitation-token');

      return data.token;
    },
    options,
  );

  return { token, ...rest };
};

export default useInstructorInvitationToken;
