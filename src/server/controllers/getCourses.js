const { Course } = require('../models');

const getCourses = async (req, res) => {
  const courses = await Course.query().orderBy('code');

  res.send(courses);
};

module.exports = getCourses;
