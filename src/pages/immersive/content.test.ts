import { describe, expect, it } from "vitest";
import { experiences, skills } from "../../data";
import {
  aboutContent,
  contactContent,
  countWord,
  experienceTimeline,
  heroMeta,
  navLinks,
  skillCards,
} from "./content";

describe("conteúdo da prévia imersiva", () => {
  it("expõe navegação de portfólio", () => {
    expect(navLinks.map((link) => link.label)).toEqual([
      "Sobre",
      "Skills",
      "Experiência",
      "Contato",
    ]);
  });

  it("preenche o HUD com dados reais", () => {
    const labels = aboutContent.hud.map((item) => item.label);

    expect(labels).toContain("Experiência");
    expect(labels).toContain("Cargo atual");
    expect(labels).toContain("Localização");
    expect(labels).toContain("Stack principal");
    expect(labels).toContain("Disponibilidade");
    expect(labels).toContain("Idiomas");

    expect(heroMeta.topLeft.value).toBe("Edição 2026");
    expect(heroMeta.topRight.value).toBeTruthy();
    expect(heroMeta.bottomLeft.value).toBeTruthy();
    expect(heroMeta.bottomRight.value).toBeTruthy();
  });

  it("deriva os cards de skills a partir dos dados sem inventar", () => {
    expect(skillCards).toHaveLength(skills.length);

    skillCards.forEach((card, index) => {
      expect(card.title).toBe(skills[index].title);
      expect(card.description).toBe(skills[index].description);
      expect(card.tags).toEqual(skills[index].tags);
      expect(card.index).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("mantém a timeline com dados reais e datas quando disponíveis", () => {
    expect(experienceTimeline).toHaveLength(experiences.length);

    experienceTimeline.forEach((item, index) => {
      expect(item.company).toBe(experiences[index].company);
      expect(item.position).toBe(experiences[index].position);
      expect(item.description).toBe(experiences[index].description);
      expect(item.period).toBe(experiences[index].period);
    });
  });

  it("mantém contato com e-mail e links sociais", () => {
    expect(contactContent.primaryAction.href).toMatch(/^mailto:/);
    expect(contactContent.secondaryAction.href).toMatch(/linkedin/);
    expect(contactContent.footer.social.length).toBeGreaterThanOrEqual(1);
  });

  it("converte números em palavras corretamente", () => {
    expect(countWord(1)).toBe("Um");
    expect(countWord(4)).toBe("Quatro");
    expect(countWord(10)).toBe("Dez");
    expect(countWord(21)).toBe("Vinte e Um");
    expect(countWord(100)).toBe("100");
  });
});
