import { Page, Locator } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class RegisterPage extends HelperBase {

    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly confirmPasswordInput: Locator
    readonly registerButton: Locator
    readonly flashMessage: Locator

    constructor(page:Page){
        super(page)
        this.usernameInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.confirmPasswordInput = page.locator('#confirmPassword')
        this.registerButton = page.getByRole('button', {name: "Register"})
        this.flashMessage = page.locator('#flash-message')
    }

    /**
     * Fills out the register form with user details
     * @param username - username for test user
     * @param password - password for test user
     * @param confirm - confirmation password (must match password for success)
     */
    async submitRegisterFormWithCredentials(username: string, password: string, confirm: string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.confirmPasswordInput.fill(confirm)
        await this.click(this.registerButton)
    }

    getFlashMessage(){
        return this.flashMessage
    }

}