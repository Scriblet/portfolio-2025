import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface Experience {
  id: number;
  number: string;
  company: string;
  position: string;
  description: string;
}

export class ExperiencePage extends BasePage {
  // Locators
  readonly section: Locator;
  readonly heading: Locator;
  readonly grid: Locator;

  constructor(page: Page) {
    super(page);
    
    this.section = page.getByTestId('experience-section');
    this.heading = page.getByTestId('experience-heading');
    this.grid = page.getByTestId('experience-grid');
  }

  // Métodos para obter cards específicos
  getCard(experienceId: number): Locator {
    return this.page.getByTestId(`experience-card-${experienceId}`);
  }

  getNumber(experienceId: number): Locator {
    return this.page.getByTestId(`experience-number-${experienceId}`);
  }

  getCompany(experienceId: number): Locator {
    return this.page.getByTestId(`experience-company-${experienceId}`);
  }

  getPosition(experienceId: number): Locator {
    return this.page.getByTestId(`experience-position-${experienceId}`);
  }

  getDescription(experienceId: number): Locator {
    return this.page.getByTestId(`experience-description-${experienceId}`);
  }

  getAllCards(): Locator {
    return this.page.locator('[data-testid^="experience-card-"]');
  }

  // Métodos de ação
  async scrollToSection() {
    await this.section.scrollIntoViewIfNeeded();
  }

  async getSectionId(): Promise<string | null> {
    return this.section.getAttribute('id');
  }

  // Método auxiliar para verificar todos os dados de uma experiência
  async getExperienceData(experienceId: number) {
    return {
      number: await this.getNumber(experienceId).textContent(),
      company: await this.getCompany(experienceId).textContent(),
      position: await this.getPosition(experienceId).textContent(),
      description: await this.getDescription(experienceId).textContent(),
    };
  }
}
