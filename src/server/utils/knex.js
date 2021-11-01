const createKnex = require('knex');

const config = require('../config');

const knex = createKnex(config.KNEX_CONFIG);

module.exports = knex;
