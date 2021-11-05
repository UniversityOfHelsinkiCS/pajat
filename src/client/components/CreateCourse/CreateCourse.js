import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import useCreateCourse from '../../hooks/useCreateCourse';
import CreateCourseForm from './CreateCourseForm';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.code) {
    errors.code = 'Code is required';
  }

  return errors;
};

const CreateCourse = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateCourse();

  const onSubmit = async (values) => {
    try {
      await mutateAsync(values);
      enqueueSnackbar('Courses has been added', { variant: 'success' });
      navigate('/courses');
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <>
      <Typography component="h1" variant="h4" mb={2}>
        Add course
      </Typography>

      <Card>
        <CardContent>
          <Formik
            initialValues={{ name: '', code: '' }}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
          >
            {({ handleSubmit }) => <CreateCourseForm onSubmit={handleSubmit} />}
          </Formik>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateCourse;
