import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SnackbarProvider } from '../../components/feedback/SnackbarProvider';
import ContactForm from './contactForm';

const renderSection = () =>
  render(
    <SnackbarProvider>
      <ContactForm />
    </SnackbarProvider>,
  );

describe('Contact section', () => {
  it('abre com a nova headline e as três propostas', () => {
    renderSection();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /vamos resolver algo real\?/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('contact-proposal-ia-no-produto')).toHaveTextContent(
      'Integrar IA no seu produto',
    );
    expect(
      screen.getByTestId('contact-proposal-times-com-qualidade'),
    ).toHaveTextContent('Acelerar times com qualidade');
    expect(
      screen.getByTestId('contact-proposal-arquitetura-escala'),
    ).toHaveTextContent('Arquitetar para escala');
  });

  it('preenche a mensagem ao escolher uma proposta', () => {
    renderSection();

    fireEvent.click(screen.getByTestId('contact-proposal-ia-no-produto'));

    expect(screen.getByLabelText('Mensagem')).toHaveValue(
      'Olá, quero falar sobre integrar IA no meu produto.',
    );
  });

  it('mostra o ganho de cada proposta', () => {
    renderSection();

    expect(
      screen.getByText(
        /do protótipo ao agente em produção, com custo, latência e falha sob controle/i,
      ),
    ).toBeInTheDocument();
  });

  it('mantém o formulário com validação', () => {
    renderSection();

    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Informe seu email.')).toBeInTheDocument();
    expect(screen.getByText('Escreva sua mensagem.')).toBeInTheDocument();
  });
});
