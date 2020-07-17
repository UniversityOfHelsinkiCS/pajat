const { INTEGER } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.changeColumn('statistics', 'course_id', {
        type: INTEGER,
        allowNull: false,
      }),
    ]);
  },
  down: async () => {},
};
