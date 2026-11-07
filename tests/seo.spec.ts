import { test, expect, type Page } from '@playwright/test';

const CANONICAL_URL = 'https://scriblet.github.io/portfolio-2025/';

function metaContent(page: Page, selector: string) {
  return page.locator(selector).first().getAttribute('content');
}

test.describe.configure({ mode: 'serial' });

test.describe('SEO e metadados', () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('deve declarar idioma pt-BR, título e descrição', async ({ page }: { page: Page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');

    const title = await page.title();
    expect(title).toContain('Lucas Nonato');

    const description = await metaContent(page, 'meta[name="description"]');
    expect(description).toBeTruthy();
    expect(description!.trim().length).toBeGreaterThan(0);

    const author = await metaContent(page, 'meta[name="author"]');
    expect(author).toBe('Lucas Nonato');
  });

  test('deve expor Open Graph completo com imagem absoluta', async ({ page }: { page: Page }) => {
    expect(await metaContent(page, 'meta[property="og:type"]')).toBe('profile');
    expect(await metaContent(page, 'meta[property="og:site_name"]')).toBe('Lucas Nonato');

    const ogTitle = await metaContent(page, 'meta[property="og:title"]');
    expect(ogTitle).toContain('Lucas Nonato');

    const ogDescription = await metaContent(page, 'meta[property="og:description"]');
    expect(ogDescription).toBeTruthy();

    expect(await metaContent(page, 'meta[property="og:url"]')).toBe(CANONICAL_URL);

    const ogImage = await metaContent(page, 'meta[property="og:image"]');
    expect(ogImage).toBeTruthy();
    expect(ogImage).toMatch(/^https?:\/\//);
    expect(ogImage).toContain('/og-cover.png');

    expect(await metaContent(page, 'meta[property="og:image:width"]')).toBe('1200');
    expect(await metaContent(page, 'meta[property="og:image:height"]')).toBe('630');

    const ogImageAlt = await metaContent(page, 'meta[property="og:image:alt"]');
    expect(ogImageAlt).toBeTruthy();

    expect(await metaContent(page, 'meta[property="og:locale"]')).toBe('pt_BR');
  });

  test('deve expor Twitter Card summary_large_image', async ({ page }: { page: Page }) => {
    expect(await metaContent(page, 'meta[name="twitter:card"]')).toBe('summary_large_image');

    const twitterTitle = await metaContent(page, 'meta[name="twitter:title"]');
    expect(twitterTitle).toContain('Lucas Nonato');

    const twitterDescription = await metaContent(page, 'meta[name="twitter:description"]');
    expect(twitterDescription).toBeTruthy();

    const twitterImage = await metaContent(page, 'meta[name="twitter:image"]');
    expect(twitterImage).toBeTruthy();
    expect(twitterImage).toMatch(/^https?:\/\//);

    const twitterImageAlt = await metaContent(page, 'meta[name="twitter:image:alt"]');
    expect(twitterImageAlt).toBeTruthy();
  });

  test('deve ter canonical absoluto, robots e theme-color', async ({ page }: { page: Page }) => {
    const canonical = await page.locator('link[rel="canonical"]').first().getAttribute('href');
    expect(canonical).toBe(CANONICAL_URL);
    expect(canonical).toMatch(/^https?:\/\//);

    expect(await metaContent(page, 'meta[name="robots"]')).toBe('index,follow');
    expect(await metaContent(page, 'meta[name="theme-color"]')).toMatch(
      /^#(121212|f5f3f7)$/,
    );
  });

  test('deve declarar ícones de favicon e apple-touch-icon', async ({ page }: { page: Page }) => {
    const icon = page.locator('link[rel="icon"]').first();
    await expect(icon).toHaveAttribute('type', 'image/svg+xml');
    await expect(icon).toHaveAttribute('href', '/favicon.svg');

    const appleIcon = page.locator('link[rel="apple-touch-icon"]').first();
    await expect(appleIcon).toHaveAttribute('href', '/apple-touch-icon.png');
  });

  test('deve ter JSON-LD Person parseável e com links sociais', async ({ page }: { page: Page }) => {
    const jsonLdLocator = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdLocator).toHaveCount(1);

    const raw = await jsonLdLocator.first().textContent();
    expect(raw).toBeTruthy();

    const data = JSON.parse(raw!);

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Lucas Nonato');
    expect(data.jobTitle).toBe('Desenvolvedor Full-Stack');
    expect(data.url).toBe(CANONICAL_URL);
    expect(data.image).toMatch(/^https?:\/\//);

    expect(Array.isArray(data.sameAs)).toBe(true);
    const sameAs = (data.sameAs as string[]).join(' ');
    expect(sameAs).toContain('github.com/scriblet');
    expect(sameAs).toContain('linkedin.com/in/lucasnonato');

    expect(data.knowsAbout).toEqual(['React', 'TypeScript', 'Acessibilidade', 'UX Design']);
  });

  test('deve servir favicon.svg e og-cover.png', async ({ page }: { page: Page }) => {
    const favicon = await page.request.get('/favicon.svg');
    expect(favicon.status()).toBe(200);

    const ogCover = await page.request.get('/og-cover.png');
    expect(ogCover.status()).toBe(200);
    expect(ogCover.headers()['content-type']).toContain('image/');

    const appleIcon = await page.request.get('/apple-touch-icon.png');
    expect(appleIcon.status()).toBe(200);
    expect(appleIcon.headers()['content-type']).toContain('image/');
  });
});
