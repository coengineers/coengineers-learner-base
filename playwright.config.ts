import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/setup.ts",
  fullyParallel: false,
  workers: 1,
  // GitHub's machines are slower than a laptop: a local email or a first page load can take
  // longer than the five second default, which failed checks on changes that touched neither.
  // One retry there as well; a test that needed it is listed as "flaky" in the check's output.
  expect: { timeout: process.env.CI ? 15000 : 5000 },
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: "http://127.0.0.1:4310", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: [
    {
      command: "pnpm dev:api",
      url: "http://127.0.0.1:8787/api/health",
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
    {
      command: "pnpm dev",
      url: "http://127.0.0.1:4310",
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
  ],
});
