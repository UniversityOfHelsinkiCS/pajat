const { InstructionLocation } = require('../models');

const getInstructionLocations = async (req, res) => {
  const locations = await InstructionLocation.query();

  res.send(locations);
};

module.exports = getInstructionLocations;
