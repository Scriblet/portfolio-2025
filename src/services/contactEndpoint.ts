/**
 * Endpoint do formulário de contato.
 *
 * O fallback `/api/contact` cobre `netlify dev` e qualquer host que sirva a
 * função na mesma origem. No GitHub Pages (hospedagem estática) não existe
 * function, então a produção define `VITE_CONTACT_ENDPOINT` apontando para a
 * URL pública do deploy das functions no Netlify.
 *
 * Ver docs/CONTACT-ENDPOINT.md → "Deploy apenas das functions".
 */
const DEFAULT_CONTACT_ENDPOINT = "/api/contact";

export const resolveContactEndpoint = (
  configured?: string | null,
): string => {
  const value = configured?.trim();
  return value ? value : DEFAULT_CONTACT_ENDPOINT;
};

export const CONTACT_ENDPOINT = resolveContactEndpoint(
  import.meta.env.VITE_CONTACT_ENDPOINT,
);

export default CONTACT_ENDPOINT;
