const service = require('../services/service')
const path = require('path')

exports.renderFrontend = async (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
}

exports.getStatus = async (req, res, next) => {
  try {
    await service.getStatus()

    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
}

exports.insertItems = async (req, res, next) => {
  const params = req.body

  try {
    await service.insertItems(params)

    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(500)
  }
}
