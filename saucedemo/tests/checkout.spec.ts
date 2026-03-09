import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/inventory.page'
import { CartPage } from '../pages/cart.page'
import { CheckoutPage } from '../pages/checkout.page'
import { boxedStep } from '../utils/boxed-step'

test.describe('Verify Checkout', () => {
  test.beforeEach(async ({ page }) => {
    // user already authenticated -> open inventory page
    await page.goto('/inventory.html')
  })

  async function addProductAndGoToCheckout(page: any) {
    const inventory = new InventoryPage(page)
    const cart = new CartPage(page)

    await boxedStep('Add product to cart', async () => {
      await inventory.addFirstProduct()
    })

    await boxedStep('Navigate to cart', async () => {
      await inventory.goToCart()
    })

    await boxedStep('Proceed to checkout', async () => {
      await cart.proceedToCheckout()
    })
  }

  test('Navigate to cart page', async ({ page }) => {
    const inventory = new InventoryPage(page)

    await boxedStep('Navigate to cart', async () => {
      await inventory.goToCart()
    })

    await boxedStep('Verify cart URL', async () => {
      await expect(page).toHaveURL(/cart/)
    })
  })

  test('Proceed to checkout page', async ({ page }) => {
    await addProductAndGoToCheckout(page)

    await boxedStep('Verify checkout step one page', async () => {
      await expect(page).toHaveURL(/checkout-step-one/)
    })
  })

  test('Complete checkout successfully', async ({ page }) => {
    const checkout = new CheckoutPage(page)

    await addProductAndGoToCheckout(page)

    await boxedStep('Fill checkout information', async () => {
      await checkout.fillInformation('John', 'Doe', '12345')
      await checkout.continue()
    })

    await boxedStep('Finish checkout', async () => {
      await checkout.finish()
    })

    await boxedStep('Verify order success message', async () => {
      await expect(page.getByText('Thank you for your order!')).toBeVisible()
    })
  })

  test('Cancel checkout', async ({ page }) => {
    await addProductAndGoToCheckout(page)

    await boxedStep('Cancel checkout', async () => {
      await page.getByRole('button', { name: 'Cancel' }).click()
    })

    await boxedStep('Verify redirected back to cart', async () => {
      await expect(page).toHaveURL(/cart/)
    })
  })

  const validationCases = [
    {
      title: 'Empty First Name validation',
      first: '',
      last: 'Doe',
      zip: '12345',
      error: 'Error: First Name is required',
    },
    {
      title: 'Empty Last Name validation',
      first: 'John',
      last: '',
      zip: '12345',
      error: 'Error: Last Name is required',
    },
    {
      title: 'Empty Zip Code validation',
      first: 'John',
      last: 'Doe',
      zip: '',
      error: 'Error: Postal Code is required',
    },
    {
      title: 'All fields empty validation',
      first: '',
      last: '',
      zip: '',
      error: 'Error: First Name is required',
    },
  ]

  for (const data of validationCases) {
    test(data.title, async ({ page }) => {
      const checkout = new CheckoutPage(page)

      await addProductAndGoToCheckout(page)

      await boxedStep('Submit checkout form with invalid data', async () => {
        await checkout.fillInformation(data.first, data.last, data.zip)
        await checkout.continue()
      })

      await boxedStep('Verify validation error message', async () => {
        await expect(page.locator('[data-test="error"]')).toHaveText(data.error)
      })
    })
  }
})
