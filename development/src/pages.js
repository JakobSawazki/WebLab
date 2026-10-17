// Zusätzliche HTML-Seiten eines Entwurfs (z. B. kontakt.html).
// index.html und style.css bleiben die festen Grunddateien; weitere Seiten
// liegen als Liste im Entwurf: { html, css, pages: [{ name, html }] }.
export const MAX_PAGES = 4;
export const PAGE_MAX = 300000;
const record = (x) => x && typeof x === "object" && !Array.isArray(x);
const clip = (x, n) => (typeof x === "string" ? x.slice(0, n) : "");

// Kleinbuchstaben, Ziffern und Bindestrich – so wie auf Schulservern sicher.
export const validPageName = (name) =>
  typeof name === "string" &&
  /^[a-z0-9][a-z0-9-]{0,29}\.html$/.test(name) &&
  name !== "index.html";

// Macht aus einer Eingabe wie "Über uns" einen sicheren Dateinamen "ueber-uns.html".
export function suggestPageName(input) {
  const base = String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\.html?$/, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
  const name = `${base}.html`;
  return validPageName(name) ? name : "";
}

export function normalizePages(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const pages = [];
  for (const page of raw) {
    if (pages.length >= MAX_PAGES) break;
    if (!record(page) || !validPageName(page.name) || seen.has(page.name)) continue;
    seen.add(page.name);
    pages.push({ name: page.name, html: clip(page.html, PAGE_MAX) });
  }
  return pages;
}

// Tiefe Kopie: Übernommene Entwürfe dürfen sich nicht gegenseitig verändern.
export function copyDraft(draft) {
  const copy = { html: draft.html, css: draft.css };
  if (draft.pages?.length) copy.pages = draft.pages.map((page) => ({ ...page }));
  return copy;
}

export function pageStarter(name) {
  const title = name.replace(/\.html$/, "").replace(/-/g, " ");
  const heading = title.charAt(0).toUpperCase() + title.slice(1);
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>${heading}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <a href="index.html">Zur Startseite</a>
  </nav>
  <main>
    <h1>${heading}</h1>
    <p>Schreibe hier den Inhalt dieser Seite.</p>
  </main>
</body>
</html>`;
}

// Ziele relativer Verweise auf HTML-Dateien desselben Ordners.
export function pageLinks(html) {
  const links = [];
  const pattern = /<a\b[^>]*?\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const match of String(html || "").matchAll(pattern)) {
    const href = (match[2] ?? match[3] ?? match[4] ?? "").trim().split("#")[0];
    if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("/") || href.startsWith("//")) continue;
    if (!/\.html?$/i.test(href)) continue;
    links.push(href);
  }
  return [...new Set(links)];
}

// Welche Seite verweist auf welche Datei – und gibt es die Datei im Projekt?
export function linkReport(draft) {
  const files = ["index.html", ...(draft.pages || []).map((page) => page.name)];
  const sources = [["index.html", draft.html], ...(draft.pages || []).map((page) => [page.name, page.html])];
  return sources.map(([name, html]) => ({
    page: name,
    links: pageLinks(html).map((target) => ({ target, exists: files.includes(target) })),
  }));
}
