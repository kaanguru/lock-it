import { expect, test } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from "../src/lib/db";
import { randomInt } from 'crypto';
const seed = randomInt(3,99);
const mockData = generateMock(_computerSchema,{seed});
test('add computer with just name', async ({ page }) => {
	test.slow();
	console.log(mockData);
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
test('add computer with correct name and wrong ip address', async ({ page }) => {
	test.slow();
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IPAddress').fill('22');
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText('Form is invalid!')).toBeVisible();
	await expect(page.getByRole('paragraph').getByText('Invalid ip')).toBeVisible();
});
