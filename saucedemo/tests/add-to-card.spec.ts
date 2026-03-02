import { test, expect } from '@playwright/test';

test.describe('Verify Add To Cart', () => {

  const baseURL = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('Add single product', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Add multiple products', async ({ page }) => {
    const buttons = page.getByRole('button', { name: 'Add to cart' });
    await buttons.nth(0).click();
    await buttons.nth(1).click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('Button changes to Remove after adding', async ({ page }) => {
    const btn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await btn.click();
    const removeBtn = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    await expect(removeBtn).toBeVisible();
  });

  test('Remove product from inventory page', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Add to cart' }).first();
    await btn.click();
    await page.getByRole('button', { name: 'Remove' }).first().click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('Remove product from cart page', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();

    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('User cannot add same product twice', async ({ page }) => {

    const product = page.locator('.inventory_item').first();
    const button = product.getByRole('button');
  
    await button.click();
  
    // Verify button changed
    await expect(button).toHaveText('Remove');
  
    // Verify cart badge is still 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

});