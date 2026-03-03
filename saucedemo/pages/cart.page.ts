import { Page } from "@playwright/test";

export class CartPage {

  constructor(private readonly page: Page) {}

  async removeFirstItem() {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }

  async proceedToCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}