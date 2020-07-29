const Router = require('express');
const calendar = require('@controllers/calendarsController');
const calendar2 = require('@controllers/v2/calendarsController');
const supervisors2 = require('@controllers/v2/supervisorsController');
const auth = require('@middleware/authMiddleware');

const router = Router();

router.get('/', (req, res) => res.send('welcome to root'));
router.get('/luokka', (req, res) => res.type('text/plain').send('BK107')); // Pajat always in BK107

/**
 * Supervisor app routes
 */
router.post('/login/', supervisors2.postLogin);
router.get('/auth/', auth, supervisors2.getAuthentication);
router.get('/courses/', supervisors2.getCourses);
router.get('/courses/:person/', supervisors2.getCoursesByPersonId);
router.get('/statistics/:course/:date/', supervisors2.getDailyData);
router.post('/statistics/add/', auth, supervisors2.addStudent);
router.post('/statistics/remove/', auth, supervisors2.removeStudent);
router.get('/transfer/', supervisors2.getStatistics);

/**
 * Calendar routes
 */
router.get('/screen', calendar.screen);
router.get('/:course/:week/', calendar.iframe);
router.get('/:course/:week/iframe.html', calendar.iframe);
router.get('/v2/:course/:week/', calendar2.iframe);

module.exports = router;
