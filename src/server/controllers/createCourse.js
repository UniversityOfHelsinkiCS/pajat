const yup = require('yup');

const { Course } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const bodySchema = yup.object().shape({
  name: yup.string().trim().required(),
  code: yup.string().trim().uppercase(),
});

const createCourse = async (req, res) => {
  const { user } = req;

  const { name, code } = await bodySchema.validate(req.body);

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
