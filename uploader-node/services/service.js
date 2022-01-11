const { sleep, openURL, clickElementByText, controllMetamaskWindow } = require('./helpers')
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

const loginOpensea = async () => {
  await openURL(driver, 'https://opensea.io/login')
  await clickElementByText(driver, 'button', `MetaMaskPopular`)

  await controllMetamaskWindow(driver, async () => {
    await clickElementByText(driver, 'button', '다음')
    await clickElementByText(driver, 'button', '연결')
  })

  await openURL(driver, 'https://opensea.io/asset/create')

  await controllMetamaskWindow(driver, async () => {
    await clickElementByText(driver, 'button', '서명')
  })
}

exports.insertItems = async (params) => {
  try {
    await loginOpensea()
  } catch (err) {
    console.log(err)
    throw Error(err)
  }
}
