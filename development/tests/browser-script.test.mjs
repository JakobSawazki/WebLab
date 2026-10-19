import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

test("The browser QA module compiles before launching a browser", () => {
  const source = fs.readFileSync(new URL("./browser.html", import.meta.url), "utf8");
  const modules = [...source.matchAll(/<script\b[^>]*\btype="module"[^>]*>([\s\S]*?)<\/script\s*>/gi)];
  assert.ok(modules.length > 0, "Browser checks must contain an executable module");
  for (const [, script] of modules) {
    const result = spawnSync(process.execPath, ["--check", "--input-type=module"], {
      input: script,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr || result.error?.message);
  }
});
