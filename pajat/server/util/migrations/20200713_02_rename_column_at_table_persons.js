module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.renameColumn('persons', 'fullName', 'full_name'),
    ]);
  },
  down: async () => {},
};
