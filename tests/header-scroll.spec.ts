import { test, expect, type Page } from '@playwright/test';
import { HeaderPage } from './pages/HeaderPage';

/**
 * Translada o header em pixels (eixo Y). Aceita "none" (sem transform),
 * "matrix(...)" ou "matrix3d(...)".
 */
async function getHeaderTranslateY(page: Page): Promise<number> {
  return page.locator('header').first().evaluate((element) => {
    const transform = window.getComputedStyle(element).transform;
    if (!transform || transform === 'none') return 0;
    return new DOMMatrixReadOnly(transform).m42;
  });
}

async function scrollTo(page: Page, top: number) {
  await page.evaluate((y) => {
    window.scrollTo({ top: y, behavior: 'instant' });
  }, top);
}

test.describe('Header com scroll inteligente', () => {
  let headerPage: HeaderPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    headerPage = new HeaderPage(page);
    await headerPage.goto();
    await page.waitForTimeout(300);
  });

  test('no topo o header está visível', async ({ page }: { page: Page }) => {
    await expect(headerPage.header).toBeVisible();

    expect(await getHeaderTranslateY(page)).toBe(0);
    expect(await headerPage.header.getAttribute('aria-hidden')).not.toBe('true');
    expect(await headerPage.header.getAttribute('inert')).toBeNull();
  });

  test('rolar para baixo esconde o header', async ({ page }: { page: Page }) => {
    await scrollTo(page, 600);

    await expect
      .poll(() => headerPage.header.getAttribute('aria-hidden'))
      .toBe('true');

    expect(await getHeaderTranslateY(page)).toBeLessThan(0);
    // Escondido, o header sai da árvore de acessibilidade e da tabulação.
    expect(await headerPage.header.getAttribute('inert')).not.toBeNull();
  });

  test('rolar para cima mostra o header novamente', async ({ page }: { page: Page }) => {
    await scrollTo(page, 900);
    await expect
      .poll(() => headerPage.header.getAttribute('aria-hidden'))
      .toBe('true');

    await scrollTo(page, 300);

    await expect
      .poll(() => headerPage.header.getAttribute('aria-hidden'))
      .not.toBe('true');
    await expect.poll(() => getHeaderTranslateY(page)).toBe(0);
    expect(await headerPage.header.getAttribute('inert')).toBeNull();
  });

  test('pequenos ajustes de scroll não fazem o header piscar', async ({ page }: { page: Page }) => {
    await scrollTo(page, 500);
    await expect
      .poll(() => headerPage.header.getAttribute('aria-hidden'))
      .toBe('true');

    // Micro-scroll para cima abaixo do limiar (10px) não deve reexibir.
    await scrollTo(page, 494);
    await page.waitForTimeout(200);

    expect(await headerPage.header.getAttribute('aria-hidden')).toBe('true');
  });

  test('foco de teclado dentro do header impede esconder', async ({ page }: { page: Page }) => {
    await page.keyboard.press('Tab');
    const focusInHeader = await page.evaluate(
      () => !!document.activeElement?.closest('header'),
    );
    expect(focusInHeader).toBe(true);

    await scrollTo(page, 600);
    await page.waitForTimeout(300);

    expect(await headerPage.header.getAttribute('aria-hidden')).not.toBe('true');
    expect(await getHeaderTranslateY(page)).toBe(0);
  });

  test('âncora #skills continua navegando', async ({ page }: { page: Page }) => {
    await headerPage.getHabilidadesButton().click();

    await expect
      .poll(() =>
        page.evaluate(() => {
          const skills = document.getElementById('skills');
          return skills ? Math.abs(skills.getBoundingClientRect().top) : Number.POSITIVE_INFINITY;
        }),
      )
      .toBeLessThan(160);

    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });
});
