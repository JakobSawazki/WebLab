import test from "node:test";
import assert from "node:assert/strict";
import { lessons } from "../src/content.js";
import { guidance } from "../src/guidance.js";

test("Every criterion has its own concrete tip and every lesson names typical mistakes", () => {
  assert.deepEqual(Object.keys(guidance), lessons.map((l) => l.id));
  for (const l of lessons) {
    const { tips, pitfalls } = guidance[l.id];
    assert.equal(tips.length, l.criteria.length, `${l.id}: ein Tipp je Kriterium`);
    assert.ok(pitfalls.length >= 2 && pitfalls.length <= 4, `${l.id}: zwei bis vier Stolpersteine`);
    for (const text of [...tips, ...pitfalls])
      assert.ok(text.trim().length >= 20 && text.length <= 200, `${l.id}: ${text}`);
    assert.equal(new Set(tips).size, tips.length, `${l.id}: keine doppelten Tipps`);
  }
});

test("Every quiz option is explained and only the correct one is confirmed", () => {
  for (const l of lessons) {
    const { quiz } = guidance[l.id];
    assert.equal(quiz.length, l.options.length, `${l.id}: eine Erklärung je Antwort`);
    quiz.forEach((text, i) =>
      assert.equal(text.startsWith("Richtig"), i === l.answer, `${l.id}: Antwort ${i + 1}`));
  }
});
