import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/forgot-password')
})

test('Correct email', async ({page}) => {
    const registerForm = page.locator('.card-body')
    const confirmMessage = page.locator('#confirmation-alert')

    await registerForm.locator('#email').fill('test@test.com')
    await registerForm.getByRole('button', {name: "Retrieve password"}).click()
    await expect(confirmMessage).toContainText(' An e-mail has been sent to you which explains how to reset your password. ')
})

test("Invalid email", async ({page}) => {
    const registerForm = page.locator('.card-body')

    await registerForm.locator('#email').fill('wewe')
    await registerForm.getByRole('button', {name: "Retrieve password"}).click()
    expect(page.locator('.invalid-feedback')).toContainText(' Please enter a valid email address. ')
})