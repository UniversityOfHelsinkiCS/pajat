const { STRING, INTEGER, DATE } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.createTable('persons', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        first_names: {
          type: STRING,
          allowNull: false,
        },
        last_name: {
          type: STRING,
          allowNull: false,
        },
        login_code: { // Not a password
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
    return queryInterface.dropAllTables();
  },
};
