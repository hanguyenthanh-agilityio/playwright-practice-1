import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.title = page.getByText('Products');
  }

  async addFirstProduct() {
    await this.addToCartButtons.first().click();
  }

  async addMultiple(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addToCartButtons.nth(i).click();
    }
  }

  async addSpecific(dataTestId: string) {
    await this.page.locator(`[data-test="${dataTestId}"]`).click();
  }

  async removeFirstProduct() {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }

  async sortOptions() {
    return await this.sortDropdown.locator('option').allTextContents();
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}