import { test, expect } from '@playwright/test';

test('shows the feature shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Its me appu'
  );
});
