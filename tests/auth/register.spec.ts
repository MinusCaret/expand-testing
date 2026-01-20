import { test, expect } from '../../fixtures/test';
import { RegisterPage } from '../../page-objects/RegisterPage';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/register')
})

test('Register success', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.submitRegisterFormWithCredentials(`caret-${Date.now()}`, 'test123!', 'test123!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login', { timeout: 15000 })
    await expect(onRegisterPage.flashMessage).toContainText('Successfully registered, you can log in now.')
})

test('Username too short', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.submitRegisterFormWithCredentials('a', 'test123!', 'test123!')
    await expect(onRegisterPage.flashMessage).toContainText('Username must be at least 3 characters long.')
})

test('Password too short', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.submitRegisterFormWithCredentials(`caret-${Date.now()}`, 'a', 'a')
    await expect(onRegisterPage.flashMessage).toContainText('Password must be at least 4 characters long.')
})

test('Incorrect password', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.submitRegisterFormWithCredentials(`caret-${Date.now()}`, 'test123!', 'test')
    await expect(onRegisterPage.flashMessage).toContainText('Passwords do not match.')
})

test('Submit form without input', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.registerButton.click()
    await expect(onRegisterPage.flashMessage).toContainText('All fields are required.')
})

test('Username with spaces', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.submitRegisterFormWithCredentials('te st', 'test123!', 'test123!')
    await expect(onRegisterPage.flashMessage).toContainText('Invalid username')
})

test('Leading and trailing whitespace is handled correctly', async ({page}) => {
    const onRegisterPage = new RegisterPage(page)

    await onRegisterPage.submitRegisterFormWithCredentials('    abv   ', 'test123!', 'test123!')
    await expect(onRegisterPage.flashMessage).toContainText('Invalid username')
})