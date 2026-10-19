import test from "node:test";
import assert from "node:assert/strict";
import { lessons } from "../src/content.js";
import { caseStudies, caseStudyPanel } from "../src/case-studies.js";

test("Case studies have a complete decision and transfer task for known lessons", () => {
  for (const [id, guide] of Object.entries(caseStudies)) {
    assert.ok(lessons.some(lesson => lesson.id === id));
    assert.ok(guide.title && guide.intro && guide.transfer);
    assert.ok(guide.cases.length >= 2);
    for (const item of guide.cases) {
      assert.ok(item.title && item.background && item.question && item.answer);
      assert.ok(Array.isArray(item.sources));
      for (const source of item.sources) assert.match(source.url, /^https:\/\//);
    }
  }
  assert.equal(caseStudyPanel("unknown"), "");
});

test("The original school-club scenario escapes HTML and explains the actual project workflow", () => {
  const guide = caseStudies.l5, html = caseStudyPanel("l5");
  assert.ok(guide.code.includes('href="kontakt.html"') && guide.code.includes('href="index.html"'));
  assert.ok(guide.cases[2].answer.includes("entpacke") && guide.cases[2].answer.includes("Dateireitern"));
  assert.ok(guide.intro.includes("keine zusätzlichen Punkte"));
  assert.equal((html.match(/<details /g) || []).length, 3);
  assert.ok(html.includes("&lt;a href=&quot;kontakt.html&quot;&gt;"));
  assert.ok(!html.includes('<a href="kontakt.html">'));
  assert.ok(!html.includes("Nachlesen:"));
});
