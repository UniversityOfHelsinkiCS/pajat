const { Model, STRING, INTEGER } = require('sequelize');
const { connection } = require('../util/db');

class Course extends Model {}

Course.init(
  {
    title: {
      type: STRING,
    },
    shortTitle: {
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
