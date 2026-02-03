import { Page, Locator, expect } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class RadioButtonsPage extends HelperBase{

    readonly card: Locator
    readonly radios: Locator

    constructor(page: Page, selector: string){
        super(page)
        this.card = page.locator(selector)
        this.radios = this.card.locator('input[type="radio"]')
    }

    async validateRadioButtons() {
    // ensure buttons exist
    const count = await this.radios.count()
    expect(count).toBeGreaterThan(0)
    
    //loop through each radio
    for (let i = 0; i < count; i++) {
    const radio = this.radios.nth(i)

    if (await radio.isDisabled()) {
      await expect(radio).toBeDisabled()
      continue
    }

    await radio.check()
    await expect(radio).toBeChecked()
  }
}
}