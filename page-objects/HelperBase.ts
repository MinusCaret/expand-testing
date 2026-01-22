import { Locator, Page, expect } from "@playwright/test";

export class HelperBase{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async click(locator: Locator){
        await locator.click()
    }

    async fill(locator:Locator, value: string){
        await locator.fill(value)
    }

    async expectVisible(locator: Locator) {
        await expect(locator).toBeVisible()
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

}