import test from "node:test";
import assert from "node:assert/strict";
import { journey, startingDraft } from "../src/journey.js";
import { lessons } from "../src/content.js";
test("All 16 learning steps form one complete chain with actionable preview tasks", () => {
  assert.equal(Object.keys(journey).length, 16);
  lessons.forEach((lesson, i) => {
    const step = journey[lesson.id];
    assert.equal(step.previous, lessons[i - 1]?.id || null);
    assert.equal(step.next, lessons[i + 1]?.id || null);
    assert.equal(step.steps.length, 3);
    assert.ok(step.blocks.length >= 2 && new Set(step.blocks).size === step.blocks.length);
    for (const text of [
      step.recall,
      step.addition,
      step.observe,
      ...step.steps,
    ])
      assert.ok(text.length > 25);
  });
});
test("Drafts carry forward without overwriting prior work or sharing mutable objects", () => {
  const drafts = { l1: { html: "My project", css: "body{color:navy}" } };
  const next = startingDraft(drafts, "l2");
  assert.deepEqual(next, drafts.l1);
  next.html = "New text";
  assert.equal(drafts.l1.html, "My project");
  drafts.l2 = { html: "", css: "" };
  assert.deepEqual(startingDraft(drafts, "l2"), drafts.l2);
  assert.equal(startingDraft({}, "l1").html, lessons[0].starter);
  assert.equal(startingDraft(drafts, "l5").html, lessons[4].starter);
});

test("The final project has a clean starter and existing drafts take priority", () => {
  const drafts = { l15: { html: "<h1>Unser Schulgarten</h1>", css: "h1{color:green}", pages: [{ name: "kontakt.html", html: "Garten-AG" }] } };
  assert.equal(journey.l15.shared, true);
  assert.equal(journey.l16.shared, false);
  assert.deepEqual(startingDraft(drafts, "l16"), { html: lessons[15].starter, css: "" });
  drafts.l16 = { html: "<h1>Meine Sternwarte</h1>", css: "body{color:navy}" };
  assert.deepEqual(startingDraft(drafts, "l16"), drafts.l16);
});
