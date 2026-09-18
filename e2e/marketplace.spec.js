import { test, expect } from '@playwright/test';

// Requires backend + seeded catalog (npm run seed:products).
test('marketplace lists seeded products', async ({ page }) => {
  await page.goto('/marketplace');
  await expect(page.getByText(/showing \d+ materials/i)).toBeVisible({ timeout: 20000 });
  await expect(page.getByRole('heading', { name: /ultratech/i }).first()).toBeVisible();
});

test('marketplace search filters the grid', async ({ page }) => {
  await page.goto('/marketplace');
  await expect(page.getByText(/showing \d+ materials/i)).toBeVisible({ timeout: 20000 });
  await page.getByLabel(/search building materials/i).fill('TMT');
  await expect(page.getByRole('heading', { name: /tmt/i }).first()).toBeVisible();
});
