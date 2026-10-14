import fs from "node:fs";
import path from "node:path";
import { VERSION } from "../src/content.js";
import { bundleModules } from "./bundle.mjs";
const root = path.resolve(import.meta.dirname, "../.."),
  out = path.join(root, "dist");
fs.mkdirSync(out, { recursive: true });
const modules = [
  "extensions.js",
  "content.js",
  "guidance.js",
  "state.js",
  "nagold.js",
  "profile.js",
  "checks.js",
  "glossary.js",
  "export.js",
  "editor.js",
  "journey.js",
  "debugging.js",
  "box-model.js",
  "selector-helper.js",
  "html.js",
  "exercises.js",
  "exercise-panel.js",
  "app.js",
  "icons.js",
];
const bundle = bundleModules(
  Object.fromEntries(
    modules.map((f) => [
      f,
      fs.readFileSync(path.join(root, "development", "src", f), "utf8"),
    ]),
  ),
);
fs.writeFileSync(path.join(root, "weblab.js"), bundle);
fs.writeFileSync(path.join(out, "weblab.js"), bundle);
for (const f of ["index.html", "styles.css"]) {
  let source = fs.readFileSync(path.join(root, f), "utf8");
  if (f === "index.html")
    source = source
      .replace('href="styles.css"', `href="styles.css?v=${VERSION}"`)
      .replace('src="weblab.js"', `src="weblab.js?v=${VERSION}"`);
  fs.writeFileSync(path.join(out, f), source);
}
fs.mkdirSync(path.join(out, "assets"), { recursive: true });
for (const f of ["favicon.png", "weblab-logo.png", "weblab-hero.png"])
  fs.copyFileSync(path.join(root, "assets", f), path.join(out, "assets", f));
fs.writeFileSync(path.join(out, ".nojekyll"), "");
const allowed = new Set([
  "weblab.js",
  "index.html",
  "styles.css",
  ".nojekyll",
  "assets/favicon.png",
  "assets/weblab-logo.png",
  "assets/weblab-hero.png",
]);
function verify(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink())
      throw new Error("Keine symbolischen Links im Veröffentlichungspaket.");
    if (entry.isDirectory()) verify(file);
    // Google Drive legt desktop.ini in jedem synchronisierten Ordner an.
    else if (entry.name === "desktop.ini") fs.rmSync(file, { force: true });
    else if (!allowed.has(path.relative(out, file).replaceAll("\\", "/")))
      throw new Error(
        "Unerwartete Datei im dist-Ordner. Vor Veröffentlichung prüfen: " +
          file,
      );
  }
}
verify(out);
console.log(
  "WebLab: statische Veröffentlichung unter dist/ erstellt. Keine Unterrichtsquellen oder Lernstände enthalten.",
);
