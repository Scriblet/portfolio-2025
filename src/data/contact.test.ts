import { describe, expect, it } from 'vitest';
import { valuePropositions } from './contact';

describe('valuePropositions data', () => {
  it('tem três frentes de atuação', () => {
    expect(valuePropositions).toHaveLength(3);
    expect(valuePropositions.map((item) => item.title)).toEqual([
      'Integrar IA no seu produto',
      'Acelerar times com qualidade',
      'Arquitetar para escala',
    ]);
  });

  it('numera e identifica cada cartão sem repetição', () => {
    const ids = valuePropositions.map((item) => item.id);
    const numbers = valuePropositions.map((item) => item.number);

    expect(new Set(ids).size).toBe(ids.length);
    expect(numbers).toEqual(['01', '02', '03']);
  });

  it('preenche descrição, ganho, CTA e texto inicial', () => {
    for (const item of valuePropositions) {
      expect(item.description.length).toBeGreaterThan(30);
      expect(item.benefit.length).toBeGreaterThan(30);
      expect(item.ctaLabel.length).toBeGreaterThan(0);
      expect(item.prompt.length).toBeGreaterThan(0);
    }
  });

  it('usa textos iniciais distintos para cada proposta', () => {
    const prompts = valuePropositions.map((item) => item.prompt);

    expect(new Set(prompts).size).toBe(prompts.length);
  });
});
