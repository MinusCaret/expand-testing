import { test, expect } from '../../fixtures/test';
import { CheckboxPage } from '../../page-objects/CheckboxPage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/checkboxes')
})

test('Checkbox 1 can be checked from default unchecked state', async({ page })=> {
    const onCheckboxPage = new CheckboxPage(page)

    await expect(onCheckboxPage.checkboxOne).not.toBeChecked()
    await onCheckboxPage.checkCheckboxOne()
    await expect(onCheckboxPage.checkboxOne).toBeChecked()
})

test('Checkbox 2 can be unchecked from default checked state', async({ page })=>{
    const onCheckboxPage = new CheckboxPage(page)

    await expect(onCheckboxPage.checkboxTwo).toBeChecked()
    await onCheckboxPage.uncheckCheckboxTwo()
    await expect(onCheckboxPage.checkboxTwo).not.toBeChecked()
})