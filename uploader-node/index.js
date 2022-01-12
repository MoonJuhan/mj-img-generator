const http = require('http')
const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')

const app = express()
const router = require('./routes/route')

const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(history())
app.use(express.json())
app.use(express.static('dist'))
app.use('/', router)

const PORT = 8081
const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server is opened. in ${PORT} port`))
