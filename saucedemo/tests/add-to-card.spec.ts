import { test, expect } from "../fixtures/auth.fixture";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";

test.describe("Verify Add To Cart - Full Validation", () => {
  test("Add single product and verify details in cart", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const product = await inventory.getProductInfo(0);

    await inventory.addFirstProduct();
    await inventory.expectCartBadgeCount(1);

    await inventory.goToCart();

    await cart.expectItemCount(1);
    await cart.expectItemPresent(product.name);
    await cart.expectItemPrice(product.name, product.price);
  });

  test("Add multiple products and verify details", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const product1 = await inventory.getProductInfo(0);
    const product2 = await inventory.getProductInfo(1);

    await inventory.addMultiple(2);
    await inventory.expectCartBadgeCount(2);

    await inventory.goToCart();

    await cart.expectItemCount(2);

    await cart.expectItemPresent(product1.name);
    await cart.expectItemPresent(product2.name);

    await cart.expectItemPrice(product1.name, product1.price);
    await cart.expectItemPrice(product2.name, product2.price);
  });

  test("Button changes to Remove after adding product", async ({ page }) => {
    const inventory = new InventoryPage(page);

    const product = await inventory.getProductInfo(0);

    await inventory.addFirstProduct();
    await inventory.expectCartBadgeCount(1);

    const item = page.locator(".inventory_item").filter({
      has: page.locator(".inventory_item_name", {
        hasText: product.name,
      }),
    });

    await expect(
      item.getByRole("button", { name: "Remove" })
    ).toBeVisible();
  });

  test("Remove product from inventory page", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addFirstProduct();
    await inventory.expectCartBadgeCount(1);

    await inventory.removeFirstProduct();
    await inventory.expectCartBadgeCount(0);
  });

  test("Remove product from cart page", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const product = await inventory.getProductInfo(0);

    await inventory.addFirstProduct();
    await inventory.goToCart();

    await cart.expectItemPresent(product.name);

    await cart.removeItemByName(product.name);

    await cart.expectItemNotPresent(product.name);
    await cart.expectItemCount(0);
  });

  test("User cannot add same product twice", async ({ page }) => {
    const inventory = new InventoryPage(page);

    const product = await inventory.getProductInfo(0);

    await inventory.addFirstProduct();
    await inventory.expectCartBadgeCount(1);

    const item = page.locator(".inventory_item").filter({
      has: page.locator(".inventory_item_name", {
        hasText: product.name,
      }),
    });

    await expect(
      item.getByRole("button", { name: "Add to cart" })
    ).toHaveCount(0);
  });
});