const { Model } = require('objection');

const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');
const User = require('./User');
const InstructionLocation = require('./InstructionLocation');

const getTimeStringFromHour = (hour) =>
  `${hour.toString().padStart('0', 2)}:00`;

class InstructionSession extends BaseModel {
  static get tableName() {
    return 'instructionSessions';
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
          from: 'instructionSessions.userId',
          to: 'users.id',
        },
      },
      instructionLocation: {
        relation: Model.BelongsToOneRelation,
        modelClass: InstructionLocation,
        join: {
          from: 'instructionSessions.instructionLocationId',
          to: 'instructionLocations.id',
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
