import { defineConfig, devices } from '@playwright/test';

// Full-stack harness: specs run against the Vite dev server (client :5173) +
// the Express API (server :8080, needs root .env). Both entries reuse an
// already-running instance when present, otherwise they boot one.
// NOTE: the backend entry deliberately uses `server:start` (no --watch):
// `node --watch` also watches node_modules and restarts mid-run when files
// change there, which surfaces as flaky proxy 502s in specs.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run server:start',
      url: 'http://localhost:8080/api/products',
      reuseExistingServer: true,
      timeout: 120000,
    },
    {
      command: 'npm run dev -- --host --port 5173',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
      cwd: './client',
      timeout: 120000,
    },
  ],
});
