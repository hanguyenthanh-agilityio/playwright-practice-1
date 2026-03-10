import { Page, Locator, expect } from '@playwright/test'

export class InventoryPage {
  readonly page: Page

  readonly title: Locator
  readonly cartIcon: Locator
  readonly cartBadge: Locator
  readonly sortDropdown: Locator

  readonly inventoryItems: Locator
  readonly productNames: Locator
  readonly productPrices: Locator

  constructor(page: Page) {
    this.page = page

    this.title = page.locator('.title')
    this.cartIcon = page.locator('.shopping_cart_link')
    this.cartBadge = page.locator('.shopping_cart_badge')
    this.sortDropdown = page.locator('.product_sort_container')

    this.inventoryItems = page.locator('.inventory_item')
    this.productNames = page.locator('.inventory_item_name')
    this.productPrices = page.locator('.inventory_item_price')
  }

  async addFirstProduct() {
    const btn = this.inventoryItems.first().getByRole('button', { name: 'Add to cart' })

    await expect(btn).toBeVisible()
    await btn.click()
  }

  async addMultiple(count: number) {
    for (let i = 0; i < count; i++) {
      const btn = this.inventoryItems.nth(i).getByRole('button', { name: 'Add to cart' })

      await expect(btn).toBeVisible()
      await btn.click()
    }
  }

  async removeFirstProduct() {
    const btn = this.inventoryItems.first().getByRole('button', { name: 'Remove' })

    await expect(btn).toBeVisible()
    await btn.click()
  }

  async goToCart() {
    await expect(this.cartIcon).toBeVisible()

    await this.cartIcon.scrollIntoViewIfNeeded()

    await this.cartIcon.click({ force: true })

    await expect(this.page).toHaveURL(/cart/)
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value)
  }

  async sortOptions(): Promise<string[]> {
    const options = this.sortDropdown.locator('option')
    return await options.allTextContents()
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productNames.allTextContents()
    return names.map((n) => n.trim())
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents()
    return prices.map((p) => parseFloat(p.replace('$', '').trim()))
  }

  async getProductInfo(index: number) {
    const name = await this.productNames.nth(index).textContent()
    const price = await this.productPrices.nth(index).textContent()

    return {
      name: name?.trim() ?? '',
      price: price?.trim() ?? '',
    }
  }

  async expectCartBadgeCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0)
    } else {
      await expect(this.cartBadge).toHaveText(String(count))
    }
  }
}
