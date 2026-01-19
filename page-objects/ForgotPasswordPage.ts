import { Page, Locator } from '@playwright/test'

export class ForgotPasswordPage {
    readonly emailInput: Locator
    readonly passwordButton: Locator
    readonly confirmMessage: Locator
    readonly invalidMessage: Locator

    constructor(page: Page){
        this.emailInput = page.locator('#email')
        this.passwordButton = page.getByRole('button', {name: "Retrieve password"})
        this.confirmMessage = page.locator('#confirmation-alert')
        this.invalidMessage = page.locator('.invalid-feedback')
    }

    async submitForgotPassword(email: string){
        await this.emailInput.fill(email)
        await this.passwordButton.click()
    }

    getConfirmMessage(){
        return this.confirmMessage
    }
    getInvalidMessage(){
        return this.invalidMessage
    }
}