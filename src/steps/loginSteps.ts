import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(30000);

Given("the user is on the login page", async function (this: CustomWorld) {
  await this.loginPage.goToLoginPage();
});

When(
  "the user logs in with {string} and {string}",
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then(
  "the user should see the inventory page",
  async function (this: CustomWorld) {
    const isVisible = await this.inventoryPage.isOnInventoryPage();
    expect(isVisible).toBeTruthy();
  },
);

Then(
  "the inventory should display {int} products",
  async function (this: CustomWorld, expectedCount: number) {
    const count = await this.inventoryPage.getItemCount();
    expect(count).toBe(expectedCount);
  },
);

Then(
  "the user should see an error message containing {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    const errorMessage = await this.loginPage.getErrorMessage();
    expect(errorMessage).toContain(expectedMessage);
  },
);

Then(
  "the login result should be {string}",
  async function (this: CustomWorld, result: string) {
    if (result === "success") {
      const isVisible = await this.inventoryPage.isOnInventoryPage();
      expect(isVisible).toBeTruthy();
    } else {
      const isError = await this.loginPage.isErrorVisible();
      expect(isError).toBeTruthy();
    }
  },
);
