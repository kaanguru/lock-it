import { expect, test } from '@playwright/test';

test('add computer with  name', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill('of02');
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText('of02')).toBeVisible();
});
test('add computer with correct name and wrong ip address', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill('of02');
	await page.getByTitle('IPAddress').fill('22');
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText('Form is invalid!')).toBeVisible();
	await expect(page.getByRole('paragraph').getByText('Invalid ip')).toBeVisible();
});
