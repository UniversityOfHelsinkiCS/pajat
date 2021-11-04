import { groupBy } from 'lodash';

const getUsersFromInstructionSessions = (sessions) => {
  const sessionsByUserId = groupBy(sessions, ({ userId }) => userId);

  return Object.entries(sessionsByUserId).map(([, userSessions]) => {
    const { user } = userSessions[0];

    return {
      ...user,
      instructionSessions: userSessions,
    };
  });
};

export default getUsersFromInstructionSessions;
