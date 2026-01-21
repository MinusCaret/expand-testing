import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/forgot-password')
})

test('Submit form with valid credential', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onForgotPasswordPage().submitForgotPassword("test@test.com")
    await expect(pm.onForgotPasswordPage().getConfirmMessage()).toBeVisible()
})

test('Submit form with invalid credential', async ({page}) => {
    const pm = new PageManager(page)

    await pm.onForgotPasswordPage().submitForgotPassword("we")
    await expect(pm.onForgotPasswordPage().getInvalidMessage()).toBeVisible()
})