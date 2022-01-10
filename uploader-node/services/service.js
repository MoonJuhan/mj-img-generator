const localWebDriver = 'http://localhost:9515'
const { sleep, openURL, clickElementByText } = require('./helpers')
const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().usingServer(localWebDriver).forBrowser('chrome').build()
const By = webdriver.By

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const openURL = async (url) => {
  await driver.get(url)
}

exports.getStatus = async () => {
  try {
    await openURL('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko')

    await sleep(5000)

    const button = await driver.findElement(By.className('dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c'))
    button.click()
  } catch (err) {
    console.log(err)
    throw Error(err)
  }
}

exports.insertItems = async (params) => {
  try {
  } catch (err) {
    console.log(err)
    throw Error(err)
  }
}
