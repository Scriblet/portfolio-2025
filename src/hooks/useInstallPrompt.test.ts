import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useInstallPrompt, {
  type BeforeInstallPromptEvent,
} from "./useInstallPrompt";

const createPromptEvent = (outcome: "accepted" | "dismissed") => {
  const event = new Event("beforeinstallprompt") as BeforeInstallPromptEvent;

  Object.defineProperty(event, "prompt", {
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(event, "userChoice", {
    value: Promise.resolve({ outcome, platform: "test" }),
  });

  return event;
};

describe("useInstallPrompt", () => {
  it("começa indisponível sem beforeinstallprompt", async () => {
    const { result } = renderHook(() => useInstallPrompt());

    expect(result.current.canInstall).toBe(false);
    await expect(result.current.promptInstall()).resolves.toBe("unavailable");
  });

  it("captura o evento e devolve a escolha do usuário", async () => {
    const { result } = renderHook(() => useInstallPrompt());
    const event = createPromptEvent("accepted");

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current.canInstall).toBe(true);

    let outcome: string | undefined;
    await act(async () => {
      outcome = await result.current.promptInstall();
    });

    expect(outcome).toBe("accepted");
    expect(result.current.canInstall).toBe(false);
  });

  it("limpa o prompt quando o app é instalado", () => {
    const { result } = renderHook(() => useInstallPrompt());

    act(() => {
      window.dispatchEvent(createPromptEvent("dismissed"));
    });
    expect(result.current.canInstall).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("appinstalled"));
    });

    expect(result.current.canInstall).toBe(false);
    expect(result.current.isInstalled).toBe(true);
  });
});
