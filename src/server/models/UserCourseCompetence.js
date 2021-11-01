const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');

class UserCourseCompetence extends BaseModel {
  static get tableName() {
    return 'user_course_competences';
  }

  static get idColumn() {
    return ['user_id', 'course_id'];
  }
}

module.exports = UserCourseCompetence.bindKnex(knex);
