const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.renderFrontend)
router.post('/api/init', controller.initialize)
router.post('/api/items', controller.insertItems)

module.exports = router
