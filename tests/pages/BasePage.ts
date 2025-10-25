import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url = '/') {
    await this.page.goto(url);
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async getComputedStyle(locator: Locator, property: string): Promise<string> {
    return locator.evaluate((element, prop) => {
      const styles = getComputedStyle(element);
      return styles[prop as keyof CSSStyleDeclaration] as string;
    }, property);
  }

  async getComputedTransform(locator: Locator): Promise<string> {
    return locator.evaluate((element) => getComputedStyle(element).transform);
  }

  async getComputedOpacity(locator: Locator): Promise<string> {
    return locator.evaluate((element) => getComputedStyle(element).opacity);
  }

  async scrollTo(x: number, y: number) {
    await this.page.evaluate(({ x, y }) => window.scrollTo(x, y), { x, y });
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async getScrollY(): Promise<number> {
    return this.page.evaluate(() => window.scrollY);
  }

  async scrollIntoView(selector: string) {
    await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, selector);
  }
}
