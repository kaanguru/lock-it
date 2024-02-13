import { expect, test } from '@playwright/test';
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
	test('add  ✅ name / ✅ ip ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
	});
	test('add  ✅ name / ✅ ip / ✅ MAC ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
	});
	test('add  ✅ name / ✅ ip / ✅ MAC / ✅ memory ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
		if (mockData.memory !== null) {
			await page.getByTitle('Memory').fill(mockData.memory?.toString());
		}
	});

	test('add  ✅ name / ✅ ip / ✅ MAC / [] memory / ✅ CPU ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
		if (mockData.processor !== null) {
			await page.getByTitle('processor').fill(mockData.processor);
		}
	});
	test('add  ✅ name / ✅ ip / ✅ MAC / [] memory / ✅ CPU/ ✅ Moth ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
		if (mockData.processor !== null) {
			await page.getByTitle('processor').fill(mockData.processor);
		}
		if (mockData.motherBoard !== null) {
			await page.getByTitle('motherBoard').fill(mockData.motherBoard);
		}
	});

	test('add  ✅ all ', async ({ page }) => {
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill(faker.internet.mac());
		mockData.processor ? await page.getByTitle('processor').fill(mockData.processor) : null;
		mockData.monitor ? await page.getByTitle('monitor').fill(mockData.monitor) : null;
		mockData.videoAdaptor ?	await page.getByTitle('videoAdaptor').fill(mockData.videoAdaptor): null;
		mockData.disk1 ?	await page.getByTitle('disk1').fill(mockData.disk1): null;
		mockData.disk2 ?	await page.getByTitle('disk2').fill(mockData.disk2): null;
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
