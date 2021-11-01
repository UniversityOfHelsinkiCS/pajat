const morgan = require('morgan');

const { IN_PRODUCTION } = require('../config');
const logger = require('../utils/logger');

const accessLogger = morgan((tokens, req, res) => {
  const { uid } = req.headers;

  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const responseTime = tokens['response-time'](req, res);
  const userAgent = tokens['user-agent'](req, res);

  const message = `${method} ${url} ${status} - ${responseTime} ms`;

  const additionalInfo = IN_PRODUCTION
    ? {
        userId: uid,
        method,
        url,
        status,
        responseTime,
        userAgent,
      }
    : {};

  logger.info(message, additionalInfo);
});

module.exports = accessLogger;
