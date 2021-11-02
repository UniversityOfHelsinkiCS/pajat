const { User } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const getInstructors = async (req, res) => {
  const { user } = req;

  if (!user.hasAdminAccess()) {
    throw new ForbiddenError('Admin access is required');
  }

  const instructors = await User.query()
    .where({ instructor: true })
    .orderBy('createdAt');

  res.send(instructors);
};

module.exports = getInstructors;
