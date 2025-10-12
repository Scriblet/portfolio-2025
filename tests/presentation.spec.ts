import { test, expect, type Locator, type Page } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

const getComputedTransform = async (locator: Locator) => {
  return locator.evaluate((element) => getComputedStyle(element).transform);
};

const getComputedOpacity = async (locator: Locator) => {
  return locator.evaluate((element) => getComputedStyle(element).opacity);
};

test.describe('Presentation Page', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Navega para a página inicial
    await page.goto('http://localhost:5173');
  });

  test('deve exibir o nome "Lucas Nonato"', async ({ page }: { page: Page }) => {
    // Verifica se o título principal está visível
    const nameElement = page.getByTestId('presentation-name');
    await expect(nameElement).toBeVisible();
    await expect(nameElement).toHaveText('Eu sou Lucas Nonato');
  });

  test('deve exibir o título "Desenvolvedor Web"', async ({ page }: { page: Page }) => {
    // Verifica se o título de desenvolvedor está visível
    const roleElement = page.getByTestId('presentation-role');
    await expect(roleElement).toBeVisible();
    await expect(roleElement).toContainText('Desenvolvedor Web');
  });

  test('deve exibir "Full-Stack"', async ({ page }: { page: Page }) => {
    // Verifica se o subtítulo Full-Stack está visível
    const specialtyElement = page.getByTestId('presentation-specialty');
    await expect(specialtyElement).toBeVisible();
    await expect(specialtyElement).toHaveText('Full-Stack');
  });

  test('deve exibir "UX Designer"', async ({ page }: { page: Page }) => {
    // Verifica se o título UX Designer está visível
    const secondaryRoleElement = page.getByTestId('presentation-secondary-role');
    await expect(secondaryRoleElement).toBeVisible();
    await expect(secondaryRoleElement).toHaveText('UX Designer');
  });

  test('deve exibir a imagem de apresentação', async ({ page }: { page: Page }) => {
    // Verifica se a imagem está presente
    const image = page.getByTestId('presentation-image');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt', /Lucas Nonato/);
  });

  test('deve ter a seção com id "home"', async ({ page }: { page: Page }) => {
    // Verifica se a seção home existe
    const homeSection = page.getByTestId('presentation-section');
    await expect(homeSection).toBeVisible();
    await expect(homeSection).toHaveAttribute('id', 'home');
  });

  test('deve exibir todos os elementos principais juntos', async ({ page }: { page: Page }) => {
    // Teste de integração - verifica todos os elementos juntos
    await expect(page.getByTestId('presentation-name')).toBeVisible();
    await expect(page.getByTestId('presentation-role')).toBeVisible();
    await expect(page.getByTestId('presentation-specialty')).toBeVisible();
    await expect(page.getByTestId('presentation-secondary-role')).toBeVisible();
    await expect(page.getByTestId('presentation-image')).toBeVisible();
  });

  test('animação do container deve tornar a seção visível', async ({ page }: { page: Page }) => {
    const container = page.getByTestId('presentation-section');
    await expect(container).toBeVisible();
    await page.waitForTimeout(1500);
    const opacity = await getComputedOpacity(container);
    expect(Number.parseFloat(opacity)).toBeGreaterThan(0.9);
  });

  test('animação da imagem deve aplicar transformações', async ({ page }: { page: Page }) => {
    const imageContainer = page.getByTestId('presentation-image-container');
    await expect(imageContainer).toBeVisible();
    await page.waitForTimeout(600);
    const transform = await getComputedTransform(imageContainer);
    expect(transform).not.toBe('none');
  });

  test('hover na imagem deve alterar a transformação', async ({ page }: { page: Page }) => {
    const imageWrapper = page.getByTestId('presentation-image-wrapper');
    await expect(imageWrapper).toBeVisible();
    await page.waitForTimeout(600);
    const initialTransform = await getComputedTransform(imageWrapper);
    await imageWrapper.hover();
    await page.waitForTimeout(400);
    const hoverTransform = await getComputedTransform(imageWrapper);
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('elementos flutuantes devem estar animando continuamente', async ({ page }: { page: Page }) => {
    const topCircle = page.getByTestId('presentation-floating-top');
    const bottomCircle = page.getByTestId('presentation-floating-bottom');

    await expect(topCircle).toBeVisible();
    await expect(bottomCircle).toBeVisible();

    await page.waitForTimeout(600);
    const firstTopTransform = await getComputedTransform(topCircle);
    const firstBottomTransform = await getComputedTransform(bottomCircle);

    await page.waitForTimeout(800);
    const secondTopTransform = await getComputedTransform(topCircle);
    const secondBottomTransform = await getComputedTransform(bottomCircle);

    expect(secondTopTransform).not.toBe(firstTopTransform);
    expect(secondBottomTransform).not.toBe(firstBottomTransform);
  });
});
