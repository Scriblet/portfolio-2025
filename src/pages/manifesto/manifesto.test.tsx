import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Manifesto from './manifesto';

describe('Manifesto section', () => {
  it('usa a tese como heading principal', () => {
    render(<Manifesto />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /construo software e interfaces acessíveis/i,
      }),
    ).toBeInTheDocument();
  });

  it('mantém o eyebrow como texto, não como heading', () => {
    render(<Manifesto />);

    expect(screen.getByText('Como eu construo')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Como eu construo' }),
    ).not.toBeInTheDocument();
  });

  it('renderiza os sete princípios', () => {
    render(<Manifesto />);

    for (const title of [
      'Código é meio, não fim.',
      'Acessibilidade é padrão, não feature.',
      'IA amplifica intenção.',
      'Simples escala.',
      'Aprendizado contínuo é o único estado estável.',
      'Colaboração é arquitetura.',
      'Shipar faz parte do design.',
    ]) {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it('mostra a imagem das mãos com alt descritivo', () => {
    render(<Manifesto />);

    expect(
      screen.getByRole('img', { name: /mãos de diferentes tons de pele/i }),
    ).toBeInTheDocument();
  });
});
