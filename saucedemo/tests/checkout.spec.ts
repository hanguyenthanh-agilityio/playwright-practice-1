import { test, expect } from '@playwright/test';

test.describe('Verify Checkout', () => {

  const baseURL = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  async function addProduct(page) {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async function goToCheckout(page) {
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('Navigate to cart page', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
  });

  test('Proceed to checkout page', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('Complete checkout successfully', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  test('Cancel checkout', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/cart/);
  });

  test('Empty First Name validation', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: First Name is required');
  });

  test('Empty Last Name validation', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: Last Name is required');
  });

  test('Empty Zip Code validation', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: Postal Code is required');
  });

  test('All fields empty validation', async ({ page }) => {
    await addProduct(page);
    await goToCheckout(page);

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: First Name is required');
  });

});