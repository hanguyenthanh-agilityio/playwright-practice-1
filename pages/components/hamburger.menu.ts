import { Page, Locator } from '@playwright/test'

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
    this.resetAppStateLink = page.getByRole('link', {
      name: 'Reset App State',
    })
  }

  async open() {
    await this.openMenuButton.click()
  }

  async close() {
    await this.closeMenuButton.click()
  }

  async clickAllItems() {
    await this.allItemsLink.click()
  }

  async clickAbout() {
    await this.aboutLink.click()
  }

  async clickLogout() {
    await this.logoutLink.click()
  }

  async clickReset() {
    await this.resetAppStateLink.click()
  }
}
