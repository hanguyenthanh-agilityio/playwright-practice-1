import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Verify Add To Cart', () => {

  test('Add single product', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addFirstProduct();
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('Add multiple products', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addMultiple(2);
    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('Button changes to Remove after adding', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addSpecific('add-to-cart-sauce-labs-bike-light');
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  });

  test('Remove product from inventory page', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addFirstProduct();
    await inventory.removeFirstProduct();

    await expect(inventory.cartBadge).toHaveCount(0);
  });

  test('Remove product from cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();

    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('User cannot add same product twice', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addFirstProduct();
    await expect(inventory.cartBadge).toHaveText('1');
  });

});