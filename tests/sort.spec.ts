import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Product Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('price high-to-low ordering is correct', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortByPriceDesc();
    const prices = await inventory.fetchProductPrices();
    const expected = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(expected);
  });

  test('alphabetical A-Z ordering is correct', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortAscending();
    const names = await inventory.fetchProductNames();
    const expected = [...names].sort();
    expect(names).toEqual(expected);
  });
});
