import test from "node:test";
import assert from "node:assert/strict";
import { specificity } from "../src/selector-helper.js";

test("Specificity counts IDs, classes and element names of simple selectors", () => {
  assert.deepEqual(specificity("p"), [0, 0, 1]);
  assert.deepEqual(specificity(".hinweis"), [0, 1, 0]);
  assert.deepEqual(specificity("#start"), [1, 0, 0]);
  assert.deepEqual(specificity("p.hinweis"), [0, 1, 1]);
  assert.deepEqual(specificity(".hinweis.wichtig"), [0, 2, 0]);
  assert.deepEqual(specificity("ul li"), [0, 0, 2]);
  assert.deepEqual(specificity("nav > a:hover"), [0, 1, 2]);
  assert.deepEqual(specificity('a[href^="https"]'), [0, 1, 1]);
  assert.deepEqual(specificity("h1#start.titel"), [1, 1, 1]);
  assert.equal(specificity("p:not(.hinweis)"), null);
  assert.equal(specificity(""), null);
});
