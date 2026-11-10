import { describe, expect, it } from "vitest";
import { createAppTheme } from "./createTheme";

const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "button",
  "caption",
  "overline",
] as const;

describe("createAppTheme", () => {
  it.each(["dark", "light"] as const)(
    "preserva a escala clamp no tema %s",
    (mode) => {
      const theme = createAppTheme(mode);

      expect(theme.typography.h1.fontSize).toContain("clamp(");

      for (const variant of variants) {
        const fontSize = theme.typography[variant].fontSize;

        expect(typeof fontSize).toBe("string");
        expect(fontSize, `${variant} virou NaN`).not.toContain("NaN");
        expect(fontSize, `${variant} perdeu o clamp`).toContain("clamp(");
      }
    },
  );
});
