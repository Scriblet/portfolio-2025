import { test, expect, type Page } from '@playwright/test';

/**
 * Prova, de fora, que as seções abaixo da dobra são carregadas a partir de
 * módulos próprios (code splitting) e que a dobra inicial não depende delas.
 *
 * Em `npm run dev` (usado pelo webServer do Playwright) o Vite serve cada
 * módulo como um arquivo separado, por isso o filtro aceita `.js` (vendor
 * pré-bundleado) e `.ts`/`.tsx`/`.jsx` (módulos da app). Em `vite build` os
 * mesmos módulos saem como chunks `.js`. O teste não depende de nomes/hashes
 * de chunk.
 */
const MODULE_FILE = /\.(m?js|tsx?|jsx?)$/i;

async function collectScriptResources(page: Page): Promise<string[]> {
  const resources = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((entry) => entry.name),
  );

  return Array.from(
    new Set(
      resources
        .map((url) => url.split('?')[0].split('#')[0])
        .filter((url) => MODULE_FILE.test(url)),
    ),
  );
}

test.describe('Code splitting e lazy loading', () => {
  test('a Presentation renderiza sem esperar os chunks das seções', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Dobra inicial: Header + Presentation prontos de imediato.
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByTestId('presentation-section')).toBeVisible();
    await expect(page.getByTestId('presentation-name')).toContainText(
      'Lucas Nonato',
    );

    // O app é servido em vários arquivos de script distintos (chunks), não em
    // um único bundle monolítico.
    const scripts = await collectScriptResources(page);
    expect(scripts.length).toBeGreaterThanOrEqual(3);

    // Quando cada chunk resolve, o skeleton de altura preservada sai do DOM.
    await expect(page.getByTestId('section-fallback')).toHaveCount(0, {
      timeout: 15_000,
    });
  });

  test('rolar até Experience e Skills monta as seções e seus cards', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const experience = page.locator('#experience');
    await experience.scrollIntoViewIfNeeded();
    await expect(experience).toBeVisible();
    await expect(page.getByTestId('experience-heading')).toBeVisible();
    await expect(page.locator('[data-testid^="experience-card-"]')).toHaveCount(
      4,
    );
    await expect(page.getByTestId('experience-card-1')).toBeVisible();

    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toBeVisible();
    await expect(
      skills.getByRole('heading', { name: 'Habilidades Técnicas' }),
    ).toBeVisible();
    await expect(skills.getByText('React/Next.js')).toBeVisible();
  });

  test('navegação por âncora do header chega ao Contato', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const contact = page.locator('#contact');
    await expect(contact).toBeAttached();

    await page
      .locator('header')
      .getByRole('button', { name: 'Contato' })
      .click();

    await expect(contact).toBeInViewport({ timeout: 10_000 });
    await expect(page.getByLabel('Nome')).toBeVisible();
  });
});
