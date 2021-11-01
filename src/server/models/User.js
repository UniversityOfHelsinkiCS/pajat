const { Model } = require('objection');

const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');
const { ADMIN_USERS } = require('../config');
const Course = require('./Course');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get virtualAttributes() {
    return ['fullName', 'displayName', 'admin'];
  }

  static timestamps = true;

  static get relationMappings() {
    return {
      competenceCourses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: 'users.id',
          through: {
            from: 'user_course_competences.user_id',
            to: 'user_course_competences.course_id',
          },
          to: 'courses.id',
        },
      },
    };
  }

  get admin() {
    return ADMIN_USERS.includes(this.username);
  }

  get fullName() {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : null;
  }

  get displayName() {
    return this.fullName ?? this.username;
  }

  hasAdminAccess() {
    return this.admin;
  }

  hasInstructorAccess() {
    return this.hasAdminAccess() || this.instructor;
  }
}

module.exports = User.bindKnex(knex);
