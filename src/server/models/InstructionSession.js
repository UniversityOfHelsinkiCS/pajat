const { Model } = require('objection');

const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');
const User = require('./User');

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
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'instruction_sessions.userId',
          to: 'users.id',
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
