import { test, expect } from '../../fixtures/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes')
})

test('Checkbox 1 can be checked from default unchecked state', async({ page })=> {
    const checkboxOne = page.locator('#checkbox1')
    await expect(checkboxOne).not.toBeChecked()
    await checkboxOne.check()
    await expect(checkboxOne).toBeChecked()
})

test('Checkbox 2 can be unchecked from default checked state', async({ page })=>{
    const checkboxTwo = page.locator('#checkbox2')
    await expect(checkboxTwo).toBeChecked()
    await checkboxTwo.uncheck()
    await expect(checkboxTwo).not.toBeChecked()
})