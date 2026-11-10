import { describe, expect, it } from 'vitest';
import { experiences } from './experiences';
import { selectedWorks } from './selectedWorks';

describe('selectedWorks data', () => {
  it('tem os cinco cases do currículo', () => {
    expect(selectedWorks).toHaveLength(5);
    expect(selectedWorks.map((work) => work.company)).toEqual([
      'Vivo (Telefônica Brasil)',
      'Porto Seguro',
      'Thoughtworks',
      'ArcoTech (Escola em Movimento)',
      'Finger Consultoria',
    ]);
  });

  it('ordena do mais recente para o mais antigo', () => {
    const starts = selectedWorks.map((work) => work.start);
    const sorted = [...starts].sort((a, b) => b.localeCompare(a));

    expect(starts).toEqual(sorted);
    expect(sorted).not.toBe(starts);
  });

  it('usa ids e numeração únicos', () => {
    const ids = selectedWorks.map((work) => work.id);
    const numbers = selectedWorks.map((work) => work.number);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(numbers).size).toBe(numbers.length);
    expect(numbers).toEqual(['01', '02', '03', '04', '05']);
  });

  it('confere empresa e período com experiences.ts', () => {
    for (const work of selectedWorks) {
      const experience = experiences.find(
        (item) => item.company === work.company,
      );

      expect(experience, work.company).toBeDefined();
      expect(experience?.period).toBe(work.period);
      expect(experience?.position).toBe(work.role);
    }
  });

  it('preenche todos os blocos da narrativa', () => {
    for (const work of selectedWorks) {
      for (const field of [
        work.headline,
        work.context,
        work.challenge,
        work.action,
        work.outcome,
      ]) {
        expect(field.length).toBeGreaterThan(20);
      }

      expect(work.stack.length).toBeGreaterThanOrEqual(3);
    }
  });
});
