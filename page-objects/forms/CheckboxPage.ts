import { Page, Locator } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class CheckboxPage extends HelperBase {

    readonly checkboxOne: Locator
    readonly checkboxTwo: Locator

    constructor(page: Page){
        super(page)
        this.checkboxOne = page.locator('#checkbox1')
        this.checkboxTwo = page.locator('#checkbox2')
    }

    async checkCheckboxOne(){
        await this.check(this.checkboxOne)
    }

    async checkCheckboxTwo(){
        await this.check(this.checkboxTwo)
    }

    async uncheckCheckboxOne(){
        await this.uncheck(this.checkboxOne)
    }

    async uncheckCheckboxTwo(){
        await this.uncheck(this.checkboxTwo)
    }

}