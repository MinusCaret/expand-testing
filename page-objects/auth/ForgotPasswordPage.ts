import { Page, Locator } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class ForgotPasswordPage extends HelperBase {
    
    readonly emailInput: Locator
    readonly passwordButton: Locator
    readonly confirmMessage: Locator
    readonly invalidMessage: Locator

    constructor(page: Page){
        super(page)
        this.emailInput = page.locator('#email')
        this.passwordButton = page.getByRole('button', {name: "Retrieve password"})
        this.confirmMessage = page.locator('#confirmation-alert')
        this.invalidMessage = page.locator('.invalid-feedback')
    }

    async submitForgotPassword(email: string){
        await this.fill(this.emailInput, email)
        await this.click(this.passwordButton)
    }

    getConfirmMessage(){
        return this.confirmMessage
    }
    getInvalidMessage(){
        return this.invalidMessage
    }
}