const { Model, DATE, INTEGER } = require('sequelize');
const { connection } = require('../util/db');

class Statistic extends Model {}

Statistic.init(
  {
    time: {
      type: DATE,
    },
    courseId: {
      type: INTEGER,
    },
    students: {
      type: INTEGER,
    },
  },
  {
    underscored: true,
    sequelize: connection.sequelize,
    modelName: 'statistic',
    tableName: 'statistics',
  }
);

module.exports = Statistic;
