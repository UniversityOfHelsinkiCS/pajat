const { ApplicationError } = require('../utils/errors');
const logger = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
  logger.error(`${error.message} ${error.name} ${error.stack}`);

  if (res.headersSent) {
    return next(error);
  }

  const normalizedError =
    error instanceof ApplicationError
      ? error
      : new ApplicationError(error.message);

  return res.status(normalizedError.status).json(normalizedError);
};

module.exports = errorHandler;
