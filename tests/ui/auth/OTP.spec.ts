import { test, expect } from '../../../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('/otp-login')
})

test('Send OTP code to valid email', async ({ pageManager }) => {
    await pageManager.onOtpPage().submitOtpForm('practice@expandtesting.com')
    await expect(pageManager.page).toHaveURL('/otp-login');
    await expect(pageManager.onOtpPage().otpMessage).toContainText('practice@expandtesting.com')
})

test('Verify valid OTP code', async ({ pageManager }) => {
    await pageManager.onOtpPage().submitOtpForm('practice@expandtesting.com')
    await expect(pageManager.page).toHaveURL('/otp-login');
    await expect(pageManager.onOtpPage().otpMessage).toContainText('practice@expandtesting.com')
    await pageManager.onOtpPage().submitVerifyForm('214365')
    await expect(pageManager.page).toHaveURL('/secure');
    await expect(pageManager.onOtpPage().flashMessage).toHaveText('You logged into a secure area!')
})

test('Send OTP code to invalid email', async ({ pageManager }) => {
    await pageManager.onOtpPage().submitOtpForm('test')
    await expect(pageManager.onOtpPage().invalidMessage).toBeVisible()
})

test('Verify invalid OTP', async ({ pageManager }) => {
    await pageManager.onOtpPage().submitOtpForm('practice@expandtesting.com')
    await expect(pageManager.page).toHaveURL('/otp-login');
    await expect(pageManager.onOtpPage().otpMessage).toContainText('practice@expandtesting.com')
    await pageManager.onOtpPage().submitVerifyForm('1')
    await expect(pageManager.onOtpPage().otpMessage).toContainText('The provided OTP code is incorrect. Please check your code and try again.')
})