import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private pg: Page;
  readonly userField: Locator;
  readonly passField: Locator;
  readonly submitBtn: Locator;
  readonly errBanner: Locator;

  constructor(page: Page) {
    this.pg = page;
    this.userField = page.locator('[data-test="username"]');
    this.passField = page.locator('[data-test="password"]');
    this.submitBtn = page.locator('[data-test="login-button"]');
    this.errBanner = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.pg.goto('/');
  }

  async signIn(username: string, password: string) {
    await this.userField.fill(username);
    await this.passField.fill(password);
    await this.submitBtn.click();
  }

  async assertErrorShown() {
    await expect(this.errBanner).toBeVisible();
  }
}