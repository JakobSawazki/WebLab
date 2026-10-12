import test from "node:test";
import assert from "node:assert/strict";
import { debugging } from "../src/debugging.js";
import { lessons } from "../src/content.js";

test("Every HTML/CSS foundation lesson has a complete diagnosis exercise with individual feedback", () => {
  assert.deepEqual(
    Object.keys(debugging),
    lessons.slice(0, 12).map((l) => l.id),
  );
  for (const exercise of Object.values(debugging)) {
    assert.ok(exercise.code.trim());
    assert.ok(exercise.question.endsWith("?"));
    assert.equal(exercise.options.length, 3);
    assert.equal(new Set(exercise.options).size, 3);
    assert.ok(
      Number.isInteger(exercise.answer) &&
        exercise.answer >= 0 &&
        exercise.answer < 3,
    );
    assert.equal(exercise.feedback.length, exercise.options.length);
    assert.equal(new Set(exercise.feedback).size, exercise.options.length);
    exercise.feedback.forEach((text, i) => {
      assert.ok(text.length > 50);
      assert.equal(text.startsWith("Richtig:"), i === exercise.answer);
    });
  }
});
