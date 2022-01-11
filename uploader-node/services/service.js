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

const initTab = async () => {
  const data = await driver.getAllWindowHandles()
  const metamaskWindow = []

  for (let i = 0; i < data.length; i++) {
    await driver.switchTo().window(data[i])
    const title = await driver.getTitle()

    if (title !== 'MetaMask') {
      await driver.close()
    } else {
      metamaskWindow.push(data[i])
    }
  }

  await driver.switchTo().window(metamaskWindow[0])
}

exports.getStatus = async () => {
  try {
    await initTab()
  } catch (err) {
    console.log(err)
    throw Error(err)
  }
}

const createNewItems = async (params) => {
  const { createNewItem, sellItem } = require('./manage-upload')
  const fs = require('fs')

  fs.readdir('./images', async (err, files) => {
    const imageList = files.filter((el) => el !== '.DS_Store')

    console.log(`The number of files to be uploaded: ${imageList.length}`)

    for (let i = 0; i < imageList.length; i++) {
      const image = imageList[i]
      await openURL(driver, 'https://opensea.io/asset/create')

      await createNewItem(driver, {
        image,
        name: `${params.name}_${params.fileStartIndex + i}`,
        conllection: params.conllectionName,
        blockchain: params.blockchainName,
      })

      await sellItem(driver, params.price)
    }
  })
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
    await createNewItems(params)
  } catch (err) {
    console.log(err)
    throw Error(err)
  }
}
