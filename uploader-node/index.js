const http = require('http')
const express = require('express')

const app = express()

const localWebDriver = 'http://localhost:9515'
const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().usingServer(localWebDriver).forBrowser('chrome').build()
const By = webdriver.By

setupMetamask()

const setupMetamask = () => {
  const url = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko'

  driver.get(url).then((res) => {
    setTimeout(() => {
      driver.findElement(By.className('dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c')).then((select) => {
        select.click()
      })
    }, 5000)
  })
}

app.get('/', (req, res, next) => {
  const url = 'https://naver.com'

  driver.get(url).then((res) => {
    console.log(res)
  })

  res.send('HELLO WORLD!')
})

app.get('/setup', (req, res, next) => {
  res.send({ result: 'going' })
})

const PORT = 8081
const server = http.createServer(app)

server.listen(PORT, () => console.log('Server is opened. in 8081 port'))
