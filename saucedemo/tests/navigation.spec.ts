import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/inventory.page'
import { HamburgerMenu } from '../pages/components/hamburger.menu'
import { boxedStep } from '../utils/boxed-step'

test.describe('Verify Hamburger Navigation Menu - SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    // user already logged in → just open inventory
    await page.goto('/inventory.html')
  })

  test('User can navigate to All Items page', async ({ page }) => {
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

  test('User can navigate to About page', async ({ page }) => {
    const menu = new HamburgerMenu(page)

    await boxedStep('Open hamburger menu', async () => {
      await menu.open()
    })

    await boxedStep('Navigate to About page', async () => {
      await Promise.all([page.waitForURL('https://saucelabs.com/'), menu.clickAbout()])
    })

    await boxedStep('Verify redirect', async () => {
      await expect(page).toHaveURL('https://saucelabs.com/')
    })
  })
})
