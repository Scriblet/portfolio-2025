import { test, expect } from '@playwright/test';

test.describe('Roadmap (dev only)', () => {
  test('renderiza a página com estatísticas e ondas', async ({ page }) => {
    await page.goto('/roadmap', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId('roadmap-page')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 1, name: /roadmap do portfólio/i }),
    ).toBeVisible();
    await expect(page.getByText(/ambiente de desenvolvimento/i)).toBeVisible();

    await expect(page.getByTestId('roadmap-wave-0')).toBeVisible();
    await expect(page.getByTestId('roadmap-wave-1')).toBeVisible();
    await expect(page.getByTestId('roadmap-item-dados-centralizados')).toBeVisible();
    await expect(page.getByTestId('roadmap-item-download-cv')).toBeVisible();
  });

  test('mostra os estados concluído e pendente', async ({ page }) => {
    await page.goto('/roadmap', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId('roadmap-status-done').first()).toBeVisible();
    await expect(
      page.getByTestId('roadmap-status-pending').first(),
    ).toBeVisible();
  });

  test('o menu do header expõe o roadmap apenas em dev', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const roadmapLink = page.getByRole('link', { name: /roadmap/i });
    await expect(roadmapLink).toBeVisible();
    await roadmapLink.click();

    await expect(page).toHaveURL(/\/roadmap$/);
    await expect(page.getByTestId('roadmap-page')).toBeVisible();
  });

  test('volta para o portfólio', async ({ page }) => {
    await page.goto('/roadmap', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: /voltar ao portfólio/i }).click();

    await expect(page.getByTestId('presentation-section')).toBeVisible();
  });
});
