import { describe, expect, it } from 'vitest';
import { aiMaturityLayers, aiMaturityTotal } from './aiMaturity';

describe('aiMaturity data', () => {
  it('tem as cinco camadas na ordem de progressão', () => {
    expect(aiMaturityLayers.map((layer) => layer.title)).toEqual([
      'Produto e uso',
      'Integração de modelos',
      'Contexto e RAG',
      'Agentes e orquestração',
      'Operação e governança',
    ]);
  });

  it('usa ids únicos', () => {
    const ids = aiMaturityLayers.map((layer) => layer.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('numera as camadas de 01 a 05 sem buracos', () => {
    expect(aiMaturityLayers.map((layer) => layer.number)).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
    ]);
    expect(aiMaturityTotal).toBe('05');
  });

  it('descreve cada camada com tese, capacidades e evidência', () => {
    for (const layer of aiMaturityLayers) {
      expect(layer.thesis.length).toBeGreaterThan(0);
      expect(layer.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(layer.evidence.length).toBeGreaterThan(0);

      for (const capability of layer.capabilities) {
        expect(capability.length).toBeGreaterThan(0);
      }
    }
  });

  it('marca RAG como estudo aplicado, não como produção', () => {
    const rag = aiMaturityLayers.find((layer) => layer.id === 'contexto-rag');

    expect(rag?.evidence).toContain('estudo aplicado');
    expect(rag?.evidence).not.toContain('produção');
  });

  it('não expõe nomes de empresas nas evidências', () => {
    const companies = ['Vivo', 'Porto Seguro', 'Thoughtworks', 'ArcoTech', 'Finger'];

    for (const layer of aiMaturityLayers) {
      for (const company of companies) {
        expect(layer.evidence).not.toContain(company);
      }
    }
  });
});
