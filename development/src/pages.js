// Zusätzliche HTML-Seiten eines Entwurfs (z. B. kontakt.html).
// index.html und style.css bleiben die festen Grunddateien; weitere Seiten
// liegen als Liste im Entwurf: { html, css, pages: [{ name, html }] }.
export const MAX_PAGES = 4;
// The editor and image insertion already allow this much HTML. All pages must
// retain the same amount when saved, backed up, imported or copied forward.
export const HTML_MAX = 1500000;
export const CSS_MAX = 40000;
export const PAGE_MAX = HTML_MAX;
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

// The app uses the browser's inert HTML parser: comments, quoted examples and
// raw-text elements are not actual links. This fallback keeps the pure Node
// checks dependency-free; the browser tests also exercise the real DOM parser.
function sourceHrefs(html) {
  const clean = html
    .replace(/<!--[\s\S]*?(?:-->|$)/g, "")
    .replace(/<(script|style|textarea|title|xmp|iframe|noembed|noframes|template)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>[\s\S]*?(?:<\/\1\s*>|$)/gi, "")
    .replace(/<plaintext\b[\s\S]*$/gi, "");
  const hrefs = [];
  for (const tag of clean.matchAll(/<a(?=[\s/>])(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi)) {
    const attributes = tag[0].slice(2, -1);
    for (const attr of attributes.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      if (attr[1].toLowerCase() !== "href") continue;
      hrefs.push(attr[2] ?? attr[3] ?? attr[4] ?? "");
      break;
    }
  }
  return hrefs;
}

// Relative URL spelling may include ./, a query or a fragment, but file-name
// case stays significant. Never treat a parent folder or a host root as a
// file belonging to this project's flat set of HTML pages.
export function pageLinks(html) {
  const source = String(html || "");
  const hrefs = typeof DOMParser === "function"
    ? Array.from(new DOMParser().parseFromString(source, "text/html").querySelectorAll("a[href]"), (a) => a.getAttribute("href"))
    : sourceHrefs(source);
  const links = [];
  for (const value of hrefs) {
    const href = value.trim();
    if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href) || /^[/#?\\]/.test(href)) continue;
    const path = href.split(/[?#]/)[0];
    if (!/\.html?$/i.test(path)) continue;
    try {
      const resolved = new URL(path, "https://weblab.invalid/project/");
      if (resolved.origin !== "https://weblab.invalid") continue;
      const target = resolved.pathname.startsWith("/project/")
        ? decodeURI(resolved.pathname.slice("/project/".length))
        : path;
      links.push(target);
    } catch {
      // Invalid URL spellings are not promoted to existing project files.
      links.push(path);
    }
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
