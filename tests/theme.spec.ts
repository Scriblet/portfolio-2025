import { test, expect, type Page } from "@playwright/test";

const STORAGE_KEY = "portfolio-color-mode";

type ColorScheme = "light" | "dark";

/**
 * Lê o modo efetivamente aplicado. O provider escreve em
 * documentElement.style.colorScheme e também em data-mui-color-scheme
 * (compatível com a API de color schemes do MUI v7).
 */
const readAppliedMode = async (page: Page): Promise<ColorScheme | null> =>
  page.evaluate(() => {
    const inline = document.documentElement.style.colorScheme;
    if (inline === "light" || inline === "dark") return inline;

    const attribute = document.documentElement.getAttribute(
      "data-mui-color-scheme",
    );
    if (attribute === "light" || attribute === "dark") return attribute;

    return null;
  });

const themeToggle = (page: Page) => page.getByTestId("theme-toggle");

/** Emula o sinal do sistema antes de carregar a aplicação. */
const gotoWithSystemMode = async (page: Page, colorScheme: ColorScheme) => {
  await page.emulateMedia({ colorScheme });
  await page.goto("/");
};

/**
 * Estes testes assumem a integração final:
 * - ColorModeProvider envolvendo a aplicação em main.tsx;
 * - ThemeToggle montado no header.
 *
 * Antes dessa integração o teste falha de propósito (o toggle ainda não
 * existe), conforme combinado no PRD.
 */
test.describe("Tema claro/escuro", () => {
  test.describe("preferência inicial do sistema", () => {
    test("primeira visita sem escolha salva segue prefers-color-scheme: dark", async ({
      page,
    }) => {
      await gotoWithSystemMode(page, "dark");

      await expect(themeToggle(page)).toBeVisible();
      await expect.poll(() => readAppliedMode(page)).toBe("dark");
      await expect(themeToggle(page)).toHaveAttribute("aria-pressed", "true");
    });

    test("primeira visita sem escolha salva segue prefers-color-scheme: light", async ({
      page,
    }) => {
      await gotoWithSystemMode(page, "light");

      await expect(themeToggle(page)).toBeVisible();
      await expect.poll(() => readAppliedMode(page)).toBe("light");
      await expect(themeToggle(page)).toHaveAttribute("aria-pressed", "false");
      await expect(themeToggle(page)).toHaveAttribute(
        "aria-label",
        "Ativar tema escuro",
      );
    });
  });

  test.describe("toggle e persistência", () => {
    test("clicar alterna o tema, persiste em localStorage e sobrevive ao reload", async ({
      page,
    }) => {
      await gotoWithSystemMode(page, "dark");

      const toggle = themeToggle(page);
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAttribute("aria-pressed", "true");
      await expect(toggle).toHaveAttribute("aria-label", "Ativar tema claro");

      await toggle.click();

      await expect.poll(() => readAppliedMode(page)).toBe("light");
      await expect(toggle).toHaveAttribute("aria-pressed", "false");
      await expect(toggle).toHaveAttribute(
        "aria-label",
        "Ativar tema escuro",
      );

      const stored = await page.evaluate(
        (key) => window.localStorage.getItem(key),
        STORAGE_KEY,
      );
      expect(stored).toBe("light");

      await page.reload();
      await expect(themeToggle(page)).toBeVisible();
      await expect.poll(() => readAppliedMode(page)).toBe("light");
      await expect(themeToggle(page)).toHaveAttribute("aria-pressed", "false");
    });
  });

  test.describe("prioridade do localStorage", () => {
    test("escolha salva tem prioridade sobre prefers-color-scheme", async ({
      page,
    }) => {
      await gotoWithSystemMode(page, "light");
      await page.evaluate(
        (key) => window.localStorage.setItem(key, "dark"),
        STORAGE_KEY,
      );
      await page.reload();

      await expect(themeToggle(page)).toBeVisible();
      await expect.poll(() => readAppliedMode(page)).toBe("dark");
    });
  });

  test.describe("remoção da escolha salva", () => {
    test("remover a escolha salva restaura o comportamento do sistema", async ({
      page,
    }) => {
      await gotoWithSystemMode(page, "light");
      await page.evaluate(
        (key) => window.localStorage.setItem(key, "dark"),
        STORAGE_KEY,
      );
      await page.reload();
      await expect.poll(() => readAppliedMode(page)).toBe("dark");

      await page.evaluate(
        (key) => window.localStorage.removeItem(key),
        STORAGE_KEY,
      );
      await page.reload();

      await expect(themeToggle(page)).toBeVisible();
      await expect.poll(() => readAppliedMode(page)).toBe("light");
    });
  });

  test.describe("fallback sem sinal do sistema", () => {
    test("sem escolha salva e sem prefers-color-scheme usa o tema escuro", async ({
      page,
    }) => {
      await page.addInitScript(() => {
        const originalMatchMedia = window.matchMedia.bind(window);

        window.matchMedia = (query: string): MediaQueryList => {
          if (query.includes("prefers-color-scheme")) {
            return {
              matches: false,
              media: query,
              onchange: null,
              addListener: () => undefined,
              removeListener: () => undefined,
              addEventListener: () => undefined,
              removeEventListener: () => undefined,
              dispatchEvent: () => false,
            } as MediaQueryList;
          }

          return originalMatchMedia(query);
        };
      });

      await page.emulateMedia({ colorScheme: null });
      await page.goto("/");

      await expect(themeToggle(page)).toBeVisible();
      await expect.poll(() => readAppliedMode(page)).toBe("dark");
    });
  });

  test.describe("meta theme-color", () => {
    test("acompanha o modo aplicado", async ({ page }) => {
      await gotoWithSystemMode(page, "dark");

      const themeColor = page.locator('meta[name="theme-color"]');
      await expect(themeColor).toHaveAttribute("content", "#121212");

      await themeToggle(page).click();
      await expect.poll(() => readAppliedMode(page)).toBe("light");
      await expect(themeColor).toHaveAttribute("content", "#f5f3f7");
    });
  });

  test.describe("storage indisponível", () => {
    test("não quebra a página e mantém a troca em memória", async ({
      page,
    }) => {
      await page.addInitScript(() => {
        const fail = () => {
          throw new DOMException("Storage bloqueado", "SecurityError");
        };

        Storage.prototype.getItem = fail;
        Storage.prototype.setItem = fail;
        Storage.prototype.removeItem = fail;
      });

      await gotoWithSystemMode(page, "dark");

      await expect(page.locator("main")).toBeVisible();
      await expect(themeToggle(page)).toBeVisible();

      // A troca continua funcionando em memória, mesmo sem persistir.
      await themeToggle(page).click();
      await expect.poll(() => readAppliedMode(page)).toBe("light");
      await expect(page.locator("main")).toBeVisible();
    });
  });
});
