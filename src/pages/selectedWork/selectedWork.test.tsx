import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SelectedWork from './selectedWork';

describe('SelectedWork section', () => {
  it('usa "Cases, não cargos" como headline', () => {
    render(<SelectedWork />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /cases, não cargos/i,
      }),
    ).toBeInTheDocument();
  });

  it('renderiza os cinco cases', () => {
    const { container } = render(<SelectedWork />);

    expect(
      container.querySelectorAll('[data-testid^="selected-work-case-"]'),
    ).toHaveLength(5);
  });

  it('abre pelo case mais recente', () => {
    render(<SelectedWork />);

    const first = screen.getByTestId('selected-work-case-vivo-aura');

    expect(first).toHaveTextContent('Vivo (Telefônica Brasil)');
    expect(first).toHaveTextContent('mar/2026 – atual');
    expect(first).toHaveTextContent('Agentes de IA em produção');
  });

  it('mostra contexto, desafio, decisão e resultado em cada case', () => {
    render(<SelectedWork />);

    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(20);

    for (const label of ['Contexto', 'Desafio', 'Decisão', 'Resultado']) {
      expect(
        screen.getAllByRole('heading', { level: 4, name: label }),
      ).toHaveLength(5);
    }
  });

  it('preserva as âncoras antigas experience e jornada', () => {
    const { container } = render(<SelectedWork />);

    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#jornada')).toBeInTheDocument();
  });
});
