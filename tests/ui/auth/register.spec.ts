import { test, expect } from '../../../fixtures/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    await page.goto('/register')
})

test('Register success', async ({ pageManager }) => {
    const randomUsername = (faker.person.firstName() + faker.person.lastName()).toLowerCase() + faker.number.int(500)
    const randomPassword = faker.internet.password()

    await pageManager.onRegisterPage().submitRegisterFormWithCredentials(randomUsername, randomPassword, randomPassword)
    await expect(pageManager.page).toHaveURL('/login')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Successfully registered, you can log in now.')
})

test('Username too short', async ({ pageManager }) => {
    await pageManager.onRegisterPage().submitRegisterFormWithCredentials('a', 'test123!', 'test123!')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Username must be at least 3 characters long.')
})

test('Password too short', async ({ pageManager }) => {
    await pageManager.onRegisterPage().submitRegisterFormWithCredentials(`caret-${Date.now()}`, 'a', 'a')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Password must be at least 4 characters long.')
})

//site does not have a password length limit
// test('Password too long', async ({ pageManager }) => {
//     const longPassword = faker.internet.password({ length: 100 })
//     await pageManager.onRegisterPage().submitRegisterFormWithCredentials(`caret-${Date.now()}`, longPassword, longPassword)
// })

test('Incorrect password', async ({ pageManager }) => {
    const randomPassword = faker.internet.password()

    await pageManager.onRegisterPage().submitRegisterFormWithCredentials(`caret-${Date.now()}`, randomPassword, randomPassword + 'a')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Passwords do not match.')
})

test('Submit form without input', async ({ pageManager }) => {
    await pageManager.onRegisterPage().registerButton.click()
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('All fields are required.')
})

test('Username with spaces', async ({ pageManager }) => {
    await pageManager.onRegisterPage().submitRegisterFormWithCredentials('te st', 'test123!', 'test123!')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Invalid username')
})

test('Username with period', async ({ pageManager }) => {
    const username = faker.person.firstName().toLowerCase() + '.' + faker.person.lastName().toLowerCase()
    await pageManager.onRegisterPage().submitRegisterFormWithCredentials(username, 'test123!', 'test123!')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Invalid username')
})

test('Leading and trailing whitespace is handled correctly', async ({ pageManager }) => {
    await pageManager.onRegisterPage().submitRegisterFormWithCredentials('    abc   ', 'test123!', 'test123!')
    await expect(pageManager.onRegisterPage().flashMessage).toContainText('Invalid username')
})