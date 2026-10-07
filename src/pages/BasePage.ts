// Base page class — shared actions inherited by all page objects
import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}${path}`);
  }

  async clickElement(locator: string): Promise<void> {
    await this.page.locator(locator).click();
  }

  async fillFiled(locator: string, value: string): Promise<void> {
    await this.page.locator(locator).fill(value);
  }

  async getText(locator: string): Promise<string> {
    return await this.page.locator(locator).innerText();
  }

  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }

  async waitForElement(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({ state: "visible" });
  }

  async getElementCount(locator: string): Promise<number> {
    return await this.page.locator(locator).count();
  }
  async selectDropdown(locator: string, value: string): Promise<void> {
    await this.page.locator(locator).selectOption(value);
  }
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
  async screenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      path: `reports/screenshots/${name}.png`,
      fullPage: true, // captures entire page, not just visible viewport
    });
  }
}
