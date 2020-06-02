const Router = require('express');
const calendar = require('@controllers/calendarsController');
const calendar2 = require('@controllers/v2/calendarsController');
const supervisors2 = require('@controllers/v2/supervisorsController');

const router = Router();

router.get('/', (req, res) => res.send('welcome to root'));

router.get('/calendar', calendar.getAll);
router.get('/:course/:week/', calendar.iframe);
router.get('/v2/:course/:week/', calendar2.iframe);

router.get('/:course/:week/iframe.html', calendar.iframe);
router.get('/screen', calendar.screen);
router.get('/luokka', (req, res) => res.type('text/plain').send('BK107'));
router.get('/supervisors/', supervisors2.getHelloWorld);

module.exports = router;
