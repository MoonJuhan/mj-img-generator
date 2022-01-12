# mj-img-generator

> Personal NFT Image Generator

## Setup

1. Download the Chrome webdriver into the root directory. ([Link](https://sites.google.com/chromium.org/driver/downloads?authuser=0))

2. Download the crx file of the metamask chromium extension program into the root directory.

3. Run the webdriver using the terminal. ([Link](https://sites.google.com/chromium.org/driver/getting-started?authuser=0#h.e02b498c978340a_161))

```
./chromedriver
```

4. Initialize the service and run it using another terminal.

```
npm i
npm run start
```

---

### How to generate images

1. Prepare images to be combined by category.

2. Upload images by category on the Generate page(http://localhost:8081/generate).

   (Images are rendered in order of categories. Please consider z-index and upload it.)

3. Enter the name and number of the file to be created and press the Generate button.

### Opensea Uploader

1. Copy the image files to be uploaded to the /images directory.

2. On the Uploader page(http://localhost:8081/uploader), enter the information on the item to be uploaded.

3. Press the buttons in order to check the tasks that are uploaded automatically.
