import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  private pg: Page;
  readonly pageHeading: Locator;
  readonly badgeCount: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.pg = page;
    this.pageHeading = page.locator('.title');
    this.badgeCount = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  async assertOnInventoryPage() {
    await expect(this.pageHeading).toHaveText('Products');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async addToCart(productName: string) {
    const product = this.pg.locator('.inventory_item').filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async assertBadgeCount(expected: string) {
    await expect(this.badgeCount).toHaveText(expected);
  }

  async sortAscending() {
    await this.sortSelect.selectOption('az');
  }

  async sortByPriceDesc() {
    await this.sortSelect.selectOption('hilo');
  }

  async fetchProductNames(): Promise<string[]> {
    return this.pg.locator('.inventory_item_name').allTextContents();
  }

  async fetchProductPrices(): Promise<number[]> {
    const raw = await this.pg.locator('.inventory_item_price').allTextContents();
    return raw.map(p => parseFloat(p.replace('$', '')));
  }
}