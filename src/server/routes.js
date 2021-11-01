const express = require('express');

const accessLogger = require('./middlewares/accessLogger');
const shibbolethCharsetMiddleware = require('./middlewares/shibbolethCharsetParser');
const errorHandler = require('./middlewares/errorHandler');
const getAuthorizedUser = require('./middlewares/getAuthorizedUser');
const controllers = require('./controllers');

const router = express.Router();

router.use(express.json());

router.use(shibbolethCharsetMiddleware);
router.use(getAuthorizedUser);
router.use(accessLogger);

router.get('/login', controllers.getAuthorizedUser);
router.get('/logout', controllers.logout);

router.use(errorHandler);

module.exports = router;
