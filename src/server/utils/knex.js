const pg = require('pg');
const createKnex = require('knex');

const { KNEX_CONFIG } = require('../config');

// Date type parser
pg.types.setTypeParser(1082, (value) => value);

const knex = createKnex(KNEX_CONFIG);

module.exports = knex;
