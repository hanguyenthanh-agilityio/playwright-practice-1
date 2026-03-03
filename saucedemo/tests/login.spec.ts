import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Feature - SauceDemo', () => {

  const validUsername = 'standard_user';
  const validPassword = 'secret_sauce';
  const invalidUsername = 'wrong_user';
  const invalidPassword = 'wrong_password';

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
  });

  test('User can login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(validUsername, validPassword);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('User cannot login with invalid password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(validUsername, invalidPassword);

    await login.expectError('Username and password do not match');
    await expect(page).toHaveURL('/');
  });

  test('User cannot login with invalid username', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(invalidUsername, validPassword);

    await login.expectError('Username and password do not match');
  });

  test('User cannot login with empty username', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login('', validPassword);

    await login.expectError('Username is required');
  });

  test('User cannot login with empty password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(validUsername, '');

    await login.expectError('Password is required');
  });

  test('User cannot login with empty username and password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login('', '');

    await login.expectError('Username is required');
  });

});