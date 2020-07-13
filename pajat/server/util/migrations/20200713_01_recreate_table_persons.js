const { INTEGER, DATE, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.createTable('persons', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        fullName: {
          type: STRING,
          allowNull: false,
          unique: true,
        },
        key: {
          type: STRING,
          allowNull: false,
          unique: true,
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
    return queryInterface.dropTable('persons');
  },
};
