const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes/route')

app.use(cors())
app.use(express.json())
app.use('/', router)

const PORT = 8081
const server = http.createServer(app)

server.listen(PORT, () => console.log('Server is opened. in 8081 port'))
