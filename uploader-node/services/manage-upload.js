const { sleep, clickElementByText, controllMetamaskWindow } = require('./helpers')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

const getFormElements = async (driver) => {
  const formElement = await driver.findElement(By.css('#main form'))

  const divElements = await formElement.findElements(By.css('div'))

  const filteredElements = []

  for (let i = 0; i < divElements.length; i++) {
    const el = divElements[i]

    const className = await el.getAttribute('class')

    if (className.includes('Formreact__StyledFormControl')) filteredElements.push(el)
  }

  return filteredElements
}

const getFormInfo = async (el) => {
  const returnObj = {}
  const label = await el.findElement(By.css('label'))

  returnObj.type = await label.getText()

  try {
    const inputElement = await el.findElement(By.css('input'))

    returnObj.inputElement = inputElement
  } catch (error) {}

  return returnObj
}

const setImage = async (el, image) => {
  const path = __dirname.replace('uploader-node/services', 'images')

  await el.sendKeys(`${path}/${image}`)
}

const setName = async (el, name) => {
  await el.click()
  await el.sendKeys(name)
}

const setCollection = async (driver, el, collection) => {
  await el.sendKeys(collection)
  await sleep(1500)
  await el.sendKeys(webdriver.Key.TAB, webdriver.Key.ENTER)

  const checkWrongAction = async (callback) => {
    try {
      const wrongEl = await driver.findElement(By.css('h4'))
      if (wrongEl) {
        await el.sendKeys(webdriver.Key.ESCAPE)
        if (callback) await callback()
      }
    } catch (error) {
      console.log('setCollection worked nomally.')
    }
  }

  await checkWrongAction(async () => {
    await el.sendKeys(webdriver.Key.TAB, webdriver.Key.ENTER)
    await checkWrongAction()
  })
}

const setBlockchain = async (el, blockchain) => {
  const selectBlockchain = async (blockchain, stack = 0) => {
    const selected = await el.getAttribute('value')

    if (selected !== blockchain) {
      for (let i = 0; i < stack; i++) {
        await el.sendKeys(webdriver.Key.TAB)
      }

      await el.sendKeys(webdriver.Key.TAB, webdriver.Key.ENTER)

      stack++
      if (stack < 4) await selectBlockchain(blockchain, stack)
    }
  }

  await selectBlockchain(blockchain)
}

const completeCheck = async (driver, text, stack = 0) => {
  console.log(`completeCheck Func check completed to find ${text} in ${stack} times.`)

  const retryCheck = async () => {
    if (stack < process.env.DELAY_TIME) {
      stack++
      await sleep(250)
      await completeCheck(driver, text, stack)
    }
  }

  try {
    const h4El = await driver.findElement(By.css('h4'))
    const h4Text = await h4El.getText()
    console.log(h4Text, text, h4Text.includes(text))
    if (!h4Text.includes(text)) {
      await retryCheck()
    }
  } catch (error) {
    await retryCheck()
  }
}

const createNewItem = async (driver, params) => {
  const elements = await getFormElements(driver)

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const { type, inputElement } = await getFormInfo(el)

    switch (type) {
      case 'Image, Video, Audio, or 3D Model':
        await setImage(inputElement, params.image)
        break
      case 'Name':
        await setName(inputElement, params.name)
        break
      case 'Collection':
        await setCollection(driver, inputElement, params.conllection)
        break
      case 'Blockchain':
        await setBlockchain(inputElement, params.blockchain)
        break
    }
  }

  await clickElementByText(driver, 'button', 'Create')
  await completeCheck(driver, 'You created')
}

const sellItem = async (driver, price) => {
  const url = await driver.getCurrentUrl()
  await driver.get(`${url}/sell`)

  const inputElement = await driver.findElement(By.name('price'))
  await inputElement.sendKeys(price)

  await clickElementByText(driver, 'button', 'Complete listing')

  const listingStep = async (driver, text, emptiable = false) => {
    const result = await clickElementByText(driver, 'button', text, emptiable)

    if (result)
      await controllMetamaskWindow(driver, async () => {
        await clickElementByText(driver, 'button', '서명')
      })
  }

  await listingStep(driver, 'Unlock', true)
  await listingStep(driver, 'Sign')

  await completeCheck(driver, 'NFT is listed')
}

module.exports = {
  createNewItem,
  sellItem,
}
