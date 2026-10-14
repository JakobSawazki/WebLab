// The exercise workshop: panels with a mini editor and live preview, the home
// suggestion and the collected rules. Exercise data lives in exercises.js.
import { lessons } from "./content.js";
import { lessonAccess } from "./state.js";
import { preview } from "./checks.js";
import { bindCodeEditor } from "./editor.js";
import { esc } from "./html.js";
import { exercises, exerciseId, checkExercise, exerciseTypes, exerciseHints } from "./exercises.js";
const $ = (selector) => document.querySelector(selector);

// Short exercises with their own mini editor and live preview. The code lives
// only in this view; solved exercises are remembered per device under a
// separate key, outside the learning state and its backups.
export const EXERCISE_KEY = "weblab-exercises-v1";
export function solvedExercises() {
  try {
    const list = JSON.parse(localStorage.getItem(EXERCISE_KEY) || "[]");
    return new Set(Array.isArray(list) ? list.filter((x) => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}
export function exerciseProgress(lessonId) {
  const solved = solvedExercises();
  return exercises[lessonId].filter((_, i) => solved.has(exerciseId(lessonId, i))).length;
}
// Home card: the next unsolved exercise of an unlocked lesson, otherwise a
// random solved one to repeat. Links to #lesson/<id>/<number>.
export function practiceSuggestion(state) {
  const solved = solvedExercises(),
    open = lessons.filter((l) => lessonAccess(state, l.id).unlocked && exercises[l.id]),
    all = open.flatMap((l) => exercises[l.id].map((e, i) => ({ l, e, i, done: solved.has(exerciseId(l.id, i)) })));
  if (!all.length) return "";
  const next = all.find((x) => !x.done),
    pick = next || all[Math.floor(Math.random() * all.length)];
  return `<section class="panel practice-suggestion"><p class="eyebrow">Kurz üben · ${next ? "nächste offene Übung" : "zur Wiederholung"}</p><h2>${esc(pick.e.title)}</h2><p>Einheit ${pick.l.id.slice(1).padStart(2, "0")} · ${exerciseTypes[pick.e.type]} · ${esc(pick.e.task)}</p><a class="button secondary" href="#lesson/${pick.l.id}/${pick.i + 1}">Übung öffnen</a></section>`;
}
// The rules of all solved exercises, as a short list to revise from.
export function rememberedRules() {
  const solved = solvedExercises(),
    items = lessons.flatMap((l) =>
      (exercises[l.id] || [])
        .filter((_, i) => solved.has(exerciseId(l.id, i)))
        .map((e) => `<li><span class="muted">Einheit ${l.id.slice(1).padStart(2, "0")}:</span> ${esc(e.remember)}</li>`),
    );
  return `<section class="panel remembered-rules" aria-labelledby="rulesTitle"><h2 class="panel-title" id="rulesTitle">Deine Merksätze</h2>${
    items.length
      ? `<p class="muted">Aus ${items.length} gelösten ${items.length === 1 ? "Übung" : "Übungen"}. Lies sie vor einer Klassenarbeit noch einmal durch.</p><ul>${items.join("")}</ul>`
      : '<p class="muted">Sobald du in einer Einheit eine Übung im Mini-Editor löst, sammelt sich hier ihr Merksatz.</p>'
  }</section>`;
}
export function exercisePanel(l) {
  const list = exercises[l.id];
  if (!list) return "";
  const solved = solvedExercises(),
    done = list.filter((_, i) => solved.has(exerciseId(l.id, i))).length;
  return `<section class="panel exercise-panel" id="exercises" aria-labelledby="exercisesTitle"><p class="eyebrow" id="exerciseProgress">Kurze Übungen · ${done} von ${list.length} gelöst</p><h3 id="exercisesTitle">Üben mit dem Mini-Editor</h3><p class="muted">Jede Übung hat einen eigenen kleinen Editor mit Vorschau. Sie verändert deinen Entwurf nicht und vergibt keine Punkte; gelöste Übungen bleiben auf diesem Gerät markiert.</p>${list
    .map((e, i) => {
      const id = exerciseId(l.id, i),
        isSolved = solved.has(id);
      return `<details class="exercise" data-exercise="${i}"><summary><span class="exercise-type">${exerciseTypes[e.type]}</span> Übung ${i + 1}: ${esc(e.title)}<span class="exercise-solved" ${isSolved ? "" : "hidden"}> · ✓ gelöst</span></summary><p id="exTask${i}">${esc(e.task)}</p><div class="exercise-grid"><div><label class="editor-label" for="exCode${i}">${e.kind === "css" ? "CSS" : "HTML"}</label><div class="code-surface"><pre class="line-numbers" id="exLines${i}" aria-hidden="true"></pre><textarea class="code" id="exCode${i}" aria-describedby="exTask${i} exPos${i} editorHelp" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" rows="${Math.max(5, e.code.split("\n").length + 1)}">${esc(e.code)}</textarea></div><p class="editor-position" id="exPos${i}"></p><div class="actions"><button type="button" class="button" data-exercise-check="${i}">Übung prüfen</button><button type="button" class="button secondary" data-exercise-reset="${i}">Neu beginnen</button></div></div><div class="exercise-preview"><p class="muted">Vorschau</p><iframe title="Vorschau zu Übung ${i + 1}" sandbox=""></iframe></div></div><div class="exercise-result" id="exResult${i}" role="status" aria-atomic="true"></div></details>`;
    })
    .join("")}</section>`;
}
export function bindExercises(l) {
  const list = exercises[l.id];
  if (!list || !$("#exercises")) return;
  document.querySelectorAll(".exercise").forEach((box) => {
    const i = Number(box.dataset.exercise),
      e = list[i],
      code = box.querySelector("textarea"),
      frame = box.querySelector("iframe");
    let pause;
    const show = () => {
      // CSS exercises are previewed on their fixed sample HTML.
      frame.srcdoc = e.kind === "css" ? preview(e.context || "", code.value) : preview(code.value, "");
    };
    const updateEditor = bindCodeEditor(code, box.querySelector(".line-numbers"), box.querySelector(".editor-position"));
    box.addEventListener("toggle", () => {
      if (box.open) {
        updateEditor();
        show();
      }
    });
    code.addEventListener("input", () => {
      clearTimeout(pause);
      pause = setTimeout(show, 300);
    });
    box.querySelector("[data-exercise-check]").onclick = () => {
      const results = checkExercise(e, code.value),
        ok = results.every((r) => r.passed);
      box.querySelector(".exercise-result").innerHTML = `<ul class="criteria">${results.map((r) => `<li class="${r.passed ? "pass" : "fail"}"><span aria-hidden="true">${r.passed ? "✓" : "○"}</span> ${esc(r.label)}<span class="sr-only">${r.passed ? ": erfüllt" : ": noch offen"}</span></li>`).join("")}</ul>${ok ? `<p class="exercise-remember"><strong>Merke:</strong> ${esc(e.remember)}</p>` : `<p>Noch nicht ganz. Vergleiche die offenen Punkte mit deinem Code und der Vorschau.</p><button type="button" class="text-link" data-exercise-hint aria-expanded="false" aria-controls="exHint${i}">Tipp anzeigen</button><p class="exercise-hint" id="exHint${i}" hidden><strong>Tipp:</strong> ${esc(exerciseHints[exerciseId(l.id, i)])}</p>`}`;
      const hintButton = box.querySelector("[data-exercise-hint]");
      if (hintButton)
        hintButton.onclick = () => {
          box.querySelector(".exercise-hint").hidden = false;
          hintButton.setAttribute("aria-expanded", "true");
          hintButton.hidden = true;
        };
      if (!ok) return;
      box.querySelector(".exercise-solved").hidden = false;
      const solved = solvedExercises();
      solved.add(exerciseId(l.id, i));
      try {
        localStorage.setItem(EXERCISE_KEY, JSON.stringify([...solved]));
      } catch {}
      const done = list.filter((_, n) => solved.has(exerciseId(l.id, n))).length;
      $("#exerciseProgress").textContent = `Kurze Übungen · ${done} von ${list.length} gelöst`;
    };
    box.querySelector("[data-exercise-reset]").onclick = () => {
      code.value = e.code;
      updateEditor();
      show();
      box.querySelector(".exercise-result").textContent = "";
      code.focus();
    };
  });
}
