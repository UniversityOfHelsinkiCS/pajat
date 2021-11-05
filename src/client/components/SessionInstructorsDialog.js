import React from 'react';
import { format as formatDate } from 'date-fns';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from '@mui/material';

import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';
import LocationIcon from '@mui/icons-material/Room';

import getUsersFromInstructionSessions from '../utils/getUsersFromInstructionSessions';
import CourseChip from './CourseChip';
import Markdown from './Markdown';

const InfoItem = ({ icon, children }) => (
  <Box display="flex">
    <Box flexGrow={0} mr={1} sx={{ color: 'grey.500' }}>
      {icon}
    </Box>
    <Box flexGrow={1}>{children}</Box>
  </Box>
);

const InstructorList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 0px;

  dt {
    padding-right: ${({ theme }) => theme.spacing(2)};
    grid-column: 1;
    margin: 0px;
  }

  dd {
    grid-column: 2;
    margin: 0px;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  dd:last-child {
    margin-bottom: 0px;
  }
`;

const InstructorItem = ({ user }) => {
  const { displayName, competenceCourses, instructionSessions } = user;

  const { description, instructionLocation } = instructionSessions[0];

  return (
    <>
      <Typography variant="body1" fontWeight="medium" component="dt">
        {displayName}
      </Typography>

      <dd>
        {competenceCourses.map((course) => (
          <CourseChip
            course={course}
            size="small"
            key={course.id}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}

        {instructionLocation && (
          <InfoItem icon={<LocationIcon />}>
            {instructionLocation.name}
          </InfoItem>
        )}

        {description && (
          <InfoItem icon={<InfoIcon />}>
            <Markdown allowedElements={['p', 'a']}>{description}</Markdown>
          </InfoItem>
        )}
      </dd>
    </>
  );
};

const SessionInstructorsDialog = ({
  instructionSessions,
  sessionDate,
  startHour,
  endHour,
  onClose,
  open,
}) => {
  const users = getUsersFromInstructionSessions(instructionSessions);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {formatDate(new Date(sessionDate), 'EEEE d.M.')} {startHour}:00 -{' '}
        {endHour}:00
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>These instructors are present during this session:</Box>
        <InstructorList>
          {users.map((user) => (
            <InstructorItem key={user.id} user={user} />
          ))}
        </InstructorList>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionInstructorsDialog;
