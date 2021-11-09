const { User } = require('../models');
const { ForbiddenError, NotFoundError } = require('../utils/errors');

const updateCompetenceCourses = async (req, res) => {
  const {
    user,
    body: courseIds,
    params: { id },
  } = req;

  if (user.id !== id && !user.hasAdminAccess()) {
    throw new ForbiddenError();
  }

  const targetUser = await User.query().findById(id);

  if (!targetUser) {
    throw new NotFoundError('User is not found');
  }

  await targetUser.updateCompetenceCourses(courseIds);

  await targetUser.$fetchGraph('competenceCourses');

  res.send(targetUser);
};

module.exports = updateCompetenceCourses;
