import test from "node:test";
import assert from "node:assert/strict";
import { corrections, checkCorrection } from "../src/corrections.js";
import { lessons } from "../src/content.js";

test("Each correction task fails as given and passes with its reference solution", () => {
  for (const [id, task] of Object.entries(corrections)) {
    assert.ok(lessons.some((l) => l.id === id), `${id}: Einheit existiert`);
    assert.ok(task.task.length > 30 && task.checks.length >= 2, `${id}: Auftrag und Kriterien`);
    assert.ok(checkCorrection(id, task.code).some((r) => !r.passed), `${id}: Fehlerhafter Code fällt durch`);
    assert.ok(checkCorrection(id, task.fixed).every((r) => r.passed), `${id}: Lösung besteht`);
  }
});

test("Correction checks are not fooled by the broken code with only one fix", () => {
  // Fixing just one of the two mistakes must leave exactly one check open.
  const halfFixed = {
    l1: "<h1>Unser Schulgarten</h1>\n<p>Wir pflanzen <strong>Gemüse</p></strong>",
    l4: "<ul>\n  <li>Erde</li>\n  <li>Samen</li>\n  <li>Gießkanne\n</ul>",
    l5: '<a href="#ideen">Zu den Ideen</a>\n<a href="C:\\Users\\max\\kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
    l10: ".hinweis { color: darkgreen; }\n#Start { text-align: center; }",
  };
  for (const [id, source] of Object.entries(halfFixed))
    assert.equal(checkCorrection(id, source).filter((r) => !r.passed).length, 1, id);
});
