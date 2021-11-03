const createKnex = require('knex');

const { KNEX_CONFIG } = require('../config');

const knex = createKnex(KNEX_CONFIG);

module.exports = knex;
