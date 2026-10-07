// Custom Cucumber World — sets up browser, page, and page objects before each test

import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import dotenv from "dotenv";

dotenv.config();
// Map of browser names to Playwright browser launchers
const browserTypes = { chromium, firefox, webkit };

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async launchBrowser(): Promise<void> {
    const browserType = (process.env.BROWSER ||
      "chromium") as keyof typeof browserTypes;

    this.browser = await browserTypes[browserType].launch({
      headless: process.env.HEADLESS !== "false",
      executablePath: process.env.EXECUTABLE_PATH || undefined,
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });

    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
  }
  async closeBrowser(): Promise<void> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
