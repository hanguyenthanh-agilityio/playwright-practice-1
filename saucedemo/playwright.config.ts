import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: isCI,

  retries: isCI ? 2 : 0,

  workers: isCI ? 1 : undefined,

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    baseURL: 'https://www.saucedemo.com/',

    headless: isCI ? true : false,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    launchOptions: {
      slowMo: isCI ? 0 : 300,
    },
  },

  projects: isCI
    ? [
        {
          name: 'setup',
          testMatch: /.*\.setup\.ts/,
        },

        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            storageState: 'playwright/.auth/user.json',
          },
          dependencies: ['setup'],
        },
      ]
    : [
        {
          name: 'setup',
          testMatch: /.*\.setup\.ts/,
        },

        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            storageState: 'playwright/.auth/user.json',
          },
          dependencies: ['setup'],
        },

        // {
        //   name: 'firefox',
        //   use: {
        //     ...devices['Desktop Firefox'],
        //     storageState: 'playwright/.auth/user.json',
        //   },
        //   dependencies: ['setup'],
        // },

        {
          name: 'webkit',
          use: {
            ...devices['Desktop Safari'],
            storageState: 'playwright/.auth/user.json',
          },
          dependencies: ['setup'],
        },
      ],
})
