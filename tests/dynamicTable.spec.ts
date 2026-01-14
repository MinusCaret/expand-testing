import { test, expect } from '../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/dynamic-table')
})

