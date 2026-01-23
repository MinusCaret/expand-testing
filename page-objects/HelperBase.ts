import { Locator, Page, expect } from "@playwright/test";

export class HelperBase{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async check(locator:Locator){
        await locator.check()
    }

    async click(locator: Locator){
        await locator.click()
    }

    async expectVisible(locator: Locator){
        await expect(locator).toBeVisible()
    }

    async fill(locator:Locator, value: string){
        await locator.fill(value)
    }

    async uncheck(locator:Locator){
        await locator.uncheck()
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

}