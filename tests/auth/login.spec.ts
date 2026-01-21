import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async({page}) => {
   await page.goto("https://practice.expandtesting.com/login")
 })

 test('Login successfully with valid credentials', async ({page}) => {
   const pm = new PageManager(page)

   await pm.onLoginPage().loginAsPracticeUser()
   await expect(pm.onLoginPage().getFlashMessage()).toContainText('You logged into a secure area!')
   await expect(page).toHaveURL('https://practice.expandtesting.com/secure');
   await expect(pm.onLoginPage().getLogoutButton()).toBeVisible()
 })

 test('Invalid Username', async ({page}) => {
   const pm = new PageManager(page)

   await pm.onLoginPage().loginWithInvalidUsername()
   await expect(pm.onLoginPage().getFlashMessage()).toContainText('Your username is invalid!')
 })

 test('Invalid Password', async ({page}) => {
   const pm = new PageManager(page)

   await pm.onLoginPage().loginWithInvalidPassword()
   await expect(pm.onLoginPage().getFlashMessage()).toContainText('Your password is invalid!')
 })

 test('Logout', async ({page}) => {
   const pm = new PageManager(page)

   await pm.onLoginPage().loginAsPracticeUser()
   await pm.onLoginPage().logout()
   await expect(pm.onLoginPage().getFlashMessage()).toContainText('You logged out of the secure area!')
 })
