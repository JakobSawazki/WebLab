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

export async function readCodeFiles(files) {
  const result = {};
  if (!files.length || files.length > 2)
    throw new Error(
      "Wähle eine HTML-Datei und/oder eine CSS-Datei aus (höchstens zwei Dateien).",
    );
  for (const file of files) {
    const kind = /\.html?$/i.test(file.name)
      ? "html"
      : /\.css$/i.test(file.name)
        ? "css"
        : null;
    if (!kind)
      throw new Error(
        "Erlaubt sind .html, .htm und .css. Entpacke ZIP-Dateien zuerst.",
      );
    if (kind in result)
      throw new Error(
        "Wähle höchstens eine HTML-Datei und eine CSS-Datei aus.",
      );
    const max = kind === "html" ? 1500000 : 40000;
    if (file.size > max)
      throw new Error(
        `Die ${kind.toUpperCase()}-Datei ist zu groß (maximal ${max / 1000} KB).`,
      );
    const text = await file.text();
    if (text.length > max || text.includes("\u0000") || text.includes("\uFFFD"))
      throw new Error(
        "Bitte eine gültige Textdatei mit UTF-8-Kodierung auswählen.",
      );
    result[kind] = text.replace(/\r\n?/g, "\n");
  }
  return result;
}
