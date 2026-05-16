import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config({});

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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});