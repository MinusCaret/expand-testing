import { Page, expect } from '@playwright/test'
export class LoginPage {
  readonly emailInput;
  readonly passwordInput;
  readonly flashMessage;
  readonly logoutButton;

  constructor(private page: Page) {
    this.emailInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.flashMessage = page.locator('#flash-message');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  /**
   * This method will fill out the login form with user details
   * @param email - email for test user
   * @param password - password for test user
   */
  async submitLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.locator('button[type="submit"]').click();
  }

  async loginAsPracticeUser() {
    await this.submitLoginForm('practice', 'SuperSecretPassword!');
  }

  async loginWithInvalidUsername() {
    await this.submitLoginForm('we', 'SuperSecretPassword!');
  }

  async loginWithInvalidPassword() {
    await this.submitLoginForm('practice', 'we');
  }

  async logout() {
    await this.logoutButton.click();
  }

  getFlashMessage() {
    return this.flashMessage
  }

  getLogoutButton() {
    return this.logoutButton
  }
}