const { Model, STRING } = require('sequelize');
const { connection } = require('../util/db');

class Person extends Model {
  async updateLoginCode() {
    this.loginCode = `${Math.round(Math.random() * 5000)}`;
    this.save();
  }
}

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
