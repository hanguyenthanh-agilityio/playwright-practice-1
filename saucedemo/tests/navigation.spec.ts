import { test, expect } from '@playwright/test';

test.describe('Verify Hamburger Navigation Menu - SauceDemo', () => {

  const baseURL = 'https://www.saucedemo.com/';
  const inventoryURL = 'https://www.saucedemo.com/inventory.html';
  const cartURL = 'https://www.saucedemo.com/cart.html';

  const username = 'standard_user';
  const password = 'secret_sauce';

  test.beforeEach(async ({ page }) => {
    // Login first because inventory requires authentication
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
  });

  // Navigate to All Items
  test('User can navigate to All Items page', async ({ page }) => {

    // Ensure we are on inventory page
    await page.goto(inventoryURL);
    await expect(page).toHaveURL(inventoryURL);

    const hamburgerButton = page.getByRole('button', { name: 'Open Menu' });

    await expect(hamburgerButton).toBeVisible();
    await expect(hamburgerButton).toBeEnabled();
    await hamburgerButton.click();

    const allItems = page.getByRole('link', { name: 'All Items' });

    await expect(allItems).toBeVisible();
    await allItems.click();

    await expect(page).toHaveURL(inventoryURL);
    await expect(page.getByText('Products')).toBeVisible();
  });

  // Navigate to About page (External Navigation)
  test('User can navigate to About page', async ({ page }) => {

    const hamburgerButton = page.getByRole('button', { name: 'Open Menu' });
    await hamburgerButton.click();

    const aboutLink = page.getByRole('link', { name: 'About' });

    await expect(aboutLink).toBeVisible();

    await Promise.all([
      page.waitForURL('https://saucelabs.com/'),
      aboutLink.click()
    ]);

    await expect(page).toHaveURL('https://saucelabs.com/');
  });

  // Logout
  test('User can logout successfully', async ({ page }) => {

    const hamburgerButton = page.getByRole('button', { name: 'Open Menu' });
    await hamburgerButton.click();

    const logoutLink = page.getByRole('link', { name: 'Logout' });

    await expect(logoutLink).toBeVisible();
    await logoutLink.click();

    await expect(page).toHaveURL(baseURL);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  // Reset App State
  test('User can reset application state', async ({ page }) => {

    // Add 1 product to cart
    const addToCartBtn = page.getByRole('button', { name: /Add to cart/i }).first();

    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Verify cart badge appears
    await expect(page.locator('.shopping_cart_badge')).toBeVisible();

    // Open menu
    const hamburgerButton = page.getByRole('button', { name: 'Open Menu' });
    await hamburgerButton.click();

    const resetLink = page.getByRole('link', { name: 'Reset App State' });
    await expect(resetLink).toBeVisible();
    await resetLink.click();

    // Close menu
    await page.getByRole('button', { name: 'Close Menu' }).click();

    // Go to cart page
    const cartIcon = page.locator('.shopping_cart_link');
    await expect(cartIcon).toBeVisible();
    await expect(cartIcon).toBeEnabled();
    await cartIcon.click();
    await expect(page).toHaveURL(cartURL);

    // Verify cart is empty
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

});