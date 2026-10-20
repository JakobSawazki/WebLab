import { lessons } from "./content.js";
import { xp, nagold } from "./state.js";
import { ledgerDraft, ledgerChanges, localStamp } from "./nagold.js";
import { icon } from "./icons.js";
import { esc } from "./html.js";

const levels = [
  { min: 0, title: "Webstarter" }, { min: 100, title: "Tag-Entdecker" },
  { min: 300, title: "Seitenbauer" }, { min: 600, title: "HTML-Gestalter" },
  { min: 1000, title: "CSS-Gestalter" }, { min: 1600, title: "Web-Architekt" },
];

export function bindProfilePanel({ getState, persistLedger, notify }) {
  const $ = (s) => document.querySelector(s), dialog = $("#nagoldDialog");
  let draft = [], editing = new Set(), dirty = false;
  const refresh = () => {
    const state = getState(), total = xp(state), index = levels.findLastIndex((level) => total >= level.min), level = levels[index], next = levels[index + 1];
    $("#profileLevel").textContent = `Level ${index + 1} · ${level.title}`;
    $("#profileXP").textContent = `${total} XP`;
    $("#profileProgressLabel").textContent = next ? `${total} / ${next.min} XP` : "Höchstes Level erreicht";
    $("#profileProgress").max = next ? next.min - level.min : 1;
    $("#profileProgress").value = next ? total - level.min : 1;
    $("#profileNextLevel").textContent = next ? `Noch ${next.min - total} XP bis Level ${index + 2} · ${next.title}` : "Stark! Du hast alle Level erreicht.";
    $("#profileCompleted").textContent = `${state.completed.length} von ${lessons.length} Lerneinheiten abgeschlossen`;
    $("#profileNagold").innerHTML = `<strong>${nagold(state)} NAGOLD</strong><span>${icon("note")}</span>`;
    $("#profileNagold").setAttribute("aria-label", `${nagold(state)} NAGOLD: Tabelle öffnen`);
  };
  const sum = () => {
    const total = draft.reduce((n, row) => n + (Number.isInteger(row.points) ? row.points : 0), 0);
    $("#nagoldSum").textContent = `${total} NAGOLD gesamt`;
  };
  const renderRows = () => {
    $("#nagoldRows").innerHTML = draft.map((row, index) => {
      const edit = editing.has(index), label = `Zeile ${index + 1}`;
      const date = row.date ? row.date.split("-").reverse().join(".") : "Nicht erfasst";
      return `<tr data-ledger-row="${index}">
        <td data-label="Datum">${edit ? `<input type="date" data-field="date" value="${esc(row.date)}" aria-label="Datum, ${label}">` : esc(date)}</td>
        <td data-label="Uhrzeit">${edit ? `<input type="time" step="60" data-field="time" value="${esc(row.time)}" aria-label="Uhrzeit, ${label}">` : (row.time ? esc(row.time) : '<span aria-label="Nicht erfasst">–</span>')}</td>
        <td data-label="Wofür">${edit ? `<input data-field="purpose" list="nagoldPresets" value="${esc(row.purpose)}" maxlength="160" placeholder="Auswählen oder eintippen" aria-label="Wofür, ${label}">` : esc(row.purpose)}${row.lessonId ? '<small class="muted nagold-origin">Lerneinheit</small>' : ""}</td>
        <td data-label="NAGOLD">${edit ? `<input type="number" data-field="points" min="-10" max="5" step="1" value="${Number.isFinite(row.points) ? row.points : ""}" aria-label="NAGOLD, ${label}">` : row.points}</td>
        <td data-label="Aktionen" class="nagold-row-actions"><button type="button" class="icon-button" data-edit="${index}" aria-label="${label} bearbeiten" title="Eintrag bearbeiten" ${edit ? "disabled" : ""}>${icon("edit")}</button><button type="button" class="icon-button" data-remove="${index}" aria-label="${label} löschen" title="Eintrag löschen">${icon("minus")}</button></td>
      </tr>`;
    }).join("");
    $("#nagoldAdd").disabled = draft.filter((row) => !row.lessonId).length >= 1000;
    sum();
  };
  const add = () => {
    if (draft.filter((row) => !row.lessonId).length >= 1000) return;
    const at = new Date().toISOString();
    draft.push({ ...localStamp(at), purpose: "", points: 0, originalAt: at });
    dirty = true; editing.add(draft.length - 1); renderRows();
    $("#nagoldRows tr:last-child [data-field=purpose]").focus();
  };
  const open = () => {
    draft = ledgerDraft(getState()); editing = new Set();
    $("#nagoldError").textContent = ""; renderRows(); dialog.showModal();
    if (!draft.length) add();
    dirty = false;
  };
  $("#profileNagold").onclick = open;
  $("#nagoldAdd").onclick = add;
  $("#nagoldPresets").innerHTML = ["Mitarbeit", "Zusatzaufgabe", "Präsentation", "Projektarbeit", "Lernprodukt", ...lessons.map((lesson) => lesson.title)].map((value) => `<option value="${esc(value)}"></option>`).join("");
  $("#nagoldRows").addEventListener("input", (event) => {
    const field = event.target.closest("[data-field]"); if (!field) return;
    const row = draft[Number(field.closest("[data-ledger-row]").dataset.ledgerRow)];
    row[field.dataset.field] = field.dataset.field === "points" ? field.valueAsNumber : field.value;
    dirty = true; field.removeAttribute("aria-invalid");
    $("#nagoldError").textContent = ""; sum();
  });
  const editRow = (index) => { editing.add(index); renderRows(); $(`#nagoldRows [data-ledger-row="${index}"] [data-field=purpose]`).focus(); };
  $("#nagoldRows").addEventListener("dblclick", (event) => {
    if (!event.target.closest("button,input")) {
      const row = event.target.closest("[data-ledger-row]"); if (row) editRow(Number(row.dataset.ledgerRow));
    }
  });
  $("#nagoldRows").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit]"), remove = event.target.closest("[data-remove]");
    if (edit) editRow(Number(edit.dataset.edit));
    if (remove) {
      const index = Number(remove.dataset.remove); draft.splice(index, 1); dirty = true;
      editing = new Set([...editing].filter((i) => i !== index).map((i) => i > index ? i - 1 : i));
      renderRows(); $("#nagoldAdd").focus();
    }
  });
  $("#nagoldLedgerForm").onsubmit = (event) => {
    event.preventDefault();
    try {
      const state = getState();
      if (!state.profile.name || !state.profile.className.trim()) throw new Error("Bitte zuerst dein Schülerkürzel und deine Klasse im Profil speichern.");
      const changes = ledgerChanges(state, draft);
      if (!persistLedger(changes)) throw new Error("Speichern nicht möglich. Deine Tabellenänderungen stehen noch in diesem Dialog und sind noch nicht in der JSON-Sicherung enthalten. Lass den Dialog offen und versuche das Speichern erneut, wenn der Speicher verfügbar ist.");
      dirty = false; refresh(); dialog.close(); notify("NAGOLD-Tabelle gespeichert.");
    } catch (error) {
      $("#nagoldError").textContent = error.message;
      if (Number.isInteger(error.row)) {
        editing.add(error.row); renderRows();
        const field = $(`#nagoldRows [data-ledger-row="${error.row}"] [data-field="${error.field || "purpose"}"]`);
        field?.setAttribute("aria-invalid", "true");
        field?.setAttribute("aria-describedby", "nagoldError");
        field?.focus();
      }
    }
  };
  // Escape and the close button ask before unsaved changes are discarded.
  dialog.addEventListener("cancel", (event) => {
    if (dirty && !confirm("Deine Änderungen an der NAGOLD-Tabelle sind noch nicht gespeichert. Verwerfen?"))
      event.preventDefault();
  });
  dialog.addEventListener("close", () => {
    draft = []; editing.clear(); dirty = false; $("#nagoldRows").replaceChildren();
    if ($("#profileDialog").open) $("#profileNagold").focus();
  });
  $("#profileInfoButton").onclick = () => $("#profileHelpDialog").showModal();
  return { refresh, open };
}
