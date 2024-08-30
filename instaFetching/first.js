const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the Inflact Instagram downloader page
    await page.goto('https://inflact.com/downloader/instagram/avatar/');

    // Wait for the input field to load
    await page.waitForSelector('input[name="query"]');

    // Type the Instagram ID into the input field
    const instagramId = 'instagram'; // Replace with the actual Instagram ID
    await page.type('input[name="query"]', instagramId);

    // Click the "Download whole profile" button
    await page.click('button[data-type="profile"]'); // Adjust the selector as necessary

    // Wait for the images to load (you may need to adjust this selector and timeout)
    await page.waitForSelector('div.some-class img', { timeout: 60000 }); // Replace 'div.some-class img' with the actual selector

    // Extract all image URLs from the loaded images
    const imageUrls = await page.$$eval('div.some-class img', imgs => 
        imgs.map(img => img.src)
    );

    // Log the URLs of the images
    console.log('Image URLs:', imageUrls);

    // Close the browser
    await browser.close();
})();