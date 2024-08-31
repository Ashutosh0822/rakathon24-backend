import puppeteer from 'puppeteer';

const WEBPAGE_URL='https://inflact.com/downloader/instagram/photo/'

const getInstagramUrls = async (instaId) => {
    // Launch browser in incognito mode
    const browser = await puppeteer.launch({
        headless: false, // Set to 'true' to run in headless mode
        args: ['--incognito']
    });
    console.log(browser.browserContexts);
    const page = await browser.newPage();
    await page.goto(WEBPAGE_URL);

    await page.type("#downloaderform-url", instaId);

    const fullProfileButton = await page.waitForSelector("button#allProfileContent", {visible:true})
    await fullProfileButton.click();

    await page.evaluate(async() => {
        await new Promise(function(resolve) {
            setTimeout(resolve, 10000)
        });
    });

    const htmlContent = await page.evaluate(() => {
        // Replace '#content' with the actual selector of the tag you're interested in
        const element = document.querySelector('div#instagram-profile-downloader'); 
        return element ? element.innerHTML : null; // Return the HTML content inside the tag
    });
    // Close the browser
    await browser.close();
    return htmlContent;
}

export  default getInstagramUrls;