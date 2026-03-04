import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

export const test = base.extend({
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText("Products")).toBeVisible();

    await use(page);
  },
});

export { expect } from "@playwright/test";
