import { test } from '../../../fixtures/test';

test.beforeEach(async ({page})=> {
    await page.goto('/radio-buttons')
})

test('Colours', async ({ pageManager }) => {
  await pageManager.getRadioButton('.card.card-custom:has(.card-header:has-text("Select your favorite color"))').validateRadioButtons()
})

test('Sport', async ({ pageManager }) =>{
  await pageManager.getRadioButton('.card.card-custom:has(.card-header:has-text("Select your favorite sport"))').validateRadioButtons()
})