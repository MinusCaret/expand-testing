import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/otp-login')
})

test('Send OTP code to valid email', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onOtpPage().submitOtpForm('practice@expandtesting.com')
    await expect(page).toHaveURL('https://practice.expandtesting.com/otp-login');
    await expect(pm.onOtpPage().otpMessage).toContainText('practice@expandtesting.com')
})

test('Verify valid OTP code', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onOtpPage().submitOtpForm('practice@expandtesting.com')
    await expect(page).toHaveURL('https://practice.expandtesting.com/otp-login');
    await expect(pm.onOtpPage().otpMessage).toContainText('practice@expandtesting.com')
    await pm.onOtpPage().submitVerifyForm('214365')
    await expect(page).toHaveURL('https://practice.expandtesting.com/secure');
    await expect(pm.onOtpPage().flashMessage).toHaveText('You logged into a secure area!')
})

test('Send OTP code to invalid email', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onOtpPage().submitOtpForm('test')
    await expect(pm.onOtpPage().invalidMessage).toBeVisible()
})

test('Verify invalid OTP', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onOtpPage().submitOtpForm('practice@expandtesting.com')
    await expect(page).toHaveURL('https://practice.expandtesting.com/otp-login');
    await expect(pm.onOtpPage().otpMessage).toContainText('practice@expandtesting.com')
    await pm.onOtpPage().submitVerifyForm('1')
    await expect(pm.onOtpPage().otpMessage).toContainText('The provided OTP code is incorrect. Please check your code and try again.')
})