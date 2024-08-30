import puppeteer from 'puppeteer';

const getImageUrlFromHotpot = async (prompt) => {
    // Launch browser in incognito mode
    const browser = await puppeteer.launch({
        headless: true, // Set to 'true' to run in headless mode
        args: ['--incognito']
    });
    console.log(browser.browserContexts);
    const page = await browser.newPage();

    // Navigate to the AI Image Generator page
    await page.goto('https://hotpot.ai/ai-image-generator/create');

    // Wait for the page to load and text area to be available
    await page.waitForSelector('textarea',{visible:true});

    // Fill in the text area with the desired prompt
    const textAreaSelector = 'textarea';
    await page.type(textAreaSelector, prompt);

    // Click the "Generate" button (assuming there's a button with a specific selector)
    const submitButton = await page.waitForSelector('div > #submitButton');

    await submitButton.click();
    
    await page.evaluate(async() => {
      await new Promise(function(resolve) { 
             setTimeout(resolve, 10000)
      });
  });

    await page.waitForSelector('div.imageBox img', { timeout: 30000 });

    // Get the src attribute of the img inside div with class 'A'
    const imgSrc = await page.$eval('div.imageBox img', img => img.src);

    console.log('Generated Image URL:', imgSrc);

    await page.evaluate(async() => {
      await new Promise(function(resolve) { 
             setTimeout(resolve, 5000)
      });
    });
    // Close the browser
    await browser.close();
    return imgSrc;
};

export default getImageUrlFromHotpot;