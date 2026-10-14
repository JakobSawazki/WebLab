// Runs the browser checks from development/tests/browser.html without a
// visible window: starts the local test server and a headless Edge or Chrome
// with a fresh profile, reads the result via the DevTools protocol and exits
// with 0 (passed) or 1 (failed). No dependencies; Node 22+ provides WebSocket.
// Usage: npm run qa   (optional: BROWSER=path/to/browser QA_PORT=4199)
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const port = Number(process.env.QA_PORT || 4199);
const debugPort = port + 1;
const candidates = [
  process.env.BROWSER,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const browserPath = candidates.find((file) => fs.existsSync(file));
if (!browserPath) {
  console.error("Kein Edge/Chrome gefunden. Pfad mit BROWSER=… angeben.");
  process.exit(2);
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "weblab-qa-"));
const children = [];
// The browser keeps its profile files open for a moment after it is told to
// quit; wait for the processes and retry removing the temporary profile.
const cleanup = async () => {
  await Promise.all(
    children.map(
      (child) =>
        new Promise((resolve) => {
          if (child.exitCode !== null) return resolve();
          child.once("exit", resolve);
          child.kill();
          setTimeout(resolve, 3000);
        }),
    ),
  );
  for (let i = 0; i < 10; i++) {
    try {
      fs.rmSync(profile, { recursive: true, force: true });
      return;
    } catch {
      await sleep(300);
    }
  }
  console.warn(`Temporäres Profil bleibt liegen: ${profile}`);
};

async function waitFor(url, attempts = 50) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await sleep(200);
  }
  throw new Error(`Nicht erreichbar: ${url}`);
}

try {
  children.push(
    spawn(process.execPath, [path.join(root, "development/tools/serve.mjs")], {
      env: { ...process.env, PORT: String(port) },
      stdio: "ignore",
    }),
  );
  await waitFor(`http://127.0.0.1:${port}/`);
  children.push(
    spawn(
      browserPath,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${profile}`,
        `--remote-debugging-port=${debugPort}`,
        "--window-size=1400,1000",
        `http://127.0.0.1:${port}/__qa`,
      ],
      { stdio: "ignore" },
    ),
  );
  const targets = await (await waitFor(`http://127.0.0.1:${debugPort}/json`)).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("/__qa"));
  if (!page) throw new Error("Prüfseite im Browser nicht gefunden.");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  let id = 0;
  const pending = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    pending.get(message.id)?.(message.result?.result?.value);
  };
  const evaluate = (expression) =>
    new Promise((resolve) => {
      pending.set(++id, resolve);
      socket.send(JSON.stringify({ id, method: "Runtime.evaluate", params: { expression, returnByValue: true } }));
    });
  let status;
  for (let i = 0; i < 300 && !status; i++) {
    await sleep(500);
    status = await evaluate("document.documentElement.dataset.testStatus");
  }
  const text = await evaluate("document.querySelector('#results').textContent");
  socket.close();
  const lines = String(text || "").split("\n");
  console.log(lines.slice(0, 2).join("\n"));
  for (const line of lines.filter((l) => l.startsWith("FAIL"))) console.log(line);
  if (!status) console.log("Zeitüberschreitung: Prüfungen nicht abgeschlossen.");
  await cleanup();
  process.exit(status === "passed" ? 0 : 1);
} catch (error) {
  console.error(error.message);
  await cleanup();
  process.exit(1);
}
