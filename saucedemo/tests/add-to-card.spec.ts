import { test, expect } from "../fixtures/auth.fixture";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { boxedStep } from "../utils/boxed-step";

test.describe("Verify Add To Cart - Full Validation", () => {
  test("Add single product and verify details in cart", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const product = await inventory.getProductInfo(0);

    await boxedStep("Add product to cart", async () => {
      await inventory.addFirstProduct();
      await inventory.expectCartBadgeCount(1);
    });

    await boxedStep("Navigate to cart page", async () => {
      await inventory.goToCart();
    });

    await boxedStep("Verify product details in cart", async () => {
      await cart.expectItemCount(1);
      await cart.expectItemPresent(product.name);
      await cart.expectItemPrice(product.name, product.price);
    });
  });

  test("Add multiple products and verify details", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const products = [
      await inventory.getProductInfo(0),
      await inventory.getProductInfo(1),
    ];

    await boxedStep("Add multiple products to cart", async () => {
      await inventory.addMultiple(products.length);
      await inventory.expectCartBadgeCount(products.length);
    });

    await boxedStep("Navigate to cart page", async () => {
      await inventory.goToCart();
    });

    await boxedStep("Verify all products in cart", async () => {
      await cart.expectItemCount(products.length);

      for (const product of products) {
        await cart.expectItemPresent(product.name);
        await cart.expectItemPrice(product.name, product.price);
      }
    });
  });

  test("Button changes to Remove after adding product", async ({ page }) => {
    const inventory = new InventoryPage(page);

    const product = await inventory.getProductInfo(0);

    await boxedStep("Add product to cart", async () => {
      await inventory.addFirstProduct();
      await inventory.expectCartBadgeCount(1);
    });

    await boxedStep("Verify button changes to Remove", async () => {
      const item = page.locator(".inventory_item").filter({
        has: page.locator(".inventory_item_name", {
          hasText: product.name,
        }),
      });

      await expect(item.getByRole("button", { name: "Remove" })).toBeVisible();
    });
  });

  test("Remove product from inventory page", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await boxedStep("Add product to cart", async () => {
      await inventory.addFirstProduct();
      await inventory.expectCartBadgeCount(1);
    });

    await boxedStep("Remove product from inventory page", async () => {
      await inventory.removeFirstProduct();
      await inventory.expectCartBadgeCount(0);
    });
  });

  test("Remove product from cart page", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const product = await inventory.getProductInfo(0);

    await boxedStep("Add product and navigate to cart", async () => {
      await inventory.addFirstProduct();
      await inventory.goToCart();
    });

    await boxedStep("Remove product from cart", async () => {
      await cart.expectItemPresent(product.name);
      await cart.removeItemByName(product.name);
    });

    await boxedStep("Verify cart is empty", async () => {
      await cart.expectItemNotPresent(product.name);
      await cart.expectItemCount(0);
    });
  });

  test("User cannot add same product twice", async ({ page }) => {
    const inventory = new InventoryPage(page);

    const product = await inventory.getProductInfo(0);

    await boxedStep("Add product once", async () => {
      await inventory.addFirstProduct();
      await inventory.expectCartBadgeCount(1);
    });

    await boxedStep("Verify Add to cart button no longer exists", async () => {
      const item = page.locator(".inventory_item").filter({
        has: page.locator(".inventory_item_name", {
          hasText: product.name,
        }),
      });

      await expect(
        item.getByRole("button", { name: "Add to cart" }),
      ).toHaveCount(0);
    });
  });
});
