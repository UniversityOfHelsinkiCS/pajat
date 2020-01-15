const Router = require('express')
const calendar = require('@controllers/calendarsController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))

router.get('/calendar', calendar.getAll)
router.get('/:course/:week/', calendar.iframe)
router.get('/:course/:week/iframe.html', calendar.iframe)

module.exports = router
