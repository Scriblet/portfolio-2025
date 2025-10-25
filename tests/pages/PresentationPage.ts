import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PresentationPage extends BasePage {
  // Locators
  readonly section: Locator;
  readonly nameElement: Locator;
  readonly roleElement: Locator;
  readonly specialtyElement: Locator;
  readonly secondaryRoleElement: Locator;
  readonly image: Locator;
  readonly imageContainer: Locator;
  readonly imageWrapper: Locator;
  readonly floatingTopCircle: Locator;
  readonly floatingBottomCircle: Locator;

  constructor(page: Page) {
    super(page);
    
    // Inicializa os locators
    this.section = page.getByTestId('presentation-section');
    this.nameElement = page.getByTestId('presentation-name');
    this.roleElement = page.getByTestId('presentation-role');
    this.specialtyElement = page.getByTestId('presentation-specialty');
    this.secondaryRoleElement = page.getByTestId('presentation-secondary-role');
    this.image = page.getByTestId('presentation-image');
    this.imageContainer = page.getByTestId('presentation-image-container');
    this.imageWrapper = page.getByTestId('presentation-image-wrapper');
    this.floatingTopCircle = page.getByTestId('presentation-floating-top');
    this.floatingBottomCircle = page.getByTestId('presentation-floating-bottom');
  }

  // Métodos de ação
  async hoverImage() {
    await this.imageWrapper.hover();
  }

  // Métodos de verificação específicos
  async getImageAlt(): Promise<string | null> {
    return this.image.getAttribute('alt');
  }

  async getSectionId(): Promise<string | null> {
    return this.section.getAttribute('id');
  }

  async getOpacity(): Promise<string> {
    return this.getComputedOpacity(this.section);
  }

  async getImageTransform(): Promise<string> {
    return this.getComputedTransform(this.imageContainer);
  }

  async getImageWrapperTransform(): Promise<string> {
    return this.getComputedTransform(this.imageWrapper);
  }

  async getFloatingTopTransform(): Promise<string> {
    return this.getComputedTransform(this.floatingTopCircle);
  }

  async getFloatingBottomTransform(): Promise<string> {
    return this.getComputedTransform(this.floatingBottomCircle);
  }
}
