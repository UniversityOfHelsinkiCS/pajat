const { Course } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const createCourse = async (req, res) => {
  const { user, body } = req;
  const { name, code } = body;

  if (!user.hasAdminAccess()) {
    throw new ForbiddenError('Admin access is required');
  }

  const course = await Course.query()
    .insert({
      name: name.trim(),
      code: code.trim().toUpperCase(),
    })
    .returning('*');

  res.send(course);
};

module.exports = createCourse;
