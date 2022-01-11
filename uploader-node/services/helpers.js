const webdriver = require('selenium-webdriver')
const By = webdriver.By

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const openURL = async (driver, url, sleepTime = 250) => {
  await driver.get(url)
  await sleep(sleepTime)
}

const clickElementByText = async (driver, type, text, emptiable = false, sleepTime = 0, stack = 0) => {
  const elements = await driver.findElements(By.css(type))

  for (let i = 0; i < elements.length; i++) {
    const innerText = await elements[i].getText()

    const refinedText = innerText
      .split('')
      .filter((char) => char.charCodeAt(0) !== 10)
      .join('')

    if (refinedText === text) {
      await elements[i].click()
      await sleep(sleepTime)
      return true
    }
  }

  if (stack < process.env.DELAY_TIME) {
    if (emptiable && stack > 4) return false
    
    console.log(`clickElementByText Func retry to find ${text} in ${stack + 1} times.`)
    await sleep(250)
    return await clickElementByText(driver, type, text, emptiable, sleepTime, stack + 1)
  }

  console.log(`clickElementByText Func fail to find ${text}`)
  return false
}

const controllMetamaskWindow = async (driver, callback, stack = 0) => {
  stack++
  const data = await driver.getAllWindowHandles()
  const windowList = []

  for (let i = 0; i < data.length; i++) {
    await driver.switchTo().window(data[i])
    const title = await driver.getTitle()
    windowList.push({
      title,
      id: data[i],
    })
  }

  if (windowList.find((el) => el.title === 'MetaMask Notification')) {
    await driver.switchTo().window(windowList.find((el) => el.title === 'MetaMask Notification').id)
    await callback()
    await driver.switchTo().window(windowList.find((el) => el.title !== 'MetaMask Notification').id)
  } else {
    if (stack < process.env.DELAY_TIME) {
      console.log(`controllMetamaskWindow Func retry to find MetaMask Window in ${stack} times.`)
      await sleep(250)
      await controllMetamaskWindow(driver, callback, stack)
    } else {
      console.log(`controllMetamaskWindow Func fail to find MetaMask Window`)
    }
  }
}

module.exports = {
  sleep,
  openURL,
  clickElementByText,
  controllMetamaskWindow,
}
