const jwt = require('jsonwebtoken');
const yup = require('yup');

const { JWT_SECRET } = require('../config');
const { User } = require('../models');

const bodySchema = yup.object().shape({
  token: yup.string().required(),
});

const claimInstructorAccess = async (req, res) => {
  const { user } = req;

  const { token } = await bodySchema.validate(req.body);

  await jwt.verify(token, JWT_SECRET, { subject: 'instructorInvitation' });

  const updatedUser = await User.query().patchAndFetchById(user.id, {
    instructor: true,
  });

  res.send(updatedUser);
};

module.exports = claimInstructorAccess;
