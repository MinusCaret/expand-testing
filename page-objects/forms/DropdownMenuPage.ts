import { Page, Locator, expect } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class DropdownMenuPage extends HelperBase{

    readonly menu: Locator
    readonly options: Locator

    constructor(page: Page, selector: string){
        super(page)

        if (!selector) {
            throw new Error('DropdownMenuPage requires a selector')
        }

        this.menu = page.locator(selector)
        this.options = this.menu.locator('option:not([disabled])')
    }

    async validateDropdownIsUsable() {
    // has options
    const count = await this.options.count()
    //expect dropdown isn't empty
    expect(count).toBeGreaterThan(0)

    // grab all values dynamically
    const values = await this.options.evaluateAll(
        opts => opts.map(o => (o as HTMLOptionElement).value)
    )

    // loop & validate selection works
    for (const value of values) {
        await this.menu.selectOption(value)
        await expect(this.menu).toHaveValue(value)
    }
  }
}

