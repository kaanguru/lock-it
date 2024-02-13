import { expect, test, type Page } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';
import { faker } from '@faker-js/faker';

const mockData = generateMock(_computerSchema);

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Name').fill(mockData.name);
});
test.describe('geçecek testler', () => {
	test.afterEach('düğmeye bas kontrol et', async ({ page }) => {
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
	});

	test('add ✅ all', async ({ page }) => {
		// Fill known fields with faker data
		await fillField(page, 'IP Address', faker.internet.ipv4());
		await fillField(page, 'Mac Address', faker.internet.mac());

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
test.describe('Hatalı Giriş Kontrolleri', () => {
	test('add ✅ name / ❌ ip ', async ({ page }) => {
		await page.getByTitle('IP Address').fill('22');
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.getByRole('paragraph').getByText('Form is invalid!')).toBeVisible();
		await expect(page.locator('.error >> text=Invalid ip')).toBeVisible();
	});

	test('add  ✅ name / ✅ ip / ❌ MAC ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill('wk-22-22');
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.locator('.error >> text=Invalid')).toBeVisible();
	});
});

async function fillField(
	page: Page,
	title: string | null | RegExp,
	value: string | number | null
) {
	// @ts-expect-error tittle regex ve null aynı anda olmuyor
	await page.getByTitle(title).fill(String(value));
}