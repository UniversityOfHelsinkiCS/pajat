import React, { useState } from 'react';

import {
  Typography,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  CircularProgress,
} from '@mui/material';

import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useCourses from '../hooks/useCourses';
import useUpdateCompetenceCourses from '../hooks/useUpdateCompetenceCourses';

const SwitchList = ({ courses, competenceCourses }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isLoading } = useUpdateCompetenceCourses();

  const [competenceCourseIds, setCompetenceCourseIds] = useState(() =>
    competenceCourses.map(({ id }) => id),
  );

  const handleToggleCourse = async (courseId, event) => {
    const { checked } = event.target;

    const nextCompetenceCourseIds = checked
      ? [...competenceCourseIds, courseId]
      : competenceCourseIds.filter((id) => id !== courseId);

    try {
      await mutateAsync(nextCompetenceCourseIds);

      setCompetenceCourseIds(nextCompetenceCourseIds);

      enqueueSnackbar('Your profile has been updated', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <FormGroup>
      {courses.map(({ id, name }) => (
        <FormControlLabel
          key={id}
          control={
            <Switch
              disabled={isLoading}
              checked={competenceCourseIds.includes(id)}
              onChange={(event) => handleToggleCourse(id, event)}
            />
          }
          label={name}
        />
      ))}
    </FormGroup>
  );
};

const Profile = () => {
  const { authorizedUser, isLoading: authorizedUserIsLoading } =
    useAuthorizedUser({
      skipCache: true,
    });

  const { courses, isLoading: coursesIsLoading } = useCourses();

  const isLoading = authorizedUserIsLoading || coursesIsLoading;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authorizedUser || !courses) {
    return <Redirect to="/" />;
  }

  const { competenceCourses } = authorizedUser;

  return (
    <>
      <Typography component="h1" variant="h4" mb={2}>
        My profile
      </Typography>
      <Card>
        <CardContent>
          <SwitchList courses={courses} competenceCourses={competenceCourses} />
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
