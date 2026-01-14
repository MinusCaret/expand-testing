import { test, expect } from '../fixtures/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://practice.expandtesting.com/dropdown')
})

//ID is #, class is .

test('Simple Dropdown', async({page}) => {
    const simpleMenu = page.locator('#dropdown')

    //first value has disabled="disabled"
    const simpleList = simpleMenu.locator('option:not([disabled])')

    //assert structure
    await expect(simpleList).toHaveCount(2)
    await expect(simpleList).toHaveText(["Option 1", "Option 2"])

    //loop through selectable options
    const options = [
        { value: "1", text: "Option 1" },
        { value: "2", text: "Option 2" },
    ];

    //apparently this is a cleaner method since it's selectOption()
    for(const option of options){
        await simpleMenu.selectOption(option.value);
        await expect(simpleMenu).toHaveValue(option.value);
    }
})

test('Elements', async ({page}) => {
    const elementMenu = page.locator('#elementsPerPageSelect')

    const elementList = elementMenu.locator('option')
    //assert correct number of values
    await expect(elementList).toHaveCount(4)

    const numbers = [ "10", "20", "50", "100" ]
    await expect(elementList).toContainText(numbers)
    await elementMenu.selectOption("100")

    //cycle through all the values once
    for(const number of numbers){
            //select option
            await elementMenu.selectOption(number);
            //assert selected value
            await expect(elementMenu).toHaveValue(number);
            if(number != "100"){
                await elementMenu.click()
            }
        }
})

test('Country', async({page}) => {
    const countryMenu = page.locator('#country')
    await countryMenu.click()

    //const countryList = countryMenu.locator('option value=""')
    await countryMenu.selectOption("Andorra")
})