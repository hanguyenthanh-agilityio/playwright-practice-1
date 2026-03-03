import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventory.page';
import { HamburgerMenu } from '../pages/components/hamburger.menu';

test.describe('Verify Hamburger Navigation Menu - SauceDemo', () => {

  test('User can navigate to All Items page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const menu = new HamburgerMenu(page);

    await menu.open();
    await menu.clickAllItems();

    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.title).toBeVisible();
  });

  test('User can navigate to About page', async ({ page }) => {
    const menu = new HamburgerMenu(page);

    await menu.open();

    await Promise.all([
      page.waitForURL('https://saucelabs.com/'),
      menu.clickAbout()
    ]);

    await expect(page).toHaveURL('https://saucelabs.com/');
  });

  test('User can logout successfully', async ({ page }) => {
    const menu = new HamburgerMenu(page);

    await menu.open();
    await menu.clickLogout();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('User can reset application state', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const menu = new HamburgerMenu(page);

    await inventory.addFirstProduct();
    await expect(inventory.cartBadge).toBeVisible();

    await menu.open();
    await menu.clickReset();
    await menu.close();

    await inventory.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

});