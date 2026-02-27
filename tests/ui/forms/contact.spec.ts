import { test, expect } from '../../../fixtures/test';
import { PageManager } from '../../../page-objects/PageManager';
import {faker} from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    await page.goto('/contact')
})

test('Successfully submit form', async ({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int({max: 1000})}@test.com`
    const randomText = faker.lorem.lines(3)

    await pm.onContactPage().fillForm(randomFullName, randomEmail, randomText)
    await pm.onContactPage().submitForm()
})

//submitting the form with empty input fields does not trigger any state changes
//submitting the form with an invalid email does not trigger any state changes

