import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Verify Sort Dropdown', () => {

  test('User can display sort dropdown options', async ({ page }) => {
    const inventory = new InventoryPage(page);

    const options = await inventory.sortOptions();
    expect(options.length).toBeGreaterThan(0);
  });

  test('Sort by Name (A to Z)', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortBy('az');
    const names = await inventory.getProductNames();

    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('Sort by Name (Z to A)', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortBy('za');
    const names = await inventory.getProductNames();

    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('Sort by Price (low to high)', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortBy('lohi');
    const prices = await inventory.getProductPrices();

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Sort by Price (high to low)', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortBy('hilo');
    const prices = await inventory.getProductPrices();

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

});