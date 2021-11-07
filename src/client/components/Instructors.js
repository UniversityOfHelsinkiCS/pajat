import React from 'react';

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from '@mui/material';

import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import useInstructors from '../hooks/useInstructors';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useInstructorInvitationToken from '../hooks/useInstructorInvitationToken';
import PageProgress from './PageProgress';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';

const copyToClipboard = (text) => navigator.clipboard.writeText(text);

const getInvitationLink = (token) =>
  getAbsoluteUrl(`/instructor-invitation/${token}`);

const Instructors = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { authorizedUser } = useAuthorizedUser();
  const { instructors, isLoading } = useInstructors();
  const { token } = useInstructorInvitationToken();

  if (isLoading) {
    return <PageProgress />;
  }

  if (!instructors) {
    return <Navigate to="/" replace />;
  }

  const handleCopyLink = () => {
    const invitationLink = getInvitationLink(token);

    copyToClipboard(invitationLink);

    enqueueSnackbar(
      'Link has been copied to clipboard. It will expire in 30 days',
    );
  };

  return (
    <>
      <Box mb={2} display="flex" alignItems="center">
        <Typography component="h1" variant="h4" flexGrow={1}>
          Instructors
        </Typography>
        {authorizedUser?.adminAccess && token && (
          <Button variant="contained" onClick={handleCopyLink}>
            Copy invitation link
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Full name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructors.map(({ id, username, fullName }) => (
              <TableRow key={id}>
                <TableCell>{username}</TableCell>
                <TableCell>{fullName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Instructors;
