import { test, expect } from '../../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/contact')
})

test('Success', async ({page}) => {
    //textboxes didn't have labels
    const nameField = page.locator('.mb-3', {hasText: "Name"})
    const passwordField = page.locator('.mb-3', {hasText: "Email"})
    const messageField = page.locator('.mb-3', {hasText: "You message"}) //Typo intended

    await nameField.getByRole('textbox').fill('Caret')
    await passwordField.getByRole('textbox').fill('test@test.com') 
    await messageField.getByRole('textbox').fill('Hi') 
    await page.getByRole('link', { name: 'Send' }).click();
    //should avoid copying and pasting entire class
    //await page.locator('[class="btn btn-primary px-4 me-3"]').click()
    await expect(page).toHaveURL("https://practice.expandtesting.com/contact#")
})

