import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Product Sorting', () => {
  test.beforeEach(async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.navigate();
    await auth.signIn(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
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