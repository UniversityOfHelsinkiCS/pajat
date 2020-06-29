const { Model, STRING } = require('sequelize');
const { connection } = require('../util/db');

class Course extends Model {}

Course.init(
  {
    name: {
      type: STRING,
    },
    shortName: {
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: connection.sequelize,
    modelName: 'course',
    tableName: 'courses',
  }
);

module.exports = Course;
