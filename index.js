const { chromium } = require('playwright');
const fs = require('fs/promises');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let mobile = { name: 'mobile', width: 375, height: 812 };
  let tablette = { name: 'tablette', width: 768, height: 1024 };
  let desktop = { name: 'desktop', width: 1920, height: 1080 };

  let resolutions = [mobile, tablette, desktop];

  for (let i = 0; i < resolutions.length; i++) {
    // Créer le dossier de la résolution
    await fs.mkdir('screenshots/' + resolutions[i].name, { recursive: true });

    // Set viewport size
    await page.setViewportSize({ width: resolutions[i].width, height: resolutions[i].height });

    // Charger le fichier HTML
    // Vérifier que le serveur est bien lancé
    try {
      await page.goto('http://localhost:8080');
    } catch (error) {
      console.log('Le serveur n\'est pas lancé');
      await browser.close();
      return;
    }

    // Effectuer les tests
    // Remplir le champ de saisie avec une valeur vide
    await page.locator('#numberInput').fill('');
    await page.locator('#processButton').click();
    // Wait for the answer element to be visible
    // If the element is not visible, the screenshot will be empty (white)
    if (await page.locator('#answer').isVisible()) {
      await page.locator('#answer').screenshot({ path: 'screenshots/' + resolutions[i].name + '/empty.png' });
    }
    else {
        console.log('L\'élément #answer n\'est pas visible sur la résolution ' + resolutions[i].name + ' pour une valeur vide');
    }

    // Remplir le champ de saisie avec la valeur de l'iteration de la boucle for (i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++) {
      await page.locator('#numberInput').fill(j.toString());
      await page.locator('#processButton').click();
      // Wait for the answer element to be visible
      // If the element is not visible, the screenshot will be empty (white)
      if (await page.locator('#answer').isVisible()) {
        await page.locator('#answer').screenshot({ path: 'screenshots/' + resolutions[i].name + '/' + j + '.png' });
      }
        else {
            console.log('L\'élément #answer n\'est pas visible sur la résolution ' + resolutions[i].name + ' pour la valeur ' + j);
        }
    }
  }

  await browser.close();
})();
