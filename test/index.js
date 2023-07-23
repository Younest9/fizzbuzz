const { chromium } = require('playwright-chromium');
const fs = require('fs/promises');

async function run() {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN,
  });

  const page = await browser.newPage();

  // Lancer le serveur
  const server = 'http://web:80';
  console.log('Lancement du serveur ' + server);

  let mobile = { name: 'mobile', width: 375, height: 812 };
  let tablet = { name: 'tablet', width: 768, height: 1024 };
  let desktop = { name: 'desktop', width: 1920, height: 1080 };

  let resolutions = [mobile, tablet, desktop];

  let documentationContent = `# FizzBuzz Web Application Testing Documentation\n\n`;

  for (let i = 0; i < resolutions.length; i++) {
    // Créer le dossier de la résolution
    await fs.mkdir('screenshots/' + resolutions[i].name, { recursive: true });

    // Set viewport size
    await page.setViewportSize({ width: resolutions[i].width, height: resolutions[i].height });

    // Charger le fichier HTML
    // Vérifier que le serveur est bien lancé
    try {
      await page.goto(server);
    } catch (error) {
      console.log("Le serveur n'est pas lancé");
      await browser.close();
      return;
    }

    // Effectuer les tests
    // Remplir le champ de saisie avec une valeur vide
    await page.locator('#numberInput').fill('');
    await page.locator('#processButton').click();
    // Wait for the answer element to be visible
    // If the element is not visible, the application displayed the alert dialog
    const isAnswerVisible = await page.locator('#answer').isVisible();
    if (!isAnswerVisible) {
      console.log('Alert dialog displayed for empty input on ' + resolutions[i].name);
    } else {
      await page.locator('#answer').screenshot({ path: 'screenshots/' + resolutions[i].name + '/empty.png' });
    }

    documentationContent += `## Test Scenarios for ${resolutions[i].name} resolution\n\n`;
    documentationContent += `### Empty Input\n\n`;
    documentationContent += `- **Description**: This test checks the behavior of the application when the input field is left empty.\n`;
    documentationContent += `- **Steps**:\n`;
    documentationContent += `  1. Open the "FizzBuzz" web application.\n`;
    documentationContent += `  2. Leave the input field empty.\n`;
    documentationContent += `  3. Click the submit button.\n`;
    documentationContent += `- **Expected Result**: An alert dialog with the message "You must enter a number!" should appear.\n`;
    documentationContent += `\n#### Screenshots\n\n`;
    if (!isAnswerVisible) {
      documentationContent += `Alert dialog displayed for empty input on ${resolutions[i].name}\n\n`;
    } else {
      documentationContent += `![Empty Input - ${resolutions[i].name}](./screenshots/${resolutions[i].name}/empty.png)\n\n`;
    }

    // Remplir le champ de saisie avec la valeur de l'iteration de la boucle for (i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++) {
      await page.locator('#numberInput').fill(j.toString());
      await page.locator('#processButton').click();
      // Wait for the answer element to be visible
      // If the element is not visible, the screenshot will be empty (white)
      if (await page.locator('#answer').isVisible()) {
        await page.locator('#answer').screenshot({ path: 'screenshots/' + resolutions[i].name + '/' + j + '.png' });
      } else {
        console.log('L\'élément #answer n\'est pas visible sur la résolution ' + resolutions[i].name + ' pour la valeur ' + j);
      }

      documentationContent += `### ${j}. Test for Number ${j}\n\n`;
      documentationContent += `- **Description**: This test verifies the application's behavior when the number ${j} is submitted through the input field.\n`;
      documentationContent += `- **Steps**:\n`;
      documentationContent += `  1. Open the "FizzBuzz" web application.\n`;
      documentationContent += `  2. Enter the number ${j} in the input field.\n`;
      documentationContent += `  3. Click the submit button.\n`;
      documentationContent += `- **Expected Result**: The application should display the corresponding result: "Fizz", "Buzz", "FizzBuzz", or the number itself.\n`;
      documentationContent += `\n#### Screenshots\n\n`;
      documentationContent += `![Number ${j} - ${resolutions[i].name}](./screenshots/${resolutions[i].name}/${j}.png)\n\n`;
    }
  }

  await browser.close();

  // Write the documentation to a file
  await fs.writeFile('documentation.md', documentationContent);
}

run();