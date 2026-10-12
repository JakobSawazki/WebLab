import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, ".."),
  out = path.join(root, "dist");
fs.mkdirSync(out, { recursive: true });
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
])
  fs.copyFileSync(path.join(root, f), path.join(out, f));
fs.mkdirSync(path.join(out, "assets"), { recursive: true });
for (const f of ["favicon.svg", "weblab-logo.png", "weblab-hero.png"])
  fs.copyFileSync(path.join(root, "assets", f), path.join(out, "assets", f));
fs.writeFileSync(path.join(out, ".nojekyll"), "");
const allowed = new Set([
  "index.html",
  "styles.css",
  "app.js",
  "content.js",
  "state.js",
  "checks.js",
  "glossary.js",
  "export.js",
  "editor.js",
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
