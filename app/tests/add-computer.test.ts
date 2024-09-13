import { expect, test, type Page } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';
import { faker } from '@faker-js/faker';

const mockData = generateMock(_computerSchema);

test.beforeEach(async ({ page }) => {
	await page.goto('/computers/add');
	await page.getByTitle('Name').fill(mockData.name);
});
test.describe('Tests expected to pass', () => {
	test.afterEach('düğmeye bas kontrol et', async ({ page }) => {
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
	});

	test('add ✅ all', async ({ page }) => {
		await page.getByRole('button', { name: 'Network' }).click();
		await fillField(page, 'IP Address', faker.internet.ipv4());
		await fillField(page, 'Mac Address', faker.internet.mac());
		await page.getByRole('button', { name: 'Network' }).click();

		await page.getByRole('button', { name: 'Hardware' }).click();
		// Conditionally fill fields based on mockData
		const titlesAndValues = [
			['processor', mockData.processor],
			['monitor', mockData.monitor],
			['videoAdaptor', mockData.videoAdaptor],
			['disk1', mockData.disk1],
			['disk2', mockData.disk2]
		];

		for (const [title, value] of titlesAndValues) {
			await fillField(page, title, value);
		}
	});
});
test.describe('Checks of wrong enterence', () => {
	test('add ✅ name / ❌ ip ', async ({ page }) => {
		await page.getByRole('button', { name: 'Network' }).click();

		await page.getByTitle('IP Address').fill('22');
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.locator('.error >> text=Invalid ip')).toBeVisible();
	});

	test('add  ✅ name / ✅ ip / ❌ MAC ', async ({ page }) => {
		await page.getByRole('button', { name: 'Network' }).click();
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill('wk-22-22');
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.locator('.error >> text=Invalid')).toBeVisible();
	});
});

async function fillField(page: Page, title, value: string | number | null) {
	await page.getByTitle(title).fill(String(value));
}
