const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');

class Course extends BaseModel {
  static get tableName() {
    return 'courses';
  }

  static get idColumn() {
    return 'id';
  }

  static timestamps = true;
}

module.exports = Course.bindKnex(knex);
