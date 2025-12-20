import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/locators')
})

test ('getbyRole Button', async ({page}) => {
    await page.getByRole('button', {name: "Add Item"}).click()
})

test ('getbyRole Link', async ({page}) => {
    await page.getByRole('link', {name: "Contact"}).click()
    await expect(page).toHaveURL('https://practice.expandtesting.com/contact')
})