import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Verify Checkout', () => {

  test('Navigate to cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.goToCart();
    await expect(page).toHaveURL(/cart/);
  });

  test('Proceed to checkout page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('Complete checkout successfully', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await checkout.fillInformation('John', 'Doe', '12345');
    await checkout.continue();
    await checkout.finish();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  test('Cancel checkout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/cart/);
  });

  test('Empty First Name validation', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await checkout.fillInformation('', 'Doe', '12345');
    await checkout.continue();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: First Name is required');
  });

  test('Empty Last Name validation', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await checkout.fillInformation('John', '', '12345');
    await checkout.continue();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: Last Name is required');
  });

  test('Empty Zip Code validation', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await checkout.fillInformation('John', 'Doe', '');
    await checkout.continue();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: Postal Code is required');
  });

  test('All fields empty validation', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addFirstProduct();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await checkout.fillInformation('', '', '');
    await checkout.continue();

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Error: First Name is required');
  });
});
