import { test, expect } from '@playwright/test';

test('3 harf isim gerisi yalan', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('asf');
  await page.getByPlaceholder('IP Address').click();
  await page.getByPlaceholder('IP Address').fill('asf');
  await page.getByRole('button', { name: 'Add Computer' }).click();
  await expect(page.locator('form')).toContainText('Invalid ip');
  await expect(page.locator('form')).toContainText('Form is invalid!');
});