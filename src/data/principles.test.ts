import { describe, expect, it } from 'vitest';
import { principles } from './principles';

describe('principles data', () => {
  it('tem os sete princípios na ordem editorial', () => {
    expect(principles.map((principle) => principle.number)).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
    ]);
  });

  it('usa ids únicos', () => {
    const ids = principles.map((principle) => principle.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('fecha com shipar faz parte do design', () => {
    expect(principles[principles.length - 1]?.title).toBe(
      'Shipar faz parte do design.',
    );
  });

  it('tem título, frase de impacto e consequência em todos', () => {
    for (const principle of principles) {
      expect(principle.title.length).toBeGreaterThan(0);
      expect(principle.impact.length).toBeGreaterThan(0);
      expect(principle.consequence.length).toBeGreaterThan(0);
    }
  });

  it('mantém títulos em afirmação, nunca pergunta', () => {
    for (const principle of principles) {
      expect(principle.title.trim().endsWith('?')).toBe(false);
    }
  });
});
