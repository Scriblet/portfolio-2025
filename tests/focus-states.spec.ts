import { test, expect, type Page } from "@playwright/test";

type FocusSample = {
  key: string;
  tag: string;
  type: string;
  text: string;
  ariaLabel: string;
  hasFocusRing: boolean;
  inHeader: boolean;
  inContact: boolean;
  inFooter: boolean;
  inSkills: boolean;
  visible: boolean;
};

/**
 * Percorre a página com Tab e devolve cada elemento que recebeu foco.
 *
 * O anel é lido de getComputedStyle (outlineStyle/outlineWidth) e aceita
 * variações: o campo do MUI aplica o anel no contorno externo, então também
 * olhamos o `.MuiOutlinedInput-root` ancestral. Não dependemos de cor exata.
 */
const collectKeyboardFocusSamples = async (
  page: Page,
  maxTabs = 45,
): Promise<FocusSample[]> => {
  const samples: FocusSample[] = [];

  for (let i = 0; i < maxTabs; i += 1) {
    await page.keyboard.press("Tab");

    const sample = await page.evaluate(() => {
      const active = document.activeElement as HTMLElement | null;

      if (
        !active ||
        active === document.body ||
        active === document.documentElement
      ) {
        return null;
      }

      const hasVisibleOutline = (node: Element | null): boolean => {
        if (!node) return false;
        const styles = window.getComputedStyle(node);
        const width = Number.parseFloat(styles.outlineWidth || "0");
        return styles.outlineStyle !== "none" && width >= 2;
      };

      const rect = active.getBoundingClientRect();
      const className =
        typeof active.className === "string" ? active.className : "";
      const text = (active.textContent ?? "").trim().slice(0, 60);
      const ariaLabel = active.getAttribute("aria-label") ?? "";
      const type = active.getAttribute("type") ?? "";

      return {
        key: `${active.tagName}|${type}|${ariaLabel}|${text}|${className}`,
        tag: active.tagName.toLowerCase(),
        type,
        text,
        ariaLabel,
        hasFocusRing:
          hasVisibleOutline(active) ||
          hasVisibleOutline(active.closest(".MuiOutlinedInput-root")) ||
          hasVisibleOutline(active.parentElement),
        inHeader: Boolean(active.closest("header")),
        inContact: Boolean(active.closest("#contact")),
        inFooter: Boolean(active.closest("footer")),
        inSkills: Boolean(active.closest("#skills")),
        visible: rect.width > 0 && rect.height > 0,
      };
    });

    if (!sample) break;
    if (sample.visible) samples.push(sample);
  }

  return samples;
};

test.describe("Microinterações e foco consistente", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
  });

  test("elementos interativos principais são alcançáveis por Tab e exibem anel de foco", async ({
    page,
  }) => {
    const samples = await collectKeyboardFocusSamples(page);
    const uniqueSamples = Array.from(
      new Map(samples.map((sample) => [sample.key, sample])).values(),
    );

    expect(
      uniqueSamples.length,
      "Nenhum elemento recebeu foco ao navegar com Tab",
    ).toBeGreaterThan(3);

    // Nenhum elemento que recebeu foco pode ficar sem indicador visível.
    const withoutRing = uniqueSamples.filter(
      (sample) => !sample.hasFocusRing,
    );
    expect(
      withoutRing,
      `Elementos sem anel de foco: ${JSON.stringify(withoutRing, null, 2)}`,
    ).toEqual([]);

    // Cobertura mínima das áreas exigidas pelo PRD.
    expect(
      uniqueSamples.some((sample) => sample.inHeader),
      "Nenhum controle do header recebeu foco",
    ).toBe(true);
    expect(
      uniqueSamples.some(
        (sample) => sample.inContact && sample.tag === "input",
      ),
      "Nenhum campo de input do formulário recebeu foco",
    ).toBe(true);
    expect(
      uniqueSamples.some(
        (sample) => sample.inContact && sample.tag === "textarea",
      ),
      "O campo de mensagem (textarea) não recebeu foco",
    ).toBe(true);
    expect(
      uniqueSamples.some(
        (sample) => sample.inContact && sample.tag === "button",
      ),
      "O botão de envio do formulário não recebeu foco",
    ).toBe(true);
    expect(
      uniqueSamples.some((sample) => sample.inFooter),
      "Nenhum link/botão do footer recebeu foco",
    ).toBe(true);

    // Se a seção de habilidades tiver elementos focáveis, eles também
    // precisam ter passado pelo mesmo padrão.
    const skillsSamples = uniqueSamples.filter(
      (sample) => sample.inSkills,
    );
    expect(
      skillsSamples.every((sample) => sample.hasFocusRing),
      "Há elemento focável na seção de habilidades sem anel de foco",
    ).toBe(true);
  });

  test("links e botões do footer são alcançáveis por teclado", async ({
    page,
  }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    const focusable = footer.locator(
      'a[href], button, [role="button"], [tabindex]:not([tabindex="-1"])',
    );
    const count = await focusable.count();
    expect(count).toBeGreaterThan(0);

    // Confirma que os links sociais continuam existindo e acessíveis.
    await expect(footer.getByLabel("GitHub")).toBeVisible();
    await expect(footer.getByLabel("LinkedIn")).toBeVisible();
  });

  test.describe("prefers-reduced-motion", () => {
    test("microinterações não animam deslocamento nem escala", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload({ waitUntil: "networkidle" });

      const prefersReducedMotion = await page.evaluate(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
      expect(
        prefersReducedMotion,
        "A emulação de prefers-reduced-motion não foi aplicada",
      ).toBe(true);

      const navButton = page.locator("header button").first();
      await expect(navButton).toBeVisible();

      const initial = await navButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          transitionDuration: styles.transitionDuration,
          transform: styles.transform,
        };
      });

      const durationsInSeconds = initial.transitionDuration
        .split(",")
        .map((value) => {
          const trimmed = value.trim();
          const numeric = Number.parseFloat(trimmed);
          if (Number.isNaN(numeric)) return 0;
          return trimmed.endsWith("ms") ? numeric / 1000 : numeric;
        });

      expect(
        Math.max(...durationsInSeconds, 0),
        "Transições deveriam ser instantâneas com reduced motion",
      ).toBeLessThanOrEqual(0.02);

      expect(
        initial.transform === "none" ||
          initial.transform === "matrix(1, 0, 0, 1, 0, 0)",
        `Transform inesperado com reduced motion: ${initial.transform}`,
      ).toBe(true);

      await navButton.hover();

      const hoverTransform = await navButton.evaluate(
        (el) => window.getComputedStyle(el).transform,
      );
      expect(
        hoverTransform === "none" ||
          hoverTransform === "matrix(1, 0, 0, 1, 0, 0)",
        `Hover não deveria deslocar/escalar com reduced motion: ${hoverTransform}`,
      ).toBe(true);

      // O card de Skills ainda tem hover local; o tema remove o translateY
      // sob movimento reduzido.
      const skillCard = page.locator("#skills .MuiBox-root:has(> h6)").first();
      await skillCard.scrollIntoViewIfNeeded();
      await skillCard.hover();

      const skillTransform = await skillCard.evaluate(
        (el) => window.getComputedStyle(el).transform,
      );
      expect(
        skillTransform === "none" ||
          skillTransform === "matrix(1, 0, 0, 1, 0, 0)",
        `Card de Skills não deveria deslocar com reduced motion: ${skillTransform}`,
      ).toBe(true);
    });
  });
});
