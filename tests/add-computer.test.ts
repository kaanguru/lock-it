import { expect, test } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';
import { faker } from '@faker-js/faker';

const mockData = generateMock(_computerSchema);

test('add ✅ name', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByRole('button', { name: 'Add Computer' }).click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
test('add ✅ name / ❌ ip ', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill('22');
	await page.getByRole('button', { name: 'Add Computer' }).click();
	await expect(page.getByRole('paragraph').getByText('Form is invalid!')).toBeVisible();
	await expect(page.locator('.error >> text=Invalid ip')).toBeVisible();
});
test('add  ✅ name / ✅ ip ', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill(faker.internet.ipv4());
	await page.getByRole('button', { name: 'Add Computer' }).click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
test('add  ✅ name / ✅ ip / ✅ MAC ', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill(faker.internet.ipv4());
	await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
	await page.getByRole('button', { name: 'Add Computer' }).click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
test('add  ✅ name / ✅ ip / ❌ MAC ', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill(faker.internet.ipv4());
	await page.getByPlaceholder('Mac Address').fill('wk-22-22');
	await page.getByRole('button', { name: 'Add Computer' }).click();
	await expect(page.getByRole('paragraph').getByText('Form is invalid!')).toBeVisible();
	await expect(page.locator('.error >> text=Invalid')).toBeVisible();
});

test('add  ✅ name / ✅ ip / ✅ MAC / ✅ memory ', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByTitle('IP Address').fill(faker.internet.ipv4());
	await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
	if (mockData.memory !== null) {
		await page.getByTitle('Memory').fill(mockData.memory?.toString());
	}
	await page.getByRole('button', { name: 'Add Computer' }).click();
	await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
});
