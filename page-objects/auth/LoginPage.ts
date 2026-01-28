import { Page, Locator } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class LoginPage extends HelperBase{

  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly flashMessage: Locator
  readonly loginButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.flashMessage = page.locator('#flash-message')
    this.loginButton = page.getByRole('button', {name: "Login"})
    this.logoutButton = page.getByRole('link', { name: 'Logout' })
  }

  /**
   * Fills out the login form with user details
   * @param email - email for test user
   * @param password - password for test user
   */
  async submitLoginForm(email: string, password: string) {
    await this.fill(this.emailInput, email)
    await this.fill(this.passwordInput, password)
    await this.click(this.loginButton)
  }

  async loginAsPracticeUser() {
    await this.submitLoginForm('practice', 'SuperSecretPassword!')
  }

  async loginWithInvalidUsername() {
    await this.submitLoginForm('we', 'SuperSecretPassword!')
  }

  async loginWithInvalidPassword() {
    await this.submitLoginForm('practice', 'we')
  }

  async logout() {
    await this.logoutButton.click()
  }

  getFlashMessage() {
    return this.flashMessage
  }

  getLogoutButton() {
    return this.logoutButton
  }
}