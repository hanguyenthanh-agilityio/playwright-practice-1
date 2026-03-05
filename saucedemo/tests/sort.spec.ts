import { test, expect } from "../fixtures/auth.fixture";
import { InventoryPage } from "../pages/inventory.page";
import { boxedStep } from "../utils/boxed-step";

test.describe("Verify Sort Dropdown", () => {
  async function verifySorted<T>(actual: T[], sorter: (arr: T[]) => T[]) {
    const expected = sorter([...actual]);
    expect(actual).toEqual(expected);
  }

  test("User can display sort dropdown options", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await boxedStep("Get sort dropdown options", async () => {
      const options = await inventory.sortOptions();
      expect(options.length).toBeGreaterThan(0);
    });
  });

  test("Sort by Name (A to Z)", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await boxedStep("Sort by Name (A to Z)", async () => {
      await inventory.sortBy("az");
      const names = await inventory.getProductNames();

      await verifySorted(names, (arr) => arr.sort());
    });
  });

  test("Sort by Name (Z to A)", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await boxedStep("Sort by Name (Z to A)", async () => {
      await inventory.sortBy("za");
      const names = await inventory.getProductNames();

      await verifySorted(names, (arr) => arr.sort().reverse());
    });
  });

  test("Sort by Price (low to high)", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await boxedStep("Sort by Price (low to high)", async () => {
      await inventory.sortBy("lohi");
      const prices = await inventory.getProductPrices();

      await verifySorted(prices, (arr) => arr.sort((a, b) => a - b));
    });
  });

  test("Sort by Price (high to low)", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await boxedStep("Sort by Price (high to low)", async () => {
      await inventory.sortBy("hilo");
      const prices = await inventory.getProductPrices();

      await verifySorted(prices, (arr) => arr.sort((a, b) => b - a));
    });
  });
});
