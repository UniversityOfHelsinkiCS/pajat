import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';

import useClaimInstructorAccess from '../hooks/useClaimInstructorAccess';
import PageProgress from './PageProgress';

const InstructorInvitation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { token } = useParams();
  const { mutateAsync } = useClaimInstructorAccess();

  useEffect(async () => {
    try {
      await mutateAsync(token);

      queryClient.clear();

      enqueueSnackbar('You now have instructor access', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar(
        'Your invitation link is invalid or expired. Please, ask for a new link',
        { variant: 'error' },
      );
    }

    history.replace('/');
  }, [token]);

  return <PageProgress />;
};

export default InstructorInvitation;
