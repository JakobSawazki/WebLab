// Read the simple, flat CSS rules used by the mini exercises without running
// learner code. This is deliberately not a complete CSS parser or validator.
export const stripCssComments = (source) => source.replace(
  /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\*[\s\S]*?(?:\*\/|$)/g,
  (token) => token.startsWith("/*") ? " " : token,
);

function flatRules(source) {
  const rules = [];
  const clean = stripCssComments(source);
  let depth = 0, cursor = 0, bodyStart = 0, selector = "", nested = false;
  for (const token of clean.matchAll(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[{};]/g)) {
    if (token[0] === ";" && depth === 0) cursor = token.index + 1;
    if (token[0] === "{") {
      if (depth === 0) {
        selector = clean.slice(cursor, token.index).trim();
        bodyStart = token.index + 1;
        nested = false;
      } else nested = true;
      depth++;
    } else if (token[0] === "}" && depth > 0) {
      depth--;
      if (depth === 0) {
        if (!nested && !selector.startsWith("@")) rules.push([selector, clean.slice(bodyStart, token.index)]);
        cursor = token.index + 1;
      }
    }
  }
  return rules;
}

// selectorMatches returns true for an exact simple selector, or a numeric rank
// when an exercise accepts alternatives of different specificity.
export function cssPracticeValue(source, selectorMatches, property) {
  let selected = null;
  for (const [selectors, body] of flatRules(source)) {
    const rank = Math.max(0, ...selectors.split(",").map((selector) => Number(selectorMatches(selector.trim())) || 0));
    if (!rank) continue;
    const declarations = /(?:^|;)\s*([a-z_-][a-z0-9_-]*)\s*:\s*((?:[^;"']|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')*)(?=;|$)/gi;
    for (const [, name, raw] of body.matchAll(declarations)) {
      if (name.toLowerCase() !== property.toLowerCase()) continue;
      const important = /!\s*important\s*$/i.test(raw);
      const value = raw.replace(/\s*!\s*important\s*$/i, "").trim();
      if (!value) continue;
      if (!selected || (important && !selected.important) || (important === selected.important && rank >= selected.rank))
        selected = { value, important, rank };
    }
  }
  return selected?.value ?? null;
}
