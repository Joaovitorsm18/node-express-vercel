const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const url = 'https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/Index';
  console.log("Digite seu CPF");

  const cpf = '15176817667';
  const senha = '30923010';
  if (cpf = '15176817667') {
    consultas = ['172158354', '23126744', '111222', '222222'];
  } else if (cpf = '022') {
    consultas = ['1111111', '2222222']
  } else {
    console.log("CPF inválido")
  }

  try {
    await page.goto(url);

    await page.type('input[id="cpfInput"]', cpf);
    await page.type('input[id="passwordInput"]', senha);
    await page.keyboard.press('Enter');

    await page.waitForSelector('img[alt="Copasa"]');
    await page.click('img[alt="Copasa"]');

    await page.waitForTimeout(3000);

    for (const consulta of consultas) {
      await page.goto('https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/MyAccount_ListIdentifiers');

      await page.waitForTimeout(10000);

      await page.type('input[type="search"]', consulta);

      await page.waitForTimeout(1000);

      await page.click('input[id="RadioID"]');
      await page.click('button[id="btnproceed"]');
      await page.waitForTimeout(4000);

      try {
        const elements = await page.$x('/html/body/div/main/form/div[1]/div[5]/div/div[1]/div[3]/div/table/tbody/tr/th[7]/a/span');
        if (elements.length > 0) {
          await elements[0].click();
        }
      } catch (error) {
        console.error('Ocorreu um erro ao realizar download:', error);
      }

      await page.waitForTimeout(5000);

      await page.click('button[id="btnSelect"]');
      await page.waitForTimeout(7000);
      await page.waitForTimeout(6000);
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    await browser.close();
  }
})();


module.exports = router;
