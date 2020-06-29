const { INTEGER } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('statistics', 'course'),
      queryInterface.addColumn('statistics', 'course_id', {
        type: INTEGER,
        references: {
          model: 'courses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    ]);
  },
  down: async () => {},
};
