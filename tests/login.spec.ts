import { test } from '../fixtures/test';
import { LoginPage } from '../page-objects/loginPage';

test.beforeEach(async({page}) => {
   await page.goto("https://practice.expandtesting.com/login")
 })

 test('Login Success', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginAsPracticeUser()
 })

 test('Invalid Username', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginWithInvalidUsername()
 })

 test('Invalid Password', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginWithInvalidPassword()
 })

 test('Logout', async ({page}) => {
    const onLoginForm = new LoginPage(page)
    await onLoginForm.loginAsPracticeUser()
    await onLoginForm.logout()
 })
