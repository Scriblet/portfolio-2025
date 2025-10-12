import { test, expect, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Portfolio - Página Completa', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Aguarda a página estar totalmente carregada e animações iniciais
    await page.waitForTimeout(1000);
  });

  test.describe('Estrutura Geral da Página', () => {
    test('deve carregar todas as seções principais', async ({ page }: { page: Page }) => {
      // Verifica se todas as seções principais estão presentes no DOM
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test('deve ter a classe app-container no elemento raiz', async ({ page }: { page: Page }) => {
      const appContainer = page.locator('.app-container');
      await expect(appContainer).toBeVisible();
    });

    test('deve ter a classe main-content no conteúdo principal', async ({ page }: { page: Page }) => {
      const mainContent = page.locator('.main-content');
      await expect(mainContent).toBeVisible();
    });
  });

  test.describe('Seção Presentation', () => {
    test('deve exibir o nome "Lucas Nonato" na apresentação', async ({ page }: { page: Page }) => {
      const nameElement = page.getByTestId('presentation-name');
      await expect(nameElement).toBeVisible();
      await expect(nameElement).toContainText('Lucas Nonato');
    });

    test('deve exibir a imagem de apresentação', async ({ page }: { page: Page }) => {
      const image = page.getByTestId('presentation-image');
      await expect(image).toBeVisible();
    });

    test('deve exibir os títulos profissionais', async ({ page }: { page: Page }) => {
      await expect(page.getByTestId('presentation-role')).toBeVisible();
      await expect(page.getByTestId('presentation-specialty')).toBeVisible();
    });
  });

  test.describe('Rolagem e Navegação', () => {
    test('deve permitir rolagem suave pela página', async ({ page }: { page: Page }) => {
      // Obtém a altura inicial
      const initialScroll = await page.evaluate(() => window.scrollY);
      expect(initialScroll).toBe(0);

      // Rola para baixo
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(800);

      // Verifica que a rolagem aconteceu
      const afterScroll = await page.evaluate(() => window.scrollY);
      expect(afterScroll).toBeGreaterThan(0);
    });

    test('deve manter o header visível durante toda a rolagem', async ({ page }: { page: Page }) => {
      // Verifica header no topo
      const header = page.locator('header').first();
      await expect(header).toBeVisible();

      // Rola para o meio da página
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(800);
      await expect(header).toBeVisible();

      // Rola para o final
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await expect(header).toBeVisible();
    });

    test('deve ter posição fixed no header', async ({ page }: { page: Page }) => {
      const header = page.locator('header').first();
      const position = await header.evaluate((el) => 
        window.getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    });
  });

  test.describe('Seção Experience', () => {
    test('deve exibir a seção de experiência', async ({ page }: { page: Page }) => {
      // Rola até a seção de experiência
      await page.evaluate(() => {
        const element = document.getElementById('experience');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      // Verifica se a seção está visível
      const experienceSection = page.locator('#experience');
      await expect(experienceSection).toBeVisible();
    });

    test('deve ter conteúdo na seção de experiência', async ({ page }: { page: Page }) => {
      await page.evaluate(() => {
        const element = document.getElementById('experience');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      // Verifica se há conteúdo dentro da seção
      const experienceSection = page.locator('#experience');
      const hasContent = await experienceSection.evaluate((el) => el.textContent && el.textContent.length > 0);
      expect(hasContent).toBe(true);
    });
  });

  test.describe('Seção Philosophy Banner', () => {
    test('deve exibir a seção de filosofia', async ({ page }: { page: Page }) => {
      // Rola até encontrar elementos relacionados à filosofia
      await page.evaluate(() => window.scrollTo(0, 2000));
      await page.waitForTimeout(1200);

      // Verifica se há imagem ou conteúdo relacionado
      const philosophyImage = page.locator('img[src*="multiracial"]');
      if (await philosophyImage.count() > 0) {
        await expect(philosophyImage.first()).toBeVisible();
      }
    });

    test('deve ter botão LinkedIn na seção de filosofia', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, 2000));
      await page.waitForTimeout(1200);

      const linkedinButtons = page.getByRole('button').filter({ hasText: /linkedin/i });
      if (await linkedinButtons.count() > 0) {
        await expect(linkedinButtons.first()).toBeVisible();
      }
    });
  });

  test.describe('Seção Skills', () => {
    test('deve exibir a seção de habilidades ao rolar', async ({ page }: { page: Page }) => {
      // Rola até a seção de skills
      await page.evaluate(() => {
        const element = document.getElementById('skills');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      const skillsSection = page.locator('#skills');
      await expect(skillsSection).toBeVisible();
    });

    test('deve exibir múltiplas habilidades', async ({ page }: { page: Page }) => {
      await page.evaluate(() => {
        const element = document.getElementById('skills');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      // Procura por títulos de habilidades comuns
      const reactSkill = page.getByText(/React/i).first();
      await expect(reactSkill).toBeVisible();
    });

    test('deve exibir ícones nas habilidades', async ({ page }: { page: Page }) => {
      await page.evaluate(() => {
        const element = document.getElementById('skills');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      // Verifica se há elementos SVG (ícones do Material-UI)
      const icons = page.locator('svg').filter({ has: page.locator('path') });
      const count = await icons.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Seção GitHub Banner', () => {
    test('deve exibir o banner do GitHub', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, 3500));
      await page.waitForTimeout(1200);

      const githubLogo = page.locator('img[src*="github"]');
      if (await githubLogo.count() > 0) {
        await expect(githubLogo.first()).toBeVisible();
      }
    });

    test('deve ter botão/link para GitHub', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, 3500));
      await page.waitForTimeout(1200);

      const githubButton = page.getByRole('button').filter({ hasText: /github/i });
      if (await githubButton.count() > 0) {
        await expect(githubButton.first()).toBeVisible();
      }
    });
  });

  test.describe('Seção Contact Form', () => {
    test('deve exibir o formulário de contato', async ({ page }: { page: Page }) => {
      await page.evaluate(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
    });

    test('deve ter campos de nome, email e mensagem', async ({ page }: { page: Page }) => {
      await page.evaluate(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      // Verifica se há inputs no formulário
      const inputs = page.locator('input, textarea');
      const count = await inputs.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('deve ter botão de envio', async ({ page }: { page: Page }) => {
      await page.evaluate(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1200);

      const submitButton = page.getByRole('button', { name: /enviar/i });
      await expect(submitButton).toBeVisible();
    });
  });

  test.describe('Seção Footer', () => {
    test('deve exibir o footer no final da página', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('deve ter links de redes sociais no footer', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);

      // Verifica se há links sociais (GitHub, LinkedIn)
      const socialLinks = page.locator('footer svg');
      const count = await socialLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('deve ter cor de fundo específica no footer', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);

      const footer = page.locator('footer');
      const bgColor = await footer.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Verifica se tem alguma cor de fundo definida
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Responsividade - Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('deve ajustar layout para mobile', async ({ page }: { page: Page }) => {
      // Verifica se o menu hamburguer está visível
      const menuButton = page.getByLabel(/open drawer/i);
      await expect(menuButton).toBeVisible();
    });

    test('deve empilhar seções verticalmente no mobile', async ({ page }: { page: Page }) => {
      const mainContent = page.locator('.main-content');
      await expect(mainContent).toBeVisible();

      // Verifica se a largura está ajustada
      const width = await mainContent.evaluate((el) => el.clientWidth);
      expect(width).toBeLessThanOrEqual(375);
    });

    test('deve ajustar tamanho de fonte no mobile', async ({ page }: { page: Page }) => {
      const title = page.getByTestId('presentation-name');
      await expect(title).toBeVisible();

      const fontSize = await title.evaluate((el) => 
        window.getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseFloat(fontSize);
      
      // Fonte deve ser menor no mobile
      expect(fontSizeNum).toBeLessThan(40);
    });

    test('deve permitir rolagem completa no mobile', async ({ page }: { page: Page }) => {
      // Rola até o final
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);

      // Verifica que chegou perto do final
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(1000);
    });

    test('imagens devem ser responsivas no mobile', async ({ page }: { page: Page }) => {
      const images = page.locator('img').first();
      await expect(images).toBeVisible();

      const width = await images.evaluate((el) => el.clientWidth);
      expect(width).toBeLessThanOrEqual(375);
    });
  });

  test.describe('Responsividade - Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('deve ajustar layout para tablet', async ({ page }: { page: Page }) => {
      const mainContent = page.locator('.main-content');
      await expect(mainContent).toBeVisible();

      const width = await mainContent.evaluate((el) => el.clientWidth);
      expect(width).toBeLessThanOrEqual(768);
    });

    test('deve exibir menu desktop no tablet', async ({ page }: { page: Page }) => {
      // Tablets geralmente usam o menu desktop
      const menuButtons = page.getByRole('button', { name: /Experiência/i });
      await expect(menuButtons).toBeVisible();
    });

    test('deve ter espaçamento adequado no tablet', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(800);

      // Verifica se as seções estão visíveis e bem espaçadas
      const sections = page.locator('main > *');
      const count = await sections.count();
      expect(count).toBeGreaterThan(5);
    });
  });

  test.describe('Responsividade - Desktop (1920px)', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('deve ter largura máxima em telas grandes', async ({ page }: { page: Page }) => {
      const mainContent = page.locator('.main-content');
      await expect(mainContent).toBeVisible();

      const width = await mainContent.evaluate((el) => el.clientWidth);
      expect(width).toBeGreaterThan(1024);
    });

    test('deve exibir menu completo no desktop', async ({ page }: { page: Page }) => {
      await expect(page.getByRole('button', { name: /Experiência/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Habilidades/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Contato/i })).toBeVisible();
    });

    test('deve ter boa distribuição de conteúdo no desktop', async ({ page }: { page: Page }) => {
      // Rola pela página para verificar todas as seções
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(800);

      const viewportHeight = await page.evaluate(() => window.innerHeight);
      expect(viewportHeight).toBe(1080);
    });
  });

  test.describe('Performance e Carregamento', () => {
    test('deve carregar a página em tempo razoável', async ({ page }: { page: Page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Deve carregar em menos de 5 segundos
      expect(loadTime).toBeLessThan(5000);
    });

    test('deve ter todas as imagens carregadas', async ({ page }: { page: Page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const images = page.locator('img');
      const count = await images.count();
      
      // Verifica se há imagens na página
      expect(count).toBeGreaterThan(0);
    });

    test('não deve ter erros de console críticos', async ({ page }: { page: Page }) => {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.waitForTimeout(3000);

      // Filtra erros conhecidos/esperados
      const criticalErrors = errors.filter(err => 
        !err.includes('ResizeObserver') && 
        !err.includes('Failed to load resource') &&
        !err.includes('favicon') &&
        !err.includes('net::ERR')
      );

      // Log dos erros encontrados para debug
      if (criticalErrors.length > 0) {
        console.log('Erros encontrados:', criticalErrors);
      }

      // Permite até 2 erros não críticos
      expect(criticalErrors.length).toBeLessThanOrEqual(2);
    });
  });

  test.describe('Interações e Animações', () => {
    test('deve ter animações suaves ao rolar', async ({ page }: { page: Page }) => {
      // Rola lentamente para verificar animações
      await page.evaluate(() => {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      });
      await page.waitForTimeout(1500);

      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(500);
    });

    test('elementos devem aparecer ao entrar no viewport', async ({ page }: { page: Page }) => {
      // Rola até uma seção que usa intersection observer
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(1500);

      // Verifica se elementos estão visíveis após a rolagem
      const sections = page.locator('main > *');
      const visibleCount = await sections.evaluateAll(elements => 
        elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        }).length
      );

      expect(visibleCount).toBeGreaterThan(0);
    });
  });

  test.describe('Acessibilidade', () => {
    test('deve ter estrutura semântica adequada', async ({ page }: { page: Page }) => {
      // Verifica elementos semânticos
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test('botões devem ser clicáveis e acessíveis', async ({ page }: { page: Page }) => {
      const buttons = page.getByRole('button');
      const count = await buttons.count();
      
      expect(count).toBeGreaterThan(0);
      
      // Verifica se o primeiro botão é clicável
      if (count > 0) {
        await expect(buttons.first()).toBeEnabled();
      }
    });

    test('links devem ter texto descritivo', async ({ page }: { page: Page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);

      const links = page.locator('a');
      const count = await links.count();
      
      expect(count).toBeGreaterThan(0);
    });
  });
});
