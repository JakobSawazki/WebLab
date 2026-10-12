export function checkLesson(lesson, html, css, parse) {
  const doc = parse(html);
  // CSSOM liest gültige Deklarationen, statt Text in Kommentaren mitzuzählen.
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  let rules = [];
  try {
    rules = Array.from(sheet?.cssRules || []);
  } catch {}
  return lesson.criteria.map((c) => {
    let passed = false;
    if (c.doctype) passed = /^\s*<!doctype\s+html\s*>/i.test(html);
    else if (c.cssSelector)
      passed = rules.some(
        (r) =>
          r.selectorText
            ?.split(",")
            .map((x) => x.trim())
            .includes(c.cssSelector) &&
          r.style?.getPropertyValue(c.property).trim(),
      );
    else {
      const matches = Array.from(doc.querySelectorAll(c.selector)).filter(
        (el) => {
          const text = el.textContent.trim();
          return (
            (!c.text || text.length >= c.text) &&
            (!c.exclude || text !== c.exclude) &&
            (!c.attribute ||
              (el.getAttribute(c.attribute) || "").trim().length >= c.min)
          );
        },
      );
      passed = matches.length >= (c.count || 1);
    }
    return { label: c.label, passed };
  });
}
export const preview = (html, css) =>
  `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; media-src data:; font-src 'none'; form-action 'none'; base-uri 'none';"><style>${css.replace(/<\/style/gi, "< /style")}</style></head><body>${html}</body></html>`;
