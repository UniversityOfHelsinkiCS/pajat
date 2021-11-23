const { Model, transaction } = require('objection');
const _ = require('lodash');

const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');
const { ADMIN_USERS } = require('../config');
const Course = require('./Course');
const UserCourseCompetence = require('./UserCourseCompetence');

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
            from: 'userCourseCompetences.userId',
            to: 'userCourseCompetences.courseId',
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

  toPublicObject() {
    const publicUser = _.pick(this, [
      'id',
      'firstName',
      'lastName',
      'fullName',
      'displayName',
      'competenceCourses',
    ]);

    return publicUser;
  }

  async updateCompetenceCourses(courseIds) {
    const payload = courseIds.map((courseId) => ({
      courseId,
      userId: this.id,
    }));

    await transaction(
      UserCourseCompetence,
      async (BoundUserCourseCompetence) => {
        await BoundUserCourseCompetence.query()
          .where({ userId: this.id })
          .delete();

        await BoundUserCourseCompetence.query().insert(payload);
      },
    );
  }
}

module.exports = User.bindKnex(knex);
