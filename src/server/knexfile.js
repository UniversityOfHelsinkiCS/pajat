const path = require('path');

const { KNEX_CONFIG } = require('./config');

module.exports = {
  ...KNEX_CONFIG,
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
};
