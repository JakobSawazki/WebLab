import { byId } from "./content.js";

// Completion XP and access stay independent of this editable points ledger.
export function nagoldRows(state) {
  const automatic = state.completed.flatMap((id) => {
    const override = state.nagoldOverrides?.[id];
    if (override === null) return [];
    return [{
      ...(override || { purpose: byId(id).title, points: 5, at: state.completedAt[id] || "" }),
      lessonId: id,
    }];
  });
  return [...automatic, ...state.nagoldEntries.map((row) => ({ ...row }))];
}

export function localStamp(at) {
  if (!at) return { date: "", time: "" };
  const d = new Date(at), pad = (n) => String(n).padStart(2, "0");
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

export function ledgerDraft(state) {
  return nagoldRows(state).map((row) => ({ ...row, ...localStamp(row.at), originalAt: row.at }));
}

export function ledgerChanges(state, draft) {
  if (!Array.isArray(draft) || draft.length > 1016)
    throw new Error("Maximal 1000 eigene Einträge und 16 Einheiten.");
  const nagoldEntries = [], nagoldOverrides = Object.fromEntries(state.completed.map((id) => [id, null]));
  const seen = new Set();
  for (const [index, row] of draft.entries()) {
    // row/field let the table focus the input that needs correcting.
    const error = (message, field) => { throw Object.assign(new Error(`Zeile ${index + 1}: ${message}`), { row: index, field }); };
    if (typeof row.purpose !== "string" || !row.purpose.trim() || row.purpose.trim().length > 160)
      error("Bitte einen Anlass mit höchstens 160 Zeichen angeben.", "purpose");
    if (!Number.isInteger(row.points) || row.points === 0 || row.points < -10 || row.points > 5)
      error("Bitte ganze NAGOLD von −10 bis +5 eintragen; 0 ist kein Eintrag.", "points");
    if (row.lessonId && (!state.completed.includes(row.lessonId) || seen.has(row.lessonId)))
      error("Die Zuordnung zur abgeschlossenen Einheit ist ungültig.");
    let at;
    const unchanged = row.originalAt && Number.isFinite(Date.parse(row.originalAt)) &&
      row.date === localStamp(row.originalAt).date && row.time === localStamp(row.originalAt).time;
    if (unchanged) at = new Date(row.originalAt).toISOString();
    else if (row.lessonId && !state.completedAt[row.lessonId] && row.originalAt === "" && row.date === "" && row.time === "") at = "";
    else {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(row.time))
        error("Bitte ein gültiges Datum und eine Uhrzeit angeben.", /^\d{4}-\d{2}-\d{2}$/.test(row.date) ? "time" : "date");
      const parsed = new Date(`${row.date}T${row.time}:00`);
      if (!Number.isFinite(parsed.getTime()) || localStamp(parsed.toISOString()).date !== row.date || localStamp(parsed.toISOString()).time !== row.time)
        error("Datum oder Uhrzeit ist ungültig.", "date");
      at = parsed.toISOString();
    }
    const entry = { purpose: row.purpose.trim(), points: row.points, at };
    if (row.lessonId) { seen.add(row.lessonId); nagoldOverrides[row.lessonId] = entry; }
    else nagoldEntries.push(entry);
  }
  if (nagoldEntries.length > 1000) throw new Error("Maximal 1000 eigene Einträge.");
  return { nagoldEntries, nagoldOverrides };
}
