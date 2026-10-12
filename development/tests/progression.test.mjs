import test from "node:test";
import assert from "node:assert/strict";
import { lessons } from "../src/content.js";
import {
  blank,
  complete,
  lessonAccess,
  xp,
  importBackup,
  exportBackup,
} from "../src/state.js";

test("all 16 lessons unlock in sequence and award XP only once", () => {
  const state = blank();
  state.profile = { name: "MUS.MAX", className: "EG1" };
  for (const lesson of lessons) {
    state.quiz[lesson.id] = true;
    state.checks[lesson.id] = lesson.checks.map(() => true);
  }
  assert.equal(lessonAccess(state, "missing").unlocked, false);
  for (const [index, lesson] of lessons.entries()) {
    for (const [otherIndex, other] of lessons.entries()) {
      assert.equal(lessonAccess(state, other.id).unlocked, otherIndex <= index);
      assert.equal(lessonAccess(state, other.id).requiredXP, otherIndex * 100);
    }
    if (lessons[index + 1])
      assert.equal(complete(state, lessons[index + 1].id), false);
    assert.equal(complete(state, lesson.id), true);
    assert.equal(complete(state, lesson.id), false);
    assert.equal(xp(state), (index + 1) * 100);
  }
  assert.equal(lessonAccess(state, "l16").nextId, null);
});

test("legacy XP, bonus NAGOLD and completions after a gap cannot skip lessons", () => {
  const state = blank();
  state.legacy = { completed: ["headline", "paragraph", "strong", "breaks"] };
  state.nagoldEntries = [{ points: 5, purpose: "Bonus", at: "2026-10-12" }];
  state.completed = ["l4", "l3"];
  assert.equal(xp(state), 520);
  assert.equal(lessonAccess(state, "l2").earnedXP, 0);
  assert.equal(lessonAccess(state, "l2").unlocked, false);
  state.completed.push("l1");
  assert.equal(lessonAccess(state, "l3").unlocked, false);
  state.completed.push("l2");
  assert.equal(lessonAccess(state, "l5").unlocked, true);
});

test("backup retains drafts after gaps and derives unlocks after reloading", () => {
  const state = blank();
  state.completed = ["l1", "l5"];
  state.drafts.l5 = { html: "<h1>Vorhanden</h1>", css: "h1{color:green}" };
  const restored = importBackup(
    JSON.parse(JSON.stringify(exportBackup(state))),
  );
  assert.deepEqual(restored.drafts.l5, state.drafts.l5);
  assert.deepEqual(restored.completed, state.completed);
  assert.equal(lessonAccess(restored, "l2").unlocked, true);
  assert.equal(lessonAccess(restored, "l5").unlocked, false);
});
