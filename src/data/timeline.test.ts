import { describe, expect, it } from 'vitest';
import { milestones, sortedMilestones } from './timeline';

const VALID_TYPES = ['formacao', 'certificacao', 'profissional', 'conquista'];

describe('timeline data', () => {
  it('tem ids de marco únicos', () => {
    const ids = milestones.map((milestone) => milestone.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ordena do mais recente para o mais antigo', () => {
    const dates = sortedMilestones.map((milestone) => milestone.date);
    const expected = [...dates].sort((a, b) => b.localeCompare(a));

    expect(dates).toEqual(expected);
  });

  it('usa apenas tipos de marco válidos', () => {
    for (const milestone of milestones) {
      expect(VALID_TYPES).toContain(milestone.type);
    }
  });

  it('tem período e data em todos os marcos', () => {
    for (const milestone of milestones) {
      expect(milestone.period.length).toBeGreaterThan(0);
      expect(milestone.date.length).toBeGreaterThan(0);
    }
  });

  it('não muta o array original ao ordenar', () => {
    expect(sortedMilestones).not.toBe(milestones);
  });
});
