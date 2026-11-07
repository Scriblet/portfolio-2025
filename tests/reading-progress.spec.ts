import { test, expect, type Page } from '@playwright/test';

const PROGRESS = '[data-testid="reading-progress"]';

async function getProgressValue(page: Page): Promise<number> {
  const raw = await page.locator(PROGRESS).getAttribute('aria-valuenow');
  return Number(raw);
}

async function scrollTo(page: Page, top: number) {
  await page.evaluate((y) => {
    window.scrollTo({ top: y, behavior: 'instant' });
  }, top);
}

test.describe('Indicador de progresso de leitura', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/');
    await page.waitForTimeout(300);
  });

  test('a barra existe e é acessível como progressbar', async ({ page }: { page: Page }) => {
    const bar = page.locator(PROGRESS);
    await expect(bar).toBeVisible();

    expect(await bar.getAttribute('role')).toBe('progressbar');
    expect(await bar.getAttribute('aria-label')).toBe('Progresso de leitura');
    expect(await bar.getAttribute('aria-valuemin')).toBe('0');
    expect(await bar.getAttribute('aria-valuemax')).toBe('100');
    // O preenchimento começa com largura 0 (por isso "attached", não "visible").
    await expect(page.getByTestId('reading-progress-bar')).toBeAttached();

    // Puramente informativa: não intercepta cliques/foco.
    const pointerEvents = await bar.evaluate(
      (element) => window.getComputedStyle(element).pointerEvents,
    );
    expect(pointerEvents).toBe('none');
  });

  test('no topo o progresso é ~0', async ({ page }: { page: Page }) => {
    expect(await getProgressValue(page)).toBeLessThanOrEqual(1);
  });

  test('no fim da página o progresso chega a >= 95', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
    });

    await expect.poll(() => getProgressValue(page)).toBeGreaterThanOrEqual(95);
  });

  test('rolar para o meio e voltar reduz o progresso', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: scrollable * 0.5, behavior: 'instant' });
    });

    await expect.poll(() => getProgressValue(page)).toBeGreaterThan(30);
    const middle = await getProgressValue(page);
    expect(middle).toBeLessThanOrEqual(70);

    await scrollTo(page, 0);

    await expect.poll(() => getProgressValue(page)).toBeLessThan(middle);
    expect(await getProgressValue(page)).toBeLessThanOrEqual(1);
  });
});
