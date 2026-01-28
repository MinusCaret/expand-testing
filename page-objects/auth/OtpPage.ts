import { Page, Locator } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class OtpPage extends HelperBase{

    readonly emailInput: Locator
    readonly otpInput: Locator
    readonly sendButton: Locator
    readonly verifyButton: Locator
    readonly confirmMessage: Locator
    readonly flashMessage: Locator
    readonly otpMessage: Locator
    readonly invalidMessage: Locator

    constructor(page: Page){
        super(page)
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
        await this.fill(this.emailInput, email)
        await this.click(this.sendButton)
    }

    async submitVerifyForm(code: string){
        await this.fill(this.otpInput, code)
        await this.click(this.verifyButton)
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