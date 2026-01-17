import { test, expect } from '../../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/otp-login')
})

test('Success', async ({page}) => {
    const confirmMessage = page.locator('#otp-message')
    const flashMessage = page.locator('#flash')

    await page.locator('#email').fill('practice@expandtesting.com')
    await page.getByRole('button', {name: "Send OTP Code"}).click()
    await expect(confirmMessage).toContainText("We've sent an OTP code to your email: ")
    await page.locator('#otp').fill('214365')
    await page.getByRole('button', {name: "Verify OTP Code"}).click()
    await expect(page).toHaveURL('https://practice.expandtesting.com/secure')
    await expect(flashMessage).toContainText('You logged into a secure area!')
})

test('Invalid email', async ({page}) => {
    const confirmMessage = page.locator('#otp-message')

    await page.locator('#email').fill('wew')
    await page.getByRole('button', {name: "Send OTP Code"}).click()
    await expect(page.locator('.invalid-feedback')).toContainText(" Please enter a valid email address. ")
})

test('Invalid OTP', async ({page}) => {
    const confirmMessage = page.locator('#otp-message')

    await page.locator('#email').fill('practice@expandtesting.com')
    await page.getByRole('button', {name: "Send OTP Code"}).click()
    await expect(confirmMessage).toContainText("We've sent an OTP code to your email: ")
    await page.locator('#otp').fill('1')
    await page.getByRole('button', {name: "Verify OTP Code"}).click()
    await expect(page.locator('.alert-danger')).toContainText("The provided OTP code is incorrect. Please check your code and try again.")
})