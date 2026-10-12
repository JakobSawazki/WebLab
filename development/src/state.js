import { lessons, byId } from "./content.js";
export const STORAGE_KEY = "weblab-state-v3";
export const blank = () => ({
  profile: { name: "", className: "" },
  drafts: {},
  completed: [],
  completedAt: {},
  checks: {},
  quiz: {},
  notes: {},
  nagoldEntries: [],
  legacy: null,
});
const record = (x) => x && typeof x === "object" && !Array.isArray(x);
const clip = (x, n) => (typeof x === "string" ? x.slice(0, n) : "");
export const validProfile = (name) => /^[A-ZÄÖÜ]{3}\.[A-ZÄÖÜ]{3}$/u.test(name);
export function normalize(raw) {
  if (!record(raw)) throw new Error("Die Sicherung enthält keinen Lernstand.");
  const s = blank();
  s.profile = {
    name: clip(raw.profile?.name, 7).toUpperCase(),
    className: clip(raw.profile?.className, 20),
  };
  if (!validProfile(s.profile.name)) s.profile.name = "";
  for (const l of lessons) {
    const d = raw.drafts?.[l.id];
    if (record(d))
      s.drafts[l.id] = { html: clip(d.html, 1500000), css: clip(d.css, 40000) };
    if (Array.isArray(raw.checks?.[l.id]))
      s.checks[l.id] = l.checks.map((_, i) => raw.checks[l.id][i] === true);
    if (raw.quiz?.[l.id] === true) s.quiz[l.id] = true;
    if (typeof raw.notes?.[l.id] === "string")
      s.notes[l.id] = clip(raw.notes[l.id], 12000);
    if (
      typeof raw.completedAt?.[l.id] === "string" &&
      Number.isFinite(Date.parse(raw.completedAt[l.id]))
    )
      s.completedAt[l.id] = new Date(raw.completedAt[l.id]).toISOString();
  }
  if (record(raw.drafts?.lab))
    s.drafts.lab = {
      html: clip(raw.drafts.lab.html, 1500000),
      css: clip(raw.drafts.lab.css, 40000),
    };
  s.completed = [
    ...new Set(
      Array.isArray(raw.completed)
        ? raw.completed.filter((id) => byId(id))
        : [],
    ),
  ];
  s.nagoldEntries = (Array.isArray(raw.nagoldEntries) ? raw.nagoldEntries : [])
    .slice(0, 1000)
    .flatMap((e) => {
      if (
        !record(e) ||
        !Number.isInteger(e.points) ||
        e.points === 0 ||
        e.points < -10 ||
        e.points > 5 ||
        typeof e.purpose !== "string" ||
        !e.purpose.trim() ||
        !Number.isFinite(Date.parse(e.at))
      )
        return [];
      return [
        {
          points: e.points,
          purpose: clip(e.purpose, 160),
          at: new Date(e.at).toISOString(),
        },
      ];
    });
  if (record(raw.legacy))
    s.legacy = {
      profile: clip(raw.legacy.profile, 7),
      html: clip(raw.legacy.html, 20000),
      completed: [
        ...new Set(
          (Array.isArray(raw.legacy.completed)
            ? raw.legacy.completed
            : []
          ).filter((x) =>
            ["headline", "paragraph", "strong", "breaks"].includes(x),
          ),
        ),
      ],
    };
  return s;
}
export function migrateOld(raw) {
  if (!record(raw)) throw new Error("Ungültiger alter Lernstand.");
  const s = blank();
  s.profile.name = clip(raw.profile, 7).toUpperCase();
  if (!validProfile(s.profile.name)) s.profile.name = "";
  s.legacy = {
    profile: clip(raw.profile, 7),
    html: clip(raw.html, 20000),
    completed: Array.isArray(raw.completed) ? raw.completed : [],
  };
  s.drafts.l1 = {
    html: clip(raw.html, 20000) || byId("l1").starter,
    css: clip(raw.css, 40000),
  };
  return normalize(s);
}
export function importBackup(raw) {
  if (!record(raw) || raw.app !== "WebLab")
    throw new Error("Bitte eine WebLab-Lernstandsdatei auswählen.");
  if (raw.formatVersion === 3) return normalize(raw.state);
  if ([1, 2].includes(raw.formatVersion)) return migrateOld(raw.state);
  throw new Error("Diese Sicherungsversion wird nicht unterstützt.");
}
export const exportBackup = (state) => ({
  app: "WebLab",
  formatVersion: 3,
  exportedAt: new Date().toISOString(),
  state: normalize(state),
});
export const xp = (s) =>
  s.completed.length * 100 +
  (s.legacy?.completed || []).reduce(
    (n, id) =>
      n + ({ headline: 60, paragraph: 80, strong: 80, breaks: 100 }[id] || 0),
    0,
  );
export const nagold = (s) =>
  s.completed.length * 5 + s.nagoldEntries.reduce((n, e) => n + e.points, 0);
export function complete(s, id) {
  const l = byId(id);
  if (
    !l ||
    !validProfile(s.profile.name) ||
    !s.profile.className.trim() ||
    s.completed.includes(id) ||
    !s.quiz[id] ||
    !l.checks.every((_, i) => s.checks[id]?.[i])
  )
    return false;
  s.completed.push(id);
  s.completedAt[id] = new Date().toISOString();
  return true;
}
// Origin-Wechsel übernehmen localStorage nicht automatisch; JSON-Sicherungen schon.
export function load(storage) {
  const current = storage.getItem(STORAGE_KEY);
  if (current) return normalize(JSON.parse(current));
  const old = storage.getItem("weblab-state-v1");
  return old ? migrateOld(JSON.parse(old)) : blank();
}
