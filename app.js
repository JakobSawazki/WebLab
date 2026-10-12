import { VERSION, groups, lessons, byId } from "./content.js";
import { glossary } from "./glossary.js";
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
} from "./state.js";
import { checkLesson, preview } from "./checks.js";
import { zipFiles } from "./export.js";
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
let state,
  storageError = "",
  pendingImport = null,
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
    JSON.stringify(exportBackup(state), null, 2),
    "application/json",
  );
}
function card(l) {
  const done = state.completed.includes(l.id);
  return `<article class="card"><div class="card-top"><span class="card-num">${l.id.slice(1).padStart(2, "0")}</span><span class="badge ${done ? "done" : ""}">${done ? "Abgeschlossen" : "Frei zugänglich"}</span></div><h3>${esc(l.title)}</h3><p>${esc(l.goal)}</p><small>${l.minutes} Min. · 100 XP · 5 NAGOLD</small><a class="button secondary" href="#lesson/${l.id}">${done ? "Wiederholen" : "Einheit öffnen"} <span aria-hidden="true">↗</span></a></article>`;
}
function overview() {
  const next =
    lessons.find((l) => !state.completed.includes(l.id)) || lessons[0];
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow">BPE2 · Deine eigene Webseite beginnt hier</p><h2>Aus deinen Ideen<br>wird eine Webseite.</h2><p>Lerne HTML und CSS Schritt für Schritt. Probiere deinen Code direkt aus und entwickle am Ende eine eigene statische Webseite.</p><div class="actions"><a class="button" href="#lesson/${next.id}">${state.completed.length ? "Weiterlernen" : "Jetzt starten"} <span aria-hidden="true">↗</span></a><a class="button secondary" href="#lab">Freies Labor</a></div></div><div class="hero-art"><span>&lt;idee&gt; → &lt;webseite&gt;</span></div></section>
 <div class="stats"><div class="stat"><strong>${state.completed.length} / ${lessons.length}</strong><small>Lerneinheiten abgeschlossen</small></div><div class="stat"><strong>${xp(state)}</strong><small>XP gesammelt</small></div><div class="stat"><strong>${nagold(state)}</strong><small>NAGOLD lokal erfasst</small></div><div class="stat"><strong>Dein Projekt</strong><small>Eine eigene statische Webseite</small></div></div>
 <section class="panel"><p class="eyebrow">Dein nächster Schritt</p><h3>${esc(next.title)}</h3><p>${esc(next.goal)}</p><div class="progress" role="progressbar" aria-label="Lernfortschritt" aria-valuenow="${state.completed.length}" aria-valuemin="0" aria-valuemax="16"><span style="width:${(state.completed.length / 16) * 100}%"></span></div><small>Arbeite nach Empfehlung in Reihenfolge. Alle Einheiten bleiben zum Nachschlagen erreichbar.</small></section>${path()}`;
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
  return `<section class="studio" aria-labelledby="studioTitle"><div class="studio-header"><h3 id="studioTitle">${free ? "Freies HTML- & CSS-Labor" : "Deine Werkstatt"}</h3><div class="actions"><button class="button secondary" id="runButton">Vorschau aktualisieren</button>${free ? "" : '<button class="button" id="checkButton">Auftrag prüfen</button>'}</div></div><div class="studio-grid"><div class="editors"><label for="htmlEditor">HTML</label><textarea class="code" id="htmlEditor" spellcheck="false" maxlength="1500000">${esc(d.html)}</textarea><label for="cssEditor">CSS · Gestaltung</label><textarea class="code" id="cssEditor" spellcheck="false" maxlength="40000">${esc(d.css)}</textarea><div class="actions"><button id="imageButton" class="button secondary">Bild einfügen</button><input id="imageFile" type="file" accept="image/png,image/jpeg,image/webp" hidden><button id="resetButton" class="button secondary">Startcode laden</button></div><p class="muted">Dein Code wird auf diesem Gerät gespeichert. Externe Medien und Skripte werden in der Vorschau blockiert. Relative Links und Medien testest du nach dem Export im Projektordner.</p></div><div class="preview-area"><label for="previewFrame">Browser-Vorschau</label><iframe id="previewFrame" title="Isolierte Vorschau deiner Webseite" sandbox=""></iframe><p>HTML beschreibt die Inhalte. CSS gestaltet sie. Die Vorschau ist vom Lernprofil isoliert.</p></div></div><div class="panel"><h3>Dein Code als echte Dateien</h3><p>Das Projekt-ZIP enthält index.html und style.css. Entpacke es in einen gemeinsamen Ordner und öffne index.html. Eigene Unterseiten und Mediendateien ergänzt du dort.</p><div class="actions"><button class="button secondary" id="htmlExport">index.html</button><button class="button secondary" id="cssExport">style.css</button><button class="button" id="zipExport">Projekt-ZIP herunterladen</button></div></div></section>`;
}
function lessonView(l) {
  const done = state.completed.includes(l.id);
  return `<div class="breadcrumbs"><a href="#path">Lernpfad</a> / ${groups[l.group]} / Einheit ${l.id.slice(1)}</div><p class="eyebrow">${l.minutes} Minuten · 100 XP · 5 NAGOLD</p><h2>${esc(l.title)}</h2><p class="lead">${esc(l.goal)}</p><div class="lesson-layout"><section class="panel"><h3>Verstehen</h3><p>${esc(l.explanation)}</p><h3>Ein Beispiel</h3><pre><code>${esc(l.example)}</code></pre></section><aside class="panel"><p class="eyebrow">Dein Praxisauftrag</p><h3>Jetzt bist du dran</h3><p>${esc(l.task)}</p><details><summary>Ein Hinweis hilft mir weiter</summary><p>${esc(l.hint)}</p></details>${l.id === "l14" ? '<p><a href="https://creativecommons.org/cc-licenses/" target="_blank" rel="noopener">Creative-Commons-Lizenzen</a><br><a href="https://www.gesetze-im-internet.de/ddg/__5.html" target="_blank" rel="noopener">§ 5 DDG: Anbieterinformationen</a></p>' : ""}<p class="teacher-note">Die automatische Prüfung kontrolliert Bausteine. Besprich dein Ergebnis und die Selbstkontrolle mit der Lehrkraft.</p></aside></div>${studio(l.id)}<section class="panel"><h3>Rückmeldung zum Praxisauftrag</h3><div id="taskFeedback" role="status"><p>Bearbeite den Auftrag und klicke auf „Auftrag prüfen“.</p></div></section><div class="lesson-layout"><section class="panel"><h3>Verständnischeck</h3><p>${esc(l.question)}</p><div class="quiz-options">${l.options.map((o, i) => `<button class="button secondary quiz-option" data-answer="${i}">${esc(o)}</button>`).join("")}</div><p id="quizResult" role="status">${state.quiz[l.id] ? "✓ Bereits richtig beantwortet." : ""}</p></section><section class="panel"><h3>Meine Selbstkontrolle</h3>${l.checks.map((c, i) => `<label class="check-row"><input type="checkbox" data-check="${i}" ${state.checks[l.id]?.[i] ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}<p class="muted">Mit dem Abschluss dokumentierst du deinen eigenen Lernstand. Das ist keine authentifizierte Bestätigung der Lehrkraft.</p><button class="button" id="completeButton" ${done ? "disabled" : ""}>${done ? "✓ Abgeschlossen" : "Einheit abschließen"}</button><p id="completionResult" role="status"></p></section></div><section class="panel"><h3>Meine Notizen zu dieser Einheit</h3><label for="lessonNotes">Was habe ich verstanden, was möchte ich noch fragen?</label><textarea class="notes" id="lessonNotes" maxlength="12000">${esc(state.notes[l.id] || "")}</textarea></section><div class="actions">${lessons.indexOf(l) > 0 ? `<a class="button secondary" href="#lesson/l${lessons.indexOf(l)}">Vorherige Einheit</a>` : ""}${lessons.indexOf(l) < 15 ? `<a class="button" href="#lesson/l${lessons.indexOf(l) + 2}">Nächste Einheit</a>` : '<a class="button" href="#achievements">Meine Erfolge ansehen</a>'}</div>`;
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
}
function check(l) {
  capture();
  const d = draft(),
    results = checkLesson(l, d.html, d.css, (s) =>
      new DOMParser().parseFromString(s, "text/html"),
    );
  $("#taskFeedback").innerHTML =
    `<ul class="criteria">${results.map((r) => `<li class="${r.passed ? "pass" : "fail"}">${r.passed ? "✓" : "○"} ${esc(r.label)}</li>`).join("")}</ul><p>${results.every((r) => r.passed) ? "Alle technischen Kriterien erfüllt. Prüfe zusätzlich Inhalt, Darstellung und Selbstkontrolle." : "Überarbeite die offenen Punkte. Der Hinweis am Praxisauftrag unterstützt dich."}</p>`;
  return results.every((r) => r.passed);
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
  for (const id of ["htmlEditor", "cssEditor"])
    $("#" + id).addEventListener("input", () => {
      clearTimeout(timer);
      capture();
      timer = setTimeout(run, 500);
    });
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
      run();
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
  return `<p class="lead">Dein Fortschritt auf diesem Gerät. XP motivieren; NAGOLD wird mit der Lehrkraft abgeglichen. Ein abgeschlossener Auftrag zählt einmal: 100 XP und 5 NAGOLD.</p><div class="stats"><div class="stat"><strong>${xp(state)}</strong><small>XP einschließlich Altbestand</small></div><div class="stat"><strong>${nagold(state)}</strong><small>NAGOLD</small></div><div class="stat"><strong>${state.completed.length}</strong><small>Abgeschlossene Einheiten</small></div><div class="stat"><strong>${state.completed.includes("l16") ? "★" : "◇"}</strong><small>Eigenes Webprojekt</small></div></div><section class="panel"><h3>Meine NAGOLD-Tabelle</h3><div class="table-wrap"><table><thead><tr><th>Datum</th><th>Anlass</th><th>Punkte</th></tr></thead><tbody>${state.completed.map((id) => `<tr><td>${state.completedAt[id] ? esc(new Date(state.completedAt[id]).toLocaleString("de-DE")) : "Altbestand ohne Zeitangabe"}</td><td>${esc(byId(id).title)}</td><td>5</td></tr>`).join("")}${state.nagoldEntries.map((e) => `<tr><td>${esc(new Date(e.at).toLocaleString("de-DE"))}</td><td>${esc(e.purpose)}</td><td>${e.points}</td></tr>`).join("") || (!state.completed.length ? '<tr><td colspan="3">Noch keine Einträge.</td></tr>' : "")}</tbody></table></div><div class="actions"><button class="button secondary" id="csvExport">Übersicht als CSV</button></div></section><section class="panel"><h3>Eintrag nach Absprache mit der Lehrkraft</h3><p class="muted">Manuelle Einträge sind selbst erfasst. Sie ersetzen keine bestätigte Leistungsbewertung.</p><form id="nagoldForm"><label for="nagoldPurpose">Anlass</label><input id="nagoldPurpose" maxlength="160" required><label for="nagoldPoints">NAGOLD-Punkte (−10 bis +5, ohne 0)</label><input id="nagoldPoints" type="number" min="-10" max="5" step="1" value="1" required><div class="actions"><button class="button" type="submit">Eintrag dokumentieren</button></div></form></section>${state.legacy ? '<section class="panel"><h3>Übernommener Altbestand</h3><p>Deine alten K1-Missionen und ihr XP-Stand bleiben erhalten. Die neue BPE2-Einheit wird separat bearbeitet.</p></section>' : ""}`;
}
function bindAchievements() {
  $("#nagoldForm").onsubmit = (e) => {
    e.preventDefault();
    const points = Number($("#nagoldPoints").value),
      purpose = $("#nagoldPurpose").value.trim();
    if (!validProfile(state.profile.name) || !state.profile.className.trim()) {
      openProfile();
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
    save();
    render();
  };
  $("#csvExport").onclick = () => {
    const cell = (x) =>
      '"' +
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
        state.completed.includes(l.id) ? 5 : 0,
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
  return '<p class="lead">HTML-Elemente, CSS-Eigenschaften und Begriffe schnell nachschlagen.</p><div class="search-row"><input type="search" id="glossarySearch" aria-label="Glossar durchsuchen" placeholder="Begriff, Befehl oder Eigenschaft suchen …"><select id="glossaryKind" aria-label="Glossar filtern"><option value="">Alle Bereiche</option><option value="html">HTML</option><option value="css">CSS</option><option value="begriff">Begriffe</option></select></div><p id="glossaryCount" role="status"></p><div id="glossaryResults" class="glossary-grid"></div>';
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
    items = glossary.filter(
      (g) =>
        (!kind || g.kind === kind) &&
        fold(g.term + " " + g.short + " " + g.description).includes(q),
    );
  $("#glossaryCount").textContent = `${items.length} Einträge`;
  $("#glossaryResults").innerHTML =
    items
      .map(
        (g) =>
          `<article class="card"><span class="badge">${esc(g.kind.toUpperCase())}</span><h3>${esc(g.term)}</h3><p>${esc(g.description)}</p><pre><code>${esc(g.syntax)}</code></pre></article>`,
      )
      .join("") || "<p>Kein passender Eintrag gefunden.</p>";
}
function render() {
  clearTimeout(timer);
  const route = location.hash.slice(1) || "home",
    l = route.startsWith("lesson/") ? byId(route.split("/")[1]) : null;
  let title = "Übersicht",
    html = "";
  if (l) {
    activeId = l.id;
    title = l.title;
    html = lessonView(l);
  } else if (route === "path") {
    title = "Dein Lernpfad";
    html = path();
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
    html = lessons
      .map(
        (l) =>
          `<section class="panel"><h3><a href="#lesson/${l.id}">${esc(l.title)}</a></h3><label for="notes-${l.id}">Deine Notizen</label><textarea class="notes" id="notes-${l.id}" data-note="${l.id}" maxlength="12000">${esc(state.notes[l.id] || "")}</textarea></section>`,
      )
      .join("");
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
  stats();
  document.querySelectorAll(".nav-item").forEach((a) => {
    const current =
      a.hash === location.hash ||
      (l && a.hash === "#path") ||
      (!location.hash && a.hash === "#home");
    if (current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if ($("#htmlEditor")) bindStudio(l || byId("l1"));
  if (l) {
    document.querySelectorAll("[data-answer]").forEach(
      (b) =>
        (b.onclick = () => {
          const ok = Number(b.dataset.answer) === l.answer;
          if (ok) {
            state.quiz[l.id] = true;
            save();
          }
          $("#quizResult").textContent = ok
            ? "✓ Richtig. Übertrage die Idee auf deinen eigenen Code."
            : "Noch nicht. Lies die Erklärung erneut und versuche es noch einmal.";
        }),
    );
    document.querySelectorAll("[data-check]").forEach(
      (c) =>
        (c.onchange = () => {
          state.checks[l.id] ||= [];
          state.checks[l.id][Number(c.dataset.check)] = c.checked;
          save();
        }),
    );
    $("#lessonNotes").oninput = (e) => {
      state.notes[l.id] = e.target.value;
      save();
    };
    $("#completeButton").onclick = () => {
      if (!state.profile.name || !state.profile.className.trim()) {
        openProfile();
        return;
      }
      if (!check(l)) {
        $("#completionResult").textContent =
          "Erfülle zuerst die technischen Kriterien des Praxisauftrags.";
        return;
      }
      if (complete(state, l.id)) {
        save();
        stats();
        $("#completeButton").disabled = true;
        $("#completeButton").textContent = "✓ Abgeschlossen";
        $("#completionResult").textContent =
          "100 XP und 5 NAGOLD einmalig erfasst. Sichere deinen Lernstand.";
      } else
        $("#completionResult").textContent =
          "Beantworte den Verständnischeck und bestätige die Selbstkontrolle.";
    };
  }
  if (route === "achievements") bindAchievements();
  if (route === "reference") {
    $("#glossarySearch").oninput = search;
    $("#glossaryKind").onchange = search;
    search();
  }
  document.querySelectorAll("[data-note]").forEach(
    (t) =>
      (t.oninput = () => {
        state.notes[t.dataset.note] = t.value;
        save();
      }),
  );
}
function openProfile() {
  $("#studentName").value = state.profile.name;
  $("#studentClass").value = state.profile.className;
  $("#profileError").textContent = "";
  $("#profileDialog").showModal();
}
$("#profileButton").onclick = openProfile;
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
    state = blank();
  }
  state.profile = { name, className };
  save();
  stats();
  $("#profileDialog").close();
  toast("Profil auf diesem Gerät gespeichert.");
};
document
  .querySelectorAll("[data-close]")
  .forEach((b) => (b.onclick = () => b.closest("dialog").close()));
$("#themeButton").onclick = () => {
  const theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("weblab-theme-v1", theme);
  } catch {}
};
$("#backupButton").onclick = () => $("#backupDialog").showModal();
$("#exportButton").onclick = backup;
$("#importFile").onchange = async (e) => {
  pendingImport = null;
  $("#confirmImport").hidden = true;
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 32000000)
      throw new Error("Diese Datei ist zu groß (maximal 32 MB).");
    pendingImport = importBackup(JSON.parse(await file.text()));
    $("#importSummary").textContent =
      `Bereit: ${pendingImport.profile.name || "ohne Profil"}, Klasse ${pendingImport.profile.className || "offen"}, ${pendingImport.completed.length} Einheiten. Dein aktueller Stand wird vor dem Ersetzen gesichert.`;
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
  preventSave = false;
  save();
  $("#backupDialog").close();
  render();
  toast("Lernstand übernommen.");
};
window.addEventListener("hashchange", () => {
  render();
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
$("#version").textContent = VERSION;
document
  .querySelectorAll(".version")
  .forEach((el) => (el.textContent = VERSION));
render();
if (storageError) toast(storageError);
