// ---------- Login page object — locators and actions for SauceDemo login screen ----------

import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage {
  // Locators - CSS selectors indentifying each element on the Login Page
  private usernameField = "#user-name";
  private passwordField = "#password";
  private loginButton = "#login-button";
  private errorMessage = "[data-test='error']";

  constructor(page: Page) {
    super(page);
  }

  async goToLoginPage(): Promise<void> {
    await this.navigate("/");
  }

  async enterUserName(username: string): Promise<void> {
    await this.fillFiled(this.usernameField, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillFiled(this.passwordField, password);
  }

  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}
