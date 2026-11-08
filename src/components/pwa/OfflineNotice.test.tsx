import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import OfflineNotice from "./OfflineNotice";

const setOnline = (value: boolean) => {
  Object.defineProperty(window.navigator, "onLine", {
    configurable: true,
    value,
  });
};

describe("OfflineNotice", () => {
  afterEach(() => {
    setOnline(true);
  });

  it("não renderiza quando está online", () => {
    setOnline(true);

    render(<OfflineNotice />);

    expect(screen.queryByTestId("offline-notice")).not.toBeInTheDocument();
  });

  it("anuncia o estado offline com ação de retry", () => {
    setOnline(false);

    render(<OfflineNotice />);

    expect(screen.getByTestId("offline-notice")).toBeInTheDocument();
    expect(
      screen.getByText(/Você está offline/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Tentar novamente/i }),
    ).toBeInTheDocument();
  });

  it("some quando a conexão volta", () => {
    setOnline(false);

    render(<OfflineNotice />);
    expect(screen.getByTestId("offline-notice")).toBeInTheDocument();

    act(() => {
      setOnline(true);
      window.dispatchEvent(new Event("online"));
    });

    expect(screen.queryByTestId("offline-notice")).not.toBeInTheDocument();
  });
});
