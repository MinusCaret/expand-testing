import { test, expect } from '../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/register')
})

test('Register Successful', async ({page}) => {
    const registerForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')
    const username = `caret-${Date.now()}`

    await registerForm.getByRole('textbox', {name: 'username'}).fill(username)
    await registerForm.locator('#password').fill('test123!')
    await registerForm.locator('#confirmPassword').fill('test123!')
    await registerForm.getByRole('button', {name: "Register"}).click()
    await expect(page).toHaveURL('https://practice.expandtesting.com/login', { timeout: 15000 })
    await expect(flashMessage).toContainText('Successfully registered, you can log in now.')
})

test('Username too short', async ({page}) => {
    const registerForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')

    await registerForm.getByRole('textbox', {name: 'username'}).fill('we')
    await registerForm.locator('#password').fill('test123')
    await registerForm.locator('#confirmPassword').fill('test123')
    await registerForm.getByRole('button', {name: "Register"}).click()
    await expect(flashMessage).toContainText('Username must be at least 3 characters long.')
})

test('Password too short', async ({page}) => {
    const registerForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')

    await registerForm.getByRole('textbox', {name: 'username'}).fill('MinusCaret')
    await registerForm.locator('#password').fill('a')
    await registerForm.locator('#confirmPassword').fill('a')
    await registerForm.getByRole('button', {name: "Register"}).click()
    await expect(flashMessage).toContainText('Password must be at least 4 characters long.')
})

test('Incorrect password', async ({page}) => {
    const registerForm = page.locator('.card-body')
    const flashMessage = page.locator('#flash-message')

    await registerForm.getByRole('textbox', {name: 'username'}).fill('MinusCaret')
    await registerForm.locator('#password').fill('test123')
    await registerForm.locator('#confirmPassword').fill('test')
    await registerForm.getByRole('button', {name: "Register"}).click()
    await expect(flashMessage).toContainText('Passwords do not match.')
})

