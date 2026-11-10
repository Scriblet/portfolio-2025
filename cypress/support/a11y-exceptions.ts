/**
 * Exceções explícitas da varredura axe.
 *
 * Cada item precisa de justificativa e de um dono: nada entra aqui "porque
 * ficou vermelho". Violações fora desta lista falham o spec com seletor,
 * impacto e nó afetado.
 */
export const A11Y_EXCEPTIONS: Record<string, string> = {
  // Vazio de propósito. O contraste do MUI (tooltip, chip) já é herdado do
  // tema; se uma regra entrar aqui, documente o motivo e a issue de correção.
}
