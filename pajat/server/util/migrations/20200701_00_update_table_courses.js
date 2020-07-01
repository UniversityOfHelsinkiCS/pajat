const { STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('courses', 'name'),
      queryInterface.removeColumn('courses', 'short_name'),
      queryInterface.addColumn('courses', 'title', {
        type: STRING,
        allowNull: false,
        unique: true,
      }),
      queryInterface.addColumn('courses', 'short_title', {
        type: STRING,
        allowNull: false,
        unique: true,
      }),
    ]);
  },
  down: async () => {},
};
