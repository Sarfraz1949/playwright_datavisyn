import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';

export default defineConfig ({
  //Josef - 22.08.2025 
  // Set a global timeout for all tests
  timeout: 120_000, // 120 seconds
  });

test('TC_1_verification if the application starts correctly', async ({ page }) => {
  //Josef - 22.08.2025 
  //Verify the titile of the application
  //Capture screenshot if error
  try {
    // Navigate to the application
    await page.goto('https://www.mantine-react-table.dev/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story');
    await page.waitForLoadState('load');
  // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Storybook/);
    await page.screenshot({ path: 'screenshot_of_Correct_StoryPage.png' });
    await page.close();
  }
  catch (error){
    //Josef - 22.08.2025 capture Screenshot
    console.error('Test fehlgeschlagen:', error);
    await page.getByText('Die Website ist nicht erreichbar');
    await page.screenshot({ path: 'screenshot_of_Failure_StoryPage.png' });
    await page.close(); 

  
  }});

test('TC_2_create Screenshot of application in chrom and firefox', async ({ page }) => {
//Josef - 22.08.2025 
try {
    //Josef - 22.08.2025 
	// Navigate to the application
    await page.goto('https://www.mantine-react-table.dev/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story');
    await page.waitForLoadState('load');
  // Expect a title "to contain" a substring.

    await expect(page).toHaveTitle(/Storybook/);
    //End of test - create screenshot
    await page.screenshot({ path: '22082025_datavisyn_screenshot_StoryPage.png' });
    await page.close(); 

  }
  catch (error){
    //Josef - 22.08.2025 capture 
    console.error('Test fehlgeschlagen:', error);
    //await page.getByText('Die Website ist nicht erreichbar');
    await page.screenshot({ path: 'screenshot_StoryPage.png' });
    await page.close(); 

  
  }});

   test('TC_3_Filter by First Name', async ({ page }) => {
  //Josef - 22.08.2025 
  try {
    await page.goto('https://www.mantine-react-table.dev/iframe.html?args=&id=features-detail-panel-examples--detail-panel-enabled&viewMode=story');
    //Josef - 22.08.2025 
    // Warte darauf, dass die Tabelle geladen ist
    //await page.waitForTimeout(39000);
    await page.waitForLoadState('load');
  // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Storybook/);
    //await page.waitForSelector('[role="cell"]');
    
    await page.getByRole('cell', { name: 'First Name Sort by First Name' }).getByLabel('Column Actions').click();
    //Josef - 22.08.2025 
    // Korrekte Syntax für textContent()
    //const firstName = await page.getByRole('cell', { name: 'First Name Sort by First Name' }).getByLabel('Column Actions').textContent();
    //console.log('Firstname:', firstName); // Korrekte Konsolenausgabe
    
    await page.getByRole('menuitem', { name: 'Filter by First Name' }).click();
    await page.getByRole('textbox', { name: 'Filter by First Name' }).click();
    await page.getByRole('textbox', { name: 'Filter by First Name' }).fill('i');
    //Josef - 22.08.2025 
    // Warte kurz, damit der Filter angewendet werden kann
    await page.waitForTimeout(10000);
    
    await page.getByRole('button', { name: 'Clear filter' }).click();
    
  } catch (error) {
    // Josef - 22.08.2024 capture (korrigiertes Datum)
    console.error('Test fehlgeschlagen:', error);
    //Josef - 22.08.2025 
    // Überprüfe ob die Fehlermeldung existiert bevor du darauf klickst
    //const errorMessage = page.getByText('Die Website ist nicht erreichbar');
   //Todo: Josef - 22.08.2025: Fehlermeldung behandlung
    //if (await errorMessage.isVisible()) {
     // await errorMessage.click();
    //}
    
   // await page.screenshot({ path: 'screenshot_StoryPage.png' });
  } finally {
    //Josef - 22.08.2025 
	// Schließe die Seite immer, auch wenn der Test erfolgreich war
    await page.close();
  }
});
