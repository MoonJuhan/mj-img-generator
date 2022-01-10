const { sleep, openURL, clickElementByText } = require('./helpers')
const webdriver = require('selenium-webdriver')
const By = webdriver.By
let driver

const setupWebdriver = async () => {
  await sleep(100)

  const chrome = require('selenium-webdriver/chrome')
  const options = new chrome.Options()
  options.addExtensions(`./${process.env.METAMASK_EXTENSION_NAME}`)

  driver = new webdriver.Builder()
    .usingServer(process.env.LOCAL_WEBDRIVER_URL)
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
}

setupWebdriver()


exports.getStatus = async () => {
  try {
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
