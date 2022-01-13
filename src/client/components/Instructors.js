import React, { useState, useMemo } from 'react';

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
  Checkbox,
  Tooltip,
  TextField,
  InputAdornment,
  TableFooter,
  TablePagination,
} from '@mui/material';

import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import SearchIcon from '@mui/icons-material/Search';

import useInstructors from '../hooks/useInstructors';
import useCurrentUser from '../hooks/useCurrentUser';
import useInstructorInvitationToken from '../hooks/useInstructorInvitationToken';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';
import useCourses from '../hooks/useCourses';
import useUpdateCompetenceCourses from '../hooks/useUpdateCompetenceCourses';
import PageProgress from './PageProgress';

const copyToClipboard = (text) => navigator.clipboard.writeText(text);

const ROWS_PER_PAGE = 50;

const getFilteredInstructors = (users, keyword) => {
  if (!users) {
    return [];
  }

  if (!keyword) {
    return users;
  }

  const normalizedKeyword = keyword.toLowerCase().trim();

  return users.filter(({ fullName }) =>
    fullName.toLowerCase().includes(normalizedKeyword),
  );
};

const getInvitationLink = (token) =>
  getAbsoluteUrl(`/instructor-invitation/${token}`);

const InstructorRow = ({ user, courses }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isLoading } = useUpdateCompetenceCourses();

  const [competenceCourseIds, setCompetenceCourseIds] = useState(() =>
    user.competenceCourses.map((c) => c.id),
  );

  const handleToggleCourse = async (event, courseId) => {
    const nextCompetenceCourseIds = event.target.checked
      ? [...competenceCourseIds, courseId]
      : competenceCourseIds.filter((id) => id !== courseId);

    try {
      await mutateAsync({
        userId: user.id,
        courseIds: nextCompetenceCourseIds,
      });

      setCompetenceCourseIds(nextCompetenceCourseIds);

      enqueueSnackbar("Instructor's profile has been updated", {
        variant: 'success',
      });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <TableRow key={user.id}>
      <TableCell>{user.fullName}</TableCell>
      {courses.map((course) => {
        const hasCompetence = Boolean(
          competenceCourseIds.find((id) => id === course.id),
        );

        return (
          <TableCell key={course.id} align="center">
            <Checkbox
              checked={hasCompetence}
              onChange={(event) => handleToggleCourse(event, course.id)}
              disabled={isLoading}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const CourseNameTableCell = ({ course, ...props }) => (
  <Tooltip title={course.name}>
    <TableCell
      sx={{
        whiteSpace: 'nowrap',
      }}
      align="center"
      {...props}
    >
      {course.code}
    </TableCell>
  </Tooltip>
);

const Instructors = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useCurrentUser();

  const { instructors, isLoading: instructorsIsLoading } = useInstructors({
    queryKeySuffix: 'instructorTable',
    cacheTime: 0,
  });

  const { courses, isLoading: coursesIsLoading } = useCourses();
  const { token } = useInstructorInvitationToken();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);

  const filteredInstructors = useMemo(
    () => getFilteredInstructors(instructors, keyword),
    [instructors, keyword],
  );

  const isLoading = instructorsIsLoading || coursesIsLoading;

  if (isLoading) {
    return <PageProgress />;
  }

  const paginatedInstructors = filteredInstructors.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE,
  );

  if (!instructors || !courses) {
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
        {currentUser?.adminAccess && token && (
          <Button variant="contained" onClick={handleCopyLink}>
            Copy invitation link
          </Button>
        )}
      </Box>

      <Paper>
        <Box p={2}>
          <TextField
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" disablePointerEvents>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Full name</TableCell>
                {courses.map((course) => (
                  <CourseNameTableCell course={course} key={course.id} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInstructors.map((user) => (
                <InstructorRow key={user.id} user={user} courses={courses} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPage={ROWS_PER_PAGE}
                  page={page}
                  rowsPerPageOptions={[]}
                  count={instructors.length}
                  onPageChange={(event, nextPage) => setPage(nextPage)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Instructors;
