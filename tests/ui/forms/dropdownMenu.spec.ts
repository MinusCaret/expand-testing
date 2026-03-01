import { test } from '../../../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('/dropdown')
})

test('Validate options in Simple dropdown', async ({ pageManager }) => {
    await pageManager.getDropdown('#dropdown').validateDropdownIsUsable()
})

test('Validate options in Elements', async ({ pageManager }) => {
    await pageManager.getDropdown('#elementsPerPageSelect').validateDropdownIsUsable()
})

test('Validate options in Country dropdown', async ({ pageManager }) => {
    await pageManager.getDropdown('#country').validateDropdownIsUsable()
})