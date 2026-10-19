import { MAX_PAGES, HTML_MAX, CSS_MAX, validPageName } from "./pages.js";
// Small, dependency-free editing helpers. Student code remains plain text.
export function indentEdit(value, start, end, backwards = false) {
  if (start === end && !backwards)
    return {
      value: value.slice(0, start) + "  " + value.slice(end),
      start: start + 2,
      end: start + 2,
    };
  const from = start === 0 ? 0 : value.lastIndexOf("\n", start - 1) + 1;
  const to = end > start && value[end - 1] === "\n" ? end - 1 : end;
  const block = value.slice(from, to);
  const lines = block.split("\n");
  const shifts = lines.map((line) =>
    backwards ? -(line.match(/^(?: {1,2}|\t)/)?.[0].length || 0) : 2,
  );
  const changed = lines
    .map((line, i) => (backwards ? line.slice(-shifts[i]) : "  " + line))
    .join("\n");
  const delta = shifts.reduce((sum, n) => sum + n, 0);
  return {
    value: value.slice(0, from) + changed + value.slice(to),
    start: Math.max(from, start + shifts[0]),
    end: Math.max(from, end + delta),
  };
}

export function bindCodeEditor(textarea, gutter, status) {
  let escapeTab = false;
  function update() {
    const lines = textarea.value.split("\n").length;
    // Bound gutter rendering for imported documents with many tiny lines.
    gutter.textContent = Array.from(
      { length: Math.min(lines, 10000) },
      (_, i) => i + 1,
    ).join("\n");
    const before = textarea.value.slice(0, textarea.selectionStart);
    const row = before.split("\n").length;
    const column = before.length - before.lastIndexOf("\n");
    status.textContent = `Zeile ${row}, Spalte ${column} · ${lines} Zeilen · UTF-8 beim Export`;
    gutter.scrollTop = textarea.scrollTop;
  }
  textarea.addEventListener("scroll", () => {
    gutter.scrollTop = textarea.scrollTop;
  });
  for (const event of ["input", "click", "keyup", "select"])
    textarea.addEventListener(event, update);
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      escapeTab = true;
      return;
    }
    if (e.key !== "Tab" || e.ctrlKey || e.altKey || e.metaKey) {
      escapeTab = false;
      return;
    }
    if (escapeTab) {
      escapeTab = false;
      return;
    }
    e.preventDefault();
    const result = indentEdit(
      textarea.value,
      textarea.selectionStart,
      textarea.selectionEnd,
      e.shiftKey,
    );
    if (result.value.length > textarea.maxLength) return;
    textarea.setRangeText(result.value, 0, textarea.value.length, "preserve");
    textarea.setSelectionRange(result.start, result.end);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
  update();
  return update;
}

// Eine einzelne HTML-Datei ersetzt immer index.html (wie bisher). Bei mehreren
// HTML-Dateien muss eine index.html heißen; die übrigen werden Unterseiten.
export async function readCodeFiles(files) {
  const result = {};
  const htmlFiles = [], cssFiles = [];
  if (!files.length || files.length > MAX_PAGES + 2)
    throw new Error(
      `Wähle HTML- und CSS-Dateien aus (höchstens ${MAX_PAGES + 1} HTML-Dateien und eine CSS-Datei).`,
    );
  for (const file of files) {
    if (/\.html?$/i.test(file.name)) htmlFiles.push(file);
    else if (/\.css$/i.test(file.name)) cssFiles.push(file);
    else
      throw new Error(
        "Erlaubt sind .html, .htm und .css. Entpacke ZIP-Dateien zuerst.",
      );
  }
  if (cssFiles.length > 1)
    throw new Error("Wähle höchstens eine CSS-Datei aus.");
  if (htmlFiles.length > MAX_PAGES + 1)
    throw new Error(`Wähle höchstens ${MAX_PAGES + 1} HTML-Dateien aus.`);
  const targets = [];
  if (htmlFiles.length === 1) targets.push([htmlFiles[0], "html"]);
  else if (htmlFiles.length > 1) {
    const index = htmlFiles.filter((f) => /^index\.html?$/i.test(f.name));
    if (index.length !== 1)
      throw new Error(
        "Bei mehreren HTML-Dateien muss genau eine index.html heißen. Die anderen werden zu Unterseiten.",
      );
    for (const f of htmlFiles) {
      if (f === index[0]) {
        targets.push([f, "html"]);
        continue;
      }
      const name = f.name.toLowerCase().replace(/\.htm$/, ".html");
      if (!validPageName(name))
        throw new Error(
          `Der Dateiname „${f.name}“ passt nicht: nur Kleinbuchstaben, Ziffern und Bindestrich, zum Beispiel kontakt.html.`,
        );
      if (targets.some(([, kind]) => kind === "page:" + name))
        throw new Error(`Die Datei ${name} wurde doppelt ausgewählt.`);
      targets.push([f, "page:" + name]);
    }
  }
  if (cssFiles.length) targets.push([cssFiles[0], "css"]);
  for (const [file, kind] of targets) {
    const max = kind === "css" ? CSS_MAX : HTML_MAX;
    // textarea/storage limits count UTF-16 units, not bytes. A unit can use up
    // to three UTF-8 bytes (plus an optional BOM). Check text after decoding.
    if (file.size > max * 3 + 3)
      throw new Error(
        `Die Datei ${file.name} ist zu groß (höchstens ${max.toLocaleString("de-DE")} Zeichen).`,
      );
    const text = await file.text();
    if (text.includes("\u0000") || text.includes("\uFFFD"))
      throw new Error(
        "Bitte eine gültige Textdatei mit UTF-8-Kodierung auswählen.",
      );
    const clean = text.replace(/\r\n?/g, "\n");
    if (clean.length > max)
      throw new Error(
        `Die Datei ${file.name} ist zu groß (höchstens ${max.toLocaleString("de-DE")} Zeichen).`,
      );
    if (kind.startsWith("page:")) (result.pages ||= {})[kind.slice(5)] = clean;
    else result[kind] = clean;
  }
  return result;
}
