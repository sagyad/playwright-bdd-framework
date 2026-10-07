import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  private invetoryItems = ".inventory_item";
  constructor(page: Page) {
    super(page);
  }

  async isOnInventoryPage(): Promise<boolean> {
    await this.page.waitForURL("**/inventory.html");
    const currentUrl = await this.getCurrentUrl();
    return currentUrl.includes("inventory");
  }

  async getItemCount(): Promise<number> {
    return await this.getElementCount(this.invetoryItems);
  }
}
