import test from "node:test";
import assert from "node:assert/strict";
import { boxDimensions } from "../src/box-model.js";

test("Content-box adds padding and border; border-box includes them in the declared width", () => {
  assert.deepEqual(boxDimensions(16, 4, 12, false), {
    content: 120,
    element: 160,
    space: 184,
  });
  assert.deepEqual(boxDimensions(16, 4, 12, true), {
    content: 80,
    element: 120,
    space: 144,
  });
  assert.deepEqual(boxDimensions(0, 0, 0, true), {
    content: 120,
    element: 120,
    space: 120,
  });
});

test("Every slider combination keeps content visible and the diagram within a narrow lesson panel", () => {
  for (let padding = 0; padding <= 24; padding++)
    for (let border = 0; border <= 8; border++)
      for (let margin = 0; margin <= 24; margin++)
        for (const borderBox of [false, true]) {
          const sizes = boxDimensions(padding, border, margin, borderBox);
          assert.ok(sizes.content >= 56);
          assert.ok(sizes.space <= 232);
          assert.equal(sizes.element, sizes.content + 2 * padding + 2 * border);
          assert.equal(sizes.space, sizes.element + 2 * margin);
          assert.equal(borderBox ? sizes.element : sizes.content, 120);
        }
});
