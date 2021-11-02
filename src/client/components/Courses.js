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
  CircularProgress,
} from '@mui/material';

import { Redirect, Link } from 'react-router-dom';

import useCourses from '../hooks/useCourses';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const Courses = () => {
  const { authorizedUser } = useAuthorizedUser();
  const { courses, isLoading } = useCourses();

  if (isLoading) {
    return (
      <Box my={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!courses) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box mb={2} display="flex" alignItems="center">
        <Typography component="h1" variant="h4" flexGrow={1}>
          Courses
        </Typography>
        {authorizedUser?.adminAccess && (
          <Button variant="contained" component={Link} to="/courses/new">
            Add course
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(({ id, name, code }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Courses;
