const { INTEGER, DATE } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.createTable('personcourses', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        person_id: {
          type: INTEGER,
          allowNull: false,
          references: {
            model: 'persons',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        course_id: {
          type: INTEGER,
          allowNull: false,
          references: {
            model: 'courses',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
    return queryInterface.dropTable('personcourses');
  },
};
