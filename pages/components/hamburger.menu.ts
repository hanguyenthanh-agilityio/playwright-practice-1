import { Page, Locator, expect } from '@playwright/test'

export class HamburgerMenu {
  readonly page: Page

  readonly openMenuButton: Locator
  readonly closeMenuButton: Locator
  readonly allItemsLink: Locator
  readonly aboutLink: Locator
  readonly logoutLink: Locator
  readonly resetAppStateLink: Locator

  constructor(page: Page) {
    this.page = page

    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' })
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' })

    this.allItemsLink = page.getByRole('link', { name: 'All Items' })
    this.aboutLink = page.getByRole('link', { name: 'About' })
    this.logoutLink = page.getByRole('link', { name: 'Logout' })
    this.resetAppStateLink = page.getByRole('link', { name: 'Reset App State' })
  }

  async open() {
    await this.openMenuButton.click()
    await expect(this.allItemsLink).toBeVisible()
  }

  async close() {
    await this.closeMenuButton.click()
    await expect(this.closeMenuButton).toBeHidden()
  }

  async clickAllItems() {
    await this.allItemsLink.click()
    await this.page.waitForURL(/inventory/)
  }

  async clickAbout() {
    await this.aboutLink.click()
    await this.page.waitForURL(/saucelabs/)
  }

  async clickLogout() {
    await this.logoutLink.click()
    await this.page.waitForURL(/saucedemo/)
  }

  async clickReset() {
    await this.resetAppStateLink.click()
  }
}
