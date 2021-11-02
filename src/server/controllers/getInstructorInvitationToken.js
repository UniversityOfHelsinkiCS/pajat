const jwt = require('jsonwebtoken');

const { ForbiddenError } = require('../utils/errors');
const { JWT_SECRET } = require('../config');

const getInstructorInvitationToken = (req, res) => {
  const { user } = req;

  if (!user.hasAdminAccess()) {
    throw new ForbiddenError('Admin access is required');
  }

  const token = jwt.sign({ invitedBy: user.id }, JWT_SECRET, {
    subject: 'instructorInvidation',
    expiresIn: '30d',
  });

  res.send({ token });
};

module.exports = getInstructorInvitationToken;
