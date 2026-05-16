import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config({});

const authFile = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
  ],
});
