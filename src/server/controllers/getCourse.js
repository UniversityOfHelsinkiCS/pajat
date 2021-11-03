const { Course } = require('../models');
const { NotFoundError } = require('../utils/errors');

const getCourse = async (req, res) => {
  const { code } = req.params;
  const normalizedCode = code.toUpperCase();

  const course = await Course.query().findOne({ code: normalizedCode });

  if (!course) {
    throw new NotFoundError('Course is not found');
  }

  res.send(course);
};

module.exports = getCourse;
