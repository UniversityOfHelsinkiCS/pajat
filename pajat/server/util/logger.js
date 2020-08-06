const winston = require('winston');
const Sentry = require('winston-transport-sentry-node').default;
const { inProduction } = require('@util/common');

const options = {
  sentry: {
    dsn:
      'https://f0ca387254fb4623b5623f8f615c276f@sentry.toska.cs.helsinki.fi/16',
  },
  level: 'info',
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'pajat' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

if (inProduction) {
  logger.add(new Sentry(options));
}

if (!inProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
