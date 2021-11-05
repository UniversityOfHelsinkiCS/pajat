const knex = require('../utils/knex');
const BaseModel = require('./BaseModel');

class InstructionLocation extends BaseModel {
  static get tableName() {
    return 'instructionLocations';
  }

  static get idColumn() {
    return 'id';
  }

  static timestamps = true;
}

module.exports = InstructionLocation.bindKnex(knex);
