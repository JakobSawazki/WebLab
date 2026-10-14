import { boxModelView, bindBoxModel } from "./box-model.js";
import { selectorView, bindSelectorHelper } from "./selector-helper.js";
import { exercises, normalizeSolved } from "./exercises.js";
import { exerciseProgress, practiceSuggestion, rememberedRules, exercisePanel, bindExercises, solvedExercises, storeSolvedExercises } from "./exercise-panel.js";
import { esc } from "./html.js";
import { debugging } from "./debugging.js";
import { decorateIcons, icon } from "./icons.js";
import { VERSION, groups, lessons, byId } from "./content.js";
import { glossary } from "./glossary.js";
import { guidance } from "./guidance.js";
import {
  STORAGE_KEY,
  blank,
  load,
  validProfile,
  exportBackup,
  importBackup,
  xp,
  nagold,
  complete,
  lessonAccess,
} from "./state.js";
import { checkLesson, preview } from "./checks.js";
import { zipFiles } from "./export.js";
import { bindCodeEditor, readCodeFiles } from "./editor.js";
import { journey, startingDraft } from "./journey.js";
import { nagoldRows } from "./nagold.js";
import { bindProfilePanel } from "./profile.js";
const $ = (s) => document.querySelector(s);
let state,
  storageError = "",
  pendingImport = null,
  pendingExercises = null,
  activeId = "l1",
  timer,
  toastTimer;
try {
  state = load(localStorage);
} catch {
  state = blank();
  storageError =
    "Der vorhandene Lernstand konnte nicht gelesen werden. Er wurde nicht überschrieben. Lade eine Sicherung oder sichere den bisherigen Browserspeicher vor weiteren Änderungen.";
}
let preventSave = Boolean(storageError);
try {
  document.documentElement.dataset.theme =
    localStorage.getItem("weblab-theme-v1") === "light" ? "light" : "dark";
} catch {}
let menuCollapsed = false;
try {
  menuCollapsed = localStorage.getItem("weblab-menu-v1") === "collapsed";
} catch {}
function updateMenu() {
  document.documentElement.dataset.menu = menuCollapsed
    ? "collapsed"
    : "expanded";
  const button = $("#menuButton");
  const label = menuCollapsed ? "Menü ausklappen" : "Menü einklappen";
  button.setAttribute("aria-expanded", String(!menuCollapsed));
  button.setAttribute("aria-label", label);
  button.title = label;
}
updateMenu();
$("#menuButton").onclick = () => {
  setLessonMenu(false);
  menuCollapsed = !menuCollapsed;
  updateMenu();
  try {
    localStorage.setItem(
      "weblab-menu-v1",
      menuCollapsed ? "collapsed" : "expanded",
    );
  } catch {}
};
// The floating lesson list is transient and never shifts the navigation.
let lessonMenuOpen = false;
let lessonMenuCloseTimer;
const lessonMenuGroup = $("#lessonMenuGroup"),
  lessonMenuPanel = $("#lessonMenu"),
  lessonMenuToggle = $("#lessonMenuButton"),
  lessonMenuHover = matchMedia("(min-width: 761px) and (hover: hover) and (pointer: fine)");
function positionLessonMenu() {
  if (!lessonMenuOpen) return;
  const rect = lessonMenuGroup.getBoundingClientRect();
  const left = innerWidth > 760
    ? Math.min(rect.right + 8, innerWidth - lessonMenuPanel.offsetWidth - 12)
    : Math.max(12, (innerWidth - lessonMenuPanel.offsetWidth) / 2);
  const top = Math.max(12, Math.min(rect.top, innerHeight - lessonMenuPanel.offsetHeight - 12));
  lessonMenuPanel.style.left = `${left}px`;
  lessonMenuPanel.style.top = `${top}px`;
}
function updateLessonMenu() {
  const button = $("#lessonMenuButton"),
    menu = $("#lessonMenu"),
    label = lessonMenuOpen
      ? "Lerneinheiten ausblenden"
      : "Lerneinheiten anzeigen";
  button.setAttribute("aria-expanded", String(lessonMenuOpen));
  button.setAttribute("aria-label", label);
  button.title = label;
  menu.hidden = !lessonMenuOpen;
  menu.innerHTML = lessonMenuOpen
    ? lessons
        .map((l) => {
          const number = l.id.slice(1).padStart(2, "0"),
            access = lessonAccess(state, l.id),
            done = state.completed.includes(l.id),
            current = location.hash.split("/")[1] === l.id && location.hash.startsWith("#lesson/"),
            status = !access.unlocked
              ? "is-locked"
              : done
                ? "is-done"
                : "is-next",
            body = `<span class="lesson-menu-num">${number}</span><span class="lesson-menu-title">${esc(l.title)}</span>`;
          return access.unlocked
            ? `<a class="lesson-menu-item ${status}" href="#lesson/${l.id}" aria-label="Einheit ${number}: ${esc(l.title)}${done ? " (abgeschlossen)" : ""}"${current ? ' aria-current="page"' : ""}>${body}</a>`
            : `<span class="lesson-menu-item ${status}" title="Ab ${access.requiredXP} Lernpfad-XP">${body}<span class="sr-only"> – gesperrt, ab ${access.requiredXP} Lernpfad-XP</span></span>`;
        })
        .join("")
    : "";
  positionLessonMenu();
}
function setLessonMenu(open) {
  clearTimeout(lessonMenuCloseTimer);
  if (lessonMenuOpen === open) return;
  lessonMenuOpen = open;
  updateLessonMenu();
}
function scheduleLessonMenuClose() {
  clearTimeout(lessonMenuCloseTimer);
  lessonMenuCloseTimer = setTimeout(() => {
    if (!lessonMenuPanel.contains(document.activeElement)) setLessonMenu(false);
  }, 220);
}
lessonMenuToggle.onclick = (event) => {
  // Pointer entry may have opened the panel just before this click.
  // Keyboard/touch clicks toggle it; desktop mouse clicks keep it open.
  const mouseHover = event.pointerType === "mouse" && lessonMenuHover.matches;
  setLessonMenu(mouseHover || !lessonMenuOpen);
};
lessonMenuGroup.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" && lessonMenuHover.matches) setLessonMenu(true);
});
lessonMenuGroup.addEventListener("pointerleave", (event) => {
  if (event.pointerType === "mouse" && lessonMenuHover.matches) scheduleLessonMenuClose();
});
lessonMenuPanel.addEventListener("pointerenter", () => clearTimeout(lessonMenuCloseTimer));
lessonMenuPanel.addEventListener("pointerleave", (event) => {
  if (event.pointerType === "mouse" && lessonMenuHover.matches) scheduleLessonMenuClose();
});
lessonMenuGroup.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowRight" && event.key !== "ArrowDown") return;
  event.preventDefault();
  setLessonMenu(true);
  lessonMenuPanel.querySelector("a")?.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !lessonMenuOpen) return;
  event.preventDefault();
  setLessonMenu(false);
  lessonMenuToggle.focus();
});
document.addEventListener("pointerdown", (event) => {
  if (!lessonMenuGroup.contains(event.target) && !lessonMenuPanel.contains(event.target))
    setLessonMenu(false);
});
document.addEventListener("focusin", (event) => {
  if (!lessonMenuGroup.contains(event.target) && !lessonMenuPanel.contains(event.target))
    setLessonMenu(false);
});
// Arrow keys move between the unlocked lessons; ArrowLeft returns to the toggle.
lessonMenuPanel.addEventListener("keydown", (event) => {
  const links = [...lessonMenuPanel.querySelectorAll("a")],
    index = links.indexOf(document.activeElement);
  if (!links.length) return;
  const target = {
    ArrowDown: links[(index + 1) % links.length],
    ArrowUp: links[(index - 1 + links.length) % links.length],
    Home: links[0],
    End: links[links.length - 1],
  }[event.key];
  if (target) {
    event.preventDefault();
    target.focus();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    setLessonMenu(false);
    lessonMenuToggle.focus();
  }
});
lessonMenuPanel.addEventListener("click", (event) => {
  if (event.target.closest("a")) setLessonMenu(false);
});
window.addEventListener("resize", () => setLessonMenu(false));
window.addEventListener("scroll", (event) => {
  if (event.target !== lessonMenuPanel) positionLessonMenu();
}, true);
function toast(message) {
  $("#toast").textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($("#toast").textContent = ""), 6500);
}
function save() {
  if (preventSave) {
    toast(storageError);
    return false;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    toast(
      "Der Browserspeicher ist voll oder gesperrt. Bitte sichere deinen Lernstand als Datei.",
    );
    return false;
  }
}
function stats() {
  $("#profileName").textContent = state.profile.name || "Gast";
  $("#profileStats").textContent =
    `${xp(state)} XP · ${nagold(state)} NAG${state.profile.className ? " · " + state.profile.className : ""}`;
}
function download(name, data, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(
      data instanceof Blob ? data : new Blob([data], { type }),
    ),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
function backup() {
  download(
    `WebLab-${state.profile.name || "Gast"}-${new Date().toISOString().slice(0, 10)}.json`,
    // Solved exercise markers ride along as an optional field (still format 3).
    JSON.stringify({ ...exportBackup(state), exercisesSolved: [...solvedExercises()] }, null, 2),
    "application/json",
  );
}
function lessonLink(l, label, classes = "button secondary") {
  const access = lessonAccess(state, l.id);
  return access.unlocked
    ? `<a class="${classes}" href="#lesson/${l.id}">${esc(label)}</a>`
    : `<button type="button" class="${classes} locked-control" disabled aria-label="Einheit ${l.id.slice(1).padStart(2, "0")} gesperrt: ab ${access.requiredXP} Lernpfad-XP">${icon("lock")}<span>${esc(label)}</span><small>ab ${access.requiredXP} XP</small></button>`;
}
function lockedLesson(l) {
  const access = lessonAccess(state, l.id),
    next = byId(access.nextId);
  return `<section class="panel locked-lesson" aria-labelledby="lockedTitle"><div class="lock-mark">${icon("lock")}</div><p class="eyebrow">Einheit ${l.id.slice(1).padStart(2, "0")} · noch gesperrt</p><h2 id="lockedTitle">${esc(l.title)}</h2><p>Diese Einheit wird mit ${access.requiredXP} Lernpfad-XP freigeschaltet. Du hast bisher ${access.earnedXP} Lernpfad-XP verdient.</p><p>Schließe die Einheiten der Reihe nach ab. Jeder Abschluss bringt 100 XP und 5 NAGOLD. Deine Punkte bleiben erhalten und werden nicht ausgegeben.</p><div class="actions">${next ? lessonLink(next, "Weiter mit Einheit " + next.id.slice(1).padStart(2, "0"), "button") : ""}<a class="button secondary" href="#path">Zum Lernpfad</a></div></section>`;
}
function card(l) {
  const done = state.completed.includes(l.id),
    access = lessonAccess(state, l.id),
    recommended = access.nextId === l.id;
  return `<article class="card ${recommended ? "is-next" : ""} ${access.unlocked ? "" : "is-locked"}"><div class="card-top"><span class="card-num">${l.id.slice(1).padStart(2, "0")}</span><span class="badge ${done ? "done" : ""}">${!access.unlocked ? icon("lock") + " Gesperrt" : done ? "Abgeschlossen" : "Dein nächster Schritt"}</span></div><h3>${esc(l.title)}</h3><p>${esc(l.goal)}</p><small>${l.minutes} Min. · 100 XP · 5 NAGOLD</small>${access.unlocked && exercises[l.id] ? `<small class="exercise-count">Übungen: ${exerciseProgress(l.id)} von ${exercises[l.id].length} gelöst</small>` : ""}${lessonLink(l, access.unlocked ? (done ? "Wiederholen" : "Einheit öffnen") : "Noch gesperrt")}</article>`;
}
function overview() {
  const next =
    lessons.find((l) => !state.completed.includes(l.id)) || lessons[0];
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow">BPE2 · Deine eigene Webseite beginnt hier</p><h2>Aus deinen Ideen<br>wird eine Webseite.</h2><p>Lerne HTML und CSS Schritt für Schritt. Probiere deinen Code direkt aus und entwickle am Ende eine eigene statische Webseite.</p><div class="actions"><a class="button" href="#lesson/${next.id}">${state.completed.length ? "Weiterlernen" : "Jetzt starten"} </a><a class="button secondary" href="#lab">Freies Labor</a></div></div><div class="hero-art"><span>&lt;idee&gt; → &lt;webseite&gt;</span></div></section>
 <div class="stats"><div class="stat"><strong>${state.completed.length} / ${lessons.length}</strong><small>Lerneinheiten abgeschlossen</small></div><div class="stat"><strong>${xp(state)}</strong><small>XP gesammelt</small></div><div class="stat"><strong>${nagold(state)}</strong><small>NAGOLD lokal erfasst</small></div><div class="stat"><strong>Dein Projekt</strong><small>Eine eigene statische Webseite</small></div></div>
 ${resumePanel()}${practiceSuggestion(state)}${phaseOverview()}`;
}
function phaseOverview() {
  const descriptions = [
    "Deine ersten Texte und ein vollständiges HTML-Grundgerüst.",
    "Listen, Links, Bilder, Tabellen und Medien ergänzen dein Thema.",
    "Du gestaltest die Inhalte mit einer eigenen CSS-Datei.",
    "Du ordnest, prüfst und präsentierst deine eigene Webseite.",
  ];
  return `<section aria-labelledby="phasesTitle"><div class="section-heading"><div><p class="eyebrow">Vier Etappen zu deiner Webseite</p><h2 id="phasesTitle">Dein Weg im WebLab</h2></div><a href="#path">Alle 16 Einheiten ansehen →</a></div><div class="phase-grid">${groups
    .map((group, index) => {
      const items = lessons.filter((l) => l.group === index),
        done = items.filter((l) => state.completed.includes(l.id)).length;
      return `<article class="panel phase-card"><span class="module-number">${index + 1}</span><h3>${esc(group)}</h3><p>${descriptions[index]}</p><progress max="${items.length}" value="${done}" aria-label="${esc(group)}: ${done} von ${items.length} abgeschlossen"></progress><small>${done} / ${items.length} abgeschlossen</small>${lessonLink(items.find((l) => !state.completed.includes(l.id)) || items[0], done === items.length ? "Etappe wiederholen" : "Etappe öffnen")}</article>`;
    })
    .join("")}</div></section>`;
}
function lessonWorkflow() {
  const steps = [
    ["understand", "Verstehen", "Erklärung und Beispiel"],
    ["practice", "Anwenden", "Code und Live-Vorschau"],
    ["review", "Prüfen", "Rückmeldung und Selbstkontrolle"],
    ["secure", "Sichern", "Notizen und Lernstand"],
  ];
  return `<nav class="lesson-workflow" aria-label="Ablauf dieser Lerneinheit">${steps.map(([id, title, detail], index) => `<a href="#${id}" data-lesson-anchor="${id}"><span>${index + 1}</span><div><strong>${title}</strong><small>${detail}</small></div></a>`).join("")}</nav>`;
}
function resumePanel() {
  const next = lessons.find((l) => !state.completed.includes(l.id));
  return `<section class="panel learning-thread"><p class="eyebrow">Dein roter Faden · ${state.completed.length} / ${lessons.length} abgeschlossen</p><h2>${next ? `Weiter mit Einheit ${lessons.indexOf(next) + 1}: ${esc(next.title)}` : "Deine eigene Webseite ist gewachsen"}</h2><p>Ein Thema, eine Webseite: Du beginnst mit Text, ergänzt Inhalte und gestaltest sie mit CSS. Am Ende testest und präsentierst du dein eigenes Projekt. Arbeite die Einheiten der Reihe nach durch.</p><p class="unlock-rule"><strong>${lessonAccess(state, "l1").earnedXP} Lernpfad-XP verdient.</strong> Einheit 01 ist frei. Jeder erfolgreiche Abschluss bringt 100 XP und schaltet die nächste Einheit frei. Die Punkte werden nicht ausgegeben.</p><a class="button" href="#lesson/${next?.id || "l1"}">${next ? "Nächsten Lernschritt öffnen" : "Grundlagen wiederholen"}</a></section>`;
}
function path() {
  return (
    `<p class="lead">Vom Grundgerüst über Inhalte und Gestaltung bis zur eigenen Veröffentlichung. BPE2 umfasst 14 Unterrichtsstunden; die Zeitangaben sind Richtwerte für Aufgaben, Vertiefung und Projektarbeit.</p>` +
    groups
      .map(
        (g, i) =>
          `<section><div class="section-heading"><div><p class="eyebrow">Lernfortschritt ${i + 1} · ${i < 2 ? "BPE 2.1" : i === 2 ? "BPE 2.2" : "BPE 2.1–2.3"}</p><h2>${g}</h2></div><small>${lessons.filter((l) => l.group === i && state.completed.includes(l.id)).length} / ${lessons.filter((l) => l.group === i).length} abgeschlossen</small></div><div class="cards">${lessons
            .filter((l) => l.group === i)
            .map(card)
            .join("")}</div></section>`,
      )
      .join("")
  );
}
function studio(id, free = false) {
  const l = byId(id),
    d = state.drafts[free ? "lab" : id] || { html: l.starter, css: "" };
  return `<section class="studio" aria-labelledby="studioTitle">
    <div class="studio-header"><h3 id="studioTitle">${free ? "Freies HTML- & CSS-Labor" : "Deine Werkstatt"}</h3><div class="actions"><button class="button secondary" id="runButton">Vorschau aktualisieren</button>${free ? "" : '<button class="button" id="checkButton">Auftrag prüfen</button>'}</div></div>
    <div class="studio-grid"><div class="editors">
      <div class="file-tabs" role="tablist" aria-label="Projektdatei auswählen"><button id="htmlTab" role="tab" aria-selected="true" aria-controls="htmlPane">index.html</button><button id="cssTab" role="tab" aria-selected="false" aria-controls="cssPane" tabindex="-1">style.css</button></div>
      ${["html", "css"].map((kind) => `<div id="${kind}Pane" role="tabpanel" aria-labelledby="${kind}Tab" ${kind === "css" ? "hidden" : ""}><label class="editor-label" for="${kind}Editor">${kind === "html" ? "HTML · Inhalt und Struktur" : "CSS · Gestaltung"}</label><div class="code-surface"><pre class="line-numbers" id="${kind}Lines" aria-hidden="true"></pre><textarea class="code" id="${kind}Editor" aria-describedby="editorHelp ${kind}Position" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" maxlength="${kind === "html" ? 1500000 : 40000}">${esc(d[kind])}</textarea></div><p class="editor-position" id="${kind}Position"></p></div>`).join("")}
      <p class="muted" id="editorHelp">Tab: zwei Leerzeichen einrücken · Umschalt+Tab: ausrücken · Escape, dann Tab: Editor verlassen. Schreibe den Code selbst – wie später in Notepad++.</p>
      <div class="actions"><button id="imageButton" class="button secondary">Bild einfügen</button><input id="imageFile" type="file" accept="image/png,image/jpeg,image/webp" hidden><button id="resetButton" class="button secondary">Startcode laden</button></div>
      <p class="muted">Entwürfe werden auf diesem Gerät gespeichert. Sichere deinen Lernstand regelmäßig im Profil. HTML und CSS bleiben beim Reiterwechsel erhalten.</p>
    </div><div class="preview-area"><div class="preview-tools"><label class="check-row"><input id="livePreview" type="checkbox" checked> Live-Vorschau</label><button class="button secondary" id="largePreviewButton">Webseite groß ansehen</button><label for="previewWidth">Ansicht <select id="previewWidth"><option value="full">Verfügbare Breite</option><option value="360">Handy · 360 px</option></select></label></div><div class="preview-viewport"><iframe id="previewFrame" title="Isolierte Vorschau deiner Webseite" sandbox=""></iframe></div><p id="previewStatus" role="status"></p><p class="muted">HTML beschreibt Inhalte, CSS gestaltet sie. Externe Medien und Skripte sind hier blockiert. Relative Links, Unterseiten und Medien prüfst du nach dem Export im Browser.</p></div></div>
    <dialog id="largePreviewDialog" class="large-preview" aria-labelledby="largePreviewTitle"><div class="studio-header"><h3 id="largePreviewTitle">Deine Webseite im Browser</h3><button class="button secondary" id="closeLargePreview">Zurück zum Code</button></div><iframe id="largePreviewFrame" title="Große Browseransicht deiner Webseite" sandbox=""></iframe><p>Das ist dein aktueller HTML- und CSS-Code als Webseite. Relative Dateien und Links testest du nach dem Export im Projektordner.</p></dialog><div class="panel"><h3>Vom WebLab zum Informatik-Stick</h3><p>Hier übst du mit direkter Vorschau. Für die Klassenarbeit trainierst du auch mit <strong>Notepad++ 7.5.1 auf dem Informatik-Stick</strong>. Dort ist der Informatik-Stick das erlaubte Werkzeug; WebLab gehört nicht dazu.</p><div class="actions"><button class="button secondary" id="htmlExport">index.html</button><button class="button secondary" id="cssExport">style.css</button><button class="button" id="zipExport">Projekt-ZIP herunterladen</button><button class="button secondary" id="codeImportButton">HTML / CSS vom Stick laden</button><input id="codeImportFile" type="file" accept=".html,.htm,.css" multiple hidden></div><p class="muted">Geladene Dateien ersetzen nach Bestätigung nur die ausgewählten Dateitypen im aktuellen Entwurf. Sie werden lokal verarbeitet. Exportnamen: index.html und style.css.</p>
    <details><summary>Notepad++ üben: speichern → Browser → prüfen</summary><ol><li>Lade das Projekt-ZIP herunter und entpacke es in einen eigenen Projektordner auf deinem Stick. index.html und style.css liegen im selben Ordner.</li><li>Starte Notepad++ vom Informatik-Stick. Öffne beide Dateien in Notepad++ und index.html zusätzlich im Browser.</li><li>Ändere deinen Code in Notepad++. Speichere die bearbeitete Datei mit <kbd>Strg</kbd> + <kbd>S</kbd>. Wechsle zum Browser und aktualisiere mit <kbd>F5</kbd>.</li><li>Prüfe Dateinamen und Endungen: index.html, nicht index.html.txt. Verwende UTF-8. Der HTML-Kopf verknüpft die Gestaltung mit <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>.</li><li>Teste auch Links und Bilder im Projektordner. Über „HTML / CSS vom Stick laden“ kannst du deinen Code später wieder in dieser Einheit weiterbearbeiten.</li></ol><p><strong>Transfer-Auftrag:</strong> Ändere eine Überschrift und eine CSS-Farbe ausschließlich in Notepad++. Speichere beide Dateien, aktualisiere den Browser und erkläre, welche Datei welche Änderung bewirkt hat.</p></details>
    </div></section>`;
}
function lessonJourney(l) {
  const step = journey[l.id],
    index = lessons.indexOf(l),
    next = lessons.find((item) => !state.completed.includes(item.id));
  return `<section class="panel learning-thread" aria-label="Dein roter Faden"><p class="eyebrow">Deine eigene Webseite wächst weiter</p><h3>Schritt ${index + 1} von ${lessons.length}: ${esc(step.addition)}</h3><ol class="journey-steps" aria-label="Reihenfolge der Lerneinheiten">${lessons.map((item, i) => `<li>${lessonAccess(state, item.id).unlocked ? `<a href="#lesson/${item.id}" ${item.id === l.id ? 'aria-current="step"' : ""} class="${state.completed.includes(item.id) ? "done" : ""}" aria-label="Einheit ${i + 1}: ${esc(item.title)}${state.completed.includes(item.id) ? ", abgeschlossen" : ""}">${i + 1}</a>` : `<span class="locked-step" role="img" aria-label="Einheit ${i + 1} gesperrt: ab ${i * 100} Lernpfad-XP"><span>${i + 1}</span>${icon("lock")}</span>`}</li>`).join("")}</ol><p><strong>Daran knüpfst du an:</strong> ${esc(step.recall)}</p>${step.previous && !state.completed.includes(step.previous) ? `<p class="teacher-note">Bearbeite zuerst <a href="#lesson/${step.previous}">Einheit ${index}: ${esc(byId(step.previous).title)}</a>. Schließe zuerst diese Einheit ab, um den nächsten Schritt freizuschalten.</p>` : ""}<p>Behalte dein Thema bei und erweitere deine eigene Webseite. Beim ersten Öffnen beginnt diese Einheit mit einer Kopie deines vorherigen Entwurfs, sofern einer vorhanden ist. Bereits bearbeitete Einheiten behalten ihren eigenen Stand.</p>${step.previous && state.drafts[step.previous] ? `<div class="actions"><button class="button secondary" id="takePrevious">Entwurf aus Einheit ${index} übernehmen</button></div>` : ""}${next && next.id !== l.id ? `<a href="#lesson/${next.id}">Zu meinem nächsten offenen Schritt: ${esc(next.title)}</a>` : ""}</section>`;
}
function lessonPractice(l) {
  const step = journey[l.id];
  return `<section class="panel practice-steps" id="practice"><p class="eyebrow">Verstehen → schreiben → ansehen → erklären</p><h3>So gehst du im Editor vor</h3><ol>${step.steps.map((text) => `<li>${esc(text)}</li>`).join("")}</ol><p><strong>Das beobachtest du in deiner Webseite:</strong> ${esc(step.observe)}</p><a class="button secondary" href="#studioTitle" id="jumpEditor" data-editor-jump>Jetzt direkt im Code ausprobieren</a></section>`;
}
function lessonExtension(l) {
  const extra = l.extension;
  if (!extra) return "";
  return `<details class="panel debug-challenge lesson-extension"><summary>${esc(extra.title)}</summary><p>${esc(extra.explanation)}</p><pre><code>${esc(extra.code)}</code></pre><ol>${extra.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol><p><strong>Deine Selbstkontrolle:</strong> ${esc(extra.observe)}</p><a class="button secondary" href="#studioTitle" data-editor-jump>Im eigenen Code ausprobieren</a></details>`;
}
function debugChallenge(l) {
  const exercise = debugging[l.id];
  if (!exercise) return "";
  return `<details class="debug-challenge"><summary>Fehler finden: eine kurze Denkaufgabe</summary><p class="muted">Finde die Ursache, bevor du deinen eigenen Code weiterentwickelst. Diese Übung verändert deinen Entwurf nicht und vergibt keine Zusatzpunkte.</p><pre><code>${esc(exercise.code)}</code></pre><p id="debugQuestion">${esc(exercise.question)}</p><div class="quiz-options" role="group" aria-labelledby="debugQuestion">${exercise.options.map((option, i) => `<button type="button" class="button secondary quiz-option" data-debug-answer="${i}">${esc(option)}</button>`).join("")}</div><p id="debugResult" role="status" aria-atomic="true"></p></details>`;
}
function lessonView(l) {
  const done = state.completed.includes(l.id);
  return `<div class="breadcrumbs"><a href="#path">Lernpfad</a> / ${groups[l.group]} / Einheit ${l.id.slice(1).padStart(2, "0")}</div><p class="eyebrow">${l.minutes} Minuten · 100 XP · 5 NAGOLD</p><h2>${esc(l.title)}</h2><p class="lead">${esc(l.goal)}</p>${lessonWorkflow()}${lessonJourney(l)}<div class="lesson-layout" id="understand"><section class="panel"><h3>1. Verstehen</h3><p>${esc(l.explanation)}</p><h3>Ein Beispiel</h3><pre><code>${esc(l.example)}</code></pre>${debugChallenge(l)}${l.id === "l12" ? boxModelView() : ""}${l.id === "l10" ? selectorView() : ""}</section><aside class="panel"><p class="eyebrow">Dein Praxisauftrag</p><h3>Jetzt bist du dran</h3><p>${esc(l.task)}</p><details><summary>Ein Hinweis hilft mir weiter</summary><p>${esc(l.hint)}</p></details><details class="pitfalls"><summary>Typische Stolpersteine</summary><ul>${guidance[l.id].pitfalls.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></details>${l.id === "l14" ? '<p><a href="https://creativecommons.org/cc-licenses/" target="_blank" rel="noopener">Creative-Commons-Lizenzen</a><br><a href="https://www.gesetze-im-internet.de/ddg/__5.html" target="_blank" rel="noopener">§ 5 DDG: Anbieterinformationen</a></p>' : ""}<p class="teacher-note">Die automatische Prüfung kontrolliert Bausteine. Besprich dein Ergebnis und die Selbstkontrolle mit der Lehrkraft.</p></aside></div>${lessonPractice(l)}${exercisePanel(l)}${lessonExtension(l)}${studio(l.id)}<section class="panel" id="review"><h3>Rückmeldung zum Praxisauftrag</h3><div id="taskFeedback" role="status"><p>Bearbeite den Auftrag und klicke auf „Auftrag prüfen“.</p></div></section><div class="lesson-layout"><section class="panel"><h3>Verständnischeck</h3><p id="quizQuestion">${esc(l.question)}</p><div class="quiz-options" role="group" aria-labelledby="quizQuestion">${l.options.map((o, i) => `<button type="button" class="button secondary quiz-option" data-answer="${i}" aria-pressed="${state.quiz[l.id] && i === l.answer}">${esc(o)}</button>`).join("")}</div><p id="quizResult" role="status">${state.quiz[l.id] ? "✓ Bereits richtig beantwortet." : ""}</p></section><section class="panel"><h3>Meine Selbstkontrolle</h3>${l.checks.map((c, i) => `<label class="check-row"><input type="checkbox" data-check="${i}" ${state.checks[l.id]?.[i] ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}<p class="muted">Mit dem Abschluss dokumentierst du deinen eigenen Lernstand. Das ist keine authentifizierte Bestätigung der Lehrkraft.</p>${done ? "" : '<ul class="completion-status" id="completionStatus" aria-label="Voraussetzungen für den Abschluss"></ul>'}<button class="button" id="completeButton" ${done ? "disabled" : ""}>${done ? "✓ Abgeschlossen" : "Einheit abschließen"}</button><p id="completionResult" role="status"></p></section></div><section class="panel" id="secure"><h3>Deinen Lernweg sichern</h3><p>Halte fest, was du verstanden hast. Lade deinen gesamten Lernstand als JSON-Datei herunter, damit du ihn auch an einem anderen Gerät wieder laden kannst. Das Projekt-ZIP in der Werkstatt enthält deine Webseite.</p><button class="button secondary" id="lessonBackup">Lernstand sichern</button><h3>Meine Notizen zu dieser Einheit</h3><label for="lessonNotes">Was habe ich verstanden, was möchte ich noch fragen?</label><textarea class="notes" id="lessonNotes" maxlength="12000">${esc(state.notes[l.id] || "")}</textarea></section><div class="actions">${lessons.indexOf(l) > 0 ? `<a class="button secondary" href="#lesson/l${lessons.indexOf(l)}">Vorherige Einheit</a>` : ""}${lessons.indexOf(l) < 15 ? `${lessonLink(lessons[lessons.indexOf(l) + 1], "Nächste Einheit", "button")}` : '<a class="button" href="#achievements">Meine Erfolge ansehen</a>'}</div>`;
}
function draft() {
  return (
    state.drafts[activeId] || {
      html: (byId(activeId) || byId("l1")).starter,
      css: "",
    }
  );
}
function capture() {
  if (!$("#htmlEditor")) return;
  state.drafts[activeId] = {
    html: $("#htmlEditor").value,
    css: $("#cssEditor").value,
  };
  save();
}
function run() {
  capture();
  const d = draft();
  $("#previewFrame").srcdoc = preview(d.html, d.css);
  $("#previewStatus").textContent = $("#livePreview").checked
    ? "Vorschau aktuell · aktualisiert nach einer kurzen Schreibpause."
    : "Vorschau manuell aktualisiert · Live-Vorschau ist aus.";
  if (activeId !== "lab") updateCompletionStatus(byId(activeId));
}
function check(l) {
  capture();
  const d = draft(),
    results = checkLesson(l, d.html, d.css, (s) =>
      new DOMParser().parseFromString(s, "text/html"),
    );
  const passed = results.filter((r) => r.passed).length,
    tips = guidance[l.id].tips;
  // Open criteria explain what is missing instead of repeating the label.
  $("#taskFeedback").innerHTML =
    `<p class="criteria-summary"><strong>${passed} von ${results.length} Kriterien erfüllt.</strong></p><ul class="criteria">${results.map((r, i) => `<li class="${r.passed ? "pass" : "fail"}"><span aria-hidden="true">${r.passed ? "✓" : "○"}</span> ${esc(r.label)}<span class="sr-only">${r.passed ? ": erfüllt" : ": noch offen"}</span>${r.passed ? "" : `<small class="criteria-tip">${esc(tips[i])}</small>`}</li>`).join("")}</ul><p>${passed === results.length ? "Alle technischen Kriterien erfüllt. Prüfe zusätzlich Inhalt, Darstellung und Selbstkontrolle." : "Überarbeite die offenen Punkte. Die „Typischen Stolpersteine“ am Praxisauftrag helfen bei der Fehlersuche."}</p>`;
  updateCompletionStatus(l, results);
  return results.every((r) => r.passed);
}
// Shows before the click what the completion still needs; mirrors complete().
function updateCompletionStatus(l, results) {
  const list = $("#completionStatus");
  if (!list) return;
  if (!results) {
    const d = draft();
    results = checkLesson(l, d.html, d.css, (s) =>
      new DOMParser().parseFromString(s, "text/html"),
    );
  }
  const passed = results.filter((r) => r.passed).length,
    checks = l.checks.filter((_, i) => state.checks[l.id]?.[i]).length,
    items = [
      [passed === results.length, `Praxisauftrag: ${passed} von ${results.length} Kriterien erfüllt`],
      [Boolean(state.quiz[l.id]), "Verständnischeck richtig beantwortet"],
      [checks === l.checks.length, `Selbstkontrolle: ${checks} von ${l.checks.length} bestätigt`],
      [validProfile(state.profile.name) && Boolean(state.profile.className.trim()), "Profil mit Kürzel und Klasse gespeichert"],
    ];
  list.innerHTML = items
    .map(([ok, text]) => `<li class="${ok ? "pass" : "open"}"><span aria-hidden="true">${ok ? "✓" : "○"}</span> ${esc(text)}<span class="sr-only">${ok ? ": erledigt" : ": noch offen"}</span></li>`)
    .join("");
}
function files() {
  capture();
  const d = draft(),
    doc = new DOMParser().parseFromString(d.html, "text/html");
  if (!doc.querySelector('link[rel="stylesheet"][href="style.css"]')) {
    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = "style.css";
    doc.head.append(link);
  }
  return {
    "index.html": "<!doctype html>\n" + doc.documentElement.outerHTML,
    "style.css": d.css,
  };
}
function bindStudio(l) {
  $("#runButton").onclick = run;
  $("#largePreviewButton").onclick = () => {
    run();
    $("#largePreviewFrame").srcdoc = preview(draft().html, draft().css);
    $("#largePreviewDialog").showModal();
  };
  $("#closeLargePreview").onclick = () => $("#largePreviewDialog").close();
  // In-page links must not change the hash: the hash is the app route.
  document.querySelectorAll("[data-editor-jump]").forEach((link) => (link.onclick = (e) => {
    e.preventDefault();
    $("#studioTitle").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    $("#htmlEditor").focus({ preventScroll: true });
  }));
  $("#takePrevious")?.addEventListener("click", () => {
    const previous = journey[l.id].previous;
    if (
      !confirm(
        "Den aktuellen Entwurf durch eine Kopie aus der vorherigen Einheit ersetzen? Dein Lernstand wird zuerst als Datei gesichert.",
      )
    )
      return;
    capture();
    backup();
    state.drafts[l.id] = { ...state.drafts[previous] };
    save();
    render();
  });
  const updates = {};
  const selectFile = (kind, focus = false) => {
    for (const type of ["html", "css"]) {
      $("#" + type + "Pane").hidden = type !== kind;
      $("#" + type + "Tab").setAttribute(
        "aria-selected",
        String(type === kind),
      );
      $("#" + type + "Tab").tabIndex = type === kind ? 0 : -1;
    }
    updates[kind]();
    if (focus) $("#" + kind + "Tab").focus();
  };
  for (const kind of ["html", "css"]) {
    updates[kind] = bindCodeEditor(
      $("#" + kind + "Editor"),
      $("#" + kind + "Lines"),
      $("#" + kind + "Position"),
    );
    $("#" + kind + "Tab").onclick = () => selectFile(kind);
    $("#" + kind + "Tab").onkeydown = (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      selectFile(
        e.key === "Home"
          ? "html"
          : e.key === "End"
            ? "css"
            : kind === "html"
              ? "css"
              : "html",
        true,
      );
    };
    $("#" + kind + "Editor").addEventListener("input", () => {
      clearTimeout(timer);
      capture();
      $("#previewStatus").textContent = $("#livePreview").checked
        ? "Vorschau wird aktualisiert …"
        : "Code geändert · Vorschau aktualisieren oder Live-Vorschau einschalten.";
      if ($("#livePreview").checked) timer = setTimeout(run, 500);
    });
  }
  $("#livePreview").onchange = () => {
    clearTimeout(timer);
    if ($("#livePreview").checked) run();
    else
      $("#previewStatus").textContent =
        "Live-Vorschau aus · Änderungen mit „Vorschau aktualisieren“ anzeigen.";
  };
  $("#previewWidth").onchange = () => {
    const width = $("#previewWidth").value;
    $("#previewFrame").style.width = width === "360" ? "360px" : "100%";
  };
  $("#codeImportButton").onclick = () => $("#codeImportFile").click();
  $("#codeImportFile").onchange = async (e) => {
    const input = e.target,
      routeId = activeId;
    const selected = Array.from(input.files);
    input.value = "";
    if (!selected.length) return;
    try {
      const incoming = await readCodeFiles(selected);
      if (routeId !== activeId || !$("#htmlEditor")) return;
      if (
        !confirm(
          `${Object.keys(incoming)
            .map((k) => (k === "html" ? "index.html" : "style.css"))
            .join(
              " und ",
            )} im aktuellen Entwurf ersetzen? Dein bisheriger Lernstand wird zuerst als Sicherung heruntergeladen.`,
        )
      )
        return;
      capture();
      backup();
      for (const [kind, text] of Object.entries(incoming)) {
        $("#" + kind + "Editor").value = text;
        updates[kind]();
      }
      selectFile("html" in incoming ? "html" : "css");
      capture();
      if ($("#livePreview").checked) run();
      else
        $("#previewStatus").textContent =
          "Dateien geladen · Vorschau aktualisieren, um den neuen Code zu sehen.";
      toast(
        "Dateien lokal geladen. Prüfe die Vorschau und deine CSS-Verknüpfung.",
      );
    } catch (error) {
      toast(error.message);
    }
  };
  $("#checkButton")?.addEventListener("click", () => check(l));
  $("#resetButton").onclick = () => {
    if (
      !confirm(
        "Startcode laden? Dein bisheriger Entwurf wird zuerst als Lernstand gesichert.",
      )
    )
      return;
    backup();
    state.drafts[activeId] = { html: l.starter, css: "" };
    save();
    render();
  };
  $("#imageButton").onclick = () => $("#imageFile").click();
  $("#imageFile").onchange = async (e) => {
    const f = e.target.files[0];
    e.target.value = "";
    if (!f) return;
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(f.type) ||
      f.size > 500000
    ) {
      toast("Bitte PNG, JPG oder WebP bis 500 KB auswählen.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const addition = `\n<img src="${reader.result}" alt="Beschreibe hier die Bildinformation" width="640" height="360">\n`;
      const html = $("#htmlEditor").value;
      if (html.length + addition.length > 1500000) {
        toast("Der Entwurf ist zu groß. Verwende ein kleineres Bild.");
        return;
      }
      $("#htmlEditor").value = html.includes("</body>")
        ? html.replace("</body>", addition + "</body>")
        : html + addition;
      updates.html();
      selectFile("html");
      $("#htmlEditor").dispatchEvent(new Event("input", { bubbles: true }));
      toast("Bild lokal eingefügt. Passe Alternativtext und Größe an.");
    };
    reader.readAsDataURL(f);
  };
  $("#htmlExport").onclick = () =>
    download("index.html", files()["index.html"], "text/html;charset=utf-8");
  $("#cssExport").onclick = () =>
    download("style.css", files()["style.css"], "text/css;charset=utf-8");
  $("#zipExport").onclick = () =>
    download("WebLab-Projekt.zip", zipFiles(files()));
  run();
}
function achievements() {
  const rows = nagoldRows(state);
  return `<p class="lead">Dein Fortschritt auf diesem Gerät. XP motivieren; NAGOLD wird mit der Lehrkraft abgeglichen. Ein abgeschlossener Auftrag zählt einmal: 100 XP und zunächst 5 NAGOLD.</p><div class="stats stats-auto"><div class="stat"><strong>${xp(state)}</strong><small>XP einschließlich Altbestand</small></div><div class="stat"><strong>${nagold(state)}</strong><small>NAGOLD</small></div><div class="stat"><strong>${state.completed.length}</strong><small>Abgeschlossene Einheiten</small></div><div class="stat"><strong>${lessons.reduce((n, l) => n + (exercises[l.id] ? exerciseProgress(l.id) : 0), 0)} / ${Object.values(exercises).flat().length}</strong><small>Übungen gelöst (ohne Punkte)</small></div><div class="stat"><strong>${state.completed.includes("l16") ? "★" : "◇"}</strong><small>Eigenes Webprojekt</small></div></div><section class="panel"><h2 class="panel-title">Meine NAGOLD-Tabelle</h2><div class="table-wrap"><table><thead><tr><th>Datum</th><th>Anlass</th><th>Punkte</th></tr></thead><tbody>${rows.map((e) => `<tr><td>${e.at ? esc(new Date(e.at).toLocaleString("de-DE")) : "Altbestand ohne Zeitangabe"}</td><td>${esc(e.purpose)}</td><td>${e.points}</td></tr>`).join("") || '<tr><td colspan="3">Noch keine Einträge.</td></tr>'}</tbody></table></div><div class="actions"><button type="button" class="button secondary" id="editNagoldTable">Tabelle bearbeiten</button><button class="button secondary" id="csvExport">Übersicht als CSV</button></div></section><section class="panel"><h2 class="panel-title">Eintrag nach Absprache mit der Lehrkraft</h2><p class="muted">Manuelle Einträge sind selbst erfasst. Sie ersetzen keine bestätigte Leistungsbewertung.</p><form id="nagoldForm"><label for="nagoldPurpose">Anlass</label><input id="nagoldPurpose" maxlength="160" required><label for="nagoldPoints">NAGOLD-Punkte (−10 bis +5, ohne 0)</label><input id="nagoldPoints" type="number" min="-10" max="5" step="1" value="1" required><div class="actions"><button class="button" type="submit">Eintrag dokumentieren</button></div></form></section>${state.legacy ? '<section class="panel"><h2 class="panel-title">Übernommener Altbestand</h2><p>Deine alten K1-Missionen und ihr XP-Stand bleiben erhalten. Die neue BPE2-Einheit wird separat bearbeitet.</p></section>' : ""}`;
}
function bindAchievements() {
  $("#editNagoldTable").onclick = () => profilePanel.open();
  $("#nagoldForm").onsubmit = (e) => {
    e.preventDefault();
    const points = Number($("#nagoldPoints").value),
      purpose = $("#nagoldPurpose").value.trim();
    if (!validProfile(state.profile.name) || !state.profile.className.trim()) {
      openProfile("Speichere zuerst dein Schülerkürzel und deine Klasse. Danach kannst du NAGOLD eintragen.");
      return;
    }
    if (
      !purpose ||
      !Number.isInteger(points) ||
      !points ||
      points < -10 ||
      points > 5
    ) {
      toast(
        "Bitte gültigen Anlass und ganze Punkte von −10 bis +5 ohne 0 eintragen.",
      );
      return;
    }
    if (state.nagoldEntries.length >= 1000) {
      toast("Maximal 1000 manuelle Einträge.");
      return;
    }
    state.nagoldEntries.push({ purpose, points, at: new Date().toISOString() });
    if (!save()) {
      state.nagoldEntries.pop();
      return;
    }
    render();
    toast("NAGOLD-Eintrag gespeichert.");
  };
  $("#csvExport").onclick = () => {
    const ledger = new Map(nagoldRows(state).filter((row) => row.lessonId).map((row) => [row.lessonId, row]));
    // Text cells are guarded against spreadsheet formulas; numbers stay numbers.
    const cell = (x) =>
      typeof x === "number"
        ? String(x)
        : '"' +
          String(x)
            .replace(/^[=+@\-\t\r]/, "'$&")
            .replaceAll('"', '""') +
          '"';
    const rows = [
      ["Kürzel", "Klasse", "Einheit", "Status", "XP", "NAGOLD"],
      ...lessons.map((l) => [
        state.profile.name,
        state.profile.className,
        l.title,
        state.completed.includes(l.id) ? "selbst abgeschlossen" : "offen",
        state.completed.includes(l.id) ? 100 : 0,
        ledger.get(l.id)?.points || 0,
      ]),
      ...state.nagoldEntries.map((e) => [
        state.profile.name,
        state.profile.className,
        e.purpose,
        e.at,
        0,
        e.points,
      ]),
    ];
    download(
      "WebLab-Lernuebersicht.csv",
      "\uFEFF" + rows.map((r) => r.map(cell).join(";")).join("\r\n"),
      "text/csv;charset=utf-8",
    );
  };
}
function reference() {
  return '<p class="lead">HTML-Elemente, CSS-Eigenschaften und Begriffe schnell nachschlagen.</p><div class="search-row"><input type="search" id="glossarySearch" aria-label="Glossar durchsuchen" placeholder="Begriff, Befehl oder Eigenschaft suchen …"><select id="glossaryKind" aria-label="Glossar filtern"><option value="">Alle Bereiche</option><option value="html">HTML</option><option value="css">CSS</option><option value="begriff">Begriffe</option></select></div><p id="glossaryCount" role="status"></p><h2 class="sr-only">Gefundene Einträge</h2><div id="glossaryResults" class="glossary-grid"></div>';
}
const fold = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("ß", "ss");
function search() {
  const q = fold($("#glossarySearch").value),
    kind = $("#glossaryKind").value,
    rank = (g) => (fold(g.term) === q ? 0 : fold(g.term).startsWith(q) ? 1 : 2),
    items = glossary
      .filter(
        (g) =>
          (!kind || g.kind === kind) &&
          fold(g.term + " " + g.short + " " + g.description).includes(q),
      )
      // Exact and leading term matches first, e.g. "p" finds the p element first.
      .sort((a, b) => (q ? rank(a) - rank(b) : 0));
  $("#glossaryCount").textContent = `${items.length} Einträge`;
  $("#glossaryResults").innerHTML =
    items
      .map(
        (g) =>
          `<article class="card"><span class="badge">${esc(g.kind.toUpperCase())}</span><h3>${esc(g.term)}</h3><p>${esc(g.description)}</p><pre><code>${esc(g.syntax)}</code></pre>${g.related?.length ? `<p class="glossary-related"><span>Siehe auch:</span> ${g.related.map((term) => `<button type="button" class="text-link" data-glossary-term="${esc(term)}">${esc(term)}</button>`).join(" ")}</p>` : ""}</article>`,
      )
      .join("") || "<p>Kein passender Eintrag gefunden.</p>";
}
function render() {
  let focusedTarget = false;
  clearTimeout(timer);
  const route = location.hash.slice(1) || "home",
    requestedLesson = route.startsWith("lesson/")
      ? byId(route.split("/")[1])
      : null,
    l =
      requestedLesson && lessonAccess(state, requestedLesson.id).unlocked
        ? requestedLesson
        : null;
  let title = "Übersicht",
    html = "";
  if (requestedLesson && !l) {
    title = "Einheit noch gesperrt";
    html = lockedLesson(requestedLesson);
  } else if (l) {
    activeId = l.id;
    if (!state.drafts[l.id])
      state.drafts[l.id] = startingDraft(state.drafts, l.id);
    title = l.title;
    html = lessonView(l);
  } else if (route === "path") {
    title = "Dein Lernpfad";
    html = resumePanel() + path();
  } else if (route === "lab") {
    activeId = "lab";
    title = "Freies Labor";
    html = `<p class="lead">Experimentiere frei. Dieser Entwurf wird unabhängig von den Lerneinheiten gespeichert. Für ein größeres Projekt exportierst du HTML und CSS in einen lokalen Projektordner.</p>${studio("l1", true)}`;
  } else if (route === "reference") {
    title = "Nachschlagen";
    html = reference();
  } else if (route === "achievements") {
    title = "Erfolge & NAGOLD";
    html = achievements();
  } else if (route === "notes") {
    title = "Meine Notizen";
    // Locked lessons only appear once they hold notes (e.g. after an import).
    const notable = lessons.filter(
        (l) => lessonAccess(state, l.id).unlocked || state.notes[l.id],
      ),
      hidden = lessons.length - notable.length;
    html = rememberedRules() + notable
      .map(
        (l) =>
          `<section class="panel"><h2 class="panel-title"><a href="#lesson/${l.id}">Einheit ${l.id.slice(1).padStart(2, "0")}: ${esc(l.title)}</a></h2><label for="notes-${l.id}">Deine Notizen</label><textarea class="notes" id="notes-${l.id}" data-note="${l.id}" maxlength="12000">${esc(state.notes[l.id] || "")}</textarea></section>`,
      )
      .join("") +
      (hidden
        ? `<p class="muted">Notizen zu ${hidden} weiteren ${hidden === 1 ? "Einheit erscheinen" : "Einheiten erscheinen"} hier, sobald du sie freischaltest.</p>`
        : "");
  } else {
    html = overview();
    if (route !== "home")
      html =
        '<p role="status">Diese Seite gibt es nicht. Hier findest du den Lernpfad.</p>' +
        html;
  }
  $("#viewTitle").textContent = title;
  document.title = `${title} · WebLab`;
  $("#mainContent").innerHTML = html;
  decorateIcons();
  stats();
  updateLessonMenu();
  document.querySelectorAll(".nav-item").forEach((a) => {
    const current =
      a.hash === location.hash ||
      (requestedLesson && a.hash === "#path") ||
      (!location.hash && a.hash === "#home");
    if (current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if ($("#htmlEditor")) bindStudio(l || byId("l1"));
  if (l) {
    bindBoxModel();
    bindSelectorHelper();
    bindExercises(l);
    // #lesson/<id>/<n> opens exercise n directly (from the home suggestion).
    const target = document.querySelector(`.exercise[data-exercise="${Number(route.split("/")[2]) - 1}"]`);
    if (target) {
      target.open = true;
      target.scrollIntoView({ block: "start" });
      target.querySelector("textarea").focus({ preventScroll: true });
      focusedTarget = true;
    }
    document.querySelectorAll("[data-lesson-anchor]").forEach(
      (link) =>
        (link.onclick = (e) => {
          e.preventDefault();
          const target = document.getElementById(link.dataset.lessonAnchor);
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }),
    );
    document.querySelectorAll("[data-debug-answer]").forEach((button) => {
      button.onclick = () => {
        const selected = Number(button.dataset.debugAnswer);
        document
          .querySelectorAll("[data-debug-answer]")
          .forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
        const exercise = debugging[l.id];
        const result = $("#debugResult");
        result.textContent = exercise.feedback[selected];
        result.className = selected === exercise.answer ? "pass" : "muted";
      };
    });
    updateCompletionStatus(l);
    $("#lessonBackup").onclick = () => {
      capture();
      backup();
    };
    document.querySelectorAll("[data-answer]").forEach(
      (b) =>
        (b.onclick = () => {
          const ok = Number(b.dataset.answer) === l.answer;
          document
            .querySelectorAll("[data-answer]")
            .forEach((option) => option.setAttribute("aria-pressed", String(option === b)));
          if (ok) {
            state.quiz[l.id] = true;
            save();
          }
          const explanation = guidance[l.id].quiz[Number(b.dataset.answer)];
          $("#quizResult").textContent = ok
            ? `✓ ${explanation} Übertrage die Idee auf deinen eigenen Code.`
            : `Noch nicht. ${explanation} Versuche es noch einmal.`;
          updateCompletionStatus(l);
        }),
    );
    document.querySelectorAll("[data-check]").forEach(
      (c) =>
        (c.onchange = () => {
          state.checks[l.id] ||= [];
          state.checks[l.id][Number(c.dataset.check)] = c.checked;
          save();
          updateCompletionStatus(l);
        }),
    );
    $("#lessonNotes").oninput = (e) => {
      state.notes[l.id] = e.target.value;
      save();
    };
    $("#completeButton").onclick = () => {
      if (!state.profile.name || !state.profile.className.trim()) {
        openProfile("Speichere zuerst dein Schülerkürzel und deine Klasse. Danach kannst du die Einheit abschließen.");
        return;
      }
      if (!check(l)) {
        $("#completionResult").textContent =
          "Erfülle zuerst die technischen Kriterien des Praxisauftrags.";
        return;
      }
      if (complete(state, l.id)) {
        const stored = save();
        render();
        if (!stored) {
          $("#completionResult").textContent =
            "Der Abschluss ist nur in diesem Tab erfasst, weil der Browserspeicher nicht beschrieben werden konnte. Lade sofort deinen Lernstand herunter.";
          return;
        }
        $("#completionResult").textContent = journey[l.id].next
          ? "100 XP und 5 NAGOLD einmalig erfasst. Die nächste Einheit ist freigeschaltet. Sichere deinen Lernstand."
          : "100 XP und 5 NAGOLD einmalig erfasst. Du hast alle 16 Einheiten abgeschlossen. Sichere deinen Lernstand.";
        const next = journey[l.id].next;
        if (next) {
          const link = document.createElement("a");
          link.className = "button";
          link.href = `#lesson/${next}`;
          link.textContent = `Weiter: ${byId(next).title}`;
          $("#completionResult").append(document.createElement("br"), link);
          decorateIcons();
        }
        $("#completionResult").tabIndex = -1;
        $("#completionResult").focus({ preventScroll: true });
      } else
        $("#completionResult").textContent =
          "Beantworte den Verständnischeck und bestätige die Selbstkontrolle.";
    };
  }
  if (route === "achievements") bindAchievements();
  if (route === "reference") {
    $("#glossarySearch").oninput = search;
    $("#glossaryKind").onchange = search;
    // "Siehe auch" jumps to the related entry by searching for its name.
    $("#glossaryResults").onclick = (event) => {
      const button = event.target.closest("[data-glossary-term]");
      if (!button) return;
      $("#glossarySearch").value = button.dataset.glossaryTerm;
      $("#glossaryKind").value = "";
      search();
      $("#glossarySearch").focus();
    };
    search();
  }
  document.querySelectorAll("[data-note]").forEach(
    (t) =>
      (t.oninput = () => {
        state.notes[t.dataset.note] = t.value;
        save();
      }),
  );
  return focusedTarget;
}
const profilePanel = bindProfilePanel({
  getState: () => state,
  persistLedger: (changes) => {
    if (preventSave) { toast(storageError); return false; }
    const previous = { nagoldEntries: state.nagoldEntries, nagoldOverrides: state.nagoldOverrides };
    Object.assign(state, changes);
    if (!save()) { Object.assign(state, previous); return false; }
    render();
    return true;
  },
  notify: toast,
});
function openProfile(reason = "") {
  $("#studentName").value = state.profile.name;
  $("#studentClass").value = state.profile.className;
  $("#profileError").textContent = reason;
  profilePanel.refresh();
  $("#profileDialog").showModal();
}
$("#profileButton").onclick = () => openProfile();
$(".skip-link").onclick = (e) => {
  e.preventDefault();
  $("#mainContent").focus();
  $("#mainContent").scrollIntoView();
};
$("#profileForm").onsubmit = (e) => {
  e.preventDefault();
  const name = $("#studentName").value.trim().toUpperCase(),
    className = $("#studentClass").value.trim();
  if (!validProfile(name) || !className) {
    $("#profileError").textContent =
      "Bitte ein Kürzel im Format MUS.MAX und deine Klasse eintragen.";
    return;
  }
  if (state.profile.name && state.profile.name !== name) {
    if (
      !confirm(
        "Für ein anderes Kürzel beginnt ein neuer Lernstand. Dein bisheriger Stand wird zuerst als Datei gesichert.",
      )
    )
      return;
    backup();
  }
  // Build the new state first, so a failed save leaves the old one untouched.
  const before = state,
    newStart = Boolean(state.profile.name && state.profile.name !== name);
  state = newStart ? blank() : { ...state };
  state.profile = { name, className };
  if (!save()) {
    state = before;
    $("#profileError").textContent =
      "Das Profil konnte nicht gespeichert werden. Lade zuerst deinen Lernstand herunter und lade die Seite neu.";
    return;
  }
  $("#profileDialog").close();
  render();
  toast(
    newStart
      ? "Neues Profil angelegt. Dein bisheriger Stand wurde als Datei gesichert."
      : "Profil auf diesem Gerät gespeichert.",
  );
};
document
  .querySelectorAll("[data-close]")
  .forEach((b) => {
    // requestClose() fires "cancel" like Escape, so dialogs can guard drafts.
    b.onclick = () => {
      const dialog = b.closest("dialog");
      if (dialog.requestClose) dialog.requestClose();
      else dialog.close();
    };
  });
$("#themeButton").onclick = () => {
  const theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("weblab-theme-v1", theme);
  } catch {}
};
$("#backupButton").onclick = () => {
  pendingImport = null;
  pendingExercises = null;
  $("#importFile").value = "";
  $("#importSummary").textContent = "";
  $("#confirmImport").hidden = true;
  $("#backupDialog").showModal();
};
$("#exportButton").onclick = backup;
$("#importFile").onchange = async (e) => {
  pendingImport = null;
  pendingExercises = null;
  $("#confirmImport").hidden = true;
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 32000000)
      throw new Error("Diese Datei ist zu groß (maximal 32 MB).");
    const raw = JSON.parse(await file.text());
    pendingImport = importBackup(raw);
    pendingExercises = normalizeSolved(raw.exercisesSolved);
    $("#importSummary").textContent =
      `Bereit: ${pendingImport.profile.name || "ohne Profil"}, Klasse ${pendingImport.profile.className || "offen"}, ${pendingImport.completed.length} Einheiten${pendingExercises ? `, ${pendingExercises.length} gelöste Übungen` : ""}. Dein aktueller Stand wird vor dem Ersetzen gesichert.`;
    $("#confirmImport").hidden = false;
  } catch (err) {
    $("#importSummary").textContent = err.message;
  }
};
$("#confirmImport").onclick = () => {
  if (!pendingImport) return;
  backup();
  state = pendingImport;
  pendingImport = null;
  // Older backups carry no exercise markers; the device's markers stay then.
  if (pendingExercises) storeSolvedExercises(pendingExercises);
  pendingExercises = null;
  preventSave = false;
  const stored = save();
  $("#backupDialog").close();
  render();
  if (stored) toast("Lernstand übernommen.");
};
window.addEventListener("hashchange", () => {
  // render() returns true when it already placed focus on a target.
  if (render()) return;
  $("#mainContent").focus();
  window.scrollTo(0, 0);
});
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    preventSave = true;
    storageError =
      "Ein anderer Tab hat den Lernstand verändert. Sichere deinen Entwurf als Datei und lade die Seite neu, bevor du weiterarbeitest.";
    toast(storageError);
  }
});
// The version is no longer printed; it stays available as a tooltip.
$(".portal-footer").title = "WebLab " + VERSION;
render();
if (storageError) toast(storageError);
