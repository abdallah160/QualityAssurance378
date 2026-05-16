import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private pg: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly zipField: Locator;
  readonly nextButton: Locator;
  readonly submitButton: Locator;
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.pg = page;
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.zipField = page.locator('[data-test="postalCode"]');
    this.nextButton = page.locator('[data-test="continue"]');
    this.submitButton = page.locator('[data-test="finish"]');
    this.successHeader = page.locator('.complete-header');
  }

  async enterShippingDetails() {
    await this.firstNameField.fill('Hadi');
    await this.lastNameField.fill('Ali');
    await this.zipField.fill('00970');
    await this.nextButton.click();
  }

  async submitOrder() {
    await this.submitButton.click();
  }

  async assertOrderSuccess() {
    await expect(this.successHeader).toHaveText('Thank you for your order!');
  }
}