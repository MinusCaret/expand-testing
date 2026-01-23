import { test } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/dropdown')
})

test('Validate options in Simple dropdown', async ({page}) => {
    const pm = new PageManager(page)

    await pm.getDropdown('#dropdown').validateDropdownIsUsable()
})

test('Validate options in Elements', async ({page}) => {
    const pm = new PageManager(page)

    await pm.getDropdown('#elementsPerPageSelect').validateDropdownIsUsable()
})

test('Validate options in Country dropdown', async ({page}) => {
    const pm = new PageManager(page)

    await pm.getDropdown('#country').validateDropdownIsUsable()
})