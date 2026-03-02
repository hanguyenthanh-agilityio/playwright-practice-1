import { test, expect } from '@playwright/test';

test.describe('Verify Sort Dropdown', () => {

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

  test('User can display sort dropdown options', async ({ page }) => {
    const dropdown = page.locator('.product_sort_container');
    await expect(dropdown).toBeVisible();

    const options = await dropdown.locator('option').allTextContents();
    expect(options.length).toBeGreaterThan(0);
  });

  test('Sort by Name (A to Z)', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('az');

    const names = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('Sort by Name (Z to A)', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('za');

    const names = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('Sort by Price (low to high)', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const nums = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...nums].sort((a, b) => a - b);

    expect(nums).toEqual(sorted);
  });

  test('Sort by Price (high to low)', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('hilo');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const nums = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...nums].sort((a, b) => b - a);

    expect(nums).toEqual(sorted);
  });

});