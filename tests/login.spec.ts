import { test, expect } from '../fixtures/test';

test.beforeEach(async({page}) => {
   await page.goto("https://practice.expandtesting.com/login")
 })

test('Login Success', async ({page})=>{
    const loginForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')
    
    await loginForm.getByRole('textbox', {name: "Username"}).fill('practice')
    await loginForm.getByRole('textbox', {name: "Password"}).fill('SuperSecretPassword!')
    await loginForm.getByRole('button', {name: "Login"}).click()
    await expect(page).toHaveURL('https://practice.expandtesting.com/secure', { timeout: 10000 })
    await expect(flashMessage).toContainText('You logged into a secure area!')
    await expect(page.locator('.icon-2x.icon-signout')).toHaveText(' Logout') //there was a space before 'Logout' in the element
})

test('Invalid Username', async ({page})=>{
    const loginForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')

    await loginForm.getByRole('textbox', {name: "Username"}).fill('wrongUsername')
    await loginForm.getByRole('textbox', {name: "Password"}).fill('SuperSecretPassword!')
    await loginForm.getByRole('button', {name: "Login"}).click()
    await expect(flashMessage).toContainText('Your username is invalid!')
    await expect(page).toHaveURL("https://practice.expandtesting.com/login")
})

test('Invalid Password', async ({page})=>{
    const loginForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')

    await loginForm.getByRole('textbox', {name: "Username"}).fill('practice')
    await loginForm.getByRole('textbox', {name: "Password"}).fill('WrongPassword')
    await loginForm.getByRole('button', {name: "Login"}).click()
    await expect(flashMessage).toContainText('Your password is invalid!')
    await expect(page).toHaveURL("https://practice.expandtesting.com/login")
})
