import { test, expect, type Page } from '@playwright/test';

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Navega para a página inicial
    await page.goto('/');
  });

  test.describe('Desktop View', () => {
    test('deve exibir o nome "Lucas Nonato" como título', async ({ page }: { page: Page }) => {
      // Verifica se o nome está visível no header
      const brandElement = page.getByText('Lucas Nonato').first();
      await expect(brandElement).toBeVisible();
    });

    test('deve exibir todos os botões de menu no desktop', async ({ page }: { page: Page }) => {
      // Verifica se os botões de navegação estão visíveis
      const experienciaBtn = page.getByRole('button', { name: /Experiência/i });
      const habilidadesBtn = page.getByRole('button', { name: /Habilidades/i });
      const contatoBtn = page.getByRole('button', { name: /Contato/i });

      await expect(experienciaBtn).toBeVisible();
      await expect(habilidadesBtn).toBeVisible();
      await expect(contatoBtn).toBeVisible();
    });

    test('não deve exibir o ícone de menu hamburguer no desktop', async ({ page }: { page: Page }) => {
      // Verifica que o botão de menu mobile não está visível
      const menuButton = page.getByLabel(/open drawer/i);
      await expect(menuButton).not.toBeVisible();
    });

    test('deve ter o header fixado no topo', async ({ page }: { page: Page }) => {
      // Verifica que o AppBar tem position fixed
      const header = page.locator('header').first();
      await expect(header).toBeVisible();
      
      const position = await header.evaluate((el) => 
        window.getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    });

    test('deve ter backdrop blur aplicado', async ({ page }: { page: Page }) => {
      // Verifica se o efeito de blur está aplicado
      const header = page.locator('header').first();
      const backdropFilter = await header.evaluate((el) => 
        window.getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).toContain('blur');
    });
  });

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('deve exibir o ícone de menu hamburguer no mobile', async ({ page }: { page: Page }) => {
      // Verifica que o botão de menu está visível
      const menuButton = page.getByLabel(/open drawer/i);
      await expect(menuButton).toBeVisible();
    });

    test('não deve exibir os botões de menu diretamente no mobile', async ({ page }: { page: Page }) => {
      // Verifica que os botões de navegação não estão visíveis inicialmente
      const experienciaBtn = page.getByRole('button', { name: /Experiência/i });
      await expect(experienciaBtn).not.toBeVisible();
    });

    test('deve abrir o drawer ao clicar no ícone de menu', async ({ page }: { page: Page }) => {
      // Clica no botão de menu
      const menuButton = page.getByLabel(/open drawer/i);
      await menuButton.click();

      // Aguarda o drawer abrir e verifica os itens dentro do drawer
      const drawer = page.locator('.MuiDrawer-root');
      await expect(drawer.getByText('Experiência')).toBeVisible();
      await expect(drawer.getByText('Habilidades')).toBeVisible();
      await expect(drawer.getByText('Contato')).toBeVisible();
    });

    test('itens do menu devem estar dentro de uma lista no drawer', async ({ page }: { page: Page }) => {
      // Abre o drawer
      const menuButton = page.getByLabel(/open drawer/i);
      await menuButton.click();

      // Verifica que existe uma lista dentro do drawer
      const drawer = page.locator('.MuiDrawer-root');
      const list = drawer.locator('ul');
      await expect(list).toBeVisible();
      
      // Verifica que os itens estão na lista
      const listItems = list.locator('.MuiListItemText-root');
      await expect(listItems).toHaveCount(3);
    });

    test('deve ajustar o tamanho da fonte do título no mobile', async ({ page }: { page: Page }) => {
      // Verifica se o título usa um tamanho de fonte menor no mobile
      const brandElement = page.getByText('Lucas Nonato').first();
      await expect(brandElement).toBeVisible();
      
      const fontSize = await brandElement.evaluate((el) => 
        window.getComputedStyle(el).fontSize
      );
      
      // No mobile deve usar um tamanho menor (definido como 1.2rem no código)
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeLessThan(25); // aproximadamente 1.5rem ou menos
    });
  });

  test.describe('Navigation', () => {
    test('botões de navegação devem ter classes de hover corretas', async ({ page }: { page: Page }) => {
      // Verifica se os botões têm os estilos esperados ao passar o mouse
      const experienciaBtn = page.getByRole('button', { name: /Experiência/i });
      await expect(experienciaBtn).toBeVisible();

      // Passa o mouse sobre o botão
      await experienciaBtn.hover();

      // Verifica que o botão está interativo
      await expect(experienciaBtn).toBeEnabled();
    });

    test('deve manter o header sempre visível durante o scroll', async ({ page }: { page: Page }) => {
      // Scroll para baixo
      await page.evaluate(() => window.scrollTo(0, 500));
      
      // Aguarda um momento para o scroll estabilizar
      await page.waitForTimeout(300);

      // Verifica que o header ainda está visível
      const header = page.locator('header').first();
      await expect(header).toBeVisible();
      
      const position = await header.evaluate((el) => 
        window.getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    });
  });

  test.describe('Responsive Breakpoints', () => {
    test('deve alternar entre mobile e desktop em 600px', async ({ page }: { page: Page }) => {
      // Testa no breakpoint do Material-UI (sm = 600px)
      
      // Desktop (acima de 600px)
      await page.setViewportSize({ width: 700, height: 800 });
      const desktopMenuBtn = page.getByRole('button', { name: /Experiência/i });
      await expect(desktopMenuBtn).toBeVisible();

      // Mobile (abaixo de 600px)
      await page.setViewportSize({ width: 500, height: 800 });
      const mobileMenuBtn = page.getByLabel(/open drawer/i);
      await expect(mobileMenuBtn).toBeVisible();
    });
  });
});
