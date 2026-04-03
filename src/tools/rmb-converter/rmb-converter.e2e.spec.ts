import { test, expect } from '@playwright/test';

test.describe('Tool - Rmb converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rmb-converter');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Rmb converter - IT Tools');
  });

  test('', async ({ page }) => {

  });
});