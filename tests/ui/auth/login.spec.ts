import { test, expect } from '../../../fixtures/test';

test.beforeEach(async({ page }) => {
   await page.goto('/login')
 })

 test('Login successfully with valid credentials', async ({ pageManager }) => {
   await pageManager.onLoginPage().loginAsPracticeUser()
   await expect(pageManager.onLoginPage().getFlashMessage()).toContainText('You logged into a secure area!')
   await expect(pageManager.page).toHaveURL('/secure');
   await expect(pageManager.onLoginPage().getLogoutButton()).toBeVisible()
 })

 test('Invalid Username', async ({ pageManager }) => {
   await pageManager.onLoginPage().loginWithInvalidUsername()
   await expect(pageManager.onLoginPage().getFlashMessage()).toContainText('Your username is invalid!')
 })

 test('Invalid Password', async ({ pageManager }) => {
   await pageManager.onLoginPage().loginWithInvalidPassword()
   await expect(pageManager.onLoginPage().getFlashMessage()).toContainText('Your password is invalid!')
 })

 test('Logout', async ({ pageManager }) => {
   await pageManager.onLoginPage().loginAsPracticeUser()
   await pageManager.onLoginPage().logout()
   await expect(pageManager.onLoginPage().getFlashMessage()).toContainText('You logged out of the secure area!')
 })
