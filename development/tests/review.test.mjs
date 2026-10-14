import test from "node:test";
import assert from "node:assert/strict";
import { reviewQuestions } from "../src/review.js";

test("Revision questions come only from completed lessons, without repeats", () => {
  assert.deepEqual(reviewQuestions([]), []);
  const done = ["l1", "l2", "l3", "l4", "l5", "l6", "l7"];
  const picked = reviewQuestions(done, 5, () => 0.42);
  assert.equal(picked.length, 5);
  assert.equal(new Set(picked.map((l) => l.id)).size, 5);
  assert.ok(picked.every((l) => done.includes(l.id)));
  assert.equal(reviewQuestions(["l1", "l2"], 5).length, 2);
});
