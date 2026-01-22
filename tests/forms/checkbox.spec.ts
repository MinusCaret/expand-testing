import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/checkboxes')
})

test('Checkbox 1 can be checked from default unchecked state', async({ page })=> {
    const pm = new PageManager(page)

    await expect(pm.onCheckboxPage().checkboxOne).not.toBeChecked()
    await pm.onCheckboxPage().checkCheckboxOne()
    await expect(pm.onCheckboxPage().checkboxOne).toBeChecked()
})

test('Checkbox 2 can be unchecked from default checked state', async({ page })=>{
    const pm = new PageManager(page)

    await expect(pm.onCheckboxPage().checkboxTwo).toBeChecked()
    await pm.onCheckboxPage().uncheckCheckboxTwo()
    await expect(pm.onCheckboxPage().checkboxTwo).not.toBeChecked()
})