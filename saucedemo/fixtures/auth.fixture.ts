import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

export const test = base.extend({
  page: async ({ page }, use) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await use(page);
  }
});

export { expect } from '@playwright/test';
