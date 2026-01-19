import { test, expect } from '../../fixtures/test';
import { LoginPage } from '../../page-objects/loginPage';

test.beforeEach(async({page}) => {
   await page.goto("https://practice.expandtesting.com/login")
 })

 test('Login successfully with valid credentials', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginAsPracticeUser()
    await expect(onLoginForm.getFlashMessage()).toContainText('You logged into a secure area!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/secure');
    await expect(onLoginForm.getLogoutButton()).toBeVisible()
 })

 test('Invalid Username', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginWithInvalidUsername()
    await expect(onLoginForm.getFlashMessage()).toContainText('Your username is invalid!')
 })

 test('Invalid Password', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginWithInvalidPassword()
    await expect(onLoginForm.getFlashMessage()).toContainText('Your password is invalid!')
 })

 test('Logout', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginAsPracticeUser()
    await onLoginForm.logout()
    await expect(onLoginForm.getFlashMessage()).toContainText('You logged out of the secure area!')
 })
