import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IAMaturity from './iaMaturity';

describe('IAMaturity section', () => {
  it('renderiza a headline e o apoio', () => {
    render(<IAMaturity />);

    expect(
      screen.getByRole('heading', { level: 2, name: /onde a ia vira sistema/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/não um ranking de senioridade/i),
    ).toBeInTheDocument();
  });

  it('renderiza as cinco camadas como lista ordenada', () => {
    render(<IAMaturity />);

    for (const title of [
      'Produto e uso',
      'Integração de modelos',
      'Contexto e RAG',
      'Agentes e orquestração',
      'Operação e governança',
    ]) {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it('deixa a evidência de RAG explícita', () => {
    render(<IAMaturity />);

    expect(screen.getByText(/estudo aplicado e protótipos/i)).toBeInTheDocument();
  });

  it('esconde os numerais decorativos do leitor de tela', () => {
    const { container } = render(<IAMaturity />);
    const numbers = container.querySelectorAll('[aria-hidden="true"]');

    expect(numbers.length).toBeGreaterThanOrEqual(6);
  });
});
