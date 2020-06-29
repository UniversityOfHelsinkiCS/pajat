const { INTEGER, DATE, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.createTable('courses', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: STRING,
          allowNull: false,
        },
        short_name: {
          type: STRING,
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
    return queryInterface.dropTable('courses');
  },
};
