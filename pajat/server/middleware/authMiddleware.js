const Person = require('@models/Person');
const logger = require('../util/logger');

const auth = async (req, res, next) => {
  const key = req.header('x-access-key');
  if (!key) {
    res.sendStatus(403);
  }
  try {
    req.user = await Person.findOne({ where: { key }, raw: true });
    if (!req.user) {
      res.sendStatus(403);
    }
    return next();
  } catch (e) {
    logger.log('error', e);
    res.send(e);
  }
};

module.exports = auth;
