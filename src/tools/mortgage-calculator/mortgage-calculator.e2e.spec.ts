import { test, expect } from '@playwright/test';

test.describe('Tool - Mortgage calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mortgage-calculator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Mortgage calculator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});