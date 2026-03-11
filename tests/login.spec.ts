import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { boxedStep } from '../utils/boxed-step'

// Disable reused login session for login tests
test.use({ storageState: undefined })

test.describe('Login Feature - SauceDemo', { tag: '@login' }, () => {
  const validUsername = 'standard_user'
  const validPassword = 'secret_sauce'

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page)

    await boxedStep('Navigate to login page', async () => {
      await login.goto()
    })
  })

  test(
    'User can login successfully with valid credentials',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {
      const login = new LoginPage(page)

      await boxedStep('Login with valid credentials', async () => {
        await login.login(validUsername, validPassword)
      })

      await boxedStep('Verify user is redirected to inventory page', async () => {
        await expect(page).toHaveURL(/inventory/)
        await expect(page.locator('.title')).toHaveText('Products')
      })
    },
  )

  // Negative test cases
  const negativeCases = [
    {
      title: 'invalid password',
      username: validUsername,
      password: 'wrong_password',
      error: 'Username and password do not match',
    },
    {
      title: 'invalid username',
      username: 'wrong_user',
      password: validPassword,
      error: 'Username and password do not match',
    },
    {
      title: 'empty username',
      username: '',
      password: validPassword,
      error: 'Username is required',
    },
    {
      title: 'empty password',
      username: validUsername,
      password: '',
      error: 'Password is required',
    },
    {
      title: 'empty username and password',
      username: '',
      password: '',
      error: 'Username is required',
    },
  ]

  for (const data of negativeCases) {
    test(`User cannot login with ${data.title}`, { tag: '@negative' }, async ({ page }) => {
      const login = new LoginPage(page)

      await boxedStep(`Attempt login with ${data.title}`, async () => {
        await login.login(data.username, data.password)
      })

      await boxedStep('Verify error message is displayed', async () => {
        await login.expectError(data.error)
      })

      await boxedStep('Verify user remains on login page', async () => {
        await expect(page).toHaveURL('/')
      })
    })
  }
})
