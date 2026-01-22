import { Page, Locator } from '@playwright/test'

export class OtpPage {

    readonly page: Page
    readonly emailInput: Locator
    readonly otpInput: Locator
    readonly sendButton: Locator
    readonly verifyButton: Locator
    readonly confirmMessage: Locator
    readonly flashMessage: Locator
    readonly otpMessage: Locator
    readonly invalidMessage: Locator

    constructor(page: Page){
        this.page = page
        this.emailInput = page.locator('#email')
        this.otpInput = page.locator('#otp')
        this.sendButton = page.getByRole('button', {name: "Send OTP Code"})
        this.verifyButton = page.getByRole('button', {name: "Verify OTP Code"})
        this.confirmMessage = page.locator('#otp-message')
        this.flashMessage = page.locator('#flash')
        this.otpMessage = page.locator('#otp-message')
        this.invalidMessage = page.locator('.invalid-feedback')
    }

    async submitOtpForm(email: string){
        await this.emailInput.fill(email)
        await this.sendButton.click()
    }

    async submitVerifyForm(code: string){
        await this.otpInput.fill(code)
        await this.verifyButton.click()
    }

    getConfirmMessage(){
        return this.confirmMessage
    }

    getFlashMessage(){
        return this.flashMessage
    }

    getOtpMessage(){
        return this.otpMessage
    }

    getInvalidMessage(){
        return this.invalidMessage
    }

}