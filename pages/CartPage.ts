import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly proceedButton: Locator;
  readonly rows: Locator;
  private pg: Page;

  constructor(page: Page) {
    this.pg = page;
    this.rows = page.locator('.cart_item');
    this.proceedButton = page.locator('[data-test="checkout"]');
  }

  async goToCheckout() {
    await this.proceedButton.click();
  }

  async assertItemPresent(name: string) {
    await expect(
      this.pg.locator('.cart_item').filter({ hasText: name })
    ).toBeVisible();
  }

  async assertTotalItems(expected: number) {
    await expect(this.rows).toHaveCount(expected);
  }

  async deleteItem(name: string) {
    const row = this.pg.locator('.cart_item').filter({ hasText: name });
    await row.getByRole('button', { name: 'Remove' }).click();
  }
}