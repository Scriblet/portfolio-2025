import { describe, expect, it } from "vitest";
import { resolveContactEndpoint } from "./contactEndpoint";

describe("resolveContactEndpoint", () => {
  it("usa o caminho relativo quando nada foi configurado", () => {
    expect(resolveContactEndpoint(undefined)).toBe("/api/contact");
    expect(resolveContactEndpoint(null)).toBe("/api/contact");
  });

  it("trata string vazia ou espaços como ausência de configuração", () => {
    expect(resolveContactEndpoint("")).toBe("/api/contact");
    expect(resolveContactEndpoint("   ")).toBe("/api/contact");
  });

  it("mantém a URL absoluta configurada e remove espaços nas pontas", () => {
    expect(
      resolveContactEndpoint("  https://portfolio-contact.netlify.app/api/contact "),
    ).toBe("https://portfolio-contact.netlify.app/api/contact");
  });
});
