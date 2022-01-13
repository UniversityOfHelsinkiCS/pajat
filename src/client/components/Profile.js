import React, { useState } from 'react';

import {
  Typography,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';

import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import useCurrentUser from '../hooks/useCurrentUser';
import useCourses from '../hooks/useCourses';
import useUpdateMyCompetenceCourses from '../hooks/useUpdateMyCompetenceCourses';
import PageProgress from './PageProgress';

const SwitchList = ({ courses, competenceCourses }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isLoading } = useUpdateMyCompetenceCourses();

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
  const { courses, isLoading: coursesIsLoading } = useCourses();

  const { currentUser, isLoading: currentUserIsLoading } = useCurrentUser({
    queryKeySuffix: 'profile',
    cacheTime: 0,
  });

  const isLoading = coursesIsLoading || currentUserIsLoading;

  if (isLoading) {
    return <PageProgress />;
  }

  if (!currentUser || !courses) {
    return <Navigate to="/" replace />;
  }

  const { competenceCourses } = currentUser;

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
