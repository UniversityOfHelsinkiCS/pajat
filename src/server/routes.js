const express = require('express');

const accessLogger = require('./middlewares/accessLogger');
const shibbolethCharsetMiddleware = require('./middlewares/shibbolethCharsetParser');
const errorHandler = require('./middlewares/errorHandler');
const getAuthorizedUser = require('./middlewares/getAuthorizedUser');
const controllers = require('./controllers');

const router = express.Router();

router.use(express.json());

router.get(
  '/public/instruction-sessions',
  controllers.getPublicInstructionSessions,
);

router.use(shibbolethCharsetMiddleware);
router.use(getAuthorizedUser);
router.use(accessLogger);

router.get('/logout', controllers.logout);

router.get('/users/me', controllers.getAuthorizedUser);

router.put('/users/me/competence-courses', controllers.updateCompetenceCourses);

router.get(
  '/users/me/instruction-sessions',
  controllers.getMyInstructionSessions,
);

router.get('/users/instructors', controllers.getInstructors);

router.get('/courses', controllers.getCourses);
router.post('/courses', controllers.createCourse);

router.post('/instruction-sessions', controllers.createInsturctionSession);

router.get('/instruction-sessions', controllers.getInstructionSessions);

router.delete(
  '/instruction-sessions/:id',
  controllers.deleteInstructionSession,
);

router.get(
  '/instructor-invitation-token',
  controllers.getInstructorInvitationToken,
);

router.post('/claim-instructor-access', controllers.claimInstructorAccess);

router.use(errorHandler);

module.exports = router;
