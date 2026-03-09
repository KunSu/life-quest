import { expect, test } from '@playwright/test';

test('loads dashboard shell and health endpoint @m0', async ({
  page,
  request,
}) => {
  const response = await request.get('/api/health');

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual({
    data: { status: 'ok', app: 'life-quest', storage: 'sqlite' },
  });

  await page.goto('/dashboard');

  await expect(
    page.getByRole('heading', { name: /life quest/i }),
  ).toBeVisible();
  await expect(page.getByText(/dashboard/i)).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasHorizontalOverflow).toBe(false);
});
