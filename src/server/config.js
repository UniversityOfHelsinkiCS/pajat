const { knexSnakeCaseMappers } = require('objection');

const config = require('../config');

const KNEX_CONFIG = {
  client: 'pg',
  connection: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
  },
  ...knexSnakeCaseMappers(),
};

const PORT = process.env.PORT || 8000;

module.exports = {
  ...config,
  KNEX_CONFIG,
  PORT,
};
