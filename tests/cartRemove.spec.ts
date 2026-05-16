import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove Items from Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('removing both items leaves cart empty', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await inventory.assertBadgeCount('2');
    await inventory.openCart();
    await cart.assertTotalItems(2);

    await cart.deleteItem('Sauce Labs Backpack');
    await cart.assertTotalItems(1);

    await cart.deleteItem('Sauce Labs Bike Light');
    await cart.assertTotalItems(0);
  });

  test('removing the only item empties the cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.assertBadgeCount('1');
    await inventory.openCart();
    await cart.assertTotalItems(1);

    await cart.deleteItem('Sauce Labs Backpack');
    await cart.assertTotalItems(0);
  });
});
