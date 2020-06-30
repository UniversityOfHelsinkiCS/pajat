const { INTEGER, DATE, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.createTable('statistics', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        time: {
          type: DATE,
          allowNull: false,
        },
        course: {
          type: STRING,
          allowNull: false,
        },
        students: {
          type: INTEGER,
          allowNull: false,
        },
        created_at: {
          type: DATE,
          allowNull: false,
        },
        updated_at: {
          type: DATE,
          allowNull: false,
        },
      }),
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('statistics');
  },
};
