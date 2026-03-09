import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://127.0.0.1:3100';
const useManagedWebServer = !process.env.PLAYWRIGHT_TEST_BASE_URL;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: useManagedWebServer
    ? {
        command: 'pnpm dev -- --port 3100',
        url: `${baseURL}/dashboard`,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
  projects: [
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
});
