import { phaseArtwork, lessonArtwork } from "./artwork.js";
import { boxModelView, bindBoxModel } from "./box-model.js";
import { caseStudyPanel } from "./case-studies.js";
import { selectorView, bindSelectorHelper } from "./selector-helper.js";
import { exercises, normalizeSolved } from "./exercises.js";
import { exerciseProgress, practiceSuggestion, rememberedRules, exercisePanel, bindExercises, solvedExercises, storeSolvedExercises } from "./exercise-panel.js";
import { esc } from "./html.js";
import { reviewPanel, bindReview } from "./review.js";
import { debugging } from "./debugging.js";
import { decorateIcons, icon } from "./icons.js";
import { VERSION, groups, lessons, byId, labStarter } from "./content.js";
import { versionHistory } from "./version-history.js";
import { bindDisplayOptions } from "./display.js";
import { bindSidebarDivider } from "./sidebar.js";
import { glossary } from "./glossary.js";
import { guidance } from "./guidance.js";
import {
  STORAGE_KEY,
  BACKUP_MAX_BYTES,
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
import { copyDraft, linkReport, MAX_PAGES, HTML_MAX, CSS_MAX, pageStarter, suggestPageName } from "./pages.js";
import { journey, startingDraft } from "./journey.js";
import { nagoldRows } from "./nagold.js";
import { bindProfilePanel } from "./profile.js";
const $ = (s) => document.querySelector(s);
let state,
  storageError = "",
  unreadableStorage = null,
  savedOnDevice = false,
  saveFailed = false,
  pendingImport = null,
  importRead = 0,
  activeId = "l1",
  htmlFile = "index.html",
  timer,
  toastTimer;
try {
  state = load(localStorage);
  savedOnDevice = Boolean(localStorage.getItem(STORAGE_KEY) || localStorage.getItem("weblab-state-v1"));
} catch {
  state = blank();
  try { unreadableStorage = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("weblab-state-v1"); } catch {}
  storageError =
    "Der vorhandene Lernstand konnte nicht gelesen werden. Er wurde nicht überschrieben. Lade eine Sicherung oder sichere den bisherigen Browserspeicher vor weiteren Änderungen.";
}
let preventSave = Boolean(storageError);
let savedSnapshot = JSON.stringify(state);
bindDisplayOptions();
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
bindSidebarDivider();
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
// Temporary view access never changes the XP-based progression in state.js.
let developerMode = false;
function viewLessonAccess(id) {
  const access = lessonAccess(state, id);
  if (!developerMode || access.requiredXP === null || access.unlocked) return access;
  return { ...access, unlocked: true, previewOnly: true };
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
            access = viewLessonAccess(l.id),
            done = state.completed.includes(l.id),
            current = location.hash.split("/")[1] === l.id && location.hash.startsWith("#lesson/"),
            status = !access.unlocked
              ? "is-locked"
              : done
                ? "is-done"
                : access.previewOnly ? "is-preview" : "is-next",
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
    updateStorageStatus();
    return false;
  }
  try {
    const value = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, value);
    savedSnapshot = value;
    savedOnDevice = true;
    saveFailed = false;
    storageError = "";
    unreadableStorage = null;
    updateStorageStatus();
    return true;
  } catch {
    saveFailed = true;
    updateStorageStatus();
    return false;
  }
}
function updateStorageStatus() {
  const blocked = preventSave,
    problem = blocked || saveFailed,
    dirty = problem && JSON.stringify(state) !== savedSnapshot,
    mode = blocked ? "blocked" : saveFailed ? "error" : savedOnDevice ? "saved" : "ready",
    message = blocked
      ? "Automatisches Speichern angehalten."
      : saveFailed
        ? dirty ? "Änderungen noch nicht auf diesem Gerät gespeichert." : "Speichern gerade nicht möglich. Dein bisheriger Stand bleibt erhalten."
        : savedOnDevice ? "Entwürfe, Profil und Lernpfad auf diesem Gerät gespeichert." : "Dein Lernstand wird beim Arbeiten automatisch gespeichert.",
    detail = blocked ? storageError : saveFailed
      ? dirty
        ? "Deine Änderungen sind nur in diesem geöffneten Tab. Lade den aktuellen Lernstand als JSON herunter, bevor du die Seite neu lädst oder schließt. Du kannst das Speichern erneut versuchen."
        : "Der Browserspeicher ist voll oder gesperrt. Eine abgebrochene Änderung musst du im jeweiligen Dialog oder Formular erneut speichern."
      : "";
  const box = $("#storageStatus"),
    text = $("#storageMessage"),
    description = $("#storageDetail");
  box.dataset.state = mode;
  box.dataset.unsaved = String(dirty);
  // Do not repeat the same live announcement on every keystroke.
  if (text.textContent !== message) text.textContent = message;
  if (description.textContent !== detail) description.textContent = detail;
  description.hidden = !detail;
  $("#storageSymbol").textContent = problem ? "!" : savedOnDevice ? "✓" : "○";
  $("#storageActions").hidden = !problem;
  $("#retrySave").hidden = blocked || !dirty;
  $("#storageRaw").hidden = !blocked || !unreadableStorage;
}
$("#retrySave").onclick = () => {
  if (!save()) return;
  const message = $("#storageMessage");
  (message.getClientRects().length ? message : $("#backupButton")).focus({ preventScroll: true });
};
$("#storageMessage").tabIndex = -1;
$("#storageBackup").onclick = () => {
  backup();
  toast("JSON-Download gestartet. Prüfe die Datei im Downloadordner.");
};
$("#storageRaw").onclick = () => {
  if (unreadableStorage)
    download("WebLab-vorhandene-Rohdaten.txt", unreadableStorage);
};
// Keep anchor jumps and keyboard focus below whichever header is sticky.
function updateHeaderOffset(target) {
  const property = target.id === "workspaceHeader" ? "--lesson-header-offset" : "--storage-offset";
  const height = Math.ceil(target.getBoundingClientRect().height);
  document.documentElement.style.setProperty(property, height + "px");
}
const headerOffsetObserver = new ResizeObserver((entries) => {
  for (const { target } of entries) updateHeaderOffset(target);
});
headerOffsetObserver.observe($("#workspaceHeader"));
headerOffsetObserver.observe($("#storageStatus"));
function stats() {
  $("#profileName").textContent = state.profile.name || "Gast";
  $("#profileStats").textContent =
    `${xp(state)} XP · ${nagold(state)} EP${state.profile.className ? " · " + state.profile.className : ""}`;
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
function backup({ beforeImport = false } = {}) {
  const stamp = new Date().toISOString(),
    suffix = beforeImport ? `-vor-Laden-${stamp.slice(11, 23).replace(/[:.]/g, "-")}` : "";
  download(
    `WebLab-${state.profile.name || "Gast"}-${stamp.slice(0, 10)}${suffix}.json`,
    // Solved exercise markers ride along as an optional field (still format 3).
    JSON.stringify({ ...exportBackup(state), exercisesSolved: [...solvedExercises()] }, null, 2),
    "application/json",
  );
}
function lessonLink(l, label, classes = "button secondary") {
  const access = viewLessonAccess(l.id);
  return access.unlocked
    ? `<a class="${classes}" href="#lesson/${l.id}">${esc(label)}</a>`
    : `<button type="button" class="${classes} locked-control" disabled aria-label="Einheit ${l.id.slice(1).padStart(2, "0")} gesperrt: ab ${access.requiredXP} Lernpfad-XP">${icon("lock")}<span>${esc(label)}</span><small>ab ${access.requiredXP} XP</small></button>`;
}
function lockedLesson(l) {
  const access = viewLessonAccess(l.id),
    next = byId(access.nextId);
  return `<section class="panel locked-lesson" aria-labelledby="lockedTitle"><div class="lock-mark">${icon("lock")}</div><p class="eyebrow">Einheit ${l.id.slice(1).padStart(2, "0")} · noch gesperrt</p><h2 id="lockedTitle">${esc(l.title)}</h2><p>Diese Einheit wird mit ${access.requiredXP} Lernpfad-XP freigeschaltet. Du hast bisher ${access.earnedXP} Lernpfad-XP verdient.</p><p>Schließe die Einheiten der Reihe nach ab. Jeder Abschluss bringt 100 XP und 5 EP. Deine Punkte bleiben erhalten und werden nicht ausgegeben.</p><div class="actions">${next ? lessonLink(next, "Weiter mit Einheit " + next.id.slice(1).padStart(2, "0"), "button") : ""}<a class="button secondary" href="#path">Zum Lernpfad</a></div></section>`;
}
function card(l) {
  const done = state.completed.includes(l.id),
    access = viewLessonAccess(l.id),
    recommended = access.nextId === l.id;
  return `<article class="card ${recommended ? "is-next" : ""} ${access.unlocked ? "" : "is-locked"}"><div class="card-top"><span class="card-num">${l.id.slice(1).padStart(2, "0")}</span><span class="badge ${done ? "done" : ""}">${!access.unlocked ? icon("lock") + " Gesperrt" : done ? "Abgeschlossen" : access.previewOnly ? "Entwickler-Modus" : "Dein nächster Schritt"}</span></div><h3>${esc(l.title)}</h3><p>${esc(l.goal)}</p><small>${l.minutes} Min. · 100 XP · 5 EP</small>${access.unlocked && exercises[l.id] ? `<small class="exercise-count">Übungen: ${exerciseProgress(l.id)} von ${exercises[l.id].length} gelöst</small>` : ""}${lessonLink(l, access.unlocked ? (done ? "Wiederholen" : "Einheit öffnen") : "Noch gesperrt")}</article>`;
}
function overview() {
  const next =
    lessons.find((l) => !state.completed.includes(l.id)) || lessons[0];
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow">BPE2 · Gemeinsames Projekt und eigene Webseite</p><h2>Aus deinen Ideen<br>wird eine Webseite.</h2><p>Baue mit deiner Klasse die Webseite „Unser Schulgarten“ Schritt für Schritt auf. Danach entwickelst du eine eigene statische Webseite zu deinem Thema.</p><div class="actions"><a class="button" href="#lesson/${next.id}">${state.completed.length ? "Weiterlernen" : "Jetzt starten"} </a><button class="button secondary" type="button" data-catalog-jump="catalogTitle">Alle Einheiten ansehen</button><a class="hero-lab-link" href="#lab">Freies Labor</a></div></div><div class="hero-art"><span>&lt;idee&gt; → &lt;webseite&gt;</span></div></section>
 <div class="stats"><div class="stat"><strong>${state.completed.length} / ${lessons.length}</strong><small>Lerneinheiten abgeschlossen</small></div><div class="stat"><strong>${xp(state)}</strong><small>XP gesammelt</small></div><div class="stat"><strong>${nagold(state)}</strong><small>Erfahrungspunkte (EP)</small></div><div class="stat"><strong>Dein Projekt</strong><small>Eine eigene statische Webseite</small></div></div>
 ${lessonCatalog()}${resumePanel()}${practiceSuggestion(state)}`;
}
const phaseDescriptions = [
  "Deine ersten Texte und ein vollständiges HTML-Grundgerüst.",
  "Listen, Links, Bilder, Tabellen und Medien ergänzen die Schulgartenseite.",
  "Du gestaltest die Inhalte mit einer eigenen CSS-Datei.",
  "Du prüfst die gemeinsame Webseite und entwickelst dann dein eigenes Projekt.",
];
function artworkImage(file, priority = false) {
  return `<div class="phase-art"><img src="assets/${file}" alt="" width="960" height="540" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
}
function lessonCatalogCard(l) {
  const access = viewLessonAccess(l.id),
    done = access.unlocked && state.completed.includes(l.id),
    isNext = access.nextId === l.id,
    number = l.id.slice(1).padStart(2, "0");
  const status = !access.unlocked ? "Gesperrt" : done ? "Abgeschlossen" : isNext ? "Als Nächstes" : access.previewOnly ? "Entwickler-Modus" : "Verfügbar";
  const action = access.unlocked
    ? `<a class="button ${isNext ? "" : "secondary"}" href="#lesson/${l.id}" aria-label="${done ? "Wiederholen" : "Einheit öffnen"}: Einheit ${number} – ${esc(l.title)}">${done ? "Wiederholen" : "Einheit öffnen"}</a>`
    : `<p class="catalog-lock">${icon("lock")} Ab ${access.requiredXP} Lernpfad-XP</p>`;
  return `<article class="catalog-card ${isNext ? "is-next" : ""} ${access.unlocked ? "" : "is-locked"}">${artworkImage(lessonArtwork[l.id] ?? phaseArtwork[l.group])}<div class="catalog-copy"><div class="catalog-meta"><span class="catalog-number">Einheit ${number}</span><span class="badge ${done ? "done" : ""}">${status}</span></div><h4>${esc(l.title)}</h4><p class="catalog-goal">${esc(l.goal)}</p><small>${l.minutes} Min. · 100 XP · 5 EP</small>${action}</div></article>`;
}
function lessonCatalog() {
  return `<section class="lesson-catalog" aria-labelledby="catalogTitle"><div class="section-heading"><div><p class="eyebrow">BPE2 · 4 Etappen · ${lessons.length} Lerneinheiten</p><h2 id="catalogTitle" tabindex="-1">Alle Lerneinheiten</h2></div><a href="#path">Zum Lernpfad →</a></div><p class="lead">Hier siehst du, was dich erwartet. Schließe eine Einheit ab, um die nächste freizuschalten.</p><nav class="catalog-nav" aria-label="Etappen der Kartenübersicht">${groups.map((group, i) => `<button class="button secondary" type="button" data-catalog-jump="catalog-phase-${i + 1}">${esc(group)}</button>`).join("")}</nav>${groups.map((group, index) => {
    const items = lessons.filter((l) => l.group === index),
      done = items.filter((l) => state.completed.includes(l.id)).length;
    return `<section class="catalog-phase" aria-labelledby="catalog-phase-${index + 1}"><div class="catalog-heading"><span class="catalog-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><h3 id="catalog-phase-${index + 1}" tabindex="-1">${esc(group)}</h3><small>${done} / ${items.length} abgeschlossen</small></div><div class="catalog-grid">${items.map(lessonCatalogCard).join("")}</div></section>`;
  }).join("")}</section>`;
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
  return `<section class="panel learning-thread"><p class="eyebrow">Dein roter Faden · ${state.completed.length} / ${lessons.length} abgeschlossen</p><h2>${next ? `Weiter mit Einheit ${lessons.indexOf(next) + 1}: ${esc(next.title)}` : "Vom Schulgarten zur eigenen Webseite"}</h2><p>In Einheit 01 bis 15 baut die Klasse dieselbe Schulgartenseite. Ihr vergleicht eure Ergebnisse und klärt offene Fragen. In Einheit 16 entwickelst du deine eigene Webseite.</p><p class="unlock-rule"><strong>${lessonAccess(state, "l1").earnedXP} Lernpfad-XP verdient.</strong> Einheit 01 ist frei. Jeder erfolgreiche Abschluss bringt 100 XP und schaltet die nächste Einheit frei. Die Punkte werden nicht ausgegeben.</p><a class="button" href="#lesson/${next?.id || "l1"}">${next ? "Nächsten Lernschritt öffnen" : "Grundlagen wiederholen"}</a></section>`;
}
function path() {
  return (
    `<p class="lead">Vom Grundgerüst über Inhalte und Gestaltung bis zur eigenen Veröffentlichung. BPE2 umfasst 14 Unterrichtsstunden; die Zeitangaben sind Richtwerte für Aufgaben, Vertiefung und Projektarbeit.</p>` +
    groups
      .map(
        (g, i) =>
          `<section class="path-phase" aria-labelledby="path-phase-${i + 1}"><div class="panel chapter-plate"><div class="chapter-copy"><p class="eyebrow">Etappe ${i + 1} / ${groups.length} · ${i < 2 ? "BPE 2.1" : i === 2 ? "BPE 2.2" : "BPE 2.1–2.3"}</p><h2 id="path-phase-${i + 1}">${esc(g)}</h2><p>${phaseDescriptions[i]}</p><small>${lessons.filter((l) => l.group === i && state.completed.includes(l.id)).length} / ${lessons.filter((l) => l.group === i).length} abgeschlossen</small></div>${artworkImage(phaseArtwork[i])}</div><div class="cards">${lessons
            .filter((l) => l.group === i)
            .map(card)
            .join("")}</div></section>`,
      )
      .join("")
  );
}
function studio(id, free = false) {
  const d = draftFor(free ? "lab" : id);
  return `<section class="studio" aria-labelledby="studioTitle">
    <div class="studio-header"><h3 id="studioTitle">${free ? "Freies HTML- & CSS-Labor" : "Deine Werkstatt"}</h3><div class="actions"><button class="button secondary" id="runButton">Vorschau aktualisieren</button>${free ? "" : '<button class="button" id="checkButton">Auftrag prüfen</button>'}</div></div>
    <div class="studio-grid"><div class="editors">
      <div class="file-bar"><div class="file-tabs" role="tablist" aria-label="Projektdatei auswählen" id="fileTabs">${fileTabs(d)}</div><div class="page-actions"><button type="button" class="button secondary" id="addPage">+ Unterseite</button><button type="button" class="button secondary" id="removePage" hidden>Seite entfernen</button></div></div>
      ${["html", "css"].map((kind) => `<div id="${kind}Pane" role="tabpanel" aria-labelledby="${kind}Tab" ${kind === "css" ? "hidden" : ""}><label class="editor-label" for="${kind}Editor">${kind === "html" ? 'HTML · Inhalt und Struktur von <span id="htmlFileName">index.html</span>' : "CSS · Gestaltung für alle Seiten"}</label><div class="code-surface"><pre class="line-numbers" id="${kind}Lines" aria-hidden="true"></pre><textarea class="code" id="${kind}Editor" aria-describedby="editorHelp ${kind}Position" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" maxlength="${kind === "html" ? HTML_MAX : CSS_MAX}">${esc(d[kind])}</textarea></div><p class="editor-position" id="${kind}Position"></p></div>`).join("")}
      <p class="muted" id="editorHelp">Tab: zwei Leerzeichen einrücken · Umschalt+Tab: ausrücken · Escape, dann Tab: Editor verlassen. Schreibe den Code selbst – wie später in Notepad++.</p>
      <div class="actions"><button id="imageButton" class="button secondary">Bild einfügen</button><input id="imageFile" type="file" accept="image/png,image/jpeg,image/webp" hidden><button id="resetButton" class="button secondary">Startcode laden</button></div>
      <p class="muted">Entwürfe werden auf diesem Gerät gespeichert. Sichere deinen Lernstand regelmäßig im Profil. HTML und CSS bleiben beim Reiterwechsel erhalten.</p>
    </div><div class="preview-area"><div class="preview-tools"><label class="check-row"><input id="livePreview" type="checkbox" checked> Live-Vorschau</label><button class="button secondary" id="largePreviewButton">Webseite groß ansehen</button><label for="previewWidth">Ansicht <select id="previewWidth"><option value="full">Verfügbare Breite</option><option value="360">Handy · 360 px</option></select></label></div><div class="preview-viewport"><iframe id="previewFrame" title="Isolierte Vorschau deiner Webseite" sandbox=""></iframe></div><p id="previewStatus" role="status"></p><details class="link-report" open><summary>Verweise zwischen deinen Seiten</summary><div id="linkReport" role="status"></div></details><p class="muted">HTML beschreibt Inhalte, CSS gestaltet sie. Externe Medien und Skripte sind hier blockiert. Die Vorschau zeigt die gewählte Seite; Klicks auf Links öffnen hier keine andere Seite. Ob Links, Bilder und Medien im Projektordner wirklich funktionieren, prüfst du nach dem Export im Browser.</p></div></div>
    <dialog id="largePreviewDialog" class="large-preview" aria-labelledby="largePreviewTitle"><div class="studio-header"><h3 id="largePreviewTitle">Deine Webseite im Browser</h3><button class="button secondary" id="closeLargePreview">Zurück zum Code</button></div><iframe id="largePreviewFrame" title="Große Browseransicht deiner Webseite" sandbox=""></iframe><p>Das ist dein aktueller HTML- und CSS-Code als Webseite. Relative Dateien und Links testest du nach dem Export im Projektordner.</p></dialog><div class="panel"><h3>Mit Notepad++ weiterarbeiten</h3><p>Öffne deine HTML- und CSS-Dateien in <strong>Notepad++</strong> und prüfe das Ergebnis im Browser.</p><p><strong>In der Schule:</strong> Verwende das bereits vorhandene Notepad++. <strong>Zu Hause:</strong> Die aktuelle Version für Windows kannst du kostenlos installieren: <a href="https://notepad-plus-plus.org/downloads/" target="_blank" rel="noopener noreferrer">Offizielle Notepad++-Downloads</a>.</p><details><summary>Option: Notepad++ ohne Installation starten</summary><p>Wähle auf der Downloadseite die aktuelle portable ZIP-Ausgabe, entpacke sie vollständig in einen Ordner und öffne darin <code>notepad++.exe</code>. Wenn Notepad++ bereits vorhanden ist, brauchst du keinen zusätzlichen Download.</p></details><div class="actions"><button class="button secondary" id="htmlExport">index.html speichern</button><button class="button secondary" id="cssExport">style.css</button><button class="button" id="zipExport">Projekt-ZIP herunterladen</button><button class="button secondary" id="codeImportButton">HTML / CSS laden</button><input id="codeImportFile" type="file" accept=".html,.htm,.css" multiple hidden></div><p class="muted">Geladene Dateien ersetzen nach Bestätigung nur die ausgewählten Dateien im aktuellen Entwurf. Sie werden lokal verarbeitet. Wählst du mehrere HTML-Dateien, muss eine index.html heißen; die anderen werden Unterseiten. Das Projekt-ZIP enthält index.html, style.css und alle Unterseiten.</p>
    <details><summary>Notepad++ üben: speichern → Browser → prüfen</summary><ol><li>Lade das Projekt-ZIP herunter und entpacke es in einen eigenen Projektordner. index.html, style.css und deine Unterseiten liegen im selben Ordner.</li><li>Öffne index.html, style.css und deine Unterseiten in Notepad++. Öffne index.html zusätzlich im Browser.</li><li>Ändere deinen Code in Notepad++. Speichere die bearbeitete Datei mit <kbd>Strg</kbd> + <kbd>S</kbd>. Wechsle zum Browser und aktualisiere mit <kbd>F5</kbd>.</li><li>Prüfe Dateinamen und Endungen: index.html, nicht index.html.txt. Verwende UTF-8. Der HTML-Kopf verknüpft die Gestaltung mit <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>.</li><li>Teste auch Links und Bilder im Projektordner. Über „HTML / CSS laden“ kannst du deinen Code später wieder in dieser Einheit weiterbearbeiten.</li></ol><p><strong>Transfer-Auftrag:</strong> Ändere eine Überschrift und eine CSS-Farbe ausschließlich in Notepad++. Speichere beide Dateien, aktualisiere den Browser und erkläre, welche Datei welche Änderung bewirkt hat.</p></details>
    </div></section>`;
}
function lessonJourney(l) {
  const step = journey[l.id],
    index = lessons.indexOf(l),
    next = lessons.find((item) => !state.completed.includes(item.id));
  return `<section class="panel learning-thread" aria-label="Dein roter Faden"><p class="eyebrow">${step.shared ? "Gemeinsames Projekt · Unser Schulgarten" : "Abschlussprojekt · Deine eigene Webseite"}</p><h3>Schritt ${index + 1} von ${lessons.length}: ${esc(step.addition)}</h3><ol class="journey-steps" aria-label="Reihenfolge der Lerneinheiten">${lessons.map((item, i) => `<li>${viewLessonAccess(item.id).unlocked ? `<a href="#lesson/${item.id}" ${item.id === l.id ? 'aria-current="step"' : ""} class="${state.completed.includes(item.id) ? "done" : ""}" aria-label="Einheit ${i + 1}: ${esc(item.title)}${state.completed.includes(item.id) ? ", abgeschlossen" : ""}">${i + 1}</a>` : `<span class="locked-step" role="img" aria-label="Einheit ${i + 1} gesperrt: ab ${i * 100} Lernpfad-XP"><span>${i + 1}</span>${icon("lock")}</span>`}</li>`).join("")}</ol><p><strong>Daran knüpfst du an:</strong> ${esc(step.recall)}</p>${!developerMode && step.previous && !state.completed.includes(step.previous) ? `<p class="teacher-note">Bearbeite zuerst <a href="#lesson/${step.previous}">Einheit ${index}: ${esc(byId(step.previous).title)}</a>. Schließe zuerst diese Einheit ab, um den nächsten Schritt freizuschalten.</p>` : ""}<p>${step.shared ? "Wir erweitern die Schulgartenseite gemeinsam. Eine neue Einheit übernimmt deinen bisherigen Schulgarten-Entwurf, sofern einer vorliegt." : "Für dein eigenes Thema beginnt die Werkstatt mit einem neuen HTML-Grundgerüst. Ein bereits gespeicherter Entwurf dieser Einheit bleibt erhalten."}</p>${step.shared && step.previous && state.drafts[step.previous] ? `<div class="actions"><button class="button secondary" id="takePrevious">Entwurf aus Einheit ${index} übernehmen</button></div>` : ""}${next && next.id !== l.id ? `<a href="#lesson/${next.id}">Zu meinem nächsten offenen Schritt: ${esc(next.title)}</a>` : ""}</section>`;
}
function lessonPractice(l) {
  const step = journey[l.id];
  return `<section class="panel practice-steps" id="practice"><p class="eyebrow">Verstehen → schreiben → ansehen → erklären</p><h3>${step.shared ? "Gemeinsamer Arbeitsauftrag" : "So gehst du im Editor vor"}</h3>${l.id === "l1" ? '<p>Im Editor tippst du den Code. Die Live-Vorschau zeigt dir beim Tippen, was der Browser daraus macht.</p>' : ""}<ol>${step.steps.map((text) => `<li>${esc(text)}</li>`).join("")}</ol>${step.material ? `<p><a href="${step.material[0]}" download>${step.material[1]}</a></p>` : ""}${step.shared ? "" : `<p>${esc(step.observe)}</p>`}<a class="button secondary" href="#studioTitle" id="jumpEditor" data-editor-jump>Jetzt direkt im Code ausprobieren</a>${l.id === "l1" ? `<details><summary>Ein Hinweis hilft mir weiter</summary><p>${esc(l.hint)}</p></details>` : ""}</section>`;
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
function lessonPitfalls(l) {
  return `<details class="pitfalls"><summary>Typische Stolpersteine</summary><ul>${guidance[l.id].pitfalls.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></details>`;
}
function firstLessonIntro(l) {
  return `<section class="panel" id="understand" aria-labelledby="first-html-title">
    <h3 id="first-html-title">Deine erste Zeile HTML</h3>
    <p>${esc(journey[l.id].recall)}</p>
    <p>${esc(l.explanation)}</p>
    <div class="beginner-example">
      <div><h4>Das steht im Code</h4><pre><code>&lt;h1&gt;Unser Schulgarten&lt;/h1&gt;</code></pre></div>
      <div><h4>Das siehst du im Browser</h4><div class="beginner-browser"><strong>Unser Schulgarten</strong></div></div>
    </div>
    <p><code>&lt;h1&gt;</code> ist der Start-Tag für die Hauptüberschrift. <code>&lt;/h1&gt;</code> ist der End-Tag. Der Text dazwischen ist deine Überschrift. Das Ganze heißt HTML-Element.</p>
  </section>`;
}
function lessonUnderstanding(l) {
  if (l.id === "l1") return firstLessonIntro(l);
  return `<div class="lesson-layout" id="understand"><section class="panel"><h3>1. Verstehen</h3>${l.explanation.split("\n\n").map((part) => `<p>${esc(part)}</p>`).join("")}<h3>Ein Beispiel</h3><pre><code>${esc(l.example)}</code></pre>${debugChallenge(l)}${l.id === "l12" ? boxModelView() : ""}${l.id === "l10" ? selectorView() : ""}</section><aside class="panel"><p class="eyebrow">Dein Praxisauftrag</p><h3>Jetzt bist du dran</h3><p>${esc(journey[l.id].shared ? journey[l.id].addition : l.task)}</p>${journey[l.id].shared ? '<p><a href="#practice" data-lesson-anchor="practice">Zum gemeinsamen Arbeitsauftrag</a></p>' : ""}<details><summary>Ein Hinweis hilft mir weiter</summary><p>${esc(l.hint)}</p></details>${lessonPitfalls(l)}${l.id === "l14" ? '<p><a href="https://creativecommons.org/cc-licenses/" target="_blank" rel="noopener">Creative-Commons-Lizenzen</a><br><a href="https://www.gesetze-im-internet.de/ddg/__5.html" target="_blank" rel="noopener">§ 5 DDG: Anbieterinformationen</a></p>' : ""}<p class="teacher-note">Die automatische Prüfung kontrolliert Bausteine. Besprich dein Ergebnis und die Selbstkontrolle mit der Lehrkraft.</p></aside></div>`;
}
function lessonView(l) {
  const done = state.completed.includes(l.id),
    first = l.id === "l1",
    extras = `${exercisePanel(l)}${lessonExtension(l)}${caseStudyPanel(l.id)}`;
  return `<section class="panel chapter-plate lesson-cover" aria-labelledby="lessonTitle"><div class="chapter-copy"><p class="eyebrow">Etappe ${l.group + 1} / ${groups.length} · Einheit ${l.id.slice(1).padStart(2, "0")}</p><h2 id="lessonTitle">${esc(l.title)}</h2><p class="lead">${esc(l.goal)}</p><small>${l.minutes} Minuten · 100 XP · 5 EP</small></div>${artworkImage(lessonArtwork[l.id] ?? phaseArtwork[l.group], true)}</section>${lessonWorkflow()}${first ? "" : lessonJourney(l)}${lessonUnderstanding(l)}${lessonPractice(l)}${first ? "" : extras}${studio(l.id)}<section class="panel" id="review"><h3>Rückmeldung zum Praxisauftrag</h3><div id="taskFeedback" role="status"><p>Bearbeite den Auftrag und klicke auf „Auftrag prüfen“.</p></div>${journey[l.id].shared ? `<details class="class-review"><summary>Ergebnissicherung in der Klasse</summary><p>${esc(journey[l.id].observe)}</p><p>Notiere unten bei „Meine Notizen“ euer Ergebnis und eine Frage, die noch offen ist.</p></details>` : ""}</section><div class="lesson-layout"><section class="panel"><h3>Verständnischeck</h3><p id="quizQuestion">${esc(l.question)}</p><div class="quiz-options" role="group" aria-labelledby="quizQuestion">${l.options.map((o, i) => `<button type="button" class="button secondary quiz-option" data-answer="${i}" aria-pressed="${state.quiz[l.id] && i === l.answer}">${esc(o)}</button>`).join("")}</div><p id="quizResult" role="status">${state.quiz[l.id] ? "✓ Bereits richtig beantwortet." : ""}</p></section><section class="panel"><h3>Meine Selbstkontrolle</h3>${l.checks.map((c, i) => `<label class="check-row"><input type="checkbox" data-check="${i}" ${state.checks[l.id]?.[i] ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}<p class="muted">Mit dem Abschluss dokumentierst du deinen eigenen Lernstand. Das ist keine authentifizierte Bestätigung der Lehrkraft.</p>${done ? "" : '<ul class="completion-status" id="completionStatus" aria-label="Voraussetzungen für den Abschluss"></ul>'}<button class="button" id="completeButton" ${done || developerMode ? "disabled" : ""}>${done ? "✓ Abgeschlossen" : developerMode ? "Abschluss im Entwicklermodus pausiert" : "Einheit abschließen"}</button><p id="completionResult" role="status"></p></section></div><section class="panel" id="secure"><h3>Deinen Lernweg sichern</h3><p>Halte fest, was du verstanden hast. Lade deinen gesamten Lernstand als JSON-Datei herunter, damit du ihn auch an einem anderen Gerät wieder laden kannst. Das Projekt-ZIP in der Werkstatt enthält deine Webseite.</p><button class="button secondary" id="lessonBackup">Lernstand sichern</button><h3>Meine Notizen zu dieser Einheit</h3><label for="lessonNotes">Was habe ich verstanden, was möchte ich noch fragen?</label><textarea class="notes" id="lessonNotes" maxlength="12000">${esc(state.notes[l.id] || "")}</textarea></section>${first ? lessonJourney(l) + `<section class="panel"><h3>Freiwillig weiterüben</h3>${debugChallenge(l)}${lessonPitfalls(l)}</section>` + extras : ""}<div class="actions">${lessons.indexOf(l) > 0 ? `<a class="button secondary" href="#lesson/l${lessons.indexOf(l)}">Vorherige Einheit</a>` : ""}${lessons.indexOf(l) < 15 ? `${lessonLink(lessons[lessons.indexOf(l) + 1], "Nächste Einheit", "button")}` : '<a class="button" href="#achievements">Meine Erfolge ansehen</a>'}</div>`;
}
// Reiter für index.html, alle Unterseiten und style.css.
function fileTabs(d) {
  const tab = (id, file, label) =>
    `<button id="${id}" role="tab" data-file="${esc(file)}" aria-selected="${file === "index.html"}" aria-controls="${file === "style.css" ? "cssPane" : "htmlPane"}" ${file === "index.html" ? "" : 'tabindex="-1"'}>${esc(label)}</button>`;
  return [
    tab("htmlTab", "index.html", "index.html"),
    ...(d.pages || []).map((page, i) => tab(`pageTab${i}`, page.name, page.name)),
    tab("cssTab", "style.css", "style.css"),
  ].join("");
}
function pageHtml(d, file = htmlFile) {
  if (file === "index.html") return d.html;
  return d.pages?.find((page) => page.name === file)?.html ?? d.html;
}
function showLinkReport(d) {
  const box = $("#linkReport");
  if (!box) return;
  const report = linkReport(d).filter((entry) => entry.links.length);
  box.innerHTML = report.length
    ? `<ul class="link-list">${report
        .map((entry) => entry.links
          .map((link) => `<li class="${link.exists ? "pass" : "open"}"><span aria-hidden="true">${link.exists ? "✓" : "○"}</span> ${esc(entry.page)} → ${esc(link.target)}<span class="${link.exists ? "sr-only" : "link-hint"}">${link.exists ? ": Seite vorhanden" : "Diese Seite fehlt noch. Lege sie mit „+ Unterseite“ an oder prüfe den Dateinamen."}</span></li>`)
          .join(""))
        .join("")}</ul>`
    : '<p class="muted">Noch keine Verweise auf andere HTML-Seiten deines Projekts.</p>';
}
function draftFor(id) {
  return state.drafts[id] || (id === "lab"
    ? { html: labStarter, css: "" }
    : startingDraft(state.drafts, id));
}
function draft() {
  return draftFor(activeId);
}
function capture() {
  if (!$("#htmlEditor")) return;
  const d = draft(),
    value = $("#htmlEditor").value,
    next = {
      html: htmlFile === "index.html" ? value : d.html,
      css: $("#cssEditor").value,
    };
  if (d.pages?.length)
    next.pages = d.pages.map((page) =>
      page.name === htmlFile ? { ...page, html: value } : { ...page },
    );
  state.drafts[activeId] = next;
  save();
}
function run({ persist = true } = {}) {
  if (persist) capture();
  const d = draft();
  $("#previewFrame").srcdoc = preview(pageHtml(d), d.css);
  showLinkReport(d);
  $("#previewStatus").textContent = $("#livePreview").checked
    ? `Vorschau von ${htmlFile} aktuell · aktualisiert nach einer kurzen Schreibpause.`
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
  const panel = $("#lessonProgressPanel"), bar = $("#lessonProgressBar"),
    percent = $("#lessonProgressPercent"), detail = $("#lessonProgressDetail"),
    completed = state.completed.includes(l.id);
  panel.toggleAttribute("data-complete", completed);
  if (completed) {
    bar.value = 100;
    percent.textContent = "100 %";
    detail.textContent = "Einheit abgeschlossen";
    return;
  }
  if (!results) {
    const d = draft();
    results = checkLesson(l, d.html, d.css, (s) =>
      new DOMParser().parseFromString(s, "text/html"),
    );
  }
  const passed = results.filter((r) => r.passed).length,
    checks = l.checks.filter((_, i) => state.checks[l.id]?.[i]).length,
    quizPassed = Number(Boolean(state.quiz[l.id])),
    done = passed + quizPassed + checks,
    total = results.length + l.checks.length + 2,
    profileReady = validProfile(state.profile.name) && Boolean(state.profile.className.trim()),
    items = [
      [passed === results.length, `Praxisauftrag: ${passed} von ${results.length} Kriterien erfüllt`],
      [Boolean(quizPassed), "Verständnischeck richtig beantwortet"],
      [checks === l.checks.length, `Selbstkontrolle: ${checks} von ${l.checks.length} bestätigt`],
      [profileReady, "Profil mit Kürzel und Klasse gespeichert"],
    ];
  // The last step is the actual completion, independent of optional exercises.
  bar.value = Math.floor(100 * done / total);
  percent.textContent = `${bar.value} %`;
  detail.textContent = `Praxisauftrag ${passed}/${results.length} · Verständnischeck ${quizPassed}/1 · Selbstkontrolle ${checks}/${l.checks.length}` +
    (developerMode ? " · Abschluss pausiert" : done < total - 1 ? "" :
      profileReady ? " · Bereit zum Abschließen" : " · Profil zum Abschließen speichern");
  if (!list) return;
  list.innerHTML = items
    .map(([ok, text]) => `<li class="${ok ? "pass" : "open"}"><span aria-hidden="true">${ok ? "✓" : "○"}</span> ${esc(text)}<span class="sr-only">${ok ? ": erledigt" : ": noch offen"}</span></li>`)
    .join("");
}
function withStylesheet(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc.querySelector('link[rel="stylesheet"][href="style.css"]')) {
    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = "style.css";
    doc.head.append(link);
  }
  return "<!doctype html>\n" + doc.documentElement.outerHTML;
}
function files() {
  capture();
  const d = draft(),
    result = { "index.html": withStylesheet(d.html) };
  for (const page of d.pages || []) result[page.name] = withStylesheet(page.html);
  result["style.css"] = d.css;
  return result;
}
function bindStudio(l) {
  $("#runButton").onclick = run;
  $("#largePreviewButton").onclick = () => {
    run();
    $("#largePreviewFrame").srcdoc = preview(pageHtml(draft()), draft().css);
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
    state.drafts[l.id] = copyDraft(state.drafts[previous]);
    save();
    render();
  });
  const updates = {};
  const tabs = () => [...document.querySelectorAll("#fileTabs [role=tab]")];
  // Ein HTML-Editor für index.html und alle Unterseiten; CSS hat einen eigenen.
  const selectTab = (tab, focus = false) => {
    const file = tab.dataset.file,
      css = file === "style.css";
    if (!css && file !== htmlFile) {
      capture();
      htmlFile = file;
      $("#htmlEditor").value = pageHtml(draft());
      $("#htmlFileName").textContent = file;
      $("#htmlEditor").scrollTop = 0;
    }
    $("#htmlPane").hidden = css;
    $("#cssPane").hidden = !css;
    if (!css) $("#htmlPane").setAttribute("aria-labelledby", tab.id);
    for (const other of tabs()) {
      const active = other === tab;
      other.setAttribute("aria-selected", String(active));
      other.tabIndex = active ? 0 : -1;
    }
    $("#removePage").hidden = htmlFile === "index.html" || css;
    $("#htmlExport").textContent = `${htmlFile} speichern`;
    updates[css ? "css" : "html"]();
    if (!css) run();
    if (focus) tab.focus();
  };
  const selectFile = (kind) =>
    selectTab(
      kind === "css"
        ? $("#cssTab")
        : tabs().find((tab) => tab.dataset.file === htmlFile) || $("#htmlTab"),
    );
  const bindTabs = () => {
    for (const tab of tabs()) {
      tab.onclick = () => selectTab(tab);
      tab.onkeydown = (e) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
        e.preventDefault();
        const all = tabs(),
          i = all.indexOf(tab),
          target =
            e.key === "Home"
              ? all[0]
              : e.key === "End"
                ? all[all.length - 1]
                : all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length];
        selectTab(target, true);
      };
    }
  };
  const refreshTabs = (file = htmlFile) => {
    $("#fileTabs").innerHTML = fileTabs(draft());
    bindTabs();
    htmlFile = "index.html";
    $("#htmlEditor").value = draft().html;
    $("#htmlFileName").textContent = "index.html";
    selectTab(tabs().find((tab) => tab.dataset.file === file) || $("#htmlTab"));
  };
  htmlFile = "index.html";
  bindTabs();
  $("#addPage").onclick = () => {
    capture();
    const d = draft();
    if ((d.pages || []).length >= MAX_PAGES) {
      toast(`Ein Projekt hat hier höchstens ${MAX_PAGES} Unterseiten neben index.html.`);
      return;
    }
    const answer = prompt(
      "Name der neuen Unterseite, zum Beispiel kontakt oder ueber-uns:",
      "kontakt",
    );
    if (answer === null) return;
    const name = suggestPageName(answer);
    if (!name) {
      toast("Bitte einen Namen aus Buchstaben, Ziffern oder Bindestrich wählen, zum Beispiel kontakt.");
      return;
    }
    if ((d.pages || []).some((page) => page.name === name)) {
      toast(`${name} gibt es in diesem Projekt schon.`);
      return;
    }
    state.drafts[activeId] = {
      ...copyDraft(d),
      pages: [...(d.pages || []).map((page) => ({ ...page })), { name, html: pageStarter(name) }],
    };
    save();
    refreshTabs(name);
    toast(`${name} angelegt. Verlinke sie von index.html aus.`);
  };
  $("#removePage").onclick = () => {
    if (htmlFile === "index.html") return;
    const name = htmlFile;
    if (!confirm(`${name} aus diesem Entwurf entfernen? Dein Lernstand wird zuerst als Datei gesichert.`)) return;
    capture();
    backup();
    const d = draft(),
      next = copyDraft(d);
    next.pages = (d.pages || []).filter((page) => page.name !== name).map((page) => ({ ...page }));
    if (!next.pages.length) delete next.pages;
    state.drafts[activeId] = next;
    save();
    refreshTabs("index.html");
    toast(`${name} wurde entfernt.`);
  };
  for (const kind of ["html", "css"]) {
    updates[kind] = bindCodeEditor(
      $("#" + kind + "Editor"),
      $("#" + kind + "Lines"),
      $("#" + kind + "Position"),
    );
    $("#" + kind + "Editor").addEventListener("input", () => {
      clearTimeout(timer);
      capture();
      $("#previewStatus").textContent = $("#livePreview").checked
        ? "Vorschau wird aktualisiert …"
        : "Code geändert · Vorschau aktualisieren oder Live-Vorschau einschalten.";
      if ($("#livePreview").checked) timer = setTimeout(run, 500);
      else if (activeId !== "lab")
        timer = setTimeout(() => updateCompletionStatus(byId(activeId)), 500);
    });
  }
  $("#livePreview").onchange = () => {
    clearTimeout(timer);
    if ($("#livePreview").checked) run();
    else {
      $("#previewStatus").textContent =
        "Live-Vorschau aus · Änderungen mit „Vorschau aktualisieren“ anzeigen.";
      if (activeId !== "lab") updateCompletionStatus(byId(activeId));
    }
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
      const names = [
        ..."html" in incoming ? ["index.html"] : [],
        ...Object.keys(incoming.pages || {}),
        ..."css" in incoming ? ["style.css"] : [],
      ];
      if (
        !confirm(
          `${names.join(", ")} im aktuellen Entwurf ersetzen? Dein bisheriger Lernstand wird zuerst als Sicherung heruntergeladen.`,
        )
      )
        return;
      capture();
      backup();
      const d = draft(),
        next = copyDraft(d);
      if ("html" in incoming) next.html = incoming.html;
      if ("css" in incoming) next.css = incoming.css;
      if (incoming.pages) {
        const pages = (d.pages || []).map((page) => ({ ...page }));
        for (const [name, text] of Object.entries(incoming.pages)) {
          const existing = pages.find((page) => page.name === name);
          if (existing) existing.html = text;
          else pages.push({ name, html: text });
        }
        if (pages.length > MAX_PAGES) {
          toast(`Ein Projekt hat hier höchstens ${MAX_PAGES} Unterseiten. Entferne zuerst eine Seite.`);
          return;
        }
        next.pages = pages;
      }
      state.drafts[activeId] = next;
      save();
      $("#cssEditor").value = next.css;
      updates.css();
      refreshTabs("html" in incoming || incoming.pages ? htmlFile : "style.css");
      if (!("html" in incoming) && !incoming.pages) selectFile("css");
      if ($("#livePreview").checked) run();
      else {
        $("#previewStatus").textContent =
          "Dateien geladen · Vorschau aktualisieren, um den neuen Code zu sehen.";
        if (activeId !== "lab") updateCompletionStatus(byId(activeId));
      }
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
    state.drafts[activeId] = { html: activeId === "lab" ? labStarter : l.starter, css: "" };
    htmlFile = "index.html";
    save();
    render();
  };
  $("#imageButton").onclick = () => $("#imageFile").click();
  $("#imageFile").onchange = async (e) => {
    const targetEditor = $("#htmlEditor"),
      targetFile = htmlFile;
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
      // A file read can finish after navigation or a file-tab change.
      if ($("#htmlEditor") !== targetEditor || htmlFile !== targetFile) return;
      const addition = `\n<img src="${reader.result}" alt="Beschreibe hier die Bildinformation" width="640" height="360">\n`;
      const html = $("#htmlEditor").value;
      if (html.length + addition.length > HTML_MAX) {
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
    download(htmlFile, files()[htmlFile], "text/html;charset=utf-8");
  $("#cssExport").onclick = () =>
    download("style.css", files()["style.css"], "text/css;charset=utf-8");
  $("#zipExport").onclick = () =>
    download("WebLab-Projekt.zip", zipFiles(files()));
  run({ persist: !developerMode });
}
function achievements() {
  const rows = nagoldRows(state);
  return `<p class="lead">Dein Fortschritt auf diesem Gerät. XP zeigen deinen Lernfortschritt. Erfahrungspunkte (EP) werden mit der Lehrkraft abgeglichen. Ein abgeschlossener Auftrag zählt einmal: 100 XP und zunächst 5 EP.</p><div class="stats stats-auto"><div class="stat"><strong>${xp(state)}</strong><small>XP einschließlich Altbestand</small></div><div class="stat"><strong>${nagold(state)}</strong><small>EP</small></div><div class="stat"><strong>${state.completed.length}</strong><small>Abgeschlossene Einheiten</small></div><div class="stat"><strong>${lessons.reduce((n, l) => n + (exercises[l.id] ? exerciseProgress(l.id) : 0), 0)} / ${Object.values(exercises).flat().length}</strong><small>Übungen gelöst (ohne Punkte)</small></div><div class="stat"><strong>${state.completed.includes("l16") ? "★" : "◇"}</strong><small>Eigenes Webprojekt</small></div></div><section class="panel"><h2 class="panel-title">Meine EP-Tabelle</h2><div class="table-wrap"><table><thead><tr><th>Datum</th><th>Anlass</th><th>Punkte</th></tr></thead><tbody>${rows.map((e) => `<tr><td>${e.at ? esc(new Date(e.at).toLocaleString("de-DE")) : "Altbestand ohne Zeitangabe"}</td><td>${esc(e.purpose)}</td><td>${e.points}</td></tr>`).join("") || '<tr><td colspan="3">Noch keine Einträge.</td></tr>'}</tbody></table></div><div class="actions"><button type="button" class="button secondary" id="editNagoldTable">Tabelle bearbeiten</button><button class="button secondary" id="csvExport">Übersicht als CSV</button></div></section><section class="panel"><h2 class="panel-title">Eintrag nach Absprache mit der Lehrkraft</h2><p class="muted">Manuelle Einträge sind selbst erfasst. Sie ersetzen keine bestätigte Leistungsbewertung.</p><form id="nagoldForm"><label for="nagoldPurpose">Anlass</label><input id="nagoldPurpose" maxlength="160" required><label for="nagoldPoints">Erfahrungspunkte (EP; −10 bis +5, ohne 0)</label><input id="nagoldPoints" type="number" min="-10" max="5" step="1" value="1" required><div class="actions"><button class="button" type="submit">Eintrag dokumentieren</button></div></form></section>${state.legacy ? '<section class="panel"><h2 class="panel-title">Übernommener Altbestand</h2><p>Deine alten K1-Missionen und ihr XP-Stand bleiben erhalten. Die neue BPE2-Einheit wird separat bearbeitet.</p></section>' : ""}`;
}
function bindAchievements() {
  $("#editNagoldTable").onclick = () => profilePanel.open();
  $("#nagoldForm").onsubmit = (e) => {
    e.preventDefault();
    const points = Number($("#nagoldPoints").value),
      purpose = $("#nagoldPurpose").value.trim();
    if (!validProfile(state.profile.name) || !state.profile.className.trim()) {
      openProfile("Speichere zuerst dein Schülerkürzel und deine Klasse. Danach kannst du EP eintragen.");
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
      updateStorageStatus();
      return;
    }
    render();
    toast("EP-Eintrag gespeichert.");
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
      ["Kürzel", "Klasse", "Einheit", "Status", "XP", "EP"],
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
function updateLessonHeading(lesson) {
  $("#standardHeading").hidden = Boolean(lesson);
  $("#lessonHeading").hidden = !lesson;
  const pager = $("#lessonPager");
  if (!lesson) {
    pager.replaceChildren();
    return;
  }
  const label = (item) => `${item.id.slice(1).padStart(2, "0")} ${item.title}`;
  const current = $("#currentLessonLink");
  current.href = "#lesson/" + lesson.id;
  current.textContent = label(lesson);
  const neighbors = journey[lesson.id];
  pager.innerHTML = [
    [neighbors.previous, "Vorherige Einheit", "arrow-left", "Keine vorherige Einheit"],
    [neighbors.next, "Nächste Einheit", "arrow", "Keine weitere Einheit"],
  ].map(([id, direction, symbol, end]) => {
    const target = byId(id), artwork = icon(symbol);
    if (target && viewLessonAccess(id).unlocked) {
      const title = esc(`${direction}: ${label(target)}`);
      return `<a class="icon-button" href="#lesson/${id}" title="${title}" aria-label="${title}">${artwork}</a>`;
    }
    const title = esc(target ? `${direction} noch gesperrt: ${label(target)}` : end);
    return `<button class="icon-button" type="button" disabled title="${title}" aria-label="${title}">${artwork}</button>`;
  }).join("");
}
$("#currentLessonLink").addEventListener("click", (event) => {
  if (location.hash !== event.currentTarget.hash || event.ctrlKey || event.metaKey ||
      event.shiftKey || event.altKey) return;
  event.preventDefault();
  window.scrollTo({ top: 0 });
});
function render() {
  let focusedTarget = false;
  clearTimeout(timer);
  const route = location.hash.slice(1) || "home",
    requestedLesson = route.startsWith("lesson/")
      ? byId(route.split("/")[1])
      : null,
    l =
      requestedLesson && viewLessonAccess(requestedLesson.id).unlocked
        ? requestedLesson
        : null;
  let title = "Übersicht",
    html = "";
  if (requestedLesson && !l) {
    title = "Einheit noch gesperrt";
    html = lockedLesson(requestedLesson);
  } else if (l) {
    activeId = l.id;
    if (!developerMode && !state.drafts[l.id])
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
    title = "Erfolge & EP";
    html = achievements();
  } else if (route === "notes") {
    title = "Meine Notizen";
    // Locked lessons only appear once they hold notes (e.g. after an import).
    const notable = lessons.filter(
        (l) => viewLessonAccess(l.id).unlocked || state.notes[l.id],
      ),
      hidden = lessons.length - notable.length;
    html = rememberedRules() + reviewPanel(state) + notable
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
  updateLessonHeading(l);
  $("#lessonProgressPanel").hidden = !l;
  $("#workspaceHeader").toggleAttribute("data-lesson", Boolean(l));
  document.title = `${title} · WebLab`;
  $("#mainContent").innerHTML = html;
  decorateIcons();
  document.querySelectorAll("[data-catalog-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.catalogJump);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });
    });
  });
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
      updateHeaderOffset($("#workspaceHeader"));
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
      if (developerMode) return;
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
          ? "100 XP und 5 EP einmalig erfasst. Die nächste Einheit ist freigeschaltet. Sichere deinen Lernstand."
          : "100 XP und 5 EP einmalig erfasst. Du hast alle 16 Einheiten abgeschlossen. Sichere deinen Lernstand.";
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
  if (route === "notes") bindReview();
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
    if (!save()) { Object.assign(state, previous); updateStorageStatus(); return false; }
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
const developerButton = $("#developerModeButton");
let rightAltDown = false;
const profileDialog = $("#profileDialog");
profileDialog.addEventListener("keydown", (event) => {
  if (!profileDialog.open || event.defaultPrevented) return;
  if (event.code === "AltRight") rightAltDown = true;
  const altGr = event.getModifierState("AltGraph") || (rightAltDown && event.altKey);
  if (!altGr || event.shiftKey || event.metaKey || event.isComposing ||
      (event.code !== "KeyS" && event.key.toLowerCase() !== "s")) return;
  event.preventDefault();
  if (event.repeat) return;
  const hide = !developerButton.hidden;
  if (hide && document.activeElement === developerButton) $("#studentName").focus();
  developerButton.hidden = hide;
  if (!hide) developerButton.focus();
});
document.addEventListener("keyup", (event) => {
  if (event.code === "AltRight") rightAltDown = false;
});
window.addEventListener("blur", () => { rightAltDown = false; });
profileDialog.addEventListener("close", () => { rightAltDown = false; });
developerButton.onclick = () => {
  if (developerButton.hidden || !profileDialog.open) return;
  developerMode = !developerMode;
  developerButton.setAttribute("aria-pressed", String(developerMode));
  $("#developerModeNotice").hidden = !developerMode;
  render();
};
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
    updateStorageStatus();
    $("#profileError").textContent =
      "Das Profil konnte nicht gespeichert werden. Dein bisheriger Lernstand bleibt erhalten. Deine Eingaben stehen weiter hier; versuche „Profil speichern“ erneut, wenn der Speicher verfügbar ist.";
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
const backupDialog = $("#backupDialog"),
  importFile = $("#importFile"),
  retryImport = $("#retryImport");
function resetPendingImport() {
  importRead++;
  pendingImport = null;
  retryImport.hidden = true;
}
function showImportError(message) {
  $("#importSummary").textContent = message;
  retryImport.hidden = !pendingImport;
  if (!backupDialog.open) backupDialog.showModal();
}
backupDialog.addEventListener("close", () => {
  // A new picker can be opened before the queued close event runs.
  if (!backupDialog.open && pendingImport) resetPendingImport();
});
function chooseBackup() {
  resetPendingImport();
  if (backupDialog.open) backupDialog.close();
  importFile.value = "";
  importFile.click();
}
$("#backupButton").onclick = () => backup();
$("#loadBackupButton").onclick = chooseBackup;
document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.isComposing || !event.altKey ||
      event.ctrlKey || event.metaKey || event.shiftKey || $("dialog[open]")) return;
  const key = event.key.toLowerCase();
  if (key !== "s" && key !== "o") return;
  event.preventDefault();
  if (event.repeat) return;
  if (key === "s") backup();
  else chooseBackup();
});
$("#chooseAnotherBackup").onclick = chooseBackup;
importFile.oncancel = resetPendingImport;
importFile.onchange = async (event) => {
  resetPendingImport();
  const read = importRead,
    file = event.target.files[0];
  if (!file) return;
  try {
    if (file.size > BACKUP_MAX_BYTES)
      throw new Error("Diese Datei ist zu groß für eine WebLab-Sicherung.");
    const text = await file.text();
    if (read !== importRead) return;
    let raw;
    try { raw = JSON.parse(text); }
    catch { throw new Error("Die Datei enthält keine gültige WebLab-Sicherung."); }
    pendingImport = {
      state: importBackup(raw),
      exercises: normalizeSolved(raw.exercisesSolved),
      backedUp: false,
    };
    applyPendingImport();
  } catch (err) {
    if (read !== importRead) return;
    showImportError(err.message);
  }
};
function applyPendingImport() {
  if (!pendingImport) return;
  if (!pendingImport.backedUp) {
    try {
      backup({ beforeImport: true });
      pendingImport.backedUp = true;
    } catch {
      showImportError("Dein aktueller Lernstand konnte nicht als Datei gesichert werden. Er wurde nicht ersetzt.");
      return;
    }
  }
  const before = state,
    wasPrevented = preventSave;
  state = pendingImport.state;
  preventSave = false;
  if (!save()) {
    state = before;
    preventSave = wasPrevented;
    updateStorageStatus();
    showImportError("Die Sicherung konnte nicht gespeichert werden. Dein bisheriger Lernstand und deine Übungsmarkierungen bleiben erhalten. Versuche das Laden erneut, wenn der Browserspeicher verfügbar ist.");
    return;
  }
  // Older backups do not contain exercise markers; keep the ones on this device.
  const exercisesStored = !pendingImport.exercises || storeSolvedExercises(pendingImport.exercises);
  resetPendingImport();
  if (backupDialog.open) backupDialog.close();
  render();
  toast(exercisesStored
    ? "Lernstand übernommen."
    : "Lernstand übernommen, aber die Übungsmarkierungen konnten nicht gespeichert werden. Behalte die Sicherungsdatei und lade sie erneut, wenn der Browserspeicher verfügbar ist.");
}
retryImport.onclick = applyPendingImport;
window.addEventListener("hashchange", () => {
  // render() returns true when it already placed focus on a target.
  if (render()) return;
  $("#mainContent").focus();
  window.scrollTo(0, 0);
});
window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage && (e.key === STORAGE_KEY || e.key === null)) {
    preventSave = true;
    storageError =
      "Ein anderer Tab hat den Lernstand verändert. Sichere deinen Entwurf als Datei und lade die Seite neu, bevor du weiterarbeitest.";
    updateStorageStatus();
  }
});
const versionButton = $("#versionButton"),
  versionDialog = $("#versionDialog"),
  versionList = $("#versionHistory");
versionButton.textContent = "v" + VERSION;
versionButton.setAttribute("aria-label", "WebLab Version " + VERSION + " – Versionsverlauf öffnen");
versionButton.title = "Versionsverlauf öffnen";
versionButton.hidden = false;
versionButton.onclick = () => {
  if (!versionList.hasChildNodes()) {
    versionList.innerHTML = versionHistory.map(([date, entries]) => {
      const [year, month, day] = date.split("-");
      return `<section class="version-day" aria-labelledby="version-day-${esc(date)}"><h3 id="version-day-${esc(date)}"><time datetime="${esc(date)}">${esc(day + "." + month + "." + year)}</time></h3><ol class="version-entries">${entries.map(([release, title, summary]) =>
        `<li class="version-entry" data-release="${esc(release)}"><div class="version-entry-label"><span class="badge">${esc(release)}</span>${release === VERSION ? '<span class="version-current">Aktuelle Version</span>' : ""}</div><div><h4>${esc(title)}</h4><p>${esc(summary)}</p></div></li>`
      ).join("")}</ol></section>`;
    }).join("");
  }
  versionDialog.showModal();
  versionList.scrollTop = 0;
};
render();
updateStorageStatus();
