const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const openURL = async (driver, url, sleepTime) => {
  await driver.get(url)
  await sleep(sleepTime || 250)
}

const clickElementByText = async (driver, type, text, sleepTime) => {
  const elements = await driver.findElements(By.css(type))

  for (let i = 0; i < elements.length; i++) {
    const innerText = await elements[i].getText()
    if (innerText === text) {
      await elements[i].click()
      await sleep(sleepTime || 0)
      return
    }
  }
}

module.exports = {
  sleep,
  openURL,
  clickElementByText,
}
