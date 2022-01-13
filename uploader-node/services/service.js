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

const loginMetamask = async ({ resetNonce, resetPassword, privateKey }) => {
  const url = await driver.getCurrentUrl()
  const refinedURL = url.split('#initialize')[0]

  await openURL(driver, `${refinedURL}#initialize/welcome`)

  await clickElementByText(driver, 'button', '시작하기')
  await clickElementByText(driver, 'button', '지갑 가져오기')
  await clickElementByText(driver, 'button', '동의함')

  const inputResetNonce = async (stack = 0) => {
    stack++
    const inputElements = await driver.findElements(By.css('input'))

    if (inputElements.length === 3) {
      const el = inputElements[0]

      await el.sendKeys(
        resetNonce,
        webdriver.Key.TAB,
        webdriver.Key.TAB,
        resetPassword,
        webdriver.Key.TAB,
        resetPassword,
        webdriver.Key.TAB,
        webdriver.Key.ENTER,
        webdriver.Key.TAB,
        webdriver.Key.TAB,
        webdriver.Key.ENTER
      )
    } else {
      if (stack < process.env.DELAY_TIME) {
        await sleep(250)
        await inputResetNonce(stack)
      }
    }
  }

  await inputResetNonce()

  await clickElementByText(driver, 'button', '모두 완료')

  if (privateKey) {
    await openURL(driver, `${refinedURL}#new-account/import`, 500)

    const privateKeyInput = await driver.findElement(By.css('input'))
    privateKeyInput.sendKeys(privateKey, webdriver.Key.TAB, webdriver.Key.TAB, webdriver.Key.ENTER)
  }
}

exports.initialize = async () => {
  try {
    await initTab()
    await loginMetamask(params)
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
