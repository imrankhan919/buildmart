import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect } from '@playwright/test';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(rootDir, '.env') });

let connected = false;

export async function db() {
  if (!connected) {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
  }
  return mongoose;
}

function model(name, collection) {
  const m = mongoose;
  return m.models[name] || m.model(name, new m.Schema({}, { strict: false }), collection);
}

export async function findUserByEmail(email) {
  await db();
  return model('e2e-user', 'users').findOne({ email }).lean();
}

export async function findProductByName(name) {
  await db();
  const p = await model('e2e-product', 'products').findOne({ name }).lean();
  if (!p) return null;
  const v = await model('e2e-vendor', 'vendors').findById(p.vendor).select('name').lean();
  return { ...p, vendorName: v?.name || '' };
}

export async function insertPlan(doc) {
  await db();
  const created = await model('e2e-plan', 'generatedplans').create(doc);
  return created._id.toString();
}

export async function deletePlansByMarker(marker) {
  await db();
  const res = await model('e2e-plan', 'generatedplans').deleteMany({
    'billOfMaterials.assumptions': { $regex: marker },
  });
  return res.deletedCount;
}

export async function loginAs(page, email, password) {
  await page.goto('/login');
  await page.locator('#login-email').fill(email);
  await page.locator('#login-password').fill(password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/profile/, { timeout: 15000 });
}
