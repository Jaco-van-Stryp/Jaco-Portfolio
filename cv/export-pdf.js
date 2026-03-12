const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const outputPath = path.resolve('public/Jaco Van Stryp CV.pdf');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('cv/jaco-van-stryp-cv.html').split('\\').join('/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  await page.pdf({
    path: outputPath,
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true
  });
  await browser.close();
  console.log('PDF exported to public/Jaco Van Stryp CV.pdf');
})();
