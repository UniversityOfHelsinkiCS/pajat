const path = require('path');

const logger = require('./logger');
const knex = require('./knex');

const DB_CONNECTION_RETRY_LIMIT = 10;

const runMigrations = async () => {
  await knex.migrate.latest({
    directory: path.resolve(__dirname, '..', 'migrations'),
  });

  logger.info('Migrations up to date');
};

const testConnection = async () => {
  await knex.raw('SELECT 1 as test');
  try {
    await runMigrations();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectToDatabase = async (attempt = 0) => {
  try {
    await testConnection();
  } catch (err) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      logger.error(`Connection to database failed after ${attempt} attempts`, {
        error: err.stack,
      });
      return process.exit(1);
    }
    logger.info(
      `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`,
    );
    await sleep(5000);
    return connectToDatabase(attempt + 1);
  }

  return null;
};

module.exports = connectToDatabase;
