import { Page } from '@playwright/test'
import { CheckboxPage } from './forms/CheckboxPage'
import { ForgotPasswordPage } from './auth/ForgotPasswordPage'
import { LoginPage } from './auth/LoginPage'
import { OtpPage } from './auth/OtpPage'
import { RegisterPage } from './auth/RegisterPage'
import { ContactPage } from './forms/ContactPage'
import { DropdownMenuPage } from './forms/DropdownMenuPage'
import { RadioButtonsPage } from './forms/RadioButtonsPage'

export class PageManager{

    private readonly page: Page
    private readonly checkboxPage: CheckboxPage
    private readonly forgotPasswordPage: ForgotPasswordPage
    private readonly loginPage: LoginPage
    private readonly otpPage: OtpPage
    private readonly registerPage: RegisterPage
    private readonly contactPage: ContactPage

    constructor(page: Page){
        this.page = page
        this.checkboxPage = new CheckboxPage(this.page)
        this.forgotPasswordPage = new ForgotPasswordPage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.otpPage = new OtpPage(this.page)
        this.registerPage = new RegisterPage(this.page)
        this.contactPage = new ContactPage(this.page)
    }

    getDropdown(selector: string){
        return new DropdownMenuPage(this.page, selector)
    }

    getRadioButton(selector: string){
        return new RadioButtonsPage(this.page, selector)
    }

    onCheckboxPage(){
        return this.checkboxPage
    }

    onForgotPasswordPage(){
        return this.forgotPasswordPage
    }

    onLoginPage(){
        return this.loginPage
    }

    onOtpPage(){
        return this.otpPage
    }

    onRegisterPage(){
        return this.registerPage
    }

    onContactPage(){
        return this.contactPage
    }
}