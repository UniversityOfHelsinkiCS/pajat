const { Model } = require('objection');

const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');
const Course = require('./Course');

const getTimeStringFromHour = (hour) =>
  `${hour.toString().padStart('0', 2)}:00`;

class InstructionSession extends BaseModel {
  static get tableName() {
    return 'instruction_sessions';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: 'instruction_sessions.user_id',
          through: {
            from: 'user_course_competences.user_id',
            to: 'user_course_competences.course_id',
          },
          to: 'courses.id',
        },
      },
    };
  }

  static timestamps = true;

  static fromHourRange(payload) {
    const { startHour, endHour, ...rest } = payload;

    return InstructionSession.fromJson({
      ...rest,
      startTime: getTimeStringFromHour(startHour),
      endTime: getTimeStringFromHour(endHour),
    });
  }
}

module.exports = InstructionSession.bindKnex(knex);
