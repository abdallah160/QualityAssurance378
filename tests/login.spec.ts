import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.navigate();
  });

  test('wrong credentials show an error banner', async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.signIn('standard_user', 'wrong_password');
    await auth.assertErrorShown();
  });

  test('valid credentials redirect to inventory', async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.signIn(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('blank credentials show an error', async ({ page }) => {
    const auth = new LoginPage(page);
    await auth.signIn('', '');
    await auth.assertErrorShown();
  });
});