import { test, expect } from '../../fixtures/test';
import { OtpPage } from '../../page-objects/OtpPage';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/otp-login')
})

test('Send OTP code to valid email', async ({page}) => {
    const onOtpPage = new OtpPage(page)

    await onOtpPage.submitOtpForm('practice@expandtesting.com')
    await expect(page).toHaveURL('https://practice.expandtesting.com/otp-login');
    await expect(onOtpPage.otpMessage).toContainText('practice@expandtesting.com')
})

test('Verify valid OTP code', async ({page}) => {
    const onOtpPage = new OtpPage(page)

    await onOtpPage.submitOtpForm('practice@expandtesting.com')
    await expect(page).toHaveURL('https://practice.expandtesting.com/otp-login');
    await expect(onOtpPage.otpMessage).toContainText('practice@expandtesting.com')
    await onOtpPage.submitVerifyForm('214365')
    await expect(page).toHaveURL('https://practice.expandtesting.com/secure');
    await expect(onOtpPage.flashMessage).toHaveText('You logged into a secure area!')
})

test('Send OTP code to invalid email', async ({page}) => {
    const onOtpPage = new OtpPage(page)

    await onOtpPage.submitOtpForm('test')
    await expect(onOtpPage.invalidMessage).toBeVisible()
})

test('Verify invalid OTP', async ({page}) => {
    const onOtpPage = new OtpPage(page)

    await onOtpPage.submitOtpForm('practice@expandtesting.com')
    await expect(page).toHaveURL('https://practice.expandtesting.com/otp-login');
    await expect(onOtpPage.otpMessage).toContainText('practice@expandtesting.com')
    await onOtpPage.submitVerifyForm('1')
    await expect(onOtpPage.otpMessage).toContainText('The provided OTP code is incorrect. Please check your code and try again.')
})