const { User } = require('../models');

const getAuthorizedUser = async (req, res) => {
  const { user } = req;

  const userWithGraph = await User.query()
    .findById(user.id)
    .withGraphFetched('competenceCourses');

  res.send({
    ...userWithGraph.toJSON(),
    adminAccess: userWithGraph.hasAdminAccess(),
    instructorAccess: userWithGraph.hasInstructorAccess(),
  });
};

module.exports = getAuthorizedUser;
