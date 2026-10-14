// Interactive selector helper for lesson 10. It works on its own sample
// document and never reads or writes student drafts.
const sample = [
  '<h1 id="start">Schulgarten</h1>',
  "<p>Wir pflanzen gemeinsam.</p>",
  '<p class="hinweis">Bitte Handschuhe mitbringen.</p>',
  "<ul>",
  "  <li>Erde</li>",
  '  <li class="hinweis">Gießkanne nicht vergessen</li>',
  "</ul>",
  '<p class="hinweis wichtig">Treffen am Mittwoch.</p>',
];
const presets = ["p", ".hinweis", "#start", "p.hinweis", "li.hinweis", "ul li", ".hinweis.wichtig", "h1, li"];

// Specificity as (IDs, classes/attributes/pseudo-classes, types) for the
// simple selectors taught in lesson 10. Functional pseudo-classes such as
// :not() or :is() are deliberately not modelled and return null.
export function specificity(selector) {
  const text = selector.trim();
  if (!text || /:(not|is|where|has)\(|::?[\w-]+\(/i.test(text)) return null;
  const strip = text.replace(/\[[^\]]*\]/g, "[]");
  const ids = (strip.match(/#[\w-]+/g) || []).length;
  const classes =
    (strip.match(/\.[\w-]+/g) || []).length +
    (strip.match(/\[\]/g) || []).length +
    (strip.match(/(^|[^:]):(?!:)[\w-]+/g) || []).length;
  const types =
    (strip.match(/(^|[\s>+~])[a-z][\w-]*/gi) || []).length +
    (strip.match(/::[\w-]+/g) || []).length;
  return [ids, classes, types];
}

export function selectorView() {
  return `<details class="selector-helper"><summary>Selektoren ausprobieren: Was trifft mein Selektor?</summary>
    <p>Gib einen CSS-Selektor ein oder wähle ein Beispiel. Getroffene Elemente im Beispielcode werden markiert. Die Spezifität zeigt, wie stark der Selektor bei konkurrierenden Regeln wiegt: IDs, dann Klassen, dann Elementnamen.</p>
    <label for="selectorInput">Dein Selektor</label>
    <input id="selectorInput" value=".hinweis" autocomplete="off" spellcheck="false" autocapitalize="off">
    <div class="selector-presets" role="group" aria-label="Beispielselektoren">${presets.map((p) => `<button type="button" class="button secondary" data-selector="${p}">${p}</button>`).join("")}</div>
    <ol class="selector-sample" aria-label="Beispielcode">${sample.map((line, i) => `<li data-line="${i}"><code></code></li>`).join("")}</ol>
    <p id="selectorResult" role="status" aria-atomic="true"></p>
    <p><strong>Dein Versuch:</strong> Vergleiche <code>.hinweis</code> mit <code>p.hinweis</code>. Welche Zeile fällt weg und warum? Welcher Selektor gewinnt, wenn beide eine Farbe setzen?</p>
  </details>`;
}

export function bindSelectorHelper(root = document) {
  const input = root.querySelector("#selectorInput");
  if (!input) return;
  // An inert document: parsed markup is never rendered or executed.
  const doc = document.implementation.createHTMLDocument("");
  doc.body.innerHTML = sample.join("\n");
  const elements = [...doc.body.querySelectorAll("*")];
  const lineOf = (el) => {
    const index = elements.indexOf(el);
    return [0, 1, 2, 3, 4, 5, 7][index];
  };
  root.querySelectorAll(".selector-sample li").forEach((li) => {
    li.querySelector("code").textContent = sample[Number(li.dataset.line)];
  });
  const update = () => {
    const selector = input.value.trim();
    const lines = root.querySelectorAll(".selector-sample li");
    lines.forEach((li) => li.classList.remove("is-match"));
    const result = root.querySelector("#selectorResult");
    if (!selector) {
      result.textContent = "Gib einen Selektor ein, zum Beispiel p oder .hinweis.";
      return;
    }
    let matches;
    try {
      matches = [...doc.body.querySelectorAll(selector)];
      input.removeAttribute("aria-invalid");
    } catch {
      input.setAttribute("aria-invalid", "true");
      result.textContent =
        "Dieser Selektor ist ungültig. Prüfe Punkt, Raute und Leerzeichen, zum Beispiel .hinweis statt . hinweis.";
      return;
    }
    const matched = new Set(matches.map(lineOf));
    lines.forEach((li) => li.classList.toggle("is-match", matched.has(Number(li.dataset.line))));
    const parts = selector.split(",").map((s) => s.trim()).filter(Boolean);
    const weights = parts
      .map((part) => {
        const s = specificity(part);
        return s ? `${part} → (${s.join(", ")})` : `${part} → nicht berechnet`;
      })
      .join(" · ");
    result.textContent = `${matches.length} ${matches.length === 1 ? "Element" : "Elemente"} getroffen${matched.size ? ` (Zeile ${[...matched].sort((a, b) => a - b).map((n) => n + 1).join(", ")})` : ""}. Spezifität: ${weights}.`;
  };
  input.addEventListener("input", update);
  root.querySelectorAll("[data-selector]").forEach((button) =>
    button.addEventListener("click", () => {
      input.value = button.dataset.selector;
      update();
    }),
  );
  update();
}
