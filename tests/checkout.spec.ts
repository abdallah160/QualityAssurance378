import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.navigate();
    await auth.signIn(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
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