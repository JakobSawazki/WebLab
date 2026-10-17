import test from "node:test";
import assert from "node:assert/strict";
import { copyDraft, linkReport, MAX_PAGES, normalizePages, pageLinks, pageStarter, suggestPageName, validPageName } from "../src/pages.js";
import { normalize, importBackup, exportBackup, blank } from "../src/state.js";
import { startingDraft } from "../src/journey.js";
import { readCodeFiles } from "../src/editor.js";

const file = (name, text) => ({ name, size: Buffer.byteLength(text), text: async () => text });

test("Seitennamen sind sicher und index.html bleibt reserviert", () => {
  for (const name of ["kontakt.html", "ueber-uns.html", "seite2.html"]) assert.ok(validPageName(name), name);
  for (const name of ["index.html", "Kontakt.html", "kontakt.htm", "über.html", "-x.html", "a b.html", "../x.html", "", 5])
    assert.equal(validPageName(name), false, String(name));
});

test("Eingaben werden zu gültigen Dateinamen", () => {
  assert.equal(suggestPageName("Über uns"), "ueber-uns.html");
  assert.equal(suggestPageName("  Kontakt.HTML "), "kontakt.html");
  assert.equal(suggestPageName("Größe_&_Maße"), "groesse-masse.html");
  assert.equal(suggestPageName("index"), "");
  assert.equal(suggestPageName("!!!"), "");
});

test("Unterseiten werden begrenzt, entdoppelt und gesäubert", () => {
  const raw = [
    { name: "kontakt.html", html: "<h1>A</h1>" },
    { name: "kontakt.html", html: "doppelt" },
    { name: "index.html", html: "verboten" },
    { name: "Böse.html", html: "x" },
    "kein Objekt",
    ...Array.from({ length: 8 }, (_, i) => ({ name: `s${i}.html`, html: "" })),
  ];
  const pages = normalizePages(raw);
  assert.equal(pages.length, MAX_PAGES);
  assert.deepEqual(pages[0], { name: "kontakt.html", html: "<h1>A</h1>" });
  assert.equal(new Set(pages.map((p) => p.name)).size, pages.length);
  assert.deepEqual(normalizePages(null), []);
});

test("Unterseiten überstehen Sicherung und Laden; ältere Stände bleiben gültig", () => {
  const state = blank();
  state.drafts.l16 = { html: "<h1>Start</h1>", css: "h1{color:red}", pages: [{ name: "kontakt.html", html: "<h1>Kontakt</h1>" }] };
  state.drafts.lab = { html: "x", css: "", pages: [{ name: "galerie.html", html: "<p>G</p>" }] };
  state.drafts.l1 = { html: "<p>alt</p>", css: "" };
  const restored = importBackup(JSON.parse(JSON.stringify(exportBackup(state))));
  assert.deepEqual(restored.drafts.l16.pages, [{ name: "kontakt.html", html: "<h1>Kontakt</h1>" }]);
  assert.deepEqual(restored.drafts.lab.pages, [{ name: "galerie.html", html: "<p>G</p>" }]);
  assert.equal("pages" in restored.drafts.l1, false);
  assert.equal("pages" in normalize({ drafts: { l2: { html: "a", css: "", pages: [] } } }).drafts.l2, false);
});

test("Übernommene Entwürfe teilen keine Unterseiten mit der Vorlage", () => {
  const drafts = { l15: { html: "a", css: "b", pages: [{ name: "kontakt.html", html: "k" }] } };
  const next = startingDraft(drafts, "l16");
  next.pages[0].html = "geändert";
  assert.equal(drafts.l15.pages[0].html, "k");
  const copy = copyDraft(drafts.l15);
  assert.notEqual(copy.pages, drafts.l15.pages);
  assert.deepEqual(copyDraft({ html: "a", css: "" }), { html: "a", css: "" });
});

test("Startgerüst einer Unterseite ist vollständig und verknüpft", () => {
  const html = pageStarter("ueber-uns.html");
  assert.match(html, /<!doctype html>/);
  assert.match(html, /<meta charset="utf-8">/);
  assert.match(html, /<title>Ueber uns<\/title>/);
  assert.match(html, /<link rel="stylesheet" href="style.css">/);
  assert.match(html, /<a href="index.html">/);
});

test("Verweisprüfung erkennt vorhandene und fehlende Seiten", () => {
  assert.deepEqual(
    pageLinks('<a href="kontakt.html">K</a> <a href=\'impressum.html#top\'>I</a> <a href=galerie.htm>G</a> <a href="https://x.de/a.html">E</a> <a href="#ideen">S</a> <a href="kontakt.html">doppelt</a> <a href="bild.png">B</a>'),
    ["kontakt.html", "impressum.html", "galerie.htm"],
  );
  const report = linkReport({
    html: '<a href="kontakt.html">K</a><a href="impressum.html">I</a>',
    css: "",
    pages: [{ name: "kontakt.html", html: '<a href="index.html">Start</a>' }],
  });
  assert.deepEqual(report, [
    { page: "index.html", links: [{ target: "kontakt.html", exists: true }, { target: "impressum.html", exists: false }] },
    { page: "kontakt.html", links: [{ target: "index.html", exists: true }] },
  ]);
});

test("Mehrere HTML-Dateien: index.html plus Unterseiten", async () => {
  assert.deepEqual(
    await readCodeFiles([file("index.html", "<h1>I</h1>"), file("Kontakt.htm", "<h1>K</h1>\r\n"), file("style.css", "p{}")]),
    { html: "<h1>I</h1>", pages: { "kontakt.html": "<h1>K</h1>\n" }, css: "p{}" },
  );
  // Eine einzelne HTML-Datei ersetzt wie bisher index.html, egal wie sie heißt.
  assert.deepEqual(await readCodeFiles([file("meine-seite.html", "x")]), { html: "x" });
  for (const files of [
    [file("a.html", ""), file("b.html", "")],
    [file("index.html", ""), file("index.htm", "")],
    [file("index.html", ""), file("Über.html", "")],
    [file("index.html", ""), file("a.css", ""), file("b.css", "")],
    Array.from({ length: MAX_PAGES + 2 }, (_, i) => file(i ? `s${i}.html` : "index.html", "")),
  ])
    await assert.rejects(readCodeFiles(files));
});
