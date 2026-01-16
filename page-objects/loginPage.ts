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

  async submitLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.locator('button[type="submit"]').click();
  }

  async loginAsPracticeUser() {
    await this.submitLoginForm('practice', 'SuperSecretPassword!');
    await expect(this.page).toHaveURL('https://practice.expandtesting.com/secure');
    await expect(this.flashMessage).toContainText('You logged into a secure area!');
    await expect(this.logoutButton).toBeVisible();
  }

  async loginWithInvalidUsername() {
    await this.submitLoginForm('we', 'SuperSecretPassword!');
    await expect(this.flashMessage).toContainText('Your username is invalid!');
  }

  async loginWithInvalidPassword() {
    await this.submitLoginForm('practice', 'we');
    await expect(this.flashMessage).toContainText('Your password is invalid!');
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.flashMessage).toContainText('You logged out of the secure area!');
  }
}