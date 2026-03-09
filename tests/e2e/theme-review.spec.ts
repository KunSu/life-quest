import { test } from '@playwright/test';

test('captures review screenshots for both themes @m0.5-review', async ({
  page,
}, testInfo) => {
  const viewportLabel =
    testInfo.project.name === 'desktop' ? 'desktop' : 'mobile';

  await page.goto('/dashboard');
  await page.screenshot({
    path: `docs/reviews/m0.5-dashboard-modern-${viewportLabel}.png`,
    fullPage: true,
  });

  await page.getByRole('button', { name: /switch to adventure/i }).click();
  await page.screenshot({
    path: `docs/reviews/m0.5-dashboard-adventure-${viewportLabel}.png`,
    fullPage: true,
  });
});
