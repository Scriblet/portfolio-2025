import { describe, expect, it } from 'vitest';
import { technologies, toolboxCategories } from './toolbox';

describe('toolbox data', () => {
  it('tem ids de categoria únicos', () => {
    const ids = toolboxCategories.map((category) => category.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tem ids de tecnologia únicos', () => {
    const ids = technologies.map((technology) => technology.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('associa cada tecnologia a uma categoria existente', () => {
    const categoryIds = new Set(toolboxCategories.map((category) => category.id));

    for (const technology of technologies) {
      expect(categoryIds.has(technology.categoryId)).toBe(true);
    }
  });

  it('tem ao menos uma tecnologia principal por categoria', () => {
    for (const category of toolboxCategories) {
      const principals = technologies.filter(
        (technology) =>
          technology.categoryId === category.id &&
          technology.level === 'principal',
      );

      expect(principals.length).toBeGreaterThan(0);
    }
  });

  it('usa apenas URLs https quando informadas', () => {
    for (const technology of technologies) {
      if (technology.url) {
        expect(technology.url.startsWith('https://')).toBe(true);
      }
    }
  });
});
