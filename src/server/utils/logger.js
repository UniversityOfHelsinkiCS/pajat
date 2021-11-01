const winston = require('winston');

const { IN_PRODUCTION } = require('../config');

const { combine, timestamp, printf, splat } = winston.format;

const transports = [];

if (process.env.NODE_ENV !== 'test') {
  transports.push(new winston.transports.File({ filename: 'debug.log' }));
}

if (!IN_PRODUCTION) {
  const devFormat = printf(
    ({ level, message, timestamp: ts, ...rest }) =>
      `${ts} ${level}: ${message} ${JSON.stringify(rest)}`,
  );

  transports.push(
    new winston.transports.Console({
      level: 'debug',
      format: combine(splat(), timestamp(), devFormat),
    }),
  );
}

if (IN_PRODUCTION) {
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  };

  const prodFormat = winston.format.printf(({ level, ...rest }) =>
    JSON.stringify({
      level: levels[level],
      ...rest,
    }),
  );

  transports.push(new winston.transports.Console({ format: prodFormat }));
}

const logger = winston.createLogger({ transports });

module.exports = logger;
