import test from "node:test";
import assert from "node:assert/strict";
import { glossary } from "../src/glossary.js";

test("Glossary entries are complete, unique and only refer to existing entries", () => {
  const terms = new Set(glossary.map((g) => g.term));
  assert.equal(terms.size, glossary.length, "keine doppelten Begriffe");
  for (const g of glossary) {
    for (const field of ["term", "short", "syntax", "description"])
      assert.ok(typeof g[field] === "string" && g[field].trim(), `${g.term}: ${field}`);
    assert.ok(["html", "css", "begriff"].includes(g.kind), `${g.term}: Bereich`);
    for (const related of g.related || []) assert.ok(terms.has(related), `${g.term} → ${related}`);
  }
});
