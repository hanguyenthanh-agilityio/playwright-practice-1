import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
  readonly page: Page

  readonly cartItems: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page

    this.cartItems = page.locator('.cart_item')
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
  }

  private getCartItemByName(name: string): Locator {
    return this.cartItems.filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: name,
      }),
    })
  }

  async removeFirstItem() {
    await this.cartItems.first().getByRole('button', { name: 'Remove' }).click()
  }

  async removeItemByName(name: string) {
    const item = this.getCartItemByName(name)
    await item.getByRole('button', { name: 'Remove' }).click()
  }

  async proceedToCheckout() {
    await this.checkoutButton.click()
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count)
  }

  async expectItemPresent(name: string) {
    const item = this.getCartItemByName(name)
    await expect(item).toBeVisible()
  }

  async expectItemNotPresent(name: string) {
    const item = this.getCartItemByName(name)
    await expect(item).toHaveCount(0)
  }

  async expectItemPrice(name: string, price: string) {
    const item = this.getCartItemByName(name)
    await expect(item.locator('.inventory_item_price')).toHaveText(price)
  }
}
