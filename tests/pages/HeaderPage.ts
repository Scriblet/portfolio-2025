import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeaderPage extends BasePage {
  // Locators
  readonly header: Locator;
  readonly brandElement: Locator;
  readonly menuButton: Locator;
  readonly drawer: Locator;

  constructor(page: Page) {
    super(page);
    
    this.header = page.locator('header').first();
    this.brandElement = page.getByText('Lucas Nonato').first();
    this.menuButton = page.getByLabel(/open drawer/i);
    this.drawer = page.locator('.MuiDrawer-root');
  }

  // Métodos para obter botões de navegação
  getNavigationButton(name: string | RegExp): Locator {
    return this.page.getByRole('button', { name });
  }

  getExperienciaButton(): Locator {
    return this.getNavigationButton(/Experiência/i);
  }

  getHabilidadesButton(): Locator {
    return this.getNavigationButton(/Habilidades/i);
  }

  getContatoButton(): Locator {
    return this.getNavigationButton(/Contato/i);
  }

  // Métodos do drawer
  getDrawerList(): Locator {
    return this.drawer.locator('ul');
  }

  getDrawerListItems(): Locator {
    return this.getDrawerList().locator('.MuiListItemText-root');
  }

  getDrawerItem(text: string): Locator {
    return this.drawer.getByText(text);
  }

  // Métodos de ação
  async openDrawer() {
    await this.menuButton.click();
  }

  async hoverNavigationButton(name: string | RegExp) {
    await this.getNavigationButton(name).hover();
  }

  // Métodos de verificação
  async getHeaderPosition(): Promise<string> {
    return this.getComputedStyle(this.header, 'position');
  }

  async getBackdropFilter(): Promise<string> {
    return this.getComputedStyle(this.header, 'backdropFilter');
  }

  async getBrandFontSize(): Promise<string> {
    return this.getComputedStyle(this.brandElement, 'fontSize');
  }
}
