const { AuthorizationError } = require('../utils/errors');
const { User } = require('../models');

const getUserPayloadFromShibboHeaders = (req) => {
  const {
    uid: username,
    givenname: firstName,
    sn: lastName,
    mail: email,
  } = req.headers;

  if (!username) {
    throw new AuthorizationError('Missing uid header');
  }

  return {
    username,
    firstName,
    lastName,
    email,
  };
};

const getAuthorizedUser = async (req, res, next) => {
  const userPayload = getUserPayloadFromShibboHeaders(req);
  const { username } = userPayload;

  const user = await User.query().findOneOrInsert(
    {
      username,
    },
    userPayload,
  );

  req.user = user;

  next();
};

module.exports = getAuthorizedUser;
