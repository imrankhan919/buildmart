import { test, expect } from '@playwright/test';

test('home page renders brand and hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /buildmart/i }).first()).toBeVisible();
});

test('unknown route shows 404 page', async ({ page }) => {
  await page.goto('/no-such-route-xyz');
  await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible();
});

test('logged-out /dashboard redirects to login with redirect param', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login\?redirect=%2Fdashboard/);
});

test('logged-out /admin redirects to login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/login/);
});
