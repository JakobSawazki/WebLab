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
  };
  for (const [name, source] of Object.entries(variants)) {
    const e = all.find(([n]) => n === name)[2];
    assert.ok(checkExercise(e, source).every((r) => r.passed), name);
  }
});
