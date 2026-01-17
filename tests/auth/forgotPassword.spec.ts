import { test, expect } from '../../fixtures/test';
import { ForgotPasswordPage } from '../../page-objects/ForgotPasswordPage';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/forgot-password')
})

test('Submit form with valid credential', async ({page}) => {
    const onForgotPasswordForm = new ForgotPasswordPage(page)
    await onForgotPasswordForm.submitForgotPassword("test@test.com")
    await expect(onForgotPasswordForm.getConfirmMessage()).toBeVisible()
})

test('Submit form with invalid credential', async ({page}) => {
    const onForgotPasswordForm = new ForgotPasswordPage(page)
    await onForgotPasswordForm.submitForgotPassword("we")
    await expect(onForgotPasswordForm.getInvalidMessage()).toBeVisible()
})