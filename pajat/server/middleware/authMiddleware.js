const Person = require('@models/Person');

const auth = async (req, res, next) => {
  const key = req.header('x-access-key');
  if (!key) {
    return res.sendStatus(403);
  }
  try {
    req.user = await Person.findOne({ where: { key }, raw: true });
    if (!req.user) {
      return res.sendStatus(403);
    }
    return next();
  } catch (e) {
    return res.send(e);
  }
};

module.exports = auth;
