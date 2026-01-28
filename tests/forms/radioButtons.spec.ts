import { test, expect } from '../../fixtures/test';
import { PageManager } from '../../page-objects/PageManager';

test.beforeEach(async ({page})=> {
    await page.goto('https://practice.expandtesting.com/radio-buttons')
})

test('Colours', async ({page})=> {
  const colourCard = await page.locator('.card', {hasText: 'Select your favorite color:'})
  //await colourCard.locator('#red').click()
  //const greenRadio = colourCard.locator('#green')
  //await expect(greenRadio).toBeDisabled()

  const colours = [{value: 'blue', text: "Blue", disabled: false},
    {value: 'red', text: "Red", disabled: false}, 
    {value: 'yellow', text: "Yellow", disabled: false},
    {value: 'black', text: "Black", disabled: false},
    {value: 'green', text: "Green", disabled: true} 
  ]

  for(const colour of colours)
    {
      const radio = colourCard.locator(`#${colour.value}`)

      if(colour.disabled){
        await expect(radio).toBeDisabled()
        await expect(radio).not.toBeChecked()
      } else {
        await expect(radio).toBeEnabled()
        await radio.check()
        await expect(radio).toBeChecked()
      }
    }
})

test('Sport', async({page})=>{
  const sportCard = await page.locator('.card', {hasText: "Select your favorite sport:"})

  const sports = [{value: "basketball", text:"Basketball"},
    {value: "football", text:"Football"},
{value: "tennis", text:"Tennis"}
  ]

  for(const sport of sports){
    const radio = sportCard.locator(`#${sport.value}`)
    await expect(radio).toBeEnabled()
    await radio.check()
    await expect(radio).toBeChecked()
  }
})