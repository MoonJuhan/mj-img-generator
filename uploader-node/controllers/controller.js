const service = require('../services/service')

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
