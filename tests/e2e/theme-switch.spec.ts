import { expect, test } from '@playwright/test';

test('resolves the stored theme on first render @m0.5', async ({
  browser,
  baseURL,
  page,
}) => {
  // Reset DB to known baseline before asserting initial state
  await page.request.fetch('/api/user/theme', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify({ themeMode: 'modern' }),
  });

  await page.goto('/dashboard');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'modern');

  await page.getByRole('button', { name: /switch to adventure/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'adventure');

  const freshContext = await browser.newContext();
  const freshPage = await freshContext.newPage();

  await freshPage.goto(`${baseURL}/dashboard`);
  await expect(freshPage.locator('html')).toHaveAttribute(
    'data-theme',
    'adventure',
  );

  await freshContext.close();
});

test('respects an existing cookie before paint @m0.5', async ({
  baseURL,
  context,
  page,
}) => {
  await context.addCookies([
    {
      name: 'life-quest-theme',
      value: 'adventure',
      url: baseURL!,
    },
  ]);

  await page.goto('/dashboard');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'adventure');
  await expect(
    page.getByRole('button', { name: /switch to modern/i }),
  ).toBeVisible();
});
