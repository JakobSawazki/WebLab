import test from "node:test";
import assert from "node:assert/strict";
import { blank, nagold, xp, lessonAccess, exportBackup, importBackup, normalize } from "../src/state.js";
import { nagoldRows, ledgerDraft, ledgerChanges } from "../src/nagold.js";

const fixture = () => ({ ...blank(), profile: { name: "MUS.MAX", className: "TEST" }, completed: ["l1", "l2"], completedAt: { l1: "2026-10-14T08:10:32.456Z" }, nagoldEntries: [{ at: "2026-10-13T10:35:21.123Z", purpose: "Mitarbeit", points: 3 }] });

test("Existing automatic and manual NAGOLD retain their balance and exact timestamps", () => {
  const state = fixture();
  assert.equal(nagold(state), 13);
  const draft = ledgerDraft(state), next = { ...state, ...ledgerChanges(state, draft) };
  assert.deepEqual(nagoldRows(next), nagoldRows(state));
  assert.equal(next.nagoldEntries[0].at, state.nagoldEntries[0].at);
  assert.equal(next.nagoldOverrides.l2.at, "");
  assert.deepEqual(nagoldRows(importBackup(exportBackup(next))), nagoldRows(next));
});

test("Editing and deleting award entries never changes XP or lesson access and survives backups", () => {
  const state = fixture(), draft = ledgerDraft(state), beforeAccess = lessonAccess(state, "l3");
  draft[0].points = -2; draft[0].purpose = "Korrektur"; draft.splice(1, 1);
  const next = { ...state, ...ledgerChanges(state, draft) };
  assert.equal(nagold(next), 1);
  assert.equal(xp(next), 200);
  assert.deepEqual(lessonAccess(next, "l3"), beforeAccess);
  const restored = importBackup(exportBackup(next));
  assert.equal(nagold(restored), 1);
  assert.equal(restored.nagoldOverrides.l2, null);
  assert.equal(nagoldRows(restored).filter(row => row.lessonId === "l2").length, 0);
  restored.completed.push("l3");
  assert.equal(nagold(restored), 6);
});

test("Ledger rejects invalid points, dates, duplicate lessons and excessive manual entries", () => {
  const state = fixture();
  for (const points of [0, -11, 6, 1.5, NaN]) {
    const draft = ledgerDraft(state); draft[0].points = points;
    assert.throws(() => ledgerChanges(state, draft));
  }
  for (const patch of [{ date: "2026-02-30" }, { time: "25:10" }, { purpose: " " }, { purpose: "x".repeat(161) }, { lessonId: "l16" }]) {
    const draft = ledgerDraft(state); Object.assign(draft[0], patch);
    assert.throws(() => ledgerChanges(state, draft));
  }
  assert.throws(() => ledgerChanges(state, [...ledgerDraft(state), ledgerDraft(state)[0]]));
  const manual = { ...ledgerDraft(state)[2] };
  assert.throws(() => ledgerChanges(state, Array.from({length:1001}, () => ({...manual}))));
});

test("Malformed or unknown imported overrides cannot invent awards or erase completions", () => {
  const state = fixture();
  const next = normalize({ ...state, nagoldOverrides: { l1: { points: 100, purpose: "fake", at: "" }, l2: null, l16: null, stranger: null } });
  assert.deepEqual(next.completed, state.completed);
  assert.equal(nagold(next), 8);
  assert.deepEqual(next.nagoldOverrides, { l2: null });
});

test("Invalid ledger rows name the row and the field that needs correcting", () => {
  const state = fixture(), cases = [
    [{ purpose: " ", points: 2 }, "purpose"],
    [{ purpose: "Mitarbeit", points: 0 }, "points"],
    [{ purpose: "Mitarbeit", points: 2, date: "", time: "10:00" }, "date"],
    [{ purpose: "Mitarbeit", points: 2, date: "2026-10-14", time: "" }, "time"],
  ];
  for (const [change, field] of cases) {
    const draft = ledgerDraft(state);
    draft.push({ date: "2026-10-14", time: "09:00", originalAt: "", ...change });
    assert.throws(() => ledgerChanges(state, draft), (error) =>
      error.row === draft.length - 1 && error.field === field && error.message.startsWith(`Zeile ${draft.length}:`));
  }
});
