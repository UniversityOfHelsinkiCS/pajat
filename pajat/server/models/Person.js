const { Model, STRING } = require('sequelize');
const { connection } = require('../util/db');

class Person extends Model {}

Person.init(
  {
    firstNames: {
      type: STRING,
    },
    lastName: {
      type: STRING,
    },
    loginCode: {
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: connection.sequelize,
    modelName: 'person',
    tableName: 'persons',
  },
);

module.exports = Person;
