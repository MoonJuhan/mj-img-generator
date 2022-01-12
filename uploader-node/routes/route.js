const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.renderFrontend)
router.get('/api/status', controller.getStatus)
router.post('/api/items', controller.insertItems)

module.exports = router
