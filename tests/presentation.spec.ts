import { test, expect, type Page } from '@playwright/test';
import { PresentationPage } from './pages/PresentationPage';

test.describe.configure({ mode: 'serial' });

test.describe('Presentation Page', () => {
  let presentationPage: PresentationPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    presentationPage = new PresentationPage(page);
    await presentationPage.goto();
  });

  test('deve exibir o nome "Lucas Nonato"', async () => {
    await expect(presentationPage.nameElement).toBeVisible();
    await expect(presentationPage.nameElement).toHaveText('Eu sou Lucas Nonato');
  });

  test('deve exibir o título "Desenvolvedor Web"', async () => {
    await expect(presentationPage.roleElement).toBeVisible();
    await expect(presentationPage.roleElement).toContainText('Desenvolvedor Web');
  });

  test('deve exibir "Full-Stack"', async () => {
    await expect(presentationPage.specialtyElement).toBeVisible();
    await expect(presentationPage.specialtyElement).toHaveText('Full-Stack');
  });

  test('deve exibir "UX Designer"', async () => {
    await expect(presentationPage.secondaryRoleElement).toBeVisible();
    await expect(presentationPage.secondaryRoleElement).toHaveText('UX Designer');
  });

  test('deve exibir a imagem de apresentação', async () => {
    await expect(presentationPage.image).toBeVisible();
    await expect(presentationPage.image).toHaveAttribute('alt', /Lucas Nonato/);
  });

  test('deve ter a seção com id "home"', async () => {
    await expect(presentationPage.section).toBeVisible();
    await expect(presentationPage.section).toHaveAttribute('id', 'home');
  });

  test('deve exibir todos os elementos principais juntos', async () => {
    await expect(presentationPage.nameElement).toBeVisible();
    await expect(presentationPage.roleElement).toBeVisible();
    await expect(presentationPage.specialtyElement).toBeVisible();
    await expect(presentationPage.secondaryRoleElement).toBeVisible();
    await expect(presentationPage.image).toBeVisible();
  });

  test('animação do container deve tornar a seção visível', async () => {
    await expect(presentationPage.section).toBeVisible();
    await presentationPage.waitForTimeout(1500);
    const opacity = await presentationPage.getOpacity();
    expect(Number.parseFloat(opacity)).toBeGreaterThan(0.9);
  });

  test('animação da imagem deve aplicar transformações', async () => {
    await expect(presentationPage.imageContainer).toBeVisible();
    await presentationPage.waitForTimeout(600);
    const transform = await presentationPage.getImageTransform();
    expect(transform).not.toBe('none');
  });

  test('hover na imagem deve alterar a transformação', async () => {
    await expect(presentationPage.imageWrapper).toBeVisible();
    await presentationPage.waitForTimeout(600);
    const initialTransform = await presentationPage.getImageWrapperTransform();
    await presentationPage.hoverImage();
    await presentationPage.waitForTimeout(400);
    const hoverTransform = await presentationPage.getImageWrapperTransform();
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('elementos flutuantes devem estar animando continuamente', async () => {
    await expect(presentationPage.floatingTopCircle).toBeVisible();
    await expect(presentationPage.floatingBottomCircle).toBeVisible();

    await presentationPage.waitForTimeout(600);
    const firstTopTransform = await presentationPage.getFloatingTopTransform();
    const firstBottomTransform = await presentationPage.getFloatingBottomTransform();

    await presentationPage.waitForTimeout(800);
    const secondTopTransform = await presentationPage.getFloatingTopTransform();
    const secondBottomTransform = await presentationPage.getFloatingBottomTransform();

    expect(secondTopTransform).not.toBe(firstTopTransform);
    expect(secondBottomTransform).not.toBe(firstBottomTransform);
  });
});
