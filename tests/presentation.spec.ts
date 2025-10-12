import { test, expect } from '@playwright/test';

test.describe('Presentation Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página inicial
    await page.goto('http://localhost:5173');
  });

  test('deve exibir o nome "Lucas Nonato"', async ({ page }) => {
    // Verifica se o título principal está visível
    const nameElement = page.getByTestId('presentation-name');
    await expect(nameElement).toBeVisible();
    await expect(nameElement).toHaveText('Eu sou Lucas Nonato');
  });

  test('deve exibir o título "Desenvolvedor Web"', async ({ page }) => {
    // Verifica se o título de desenvolvedor está visível
    const roleElement = page.getByTestId('presentation-role');
    await expect(roleElement).toBeVisible();
    await expect(roleElement).toContainText('Desenvolvedor Web');
  });

  test('deve exibir "Full-Stack"', async ({ page }) => {
    // Verifica se o subtítulo Full-Stack está visível
    const specialtyElement = page.getByTestId('presentation-specialty');
    await expect(specialtyElement).toBeVisible();
    await expect(specialtyElement).toHaveText('Full-Stack');
  });

  test('deve exibir "UX Designer"', async ({ page }) => {
    // Verifica se o título UX Designer está visível
    const secondaryRoleElement = page.getByTestId('presentation-secondary-role');
    await expect(secondaryRoleElement).toBeVisible();
    await expect(secondaryRoleElement).toHaveText('UX Designer');
  });

  test('deve exibir a imagem de apresentação', async ({ page }) => {
    // Verifica se a imagem está presente
    const image = page.getByTestId('presentation-image');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt', /Lucas Nonato/);
  });

  test('deve ter a seção com id "home"', async ({ page }) => {
    // Verifica se a seção home existe
    const homeSection = page.getByTestId('presentation-section');
    await expect(homeSection).toBeVisible();
    await expect(homeSection).toHaveAttribute('id', 'home');
  });

  test('deve exibir todos os elementos principais juntos', async ({ page }) => {
    // Teste de integração - verifica todos os elementos juntos
    await expect(page.getByTestId('presentation-name')).toBeVisible();
    await expect(page.getByTestId('presentation-role')).toBeVisible();
    await expect(page.getByTestId('presentation-specialty')).toBeVisible();
    await expect(page.getByTestId('presentation-secondary-role')).toBeVisible();
    await expect(page.getByTestId('presentation-image')).toBeVisible();
  });
});
