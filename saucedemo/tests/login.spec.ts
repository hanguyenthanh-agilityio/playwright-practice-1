import { test, expect } from '@playwright/test';

test.describe('Login Feature - SauceDemo', () => {

  // Test data
  const baseURL = 'https://www.saucedemo.com/';
  const validUsername = 'standard_user';
  const validPassword = 'secret_sauce';
  const invalidUsername = 'wrong_user';
  const invalidPassword = 'wrong_password';

  test.beforeEach(async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto(baseURL);

    // Verify login page is displayed
    await expect(page).toHaveURL(baseURL);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  // Happy Case
  test('User can login successfully with valid credentials', async ({ page }) => {

    // Step 2: Enter valid username
    await page.getByPlaceholder('Username').fill(validUsername);

    // Step 3: Enter valid password
    await page.getByPlaceholder('Password').fill(validPassword);

    // Step 4: Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 5: Verify user redirected to inventory page
    await expect(page).toHaveURL(/inventory/);

    // Step 6: Verify product list is visible
    await expect(page.getByText('Products')).toBeVisible();
  });

  // Unhappy Case 1 - Invalid password
  test('User cannot login with invalid password', async ({ page }) => {

    await page.getByPlaceholder('Username').fill(validUsername);
    await page.getByPlaceholder('Password').fill(invalidPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Username and password do not match/)).toBeVisible();
    await expect(page).toHaveURL(baseURL);
  });

  // Unhappy Case 2 - Invalid username
  test('User cannot login with invalid username', async ({ page }) => {

    await page.getByPlaceholder('Username').fill(invalidUsername);
    await page.getByPlaceholder('Password').fill(validPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Username and password do not match/)).toBeVisible();
    await expect(page).toHaveURL(baseURL);
  });

  // Unhappy Case 3 - Empty username
  test('User cannot login with empty username', async ({ page }) => {

    await page.getByPlaceholder('Password').fill(validPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Username is required/)).toBeVisible();
  });

  // Unhappy Case 4 - Empty password
  test('User cannot login with empty password', async ({ page }) => {

    await page.getByPlaceholder('Username').fill(validUsername);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Password is required/)).toBeVisible();
  });

  // Unhappy Case 5 - Both fields empty
  test('User cannot login with empty username and password', async ({ page }) => {

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Username is required/)).toBeVisible();
  });

});