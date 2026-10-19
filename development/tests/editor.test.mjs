import test from "node:test";
import assert from "node:assert/strict";
import { indentEdit, readCodeFiles } from "../src/editor.js";
const file = (name, text) => ({
  name,
  size: Buffer.byteLength(text),
  text: async () => text,
});
test("Indentation preserves selected lines and excludes next line at boundary", () => {
  assert.deepEqual(indentEdit("a\nb\nc", 0, 4), {
    value: "  a\n  b\nc",
    start: 2,
    end: 8,
  });
  assert.deepEqual(indentEdit("  a\n b\nc", 0, 7, true), {
    value: "a\nb\nc",
    start: 0,
    end: 4,
  });
  assert.deepEqual(indentEdit("ab", 1, 1), { value: "a  b", start: 3, end: 3 });
  assert.deepEqual(indentEdit("ab", 1, 1, true), {
    value: "ab",
    start: 1,
    end: 1,
  });
  assert.deepEqual(indentEdit("\na", 0, 0, true), {
    value: "\na",
    start: 0,
    end: 0,
  });
});
test("Code import reads HTML/CSS as text and normalizes Windows newlines", async () => {
  assert.deepEqual(
    await readCodeFiles([
      file("seite.HTML", "<h1>Öl</h1>\r\n"),
      file("design.css", "h1 {color:red}"),
    ]),
    { html: "<h1>Öl</h1>\n", css: "h1 {color:red}" },
  );
  assert.deepEqual(await readCodeFiles([file("style.css", "")]), { css: "" });
});
test("Code import rejects ambiguous, oversized, binary and invalid text files", async () => {
  for (const files of [
    [],
    [file("a.html", ""), file("b.htm", "")],
    [file("a.zip", "")],
    [{ ...file("a.css", ""), size: 120004 }],
    [file("a.htm", "\u0000")],
    [file("a.html", "\uFFFD")],
  ])
    await assert.rejects(readCodeFiles(files));
});
