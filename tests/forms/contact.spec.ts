import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/contact')
})

test('Successfully submit form', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onContactPage().fillForm('Caret', 'test@test.com', 'test')
    await pm.onContactPage().submitForm()
})

//submitting the form with empty input fields does not trigger any state changes

