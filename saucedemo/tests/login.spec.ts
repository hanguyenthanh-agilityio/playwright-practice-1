import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Feature - SauceDemo", () => {
  const validUsername = "standard_user";
  const validPassword = "secret_sauce";

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
  });

  test("User can login successfully with valid credentials", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.login(validUsername, validPassword);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");
  });

  // Parameterized negative cases
  const negativeCases = [
    {
      title: "invalid password",
      username: validUsername,
      password: "wrong_password",
      error: "Username and password do not match",
    },
    {
      title: "invalid username",
      username: "wrong_user",
      password: validPassword,
      error: "Username and password do not match",
    },
    {
      title: "empty username",
      username: "",
      password: validPassword,
      error: "Username is required",
    },
    {
      title: "empty password",
      username: validUsername,
      password: "",
      error: "Password is required",
    },
    {
      title: "empty username and password",
      username: "",
      password: "",
      error: "Username is required",
    },
  ];

  for (const data of negativeCases) {
    test(`User cannot login with ${data.title}`, async ({ page }) => {
      const login = new LoginPage(page);

      await login.login(data.username, data.password);
      await login.expectError(data.error);

      await expect(page).toHaveURL("/");
    });
  }
});
