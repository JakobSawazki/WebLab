import fs from "node:fs";
import path from "node:path";
import { VERSION } from "../content.js";
import { bundleModules } from "./bundle.mjs";
const root = path.resolve(import.meta.dirname, ".."),
  out = path.join(root, "dist");
fs.mkdirSync(out, { recursive: true });
const modules = [
  "content.js",
  "state.js",
  "checks.js",
  "glossary.js",
  "export.js",
  "editor.js",
  "journey.js",
  "app.js",
];
const bundle = bundleModules(
  Object.fromEntries(
    modules.map((f) => [f, fs.readFileSync(path.join(root, f), "utf8")]),
  ),
);
fs.writeFileSync(path.join(root, "weblab.js"), bundle);
fs.writeFileSync(path.join(out, "weblab.js"), bundle);
for (const f of [
  "index.html",
  "styles.css",
  "app.js",
  "content.js",
  "state.js",
  "checks.js",
  "glossary.js",
  "export.js",
  "editor.js",
  "journey.js",
]) {
  let source = fs.readFileSync(path.join(root, f), "utf8");
  // Version the entire module graph, not only the entry point: school browsers
  // may otherwise retain an earlier, individually cached JavaScript module.
  if (f.endsWith(".js"))
    source = source.replace(
      /(["'])(\.\/[a-z-]+\.js)\1/g,
      (_, quote, file) => `${quote}${file}?v=${VERSION}${quote}`,
    );
  if (f === "index.html")
    source = source
      .replace('href="styles.css"', `href="styles.css?v=${VERSION}"`)
      .replace('src="weblab.js"', `src="weblab.js?v=${VERSION}"`);
  fs.writeFileSync(path.join(out, f), source);
}
fs.mkdirSync(path.join(out, "assets"), { recursive: true });
for (const f of ["favicon.svg", "weblab-logo.png", "weblab-hero.png"])
  fs.copyFileSync(path.join(root, "assets", f), path.join(out, "assets", f));
fs.writeFileSync(path.join(out, ".nojekyll"), "");
const allowed = new Set([
  "weblab.js",
  "index.html",
  "styles.css",
  "app.js",
  "content.js",
  "state.js",
  "checks.js",
  "glossary.js",
  "export.js",
  "editor.js",
  "journey.js",
  ".nojekyll",
  "assets/favicon.svg",
  "assets/weblab-logo.png",
  "assets/weblab-hero.png",
]);
function verify(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink())
      throw new Error("Keine symbolischen Links im Veröffentlichungspaket.");
    if (entry.isDirectory()) verify(file);
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
