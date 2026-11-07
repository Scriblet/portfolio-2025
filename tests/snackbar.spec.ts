import { test, expect, type Page } from "@playwright/test";

/**
 * E2E do snackbar global disparado pelo formulário de contato.
 * `POST /api/contact` é mockado; nada depende da Netlify Function real.
 */

const fillForm = async (
  page: Page,
  values: { nome?: string; email?: string; message?: string } = {},
) => {
  const nome = values.nome ?? "Maria Silva";
  const email = values.email ?? "maria@exemplo.com";
  const message = values.message ?? "Olá, gostaria de conversar.";

  await page.getByLabel("Nome").fill(nome);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mensagem").fill(message);
};

const goToContact = async (page: Page) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
};

test.describe("Snackbar — feedback do formulário de contato", () => {
  test("mostra snackbar de sucesso após envio", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    const snackbar = page.getByTestId("snackbar-success");
    await expect(page.getByTestId("snackbar-host")).toBeVisible();
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toContainText("Mensagem enviada");
    await expect(snackbar).toContainText("Obrigado! Vou responder em breve.");

    // O feedback de sucesso não depende mais de um Alert estático no layout.
    await expect(page.getByLabel("Nome")).toHaveValue("");
    await expect(page.getByLabel("Email")).toHaveValue("");
    await expect(page.getByLabel("Mensagem")).toHaveValue("");
  });

  test("mostra snackbar de erro em falha do servidor", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "server_error" }),
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    const snackbar = page.getByTestId("snackbar-error");
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toContainText(
      "Não foi possível enviar. Tente novamente.",
    );

    // Campos preservados para retry.
    await expect(page.getByLabel("Nome")).toHaveValue("Maria Silva");
  });

  test("fecha o snackbar pelo botão de fechar", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    const snackbar = page.getByTestId("snackbar-success");
    await expect(snackbar).toBeVisible();

    await page
      .getByTestId("snackbar-host")
      .getByRole("button", { name: /close|fechar/i })
      .click();

    // Timeout curto: não espera o auto-dismiss de 4s.
    await expect(snackbar).toBeHidden({ timeout: 2000 });
  });
});
