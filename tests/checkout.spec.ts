import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('complete order with two items', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await inventory.openCart();
    await cart.goToCheckout();
    await checkout.enterShippingDetails();
    await checkout.submitOrder();
    await checkout.assertOrderSuccess();
  });

  test('complete order with a single item', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.openCart();
    await cart.goToCheckout();
    await checkout.enterShippingDetails();
    await checkout.submitOrder();
    await checkout.assertOrderSuccess();
  });
});
