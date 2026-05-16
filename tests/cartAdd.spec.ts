import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.navigate();
    await auth.signIn(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
  });

  test('cart reflects multiple added items', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await inventory.assertBadgeCount('2');
    await inventory.openCart();

    await cart.assertTotalItems(2);
    await cart.assertItemPresent('Sauce Labs Backpack');
    await cart.assertItemPresent('Sauce Labs Bike Light');
  });

  test('single item appears correctly in cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.assertBadgeCount('1');
    await inventory.openCart();

    await cart.assertTotalItems(1);
    await cart.assertItemPresent('Sauce Labs Backpack');
  });

  test('cart badge is absent when nothing is added', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.assertOnInventoryPage();
    await inventory.cartLink.waitFor();
    const count = await page.locator('.shopping_cart_badge').count();
    require('@playwright/test').expect(count).toBe(0);
  });
});