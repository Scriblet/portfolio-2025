import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CompanyMark } from "./company-marks";
import type { CompanyMarkKey } from "../data/types";

const marks: CompanyMarkKey[] = [
  "vivo",
  "porto-seguro",
  "thoughtworks",
  "arcotech",
  "finger",
];

describe("CompanyMark", () => {
  it.each(marks)("renderiza o SVG da marca %s", (key) => {
    render(<CompanyMark mark={{ key }} className="test-mark" />);

    const mark = screen.getByTestId(`company-mark-${key}`);
    expect(mark).toBeInTheDocument();
    expect(mark.querySelector("svg")).toBeInTheDocument();
  });

  it("usa currentColor nas logos oficiais", () => {
    render(<CompanyMark mark={{ key: "vivo" }} />);

    const svg = screen
      .getByTestId("company-mark-vivo")
      .querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
  });

  it("renderiza o avião de papel da Finger Consultoria", () => {
    render(<CompanyMark mark={{ key: "finger" }} />);

    const svg = screen
      .getByTestId("company-mark-finger")
      .querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });
});
