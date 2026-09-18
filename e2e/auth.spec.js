import { test, expect } from '@playwright/test';
import { loginAs } from './helpers.js';

test('failed login shows an error toast, stays on login', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#login-email').fill('aarav@example.com');
  await page.locator('#login-password').fill('wrong-password-123');
  await page.locator('form button[type="submit"]').click();
  await expect(page.getByRole('status').first()).toContainText(/invalid credentials|login failed/i);
  await expect(page).toHaveURL(/\/login/);
});

test('seeded user can log in and sees profile with credits', async ({ page }) => {
  await loginAs(page, 'aarav@example.com', 'password123');
  await expect(page.getByRole('heading', { name: /aarav sharma/i })).toBeVisible();
  await expect(page.getByText(/credits available/i)).toBeVisible();
});
