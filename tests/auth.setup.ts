import { expect, test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate once and save browser state', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.signIn(
    process.env.USER_NAME as string,
    process.env.PASSWORD as string
  );

  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: authFile });
});
