import { test, expect } from '../../../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('/checkboxes')
})

test('Checkbox 1 can be checked from default unchecked state', async({ pageManager })=> {
    await expect(pageManager.onCheckboxPage().checkboxOne).not.toBeChecked()
    await pageManager.onCheckboxPage().checkCheckboxOne()
    await expect(pageManager.onCheckboxPage().checkboxOne).toBeChecked()
})

test('Checkbox 2 can be unchecked from default checked state', async({ pageManager })=>{
    await expect(pageManager.onCheckboxPage().checkboxTwo).toBeChecked()
    await pageManager.onCheckboxPage().uncheckCheckboxTwo()
    await expect(pageManager.onCheckboxPage().checkboxTwo).not.toBeChecked()
})