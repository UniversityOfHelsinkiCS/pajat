const logger = require('@util/logger')

const errorHandler = (error, req, res, next) => {
  logger.error(req.url)
  logger.error(error.name)
  logger.error(error.message)
  console.error(req.url, error)

  if (error.name === 'ApplicationError') {
    return res.status(error.status).send({ error: error.message })
  }

  res.status(500).send({ error: error.message })
  return next(error)
}

module.exports = errorHandler
