import { expect, test } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';
import { randomInt } from 'crypto';
import { faker } from '@faker-js/faker';

const seed = randomInt(3, 99);
const mockData = generateMock(_computerSchema, { seed });
const mockip = faker.internet.ipv4();

test('add computer with just name', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
test('add computer with correct name and wrong ip address', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill('22');
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText('Form is invalid!')).toBeVisible();
	await expect(page.locator('.error >> text=Invalid ip')).toBeVisible();
});
test('add computer with correct name and correct ip address', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill(mockip);
	await page.getByRole('button').click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
