import { test, expect } from '@playwright/test';

test.describe('Download de CV', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('exibe o botão na apresentação com link e nome de arquivo corretos', async ({ page }) => {
    const button = page.getByTestId('download-cv-button-presentation');

    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('href', '/cv/lucas-nonato-cv.pdf');
    await expect(button).toHaveAttribute('download', 'Lucas-Nonato-CV.pdf');
    await expect(button).toHaveAttribute('aria-label', /currículo/i);
    await expect(button).toHaveAttribute('rel', /noopener/);
  });

  test('serve o PDF como application/pdf', async ({ page }) => {
    const response = await page.request.get('/cv/lucas-nonato-cv.pdf');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  });

  test('mostra feedback após o clique', async ({ page }) => {
    const button = page.getByTestId('download-cv-button-presentation');

    await button.scrollIntoViewIfNeeded();
    await button.click();

    await expect(
      page.getByTestId('download-cv-feedback-presentation'),
    ).toHaveText('Download iniciado');
  });

  test('exibe o botão de reforço na seção de contato', async ({ page }) => {
    const button = page.getByTestId('download-cv-button-contact');

    await button.scrollIntoViewIfNeeded();
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('href', '/cv/lucas-nonato-cv.pdf');
  });
});
