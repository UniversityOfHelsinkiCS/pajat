const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');

class UserCourseCompetence extends BaseModel {
  static get tableName() {
    return 'userCourseCompetences';
  }

  static get idColumn() {
    return ['userId', 'courseId'];
  }
}

module.exports = UserCourseCompetence.bindKnex(knex);
