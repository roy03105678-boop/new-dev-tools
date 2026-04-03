import { test, expect } from '@playwright/test';

test.describe('Tool - Interest rate converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/interest-rate-converter');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Interest rate converter - IT Tools');
  });

  test('', async ({ page }) => {

  });
});