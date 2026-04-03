import { test, expect } from '@playwright/test';

test.describe('Tool - Interest calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/interest-calculator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Interest calculator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});