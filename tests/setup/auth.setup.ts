import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'

setup('authenticate', async ({ page }) => {
  const login = new LoginPage(page)

  // Navigate to login page
  await login.goto()

  // Login with valid account
  await login.login('standard_user', 'secret_sauce')

  // Verify login success
  await expect(page).toHaveURL(/inventory/)
  await expect(page.locator('.title')).toHaveText('Products')

  // Save session state
  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  })
})
