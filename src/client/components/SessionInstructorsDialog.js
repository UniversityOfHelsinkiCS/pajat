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
  Divider,
} from '@mui/material';

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

const InstructorItem = ({ user, divider = true }) => {
  const { displayName, competenceCourses, instructionSessions } = user;

  const { description, instructionLocation } = instructionSessions[0];

  return (
    <>
      <Typography variant="body1" fontWeight="medium" mb={1}>
        {displayName}
      </Typography>

      <div>
        {competenceCourses.map((course) => (
          <CourseChip
            course={course}
            size="small"
            key={course.id}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </div>

      {instructionLocation && (
        <InfoItem icon={<LocationIcon />}>{instructionLocation.name}</InfoItem>
      )}

      {description && (
        <InfoItem icon={<InfoIcon />}>
          <Markdown allowedElements={['p', 'a']}>{description}</Markdown>
        </InfoItem>
      )}

      {divider && <Divider sx={{ my: 2 }} />}
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

        {users.map((user, index) => (
          <InstructorItem
            key={user.id}
            user={user}
            divider={index < users.length - 1}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionInstructorsDialog;
