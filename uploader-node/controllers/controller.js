const service = require('../services/service')
const path = require('path')

exports.renderFrontend = async (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
}

exports.initialize = async (req, res, next) => {
  try {
    const params = req.body

    await service.initialize(params)

    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
}

exports.insertItems = async (req, res, next) => {
  try {
    const params = req.body

    await service.insertItems(params)

    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(500)
  }
}
