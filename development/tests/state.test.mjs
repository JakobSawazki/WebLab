import { test } from "node:test";
import assert from "node:assert/strict";
import {
  blank,
  normalize,
  migrateOld,
  importBackup,
  exportBackup,
  complete,
  xp,
  nagold,
  load,
} from "../src/state.js";
import { lessons } from "../src/content.js";
import { zipFiles } from "../src/export.js";
test("16 vollständige und eindeutige BPE2-Einheiten", () => {
  assert.equal(lessons.length, 16);
  assert.equal(new Set(lessons.map((l) => l.id)).size, 16);
  for (const l of lessons) {
    assert.ok(l.goal && l.explanation && l.example && l.task && l.hint);
    assert.ok(l.criteria.length);
    assert.ok(l.checks.length);
    assert.ok(l.options[l.answer]);
  }
});
test("Abschluss braucht Profil, Klasse, Quiz und Selbstkontrolle und zählt nur einmal", () => {
  const s = blank(),
    l = lessons[0];
  assert.equal(complete(s, l.id), false);
  s.profile = { name: "MUS.MAX", className: "EG1" };
  assert.equal(complete(s, l.id), false);
  s.quiz[l.id] = true;
  s.checks[l.id] = [true, true];
  assert.equal(complete(s, l.id), true);
  assert.equal(complete(s, l.id), false);
  assert.equal(xp(s), 100);
  assert.equal(nagold(s), 5);
});
test("Alte Formate erhalten K1-Code und 320 XP ohne erfundene neue Abschlüsse", () => {
  for (const formatVersion of [1, 2]) {
    const s = importBackup({
      app: "WebLab",
      formatVersion,
      state: {
        profile: "mus.max",
        html: "<h1>Alt</h1>",
        completed: [
          "headline",
          "paragraph",
          "strong",
          "breaks",
          "breaks",
          "evil",
        ],
      },
    });
    assert.equal(s.profile.name, "MUS.MAX");
    assert.equal(s.drafts.l1.html, "<h1>Alt</h1>");
    assert.equal(xp(s), 320);
    assert.equal(nagold(s), 0);
    assert.deepEqual(s.completed, []);
  }
});
test("Sicherung rundet den gesamten Lernstand verlustfrei", () => {
  const s = blank();
  s.profile = { name: "MUS.MAX", className: "EG1" };
  s.drafts.l3 = { html: "<p>ä</p>", css: "p{color:red}" };
  s.notes.l3 = "Frage";
  s.completed = ["l3"];
  s.nagoldEntries = [
    { points: -2, purpose: "Absprache", at: "2026-10-12T10:00:00.000Z" },
  ];
  assert.deepEqual(
    importBackup(JSON.parse(JSON.stringify(exportBackup(s)))),
    s,
  );
});
test("Fremde App, unbekannte Version und defekter Stand werden abgelehnt", () => {
  for (const value of [
    null,
    {},
    [],
    { app: "Andere", formatVersion: 3, state: {} },
    { app: "WebLab", formatVersion: 9, state: {} },
    { app: "WebLab", formatVersion: 3, state: null },
  ])
    assert.throws(() => importBackup(value));
});
test("Import begrenzt Inhalte, entfernt unbekannte IDs und verdoppelte Punkte", () => {
  const s = normalize({
    profile: { name: "<img>", className: "x".repeat(100) },
    completed: ["l1", "l1", "fake"],
    drafts: { l1: { html: "x".repeat(1600000), css: "y".repeat(50000) } },
    nagoldEntries: [
      { points: 100, purpose: "x", at: "2026-10-12" },
      { points: 0, purpose: "x", at: "2026-10-12" },
      { points: 5, purpose: "ok", at: "2026-10-12" },
    ],
  });
  assert.equal(s.profile.name, "");
  assert.equal(s.profile.className.length, 20);
  assert.deepEqual(s.completed, ["l1"]);
  assert.equal(s.drafts.l1.html.length, 1500000);
  assert.equal(s.drafts.l1.css.length, 40000);
  assert.equal(s.nagoldEntries.length, 1);
});
test("Alter localStorage wird migriert, korrupter Speicher nicht überschrieben", () => {
  const storage = {
    getItem: (key) =>
      key === "weblab-state-v1"
        ? JSON.stringify({ profile: "mus.max", html: "<p>Alt</p>" })
        : null,
  };
  assert.equal(load(storage).profile.name, "MUS.MAX");
  assert.throws(() => load({ getItem: () => "{" }));
});
test("ZIP enthält beide Dateinamen und einen gültigen Abschluss", async () => {
  const b = new Uint8Array(
    await zipFiles({
      "index.html": "<h1>Ä</h1>",
      "style.css": "h1{color:red}",
    }).arrayBuffer(),
  );
  const v = new DataView(b.buffer);
  assert.equal(v.getUint32(0, true), 0x04034b50);
  assert.equal(v.getUint32(b.length - 22, true), 0x06054b50);
  assert.equal(v.getUint16(b.length - 12, true), 2);
});
