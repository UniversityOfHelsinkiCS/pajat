const { AuthorizationError } = require('../utils/errors');
const { User } = require('../models');
const logger = require('../utils/logger');

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

const getLoginAsUser = async (req) => {
  const username = req.headers['x-admin-logged-in-as'];

  if (!username) {
    return null;
  }

  const user = await User.query().findOne({ username });

  if (username && !user) {
    logger.info(
      `Login as username is set as ${username} but user does not exist in the database`,
    );
  }

  return user;
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

  const loginAsUser = user.hasAdminAccess() ? await getLoginAsUser(req) : null;

  if (loginAsUser) {
    req.user = loginAsUser;
  }

  next();
};

module.exports = getAuthorizedUser;
