import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { bundleModules } from "../tools/bundle.mjs";

test("classic bundle isolates module scopes and shares dependencies", () => {
  const sources = {
    "shared.js": "export const data = {count: 0};",
    "first.js":
      'import { data } from "./shared.js";\nconst local = 3;\ndata.count += local;\nexport function value() { return data.count; }',
    "app.js":
      'import { value } from "./first.js";\nimport { data } from "./shared.js";\nconst local = 7;\nglobalThis.result = [value(), data.count, local];',
  };
  const context = {};
  vm.runInNewContext(bundleModules(sources), context);
  assert.equal(JSON.stringify(context.result), "[3,3,7]");
});

test("bundle rejects missing dependencies and unsupported module syntax", () => {
  assert.throws(
    () => bundleModules({ "app.js": 'import { x } from "./missing.js";' }),
    /Missing module/,
  );
  assert.throws(
    () => bundleModules({ "app.js": "export default 1;" }),
    /Unsupported/,
  );
  assert.throws(
    () => bundleModules({ "app.js": 'import("./later.js");' }),
    /Unsupported/,
  );
});
