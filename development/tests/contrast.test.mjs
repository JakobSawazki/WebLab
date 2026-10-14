import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Reads the colour tokens of both themes straight from styles.css, so a later
// palette change cannot silently drop text below WCAG AA (4.5:1).
const css = fs.readFileSync(new URL("../../styles.css", import.meta.url), "utf8");
const block = (selector) => {
  const start = css.indexOf(selector + " {");
  return css.slice(start, css.indexOf("}", start));
};
const tokens = (text) =>
  Object.fromEntries(
    [...text.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((m) => [m[1], m[2]]),
  );
const dark = tokens(block(":root"));
const themes = { dark, light: { ...dark, ...tokens(block(':root[data-theme="light"]')) } };
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const luminance = (c) =>
  c
    .map((x) => x / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
    .reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [x, y] = [luminance(rgb(a)), luminance(rgb(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

test("Text colours keep at least 4.5:1 on every surface in both themes", () => {
  for (const [name, t] of Object.entries(themes))
    for (const fg of ["--text", "--muted", "--brand", "--green", "--amber", "--red"])
      for (const bg of ["--bg", "--panel", "--panel-strong", "--metal-top", "--metal-mid", "--metal-bottom"]) {
        assert.ok(t[fg] && t[bg], `${name}: ${fg} und ${bg} definiert`);
        const ratio = contrast(t[fg], t[bg]);
        assert.ok(ratio >= 4.5, `${name}: ${fg} auf ${bg} nur ${ratio.toFixed(2)}:1`);
      }
});
