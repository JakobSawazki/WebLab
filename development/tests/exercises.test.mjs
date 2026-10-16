import test from "node:test";
import assert from "node:assert/strict";
import { exercises, checkExercise, exerciseTypes as types } from "../src/exercises.js";
import { lessons } from "../src/content.js";

const all = Object.entries(exercises).flatMap(([id, list]) => list.map((e, i) => [`${id}-${i + 1}`, id, e]));

test("Every exercise is complete, fails as given and passes with its reference solution", () => {
  for (const [name, id, e] of all) {
    assert.ok(lessons.some((l) => l.id === id), `${name}: Einheit existiert`);
    assert.ok(e.type in types, `${name}: Art`);
    for (const field of ["title", "task", "remember"])
      assert.ok(typeof e[field] === "string" && e[field].trim().length > 10, `${name}: ${field}`);
    assert.ok(e.checks.length >= 2, `${name}: mindestens zwei Kriterien`);
    assert.ok(checkExercise(e, e.code).some((r) => !r.passed), `${name}: Ausgangscode fällt durch`);
    assert.ok(checkExercise(e, e.fixed).every((r) => r.passed), `${name}: Referenzlösung besteht`);
  }
});

test("In repair exercises, fixing only one mistake leaves exactly one check open", () => {
  const halfFixed = {
    "l1-1": "<h1>Unser Schulgarten</h1>\n<p>Wir pflanzen <strong>Gemüse</p></strong>",
    "l3-1": "<h1>Unsere AG</h1>\n<h2>Termine</h2>\nWir treffen uns freitags.<br><br>Bitte pünktlich sein.",
    "l4-1": "<ul>\n  <li>Erde</li>\n  <li>Samen</li>\n  <li>Gießkanne\n</ul>",
    "l5-1": '<a href="#ideen">Zu den Ideen</a>\n<a href="C:\\Users\\max\\kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
    "l10-1": ".hinweis { color: darkgreen; }\n#Start { text-align: center; }",
    "l6-1": '<img src="bilder/beet.jpg" width="640" height="360">',
    "l8-1": '<video src="medien/garten.mp4" controls autoplay width="480"></video>',
    "l9-1": '<link rel="stylesheet" href="Style.css">',
    "l9-2": "h1 { color: navy; }\np { color: dimgray;",
    "l11-1": "body { font-size: 18px; line-height: 1,6; }",
    "l12-1": ".karte { padding: 1rem; border: 2px navy; }",
    "l14-1": '<img src="bilder/beet.jpg" alt="Hochbeet im Schulhof">\n<footer>\n  <h2>Quellen und Rechte</h2>\n</footer>',
    "l15-1": '<link rel="stylesheet" href="style.css">\n<img src="Bilder/Beet.jpg" alt="Hochbeet im Schulhof">',
  };
  for (const [name, source] of Object.entries(halfFixed)) {
    const e = all.find(([n]) => n === name)[2];
    assert.equal(checkExercise(e, source).filter((r) => !r.passed).length, 1, name);
  }
});

test("Write exercises accept other correct answers, not only the reference", () => {
  const variants = {
    "l1-2": '<h1 >Fußball</h1>\n<p>Mein Verein heißt <strong>TSV</strong> und spielt sonntags.</p>'.replace("<h1 >", "<h1>"),
    "l3-2": "<p>Ich <em>liebe</em> Musik.</p><p>Bitte <strong>leise</strong> sein.</p>",
    "l4-2": "<OL><li>Öffnen</li><li>Lesen</li><li>Schließen</li></OL>",
    "l5-2": '<nav><a href="index.html">Zur Startseite</a> | <a href="https://www.schule.de/ag">AG-Seite</a></nav>',
    "l6-2": '<img alt="" src="bilder/linie.png">\n<img width="640" src="bilder/team.jpg" alt="Die Robotik-AG im Werkraum">',
    "l7-2": '<table><caption>Noten</caption>\n<tr><th scope="col">Fach</th><th scope="col">Note</th></tr>\n<tr><td>Deutsch</td><td>2</td></tr></table>',
    "l8-2": '<video width="400" controls><source src="film.mp4" type="video/mp4"></video>\n<p>Im Film erklären wir unseren Roboter Schritt für Schritt.</p>',
    "l10-2": "p{color:gray}\n.hinweis{color:green}\n#start{text-align:center}",
    "l11-2": 'body{color:#111;background-color:white;font-family:"Open Sans", sans-serif}',
    "l12-2": ".karte{max-width:80%;margin:0 auto;box-sizing:border-box}",
    "l13-2": '<NAV><a href="index.html">Start</a> <a href="kontakt.html">Kontakt</a></NAV>\n<footer>Klasse 8b, 2026</footer>',
    "l15-2": "<ol><li>Startseite öffnet per Doppelklick.</li><li>Rücklink führt zu index.html.</li><li>Umlaute werden richtig angezeigt.</li></ol>",
    "l16-1": '<!DOCTYPE html><html lang="de"><head><title>Kontakt</title><link href="style.css" rel="stylesheet"></head><body><nav><a href="index.html">Start</a></nav></body></html>',
  };
  for (const [name, source] of Object.entries(variants)) {
    const e = all.find(([n]) => n === name)[2];
    assert.ok(checkExercise(e, source).every((r) => r.passed), name);
  }
});

test("Every lesson offers at least one exercise", () => {
  for (const l of lessons) assert.ok(exercises[l.id]?.length >= 1, l.id);
});

test("Row colors require active rules for the right classes and complete color values", () => {
  const exercise = exercises.l11[2];
  const result = (source) => checkExercise(exercise, source).map((r) => r.passed);
  assert.deepEqual(result(".ungerade { background-color: lightblue; }"), [true, false]);
  assert.deepEqual(result(".gerade { background-color: white; }"), [false, true]);
  assert.deepEqual(result("/* " + exercise.fixed + " */"), [false, false]);
  assert.deepEqual(result(".ungerade { background-color: lightblueish; } .gerade { background-color: whitewash; }"), [false, false]);
  assert.deepEqual(result(".Ungerade { background-color: lightblue; } #gerade { background-color: white; }"), [false, false]);
  assert.deepEqual(result(".ungerade { background-color: ; } .gerade { color: white; }"), [false, false]);
  assert.deepEqual(result("tr.gerade { BACKGROUND-COLOR: #FFF } tr.ungerade { background-color: #ADD8E6; }"), [true, true]);
});

test("Every exercise has exactly one hint, and hints never contain the full solution", async () => {
  const { exerciseHints } = await import("../src/exercises.js");
  assert.deepEqual(Object.keys(exerciseHints).sort(), all.map(([name]) => name).sort());
  for (const [name, , e] of all) {
    const hint = exerciseHints[name];
    assert.ok(hint.length > 30 && hint.length < 220, name);
    assert.notEqual(hint.trim(), e.fixed.trim(), name);
  }
});

test("Solved markers from a backup keep only known exercise ids", async () => {
  const { normalizeSolved } = await import("../src/exercises.js");
  assert.equal(normalizeSolved(undefined), null);
  assert.equal(normalizeSolved("l1-1"), null);
  assert.deepEqual(normalizeSolved(["l1-1", "l1-1", "l99-1", 7, "<img>", "l16-1"]), ["l1-1", "l16-1"]);
});
