module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.addConstraint('statistics', {
        fields: ['time', 'course_id'],
        type: 'unique',
        name: 'unique_statistic',
      }),
    ]);
  },
  down: async () => {},
};
