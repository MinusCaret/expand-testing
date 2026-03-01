import { test, expect } from '../../../fixtures/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password')
})

test('Submit form with valid credential', async ({ pageManager }) => {
     await pageManager.onForgotPasswordPage().submitForgotPassword("test@test.com")
    await expect(pageManager.onForgotPasswordPage().getConfirmMessage()).toBeVisible()
})

test('Submit form with invalid credential', async ({ pageManager }) => {
    await pageManager.onForgotPasswordPage().submitForgotPassword("we")
    await expect(pageManager.onForgotPasswordPage().getInvalidMessage()).toBeVisible()
})