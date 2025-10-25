import { test, expect, type Page } from '@playwright/test';
import { HeaderPage } from './pages/HeaderPage';

test.describe('Header Component', () => {
  let headerPage: HeaderPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    headerPage = new HeaderPage(page);
    await headerPage.goto();
  });

  test.describe('Desktop View', () => {
    test('deve exibir o nome "Lucas Nonato" como título', async () => {
      await expect(headerPage.brandElement).toBeVisible();
    });

    test('deve exibir todos os botões de menu no desktop', async () => {
      await expect(headerPage.getExperienciaButton()).toBeVisible();
      await expect(headerPage.getHabilidadesButton()).toBeVisible();
      await expect(headerPage.getContatoButton()).toBeVisible();
    });

    test('não deve exibir o ícone de menu hamburguer no desktop', async () => {
      await expect(headerPage.menuButton).not.toBeVisible();
    });

    test('deve ter o header fixado no topo', async () => {
      await expect(headerPage.header).toBeVisible();
      const position = await headerPage.getHeaderPosition();
      expect(position).toBe('fixed');
    });

    test('deve ter backdrop blur aplicado', async () => {
      const backdropFilter = await headerPage.getBackdropFilter();
      expect(backdropFilter).toContain('blur');
    });
  });

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('deve exibir o ícone de menu hamburguer no mobile', async () => {
      await expect(headerPage.menuButton).toBeVisible();
    });

    test('não deve exibir os botões de menu diretamente no mobile', async () => {
      await expect(headerPage.getExperienciaButton()).not.toBeVisible();
    });

    test('deve abrir o drawer ao clicar no ícone de menu', async () => {
      await headerPage.openDrawer();

      await expect(headerPage.getDrawerItem('Experiência')).toBeVisible();
      await expect(headerPage.getDrawerItem('Habilidades')).toBeVisible();
      await expect(headerPage.getDrawerItem('Contato')).toBeVisible();
    });

    test('itens do menu devem estar dentro de uma lista no drawer', async () => {
      await headerPage.openDrawer();

      await expect(headerPage.getDrawerList()).toBeVisible();
      await expect(headerPage.getDrawerListItems()).toHaveCount(3);
    });

    test('deve ajustar o tamanho da fonte do título no mobile', async () => {
      await expect(headerPage.brandElement).toBeVisible();
      
      const fontSize = await headerPage.getBrandFontSize();
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeLessThan(25);
    });
  });

  test.describe('Navigation', () => {
    test('botões de navegação devem ter classes de hover corretas', async () => {
      const experienciaBtn = headerPage.getExperienciaButton();
      await expect(experienciaBtn).toBeVisible();

      await headerPage.hoverNavigationButton(/Experiência/i);
      await expect(experienciaBtn).toBeEnabled();
    });

    test('deve manter o header sempre visível durante o scroll', async () => {
      await headerPage.scrollTo(0, 500);
      await headerPage.waitForTimeout(300);

      await expect(headerPage.header).toBeVisible();
      const position = await headerPage.getHeaderPosition();
      expect(position).toBe('fixed');
    });
  });

  test.describe('Responsive Breakpoints', () => {
    test('deve alternar entre mobile e desktop em 600px', async ({ page }: { page: Page }) => {
      await page.setViewportSize({ width: 700, height: 800 });
      await expect(headerPage.getExperienciaButton()).toBeVisible();

      await page.setViewportSize({ width: 500, height: 800 });
      await expect(headerPage.menuButton).toBeVisible();
    });
  });
});
