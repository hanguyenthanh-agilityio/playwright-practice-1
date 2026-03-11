import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/inventory.page'
import { HamburgerMenu } from '../pages/components/hamburger.menu'
import { boxedStep } from '../utils/boxed-step'

test.describe('Verify Hamburger Navigation Menu - SauceDemo', { tag: '@navigation' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html')
  })

  test('User can navigate to All Items page', { tag: '@regression' }, async ({ page }) => {
    const inventory = new InventoryPage(page)
    const menu = new HamburgerMenu(page)

    await boxedStep('Open hamburger menu', async () => {
      await menu.open()
    })

    await boxedStep('Navigate to All Items page', async () => {
      await menu.clickAllItems()
    })

    await boxedStep('Verify user is on Inventory page', async () => {
      await expect(page).toHaveURL(/inventory/)
      await expect(inventory.title).toBeVisible()
    })
  })

  test('User can navigate to About page', { tag: '@regression' }, async ({ page }) => {
    const menu = new HamburgerMenu(page)

    await boxedStep('Open hamburger menu', async () => {
      await menu.open()
    })

    await boxedStep('Navigate to About page', async () => {
      await menu.clickAbout()
    })

    await boxedStep('Verify redirect to SauceLabs site', async () => {
      await expect(page).toHaveURL(/saucelabs/)
    })
  })

  test('User can logout successfully', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const menu = new HamburgerMenu(page)

    await boxedStep('Open hamburger menu', async () => {
      await menu.open()
    })

    await boxedStep('Click Logout', async () => {
      await menu.clickLogout()
    })

    await boxedStep('Verify user is logged out', async () => {
      await expect(page.locator('#login-button')).toBeVisible()
    })
  })

  test('User can reset application state', { tag: '@regression' }, async ({ page }) => {
    const inventory = new InventoryPage(page)
    const menu = new HamburgerMenu(page)

    await boxedStep('Add product to cart', async () => {
      await inventory.addFirstProduct()
      await expect(inventory.cartBadge).toBeVisible()
    })

    await boxedStep('Reset application state from menu', async () => {
      await menu.open()
      await menu.clickReset()
      await menu.close()
    })

    await boxedStep('Verify cart is empty after reset', async () => {
      await inventory.goToCart()
      await expect(page.locator('.cart_item')).toHaveCount(0)
    })
  })
})
