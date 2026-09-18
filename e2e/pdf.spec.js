import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { loginAs, findUserByEmail, findProductByName, insertPlan, deletePlansByMarker } from './helpers.js';

const MARKER = 'E2E-TEST-PLAN';

// Covers the previously untested path: saved plan -> BOM view -> combined PDF.
// Seeds the plan + BOM directly in the DB (no AI credits burned).
test('saved plan with BOM downloads a valid PDF report', async ({ page }) => {
  const user = await findUserByEmail('aarav@example.com');
  test.skip(!user, 'seeded user aarav@example.com missing');
  const cement = await findProductByName('UltraTech OPC 53 Grade Cement — 50kg bag');
  test.skip(!cement, 'seeded UltraTech product missing (run npm run seed:products)');

  const planId = await insertPlan({
    user: user._id,
    floorPlan: 'https://picsum.photos/seed/e2e-plan/800',
    finalDesign: 'https://picsum.photos/seed/e2e-render/800',
    plotLength: 40,
    plotWidth: 30,
    floors: 1,
    rooms: '2 BHK',
    layoutStyle: 'Modern',
    notes: MARKER,
    billOfMaterials: {
      generatedAt: new Date(),
      assumptions: `${MARKER} assumptions text for PDF test.`,
      items: [
        {
          category: 'Cement',
          item: 'OPC 53 Grade Cement',
          quantity: 100,
          unit: 'bags',
          notes: 'test notes',
          available: true,
          matches: [{ product: cement._id, vendorName: cement.vendorName, price: cement.price, unit: '' }],
        },
        {
          category: 'Paint',
          item: 'Unobtainium Coating',
          quantity: 5,
          unit: 'litres',
          notes: '',
          available: false,
          matches: [],
        },
      ],
    },
  });

  try {
    await loginAs(page, 'aarav@example.com', 'password123');
    await page.getByRole('button', { name: /saved floor plans/i }).click();
    const pdfButton = page.getByTestId(`download-pdf-${planId}`);
    await expect(pdfButton).toBeVisible({ timeout: 20000 });

    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await pdfButton.click();
    const download = await downloadPromise;
    const path = await download.path();
    expect(path).toBeTruthy();
    const bytes = fs.readFileSync(path);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    expect(bytes.length).toBeGreaterThan(5000);
    expect(download.suggestedFilename()).toContain(planId);
  } finally {
    await deletePlansByMarker(MARKER);
  }
});
