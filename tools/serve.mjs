import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..", "dist"),
  port = Number(process.env.PORT || 4188);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
// Nur der lokale Prüfserver bietet die Browser-Testseite an; nie im Build.
const qa = path.resolve(import.meta.dirname, "..", "tests", "browser.html");
http
  .createServer((req, res) => {
    if (req.url === "/__qa") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(qa));
      return;
    }
    let target;
    try {
      target = path.resolve(
        root,
        "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
      );
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    if (!target.startsWith(root + path.sep) && target !== root) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (target === root || target.endsWith(path.sep))
      target = path.join(target, "index.html");
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      res.writeHead(404);
      res.end("Nicht gefunden");
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(target).pipe(res);
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`WebLab: http://127.0.0.1:${port}`),
  );
