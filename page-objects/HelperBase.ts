import { Page, expect } from "@playwright/test";

export class HelperBase{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async click(locator: string){
        await this.page.locator(locator).click()
    }

    async expectVisible(locator: string) {
        await expect(this.page.locator(locator)).toBeVisible()
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }


}