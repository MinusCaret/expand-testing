import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page})=> {
    await page.goto('https://practice.expandtesting.com/radio-buttons')
})

test('Colours', async ({page}) => {
  const pm = new PageManager(page)

  await pm.getRadioButton('.card.card-custom:has(.card-header:has-text("Select your favorite color"))').validateRadioButtons()
})

test('Sport', async ({page}) =>{
  const pm = new PageManager(page)

  await pm.getRadioButton('.card.card-custom:has(.card-header:has-text("Select your favorite sport"))').validateRadioButtons()
})