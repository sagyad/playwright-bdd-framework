# 🎭 Playwright BDD Framework

A production-grade **Behavior-Driven Development (BDD)** test automation framework built with **Playwright**, **Cucumber.js**, and **TypeScript**. Follows the **Page Object Model (POM)** design pattern for maintainability and scalability.

[![CI](https://github.com/sagyad/playwright-bdd-framework/actions/workflows/test.yml/badge.svg)](https://github.com/sagyad/playwright-bdd-framework/actions)
[![Playwright](https://img.shields.io/badge/Playwright-v1.x-45ba63?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Allure](https://img.shields.io/badge/Allure-Report-FC6D26?logo=allure&logoColor=white)](https://allurereport.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Allure Reporting](#allure-reporting)
- [CI/CD Pipeline](#cicd-pipeline)
- [Writing Tests](#writing-tests)
- [Design Patterns](#design-patterns)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This framework demonstrates a scalable approach to end-to-end UI test automation using BDD methodology. It uses the [SauceDemo](https://www.saucedemo.com/) web application as the system under test (SUT), covering login functionality with multiple user scenarios.

### Key Features

- ✅ **BDD with Gherkin** — Human-readable feature files for stakeholder collaboration
- ✅ **Page Object Model** — Clean separation of test logic and page interactions
- ✅ **TypeScript** — Type-safe test development with IntelliSense support
- ✅ **Allure Reporting** — Rich, interactive HTML test reports with screenshots
- ✅ **CI/CD Ready** — GitHub Actions pipeline with automated test execution
- ✅ **Cross-browser Support** — Powered by Playwright's multi-browser engine

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser automation engine |
| [Cucumber.js](https://github.com/cucumber/cucumber-js) | BDD test runner with Gherkin syntax |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe scripting language |
| [Allure](https://allurereport.org/) | Test reporting framework |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [Node.js](https://nodejs.org/) | Runtime environment |

---

## Project Structure

playwright-bdd-framework/
├── .github/
│   └── workflows/
│       └── test.yml
├── src/
│   ├── features/
│   │   └── login.feature
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── InventoryPage.ts
│   ├── steps/
│   │   └── loginSteps.ts
│   └── support/
│       ├── hooks.ts
│       └── world.ts
├── allure-results/
├── allure-report/
├── cucumber.js
├── tsconfig.json
├── package.json
└── README.md

## Prerequisites 
Node.js >= 18.x
npm >= 9.x

## Installation
git clone https://github.com/sagyad/playwright-bdd-framework.git
cd playwright-bdd-framework
npm install
npx playwright install

### Running Tests
#### Run all tests
npm test

#### Run with specific tag
npx cucumber-js --tags "@smoke"

#### Run a specific feature file
npx cucumber-js src/features/login.feature

#### TypeScript compilation check
npx tsc --noEmit

## Allure Reporting
##### Generate Allure report after test run
npx allure generate allure-results --clean -o allure-report

##### Open Allure report in browser
npx allure open allure-report

### Sample Report
| Metric | Value |
|------------|---------|
| Total Test Cases | 7 |
| Pass Rate | 100% |
| Duration | ~2.7s |
| Feature Coverage | SauceDemo Login |

## CI/CD Pipeline
The framework includes a GitHub Actions workflow that automatically:

🔄 Triggers on push/PR to main
📦 Installs dependencies and Playwright browsers
🧪 Runs the full Cucumber test suite
📊 Generates and publishes the Allure report
Pipeline status is visible via the badge at the top of this README.

## Writing Tests
### 1. Create a Feature File
Feature: SauceDemo Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with "standard_user" and "secret_sauce"
    Then I should be on the inventory page
    
###### 2. Create a Page Object
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private usernameInput = "#user-name";
  private passwordInput = "#password";
  private loginButton = "#login-button";

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

###### 3. Create Step Definitions
import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

Given("I am on the login page", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate("https://www.saucedemo.com");
});

When("I login with {string} and {string}", async function (user, pass) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(user, pass);
});

Then("I should be on the inventory page", async function () {
  const inventoryPage = new InventoryPage(this.page);
  const isOnPage = await inventoryPage.isOnInventoryPage();
  expect(isOnPage).toBeTruthy();
});


## Design Patterns

| Pattern | Implementation |
|------------|---------|
| Page Object Model | Each page is a class encapsulating selectors and actions |
| Base Page | Common methods inherited by all pages |
| BDD Cucumber | Gherkin feature files bridge business and technical requirements |
| Custom World | Shared Playwright browser context across step definitions |
| Hooks | Browser setup and teardown via Cucumber Before and After hooks |


## Contributing
##### Fork the repository
Create a feature branch (git checkout -b feature/add-cart-tests)
Commit your changes (git commit -m "feat: add cart page tests")
Push to the branch (git push origin feature/add-cart-tests)
Open a Pull Request

## License
This project is licensed under the MIT License.

Built using Playwright, Cucumber & TypeScript EOF