import { Page } from '@playwright/test'
import { CheckboxPage } from './forms/CheckboxPage'
import { ForgotPasswordPage } from './auth/ForgotPasswordPage'
import { LoginPage } from './auth/LoginPage'
import { OtpPage } from './auth/OtpPage'
import { RegisterPage } from './auth/RegisterPage'

export class PageManager{

    private readonly page: Page
    private readonly checkboxPage: CheckboxPage
    private readonly forgotPasswordPage: ForgotPasswordPage
    private readonly loginPage: LoginPage
    private readonly otpPage: OtpPage
    private readonly registerPage: RegisterPage

    constructor(page: Page){
        this.page = page
        this.checkboxPage = new CheckboxPage(this.page)
        this.forgotPasswordPage = new ForgotPasswordPage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.otpPage = new OtpPage(this.page)
        this.registerPage = new RegisterPage(this.page)
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

}