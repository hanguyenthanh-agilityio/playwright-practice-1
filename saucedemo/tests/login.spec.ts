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
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // Happy Case
  test('User can login successfully with valid credentials', async ({ page }) => {

    // Step 2: Enter valid username
    await page.fill('#user-name', validUsername);

    // Step 3: Enter valid password
    await page.fill('#password', validPassword);

    // Step 4: Click Login button
    await page.click('#login-button');

    // Step 5: Verify user redirected to inventory page
    await expect(page).toHaveURL(/inventory.html/);

    // Step 6: Verify product list is visible
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // Unhappy Case 1 - Invalid password
  test('User cannot login with invalid password', async ({ page }) => {

    await page.fill('#user-name', validUsername);
    await page.fill('#password', invalidPassword);
    await page.click('#login-button');

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page).toHaveURL(baseURL);
  });

  // Unhappy Case 2 - Invalid username
  test('User cannot login with invalid username', async ({ page }) => {

    await page.fill('#user-name', invalidUsername);
    await page.fill('#password', validPassword);
    await page.click('#login-button');

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page).toHaveURL(baseURL);
  });

  // Unhappy Case 3 - Empty username
  test('User cannot login with empty username', async ({ page }) => {

    await page.fill('#password', validPassword);
    await page.click('#login-button');

    await expect(page.locator('.error-message-container')).toBeVisible();
  });

  // Unhappy Case 4 - Empty password
  test('User cannot login with empty password', async ({ page }) => {

    await page.fill('#user-name', validUsername);
    await page.click('#login-button');

    await expect(page.locator('.error-message-container')).toBeVisible();
  });

  // Unhappy Case 5 - Both fields empty
  test('User cannot login with empty username and password', async ({ page }) => {

    await page.click('#login-button');

    await expect(page.locator('.error-message-container')).toBeVisible();
  });

});