require('express-async-errors');
require('dotenv/config');

const path = require('path');
const express = require('express');
const logger = require('./utils/logger');
const { PORT, IN_PRODUCTION, IN_E2E } = require('./config');
const routes = require('./routes');
const connectToDatabase = require('./utils/connectToDatabase');

const app = express();

app.use('/api', routes);
app.use('/api', (_, res) => res.sendStatus(404));

if (IN_PRODUCTION || IN_E2E) {
  const DIST_PATH = path.resolve(__dirname, '../../build');
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html');

  app.use(express.static(DIST_PATH));
  app.get('*', (req, res) => res.sendFile(INDEX_PATH));
}

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    logger.info(`Started on port ${PORT}`);
  });
};

start();

module.exports = app;
