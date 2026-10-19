import { lessons, byId } from "./content.js";
import { nagoldRows } from "./nagold.js";
import { normalizePages, MAX_PAGES, HTML_MAX, CSS_MAX } from "./pages.js";
export const STORAGE_KEY = "weblab-state-v3";
// File preflight must cover every supported draft, even with JSON escapes
// (up to six bytes per UTF-16 unit). Extra room covers notes, NAGOLD and metadata.
// Browser storage quota remains separate and import is transactional on failure.
export const BACKUP_MAX_BYTES =
  (lessons.length + 1) * ((MAX_PAGES + 1) * HTML_MAX + CSS_MAX) * 6 + 4000000;
export const blank = () => ({
  profile: { name: "", className: "" },
  drafts: {},
  completed: [],
  completedAt: {},
  checks: {},
  quiz: {},
  notes: {},
  nagoldEntries: [],
  nagoldOverrides: {},
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
    if (record(d)) {
      s.drafts[l.id] = { html: clip(d.html, HTML_MAX), css: clip(d.css, CSS_MAX) };
      const pages = normalizePages(d.pages);
      if (pages.length) s.drafts[l.id].pages = pages;
    }
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
  if (record(raw.drafts?.lab)) {
    s.drafts.lab = {
      html: clip(raw.drafts.lab.html, HTML_MAX),
      css: clip(raw.drafts.lab.css, CSS_MAX),
    };
    const pages = normalizePages(raw.drafts.lab.pages);
    if (pages.length) s.drafts.lab.pages = pages;
  }
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
  if (record(raw.nagoldOverrides)) {
    for (const id of s.completed) {
      const entry = raw.nagoldOverrides[id];
      if (entry === null) s.nagoldOverrides[id] = null;
      else if (record(entry) && Number.isInteger(entry.points) && entry.points !== 0 && entry.points >= -10 && entry.points <= 5 &&
        typeof entry.purpose === "string" && entry.purpose.trim() &&
        (entry.at === "" || (typeof entry.at === "string" && Number.isFinite(Date.parse(entry.at))))) {
        s.nagoldOverrides[id] = { purpose: clip(entry.purpose.trim(), 160), points: entry.points, at: entry.at ? new Date(entry.at).toISOString() : "" };
      }
    }
  }
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
    css: clip(raw.css, CSS_MAX),
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
  nagoldRows(s).reduce((n, e) => n + e.points, 0);
// Only the uninterrupted learning chain earns unlock XP. Legacy/bonus points
// and previously completed lessons after a gap must never skip that gap.
export function lessonAccess(s, id) {
  const index = lessons.findIndex((lesson) => lesson.id === id);
  let prefix = 0;
  while (prefix < lessons.length && s.completed.includes(lessons[prefix].id))
    prefix++;
  return {
    unlocked: index >= 0 && index <= prefix,
    requiredXP: index >= 0 ? index * 100 : null,
    earnedXP: prefix * 100,
    nextId: lessons[prefix]?.id || null,
  };
}
export function complete(s, id) {
  const l = byId(id);
  if (
    !l ||
    !lessonAccess(s, id).unlocked ||
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
