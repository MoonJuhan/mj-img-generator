const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.renderFrontend)
router.get('/status', controller.getStatus)
router.post('/items', controller.insertItems)

module.exports = router
