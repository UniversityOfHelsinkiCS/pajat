module.exports = {
  up: async (queryInterface) => {
    return Promise.all([queryInterface.dropTable('persons')]);
  },
  down: async () => {},
};
