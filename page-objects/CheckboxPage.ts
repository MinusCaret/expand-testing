import { Page, Locator } from '@playwright/test'

export class CheckboxPage {

    readonly page: Page
    readonly checkboxOne: Locator
    readonly checkboxTwo: Locator

    constructor(page: Page){
        this.page = page
        this.checkboxOne = page.locator('#checkbox1')
        this.checkboxTwo = page.locator('#checkbox2')
    }

    async checkCheckboxOne(){
        await this.checkboxOne.check()
    }

    async checkCheckboxTwo(){
        await this.checkboxTwo.check()
    }

    async uncheckCheckboxOne(){
        await this.checkboxOne.uncheck()
    }

    async uncheckCheckboxTwo(){
        await this.checkboxTwo.uncheck()
    }

}