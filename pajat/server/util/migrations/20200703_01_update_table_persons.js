const { STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('persons', 'first_names'),
      queryInterface.removeColumn('persons', 'last_name'),
      queryInterface.removeColumn('persons', 'login_code'),
      queryInterface.addColumn('persons', 'full_name', {
        type: STRING,
        allowNull: false,
        unique: true,
      }),
      queryInterface.addColumn('persons', 'key', {
        type: STRING,
        allowNull: false,
        unique: true,
      }),
    ]);
  },
  down: async () => {},
};
