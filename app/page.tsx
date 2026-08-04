"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type MissionId = "headline" | "paragraph" | "strong" | "breaks";

type LearningState = {
  profile: string;
  html: string;
  css: string;
  completed: MissionId[];
  updatedAt: string;
};

type DeviceInfo = {
  id: string;
  createdAt: string;
};

type TransferAudit = {
  sourceDeviceId: string;
  importedAt: string;
};

const VERSION = "0.3.0";
const VERSION_HISTORY = [
  { version: "0.3.0", date: "04.08.2026", text: "Navigation zusammengeführt, Schnellzugriff auf Sichern und Laden, lokale Gerätekennung sowie aufklappbare Versionsinformationen ergänzt." },
  { version: "0.2.0", date: "04.08.2026", text: "Blau-metallisches Design, Dark und Light Mode, Kapitelmenü, neues Logo und fotorealistische Kapitelgrafik umgesetzt." },
  { version: "0.1.0", date: "04.08.2026", text: "Erste vollständige Fassung von Kapitel 01 mit HTML-Studio, vier Missionen, XP und lokalem Lernstand veröffentlicht." },
];

const STARTER_HTML = `<h1>Meine erste Webseite</h1>

<p>Hier entsteht meine persönliche Seite.</p>`;

const STARTER_CSS = `body {
  font-family: Arial, sans-serif;
}`;

const MISSION_POINTS: Record<MissionId, number> = {
  headline: 60,
  paragraph: 80,
  strong: 80,
  breaks: 100,
};

const MISSIONS: Array<{
  id: MissionId;
  step: string;
  title: string;
  text: string;
  hint: string;
}> = [
  {
    id: "headline",
    step: "01",
    title: "Stell dich vor",
    text: "Schreibe deinen Namen als Hauptüberschrift.",
    hint: "Ersetze den Text zwischen <h1> und </h1> durch deinen Namen.",
  },
  {
    id: "paragraph",
    step: "02",
    title: "Schreibe einen kurzen Satz",
    text: "Ergänze einen Absatz mit mindestens 25 Zeichen über dich.",
    hint: "Ein Absatz beginnt mit <p> und endet mit </p>.",
  },
  {
    id: "strong",
    step: "03",
    title: "Betone etwas Wichtiges",
    text: "Hebe in deinem Absatz ein wichtiges Wort mit <strong> hervor.",
    hint: "Du kannst <strong> mitten in einem Absatz verwenden.",
  },
  {
    id: "breaks",
    step: "04",
    title: "Ordne mehrere Zeilen",
    text: "Ergänze zwei Zeilenumbrüche mit <br>, zum Beispiel für Ort und Schule.",
    hint: "<br> steht allein und benötigt kein End-Tag. Verwende es mindestens zweimal.",
  },
];

const TAGS = [
  { tag: "h1", name: "Hauptüberschrift", note: "Sie zeigt sofort, worum es auf der Seite geht.", example: "<h1>Meine erste Webseite</h1>" },
  { tag: "p", name: "Absatz", note: "Er fasst zusammengehörende Sätze zu einem Textblock zusammen.", example: "<p>Das ist mein erster Absatz.</p>" },
  { tag: "strong", name: "Wichtiger Inhalt", note: "Damit markierst du ein Wort oder einen Satzteil als wichtig.", example: "<strong>Das ist wichtig</strong>" },
  { tag: "br", name: "Zeilenumbruch", note: "Er beginnt eine neue Zeile und braucht ausnahmsweise kein End-Tag.", example: "Stuttgart<br>Baden-Württemberg" },
];

const CHAPTER_GROUPS = [
  {
    title: "HTML verstehen",
    chapters: [
      { number: "01", title: "Deine erste Webseite", status: "active" },
      { number: "02", title: "Attribute richtig nutzen", status: "planned" },
      { number: "03", title: "Text sinnvoll strukturieren", status: "planned" },
      { number: "04", title: "Links und Bilder", status: "planned" },
    ],
  },
  {
    title: "CSS gestalten",
    chapters: [
      { number: "05", title: "Dein erstes CSS", status: "planned" },
      { number: "06", title: "Farben und Schriften", status: "planned" },
      { number: "07", title: "Abstände und Boxen", status: "planned" },
      { number: "08", title: "Moderne Layouts", status: "planned" },
    ],
  },
  {
    title: "Web-Projekte",
    chapters: [
      { number: "09", title: "Persönliche Profilseite", status: "planned" },
      { number: "10", title: "Campus Dashboard", status: "planned" },
    ],
  },
];

function makeInitialState(): LearningState {
  return { profile: "", html: STARTER_HTML, css: STARTER_CSS, completed: [], updatedAt: new Date().toISOString() };
}

function makeDeviceInfo(): DeviceInfo {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `weblab-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  return { id, createdAt: new Date().toISOString() };
}

function parseStudentHtml(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

function missionPassed(id: MissionId, html: string) {
  const document = parseStudentHtml(html);
  if (id === "headline") {
    const title = document.querySelector("h1")?.textContent?.trim() ?? "";
    return title.length >= 4 && title.toLowerCase() !== "meine erste webseite";
  }
  if (id === "paragraph") {
    return [...document.querySelectorAll("p")].some((node) => (node.textContent?.trim().length ?? 0) >= 25);
  }
  if (id === "strong") return Boolean(document.querySelector("strong"));
  return document.querySelectorAll("br").length >= 2;
}

export default function Home() {
  const [state, setState] = useState<LearningState>(makeInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [activeFile, setActiveFile] = useState<"html" | "css">("html");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [previewKey, setPreviewKey] = useState(0);
  const [coachOpen, setCoachOpen] = useState(false);
  const [coachMessage, setCoachMessage] = useState("Ich schaue mir deinen Code an und gebe dir einen kleinen nächsten Schritt – nie sofort die ganze Lösung.");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState("");
  const [profileError, setProfileError] = useState("");
  const [device, setDevice] = useState<DeviceInfo>({ id: "", createdAt: "" });
  const [transferAudit, setTransferAudit] = useState<TransferAudit | null>(null);
  const [versionOpen, setVersionOpen] = useState(false);
  const [toast, setToast] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("weblab-theme-v1");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    let nextDevice = makeDeviceInfo();
    const savedDevice = localStorage.getItem("weblab-device-v1");
    if (savedDevice) {
      try {
        const parsedDevice = JSON.parse(savedDevice) as Partial<DeviceInfo>;
        if (typeof parsedDevice.id === "string" && parsedDevice.id.length >= 8) {
          nextDevice = {
            id: parsedDevice.id,
            createdAt: typeof parsedDevice.createdAt === "string" ? parsedDevice.createdAt : new Date().toISOString(),
          };
        }
      } catch {
        localStorage.removeItem("weblab-device-v1");
      }
    }
    localStorage.setItem("weblab-device-v1", JSON.stringify(nextDevice));
    setDevice(nextDevice);
    const savedTransferAudit = localStorage.getItem("weblab-transfer-audit-v1");
    if (savedTransferAudit) {
      try {
        const parsedAudit = JSON.parse(savedTransferAudit) as Partial<TransferAudit>;
        if (typeof parsedAudit.sourceDeviceId === "string" && typeof parsedAudit.importedAt === "string") {
          setTransferAudit({ sourceDeviceId: parsedAudit.sourceDeviceId, importedAt: parsedAudit.importedAt });
        }
      } catch {
        localStorage.removeItem("weblab-transfer-audit-v1");
      }
    }
    const saved = localStorage.getItem("weblab-state-v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<LearningState>;
        setState({
          profile: typeof parsed.profile === "string" ? parsed.profile : "",
          html: typeof parsed.html === "string" && !parsed.html.includes("profile-card") ? parsed.html : STARTER_HTML,
          css: STARTER_CSS,
          completed: Array.isArray(parsed.completed)
            ? parsed.completed.filter((id): id is MissionId => MISSIONS.some((mission) => mission.id === id))
            : [],
          updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
        });
      } catch {
        localStorage.removeItem("weblab-state-v1");
      }
    }
    setHydrated(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("weblab-theme-v1", nextTheme);
  }

  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => {
      localStorage.setItem("weblab-state-v1", JSON.stringify({ ...state, updatedAt: new Date().toISOString() }));
    }, 300);
    return () => window.clearTimeout(timer);
  }, [state, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const xp = useMemo(() => state.completed.reduce((sum, id) => sum + MISSION_POINTS[id], 0), [state.completed]);
  const progress = Math.round((state.completed.length / MISSIONS.length) * 100);
  const preview = useMemo(
    () => `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${state.css}</style></head><body>${state.html}</body></html>`,
    // previewKey is the deliberate run trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.html, state.css, previewKey],
  );

  function updateCode(value: string) {
    setState((current) => ({ ...current, [activeFile]: value, updatedAt: new Date().toISOString() }));
  }

  function runPreview() {
    setPreviewKey((value) => value + 1);
    setToast("Vorschau aktualisiert");
  }

  function checkMission(id: MissionId) {
    if (!missionPassed(id, state.html)) {
      const mission = MISSIONS.find((item) => item.id === id);
      setCoachMessage(mission?.hint ?? "Prüfe die Aufgabe noch einmal.");
      setCoachOpen(true);
      setToast("Fast – der Coach hat einen Hinweis für dich");
      return;
    }
    if (!state.completed.includes(id)) {
      setState((current) => ({ ...current, completed: [...current.completed, id], updatedAt: new Date().toISOString() }));
      setToast(`Geschafft! +${MISSION_POINTS[id]} XP`);
    } else {
      setToast("Schon gelöst – stark!");
    }
  }

  function askCoach() {
    const next = MISSIONS.find((mission) => !state.completed.includes(mission.id));
    if (!state.html.includes("<h1")) {
      setCoachMessage("Deiner Seite fehlt noch die wichtigste Überschrift. Starte mit <h1> und schließe sie mit </h1>.");
    } else if (next) {
      setCoachMessage(`${next.title}: ${next.hint} Probiere es aus und prüfe danach genau diese Mission.`);
    } else {
      setCoachMessage("Alle vier Missionen sind gelöst. Speichere deinen Lernstand und freue dich auf Kapitel 02 – dort lernst du Attribute kennen.");
    }
    setCoachOpen(true);
  }

  function saveProfile() {
    const value = profileDraft.trim().toLowerCase();
    if (!/^\p{L}{3}\.\p{L}{3}$/u.test(value)) {
      setProfileError("Nutze genau drei Buchstaben, Punkt, drei Buchstaben – zum Beispiel max.mus.");
      return;
    }
    setState((current) => ({ ...current, profile: value, updatedAt: new Date().toISOString() }));
    setProfileOpen(false);
    setProfileError("");
    setToast("Profil gespeichert");
  }

  function exportProgress() {
    const payload = {
      app: "WebLab",
      appVersion: VERSION,
      formatVersion: 2,
      exportedAt: new Date().toISOString(),
      device: {
        ...device,
        platform: navigator.platform || "unbekannt",
        browser: navigator.userAgent,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
      },
      transferAudit,
      state,
    };
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    link.download = `weblab-${state.profile || "lernstand"}.weblab`;
    link.click();
    URL.revokeObjectURL(link.href);
    setToast("Lernstand gespeichert");
  }

  function importProgress(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        if (payload.app !== "WebLab" || ![1, 2].includes(payload.formatVersion) || !payload.state) throw new Error("format");
        const sourceDeviceId = typeof payload.device?.id === "string" ? payload.device.id : "";
        let nextTransferAudit: TransferAudit | null = null;
        if (sourceDeviceId && device.id && sourceDeviceId !== device.id) {
          const loadForeignBackup = window.confirm("Diese Sicherung wurde auf einem anderen Gerät erstellt. Möchtest du sie trotzdem laden?");
          if (!loadForeignBackup) {
            setToast("Laden abgebrochen: anderes Gerät");
            event.target.value = "";
            return;
          }
          nextTransferAudit = { sourceDeviceId, importedAt: new Date().toISOString() };
        } else if (typeof payload.transferAudit?.sourceDeviceId === "string" && typeof payload.transferAudit?.importedAt === "string") {
          nextTransferAudit = payload.transferAudit as TransferAudit;
        }
        const imported = payload.state as LearningState;
        setState({
          profile: typeof imported.profile === "string" ? imported.profile : "",
          html: typeof imported.html === "string" ? imported.html : STARTER_HTML,
          css: STARTER_CSS,
          completed: Array.isArray(imported.completed)
            ? imported.completed.filter((id): id is MissionId => MISSIONS.some((mission) => mission.id === id))
            : [],
          updatedAt: new Date().toISOString(),
        });
        setTransferAudit(nextTransferAudit);
        if (nextTransferAudit) localStorage.setItem("weblab-transfer-audit-v1", JSON.stringify(nextTransferAudit));
        else localStorage.removeItem("weblab-transfer-audit-v1");
        setToast(sourceDeviceId && device.id && sourceDeviceId !== device.id ? "Fremde Sicherung geladen" : "Lernstand geladen");
      } catch {
        setToast("Diese Datei gehört nicht zu WebLab");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  }

  function insertExample(example: string) {
    setActiveFile("html");
    setState((current) => ({ ...current, html: `${current.html}\n${example}`, updatedAt: new Date().toISOString() }));
    document.querySelector("#studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setToast("Beispiel in den Editor übernommen");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-main">
          <a className="brand" href="#start" aria-label="WebLab Startseite">
            <img className="brand-logo" src="/weblab-logo.png" alt="" />
            <span><strong>WebLab</strong><small>Build the web.</small></span>
          </a>
          <nav className="topnav" aria-label="Hauptnavigation">
            <a href="#start">Start</a>
            <div className="chapters-menu">
              <button className="chapters-trigger">Kapitel <span className="nav-chevron" aria-hidden="true" /></button>
              <div className="chapters-dropdown">
                <div className="dropdown-intro"><small>Lernpfad</small><strong>Kapitel auswählen</strong><p>Arbeite Schritt für Schritt. Neue Kapitel werden nach und nach freigeschaltet.</p></div>
                <div className="chapter-groups">
                  {CHAPTER_GROUPS.map((group) => (
                    <div className="chapter-category" key={group.title}>
                      <button>{group.title}<span className="category-chevron" aria-hidden="true" /></button>
                      <div className="chapter-submenu">
                        <small>{group.title}</small>
                        {group.chapters.map((chapter) => chapter.status === "active"
                          ? <a href="#start" className="active" key={chapter.number}><span>{chapter.number}</span><b>{chapter.title}</b><i>Aktiv</i></a>
                          : <div className="planned" key={chapter.number}><span>{chapter.number}</span><b>{chapter.title}</b><i>Geplant</i></div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href="#studio">Studio</a>
            <a href="#missionen">Fortschritt</a>
          </nav>
          <div className="top-actions">
            <div className="top-chapter-progress" title="Kapitel 01 von 10"><span className="progress-long">Kapitel 01 von 10</span><span className="progress-short">01/10</span><i><u style={{ width: "10%" }} /></i></div>
            <div className="xp-pill"><span>✦</span><b>{xp}</b> XP</div>
            <button className="action-button save-button" onClick={exportProgress} aria-label="Lernstand speichern" title="Lernstand speichern"><span aria-hidden="true">↓</span></button>
            <button className="action-button load-button" onClick={() => fileInput.current?.click()} aria-label="Lernstand laden" title="Lernstand laden"><span aria-hidden="true">↑</span></button>
            <button className="action-button theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? "Light Mode aktivieren" : "Dark Mode aktivieren"} title={theme === "dark" ? "Light Mode" : "Dark Mode"}>
              <span>{theme === "dark" ? "☀" : "☾"}</span>
            </button>
            <button className="action-button profile-button" onClick={() => { setProfileDraft(state.profile); setProfileOpen(true); }} aria-label={state.profile ? `Profil ${state.profile} öffnen` : "Kürzel anlegen"} title={state.profile || "Kürzel anlegen"}>
              <span>{state.profile ? state.profile.slice(0, 2).toUpperCase() : "+"}</span>
            </button>
            <input ref={fileInput} type="file" accept=".weblab,application/json,.json" onChange={importProgress} hidden />
          </div>
        </div>
        <div className="chapter-context" aria-label="Aktueller Lernort">
          <div className="breadcrumbs"><span>HTML verstehen</span><span className="breadcrumb-chevron" aria-hidden="true">›</span><strong>01 · Deine erste Webseite</strong></div>
        </div>
      </header>

      <main>
        <section className="hero" id="start">
          <div className="hero-copy">
            <div className="chapter-label"><span>Kapitel 01</span><i></i><span>HTML verstehen · Einstieg</span></div>
            <h1>Deine erste<br /><em>Webseite.</em></h1>
            <p>Du brauchst keine Vorkenntnisse. In diesem Kapitel baust du aus einfachen HTML-Bausteinen eine echte Seite – und siehst jede Änderung sofort.</p>
            <div className="hero-actions">
              <a className="button primary" href="#verstehen">Kapitel starten <span>↓</span></a>
              <button className="button ghost" onClick={askCoach}>✦ Lerncoach fragen</button>
            </div>
            <div className="chapter-facts">
              <span><b>25</b> min</span><span><b>4</b> Missionen</span><span><b>320</b> XP</span>
            </div>
          </div>
          <div className="hero-art">
            <img src="/weblab-hero.png" alt="Fotorealistischer Web-Arbeitsplatz mit HTML-Code und Browser-Vorschau" />
            <div className="floating-progress"><span>Kapitel-Fortschritt</span><b>{progress}%</b><i><u style={{ width: `${progress}%` }} /></i></div>
          </div>
        </section>

        <section className="outcomes section-pad" aria-labelledby="outcome-title">
          <div className="section-kicker">Dein Ziel</div>
          <h2 id="outcome-title">Am Ende kannst du …</h2>
          <div className="outcome-grid">
            <article><span>01</span><h3>Inhalte strukturieren</h3><p>Du weißt, warum Überschriften und Absätze unterschiedliche Aufgaben haben.</p></article>
            <article><span>02</span><h3>Tags sicher schreiben</h3><p>Du erkennst Start-Tag, Inhalt und End-Tag – und vermeidest typische Fehler.</p></article>
            <article><span>03</span><h3>Eine Seite bauen</h3><p>Du veränderst echten Code und gestaltest daraus deine persönliche erste Webseite.</p></article>
          </div>
        </section>

        <section className="explain section-pad" id="verstehen">
          <div className="explain-copy">
            <div className="section-kicker mint">Ganz einfach</div>
            <h2>HTML gibt Inhalten eine Bedeutung.</h2>
            <p className="lead">HTML ist keine Zaubersprache. Du markierst Inhalte und sagst dem Browser: „Das ist eine Überschrift“, „Das ist ein Absatz“ oder „Das ist besonders wichtig“.</p>
            <div className="analogy">
              <span className="analogy-icon">▦</span>
              <div><b>Denk an LEGO®-Bausteine.</b><p>Jeder Stein hat eine Aufgabe. Erst zusammen entsteht eine vollständige Seite.</p></div>
            </div>
          </div>
          <div className="tag-anatomy" aria-label="Aufbau eines HTML-Elements">
            <div className="tag-code"><span>&lt;h1&gt;</span><b>Meine erste Seite</b><span>&lt;/h1&gt;</span></div>
            <div className="tag-labels"><span>Start-Tag</span><span>Inhalt</span><span>End-Tag</span></div>
            <div className="browser-result">
              <div className="browser-bar"><i></i><i></i><i></i><span>meine-seite.html</span></div>
              <div className="browser-body"><small>Das sieht der Browser:</small><strong>Meine erste Seite</strong></div>
            </div>
          </div>
        </section>

        <section className="rules section-pad">
          <div className="section-head"><div><div className="section-kicker coral">Drei Regeln reichen</div><h2>So bleibt dein Code sauber.</h2></div><p>Du musst nicht alles auswendig lernen. Achte zuerst nur auf diese drei Dinge.</p></div>
          <div className="rule-grid">
            <article><span>1</span><div><h3>Klammern gehören dazu</h3><code>&lt;tag&gt;</code><p>Tags stehen in spitzen Klammern.</p></div></article>
            <article><span>2</span><div><h3>Meistens gibt es ein Ende</h3><code>&lt;p&gt;Text&lt;/p&gt;</code><p>Im End-Tag steht zusätzlich ein Schrägstrich.</p></div></article>
            <article><span>3</span><div><h3>Sauber ineinander bauen</h3><code>&lt;p&gt;&lt;strong&gt;Wow&lt;/strong&gt;&lt;/p&gt;</code><p>Was innen beginnt, endet auch zuerst.</p></div></article>
          </div>
        </section>

        <section className="tag-library section-pad" id="bausteine">
          <div className="section-head"><div><div className="section-kicker violet">Spickzettel für Kapitel 01</div><h2>Vier HTML-Bausteine für heute.</h2></div><p>Mehr brauchst du in diesem Kapitel noch nicht. Klicke auf „Einsetzen“, um ein Beispiel direkt im Studio auszuprobieren.</p></div>
          <div className="tag-grid">
            {TAGS.map((item, index) => (
              <article className="tag-card" key={item.tag}>
                <div className="tag-card-top"><code>&lt;{item.tag}&gt;</code><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{item.name}</h3><p>{item.note}</p><pre>{item.example}</pre>
                <button onClick={() => insertExample(item.example)}>Im Studio einsetzen <span>↘</span></button>
              </article>
            ))}
          </div>
          <div className="next-chapter-note">
            <div><span>02</span></div>
            <div><small>Ausblick</small><h3>Attribute kommen im nächsten Kapitel.</h3><p>Dann lernst du, wie ein HTML-Element zusätzliche Informationen erhält. Wir gehen bewusst Schritt für Schritt.</p></div>
            <span className="next-lock">Noch gesperrt</span>
          </div>
        </section>

        <section className="studio-section" id="studio">
          <div className="studio-intro section-pad"><div className="section-kicker mint">WebLab Studio · Nur HTML</div><h2>Jetzt bist du dran.</h2><p>Ändere links den HTML-Code. CSS erklären wir erst in einem späteren Kapitel.</p></div>
          <div className="studio">
            <div className="editor-pane">
              <div className="pane-bar">
                <div className="file-tabs">
                  <button className={activeFile === "html" ? "active" : ""} onClick={() => setActiveFile("html")}><span className="html-dot">◇</span> index.html</button>
                  <button className="locked-file" disabled title="CSS wird in Kapitel 05 erklärt"><span className="css-dot">#</span> style.css <small>Kapitel 05</small></button>
                </div>
                <button className="run-button" onClick={runPreview}>▶ Ausführen</button>
              </div>
              <div className="editor-wrap">
                <div className="line-numbers" aria-hidden="true">{state.html.split("\n").map((_, index) => <span key={index}>{index + 1}</span>)}</div>
                <textarea aria-label="HTML-Editor" spellCheck={false} value={state.html} onChange={(event) => updateCode(event.target.value)} />
              </div>
              <div className="editor-status"><span><i></i> automatisch lokal gespeichert</span><span>HTML</span></div>
            </div>
            <div className="preview-pane">
              <div className="pane-bar preview-bar"><span>Live-Vorschau</span><button onClick={runPreview} aria-label="Vorschau neu laden">↻</button></div>
              <iframe key={previewKey} title="Vorschau deiner Webseite" sandbox="" srcDoc={preview} />
            </div>
          </div>
        </section>

        <section className="missions section-pad" id="missionen">
          <div className="section-head"><div><div className="section-kicker coral">Challenge</div><h2>Vier kleine Missionen.</h2></div><div className="mission-total"><span>{state.completed.length}/{MISSIONS.length}</span><p>geschafft</p></div></div>
          <div className="mission-list">
            {MISSIONS.map((mission) => {
              const done = state.completed.includes(mission.id);
              return <article className={done ? "mission done" : "mission"} key={mission.id}>
                <span className="mission-check">{done ? "✓" : mission.step}</span>
                <div><h3>{mission.title}</h3><p>{mission.text}</p></div>
                <b>+{MISSION_POINTS[mission.id]} XP</b>
                <button onClick={() => checkMission(mission.id)}>{done ? "Gelöst" : "Code prüfen"}</button>
              </article>;
            })}
          </div>
          <div className="save-card">
            <div><span>◎</span><div><h3>Dein Fortschritt gehört dir.</h3><p>WebLab speichert auf diesem Gerät. Mit einer Sicherungsdatei nimmst du deinen Lernstand mit.</p></div></div>
            <div className="save-actions"><button onClick={exportProgress}>↓ Lernstand speichern</button><button onClick={() => fileInput.current?.click()}>↑ Lernstand laden</button></div>
          </div>
        </section>
      </main>

      <footer><button className="brand footer-brand version-button" onClick={() => setVersionOpen(true)} aria-label={`Informationen zu WebLab Version ${VERSION}`}><img className="brand-logo" src="/weblab-logo.png" alt="" /><span><strong>WebLab</strong><small>Version {VERSION}</small></span></button><p>Lernen. Bauen. Verstehen.</p><span className="copyright">Designed by <a href="https://jakobsawazki.github.io/sawazki-electronics/" target="_blank" rel="noreferrer">Sawazki Electronics</a> · © 2026</span></footer>

      <button className="coach-fab" onClick={askCoach}><span>✦</span><div><b>Lerncoach</b><small>lokale Hilfe</small></div></button>
      {coachOpen && <aside className="coach-panel" aria-live="polite"><div className="coach-head"><span>✦</span><div><b>WebLab Lerncoach</b><small>Hinweis statt Lösung</small></div><button onClick={() => setCoachOpen(false)}>×</button></div><p>{coachMessage}</p><button onClick={() => setCoachOpen(false)}>Weiter ausprobieren</button><small>Der lokale Coach sendet keinen Code ins Internet.</small></aside>}

      {profileOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="profile-title"><div className="profile-modal"><button className="modal-close" onClick={() => setProfileOpen(false)} aria-label="Profil schließen">×</button><span className="modal-symbol">W</span><h2 id="profile-title">Dein WebLab-Profil</h2><p>Dein Kürzel und Lernstand bleiben auf diesem Gerät und werden in deiner Sicherung mitgenommen.</p><label htmlFor="profile">Kürzel</label><input id="profile" value={profileDraft} onChange={(event) => setProfileDraft(event.target.value)} placeholder="max.mus" maxLength={7} autoFocus /><small>Drei Buchstaben · Punkt · drei Buchstaben</small><div className={transferAudit ? "device-note foreign" : "device-note"}><span>Gerätekennung</span><code>{device.id ? device.id.slice(0, 8).toUpperCase() : "WIRD ERSTELLT"}</code><p>{transferAudit ? `Dieser Lernstand enthält eine Übertragung vom Gerät ${transferAudit.sourceDeviceId.slice(0, 8).toUpperCase()}.` : "Sie hilft zu erkennen, wenn eine Sicherung von einem anderen Gerät stammt."}</p></div>{profileError && <div className="form-error">{profileError}</div>}<button className="button primary modal-save" onClick={saveProfile}>Profil speichern</button></div></div>}
      {versionOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="version-title"><div className="profile-modal version-modal"><button className="modal-close" onClick={() => setVersionOpen(false)} aria-label="Versionsinformationen schließen">×</button><span className="modal-symbol">V</span><h2 id="version-title">WebLab Version {VERSION}</h2><p>Hier siehst du, was sich wann geändert hat.</p><div className="version-history">{VERSION_HISTORY.map((entry) => <article key={entry.version}><div><strong>Version {entry.version}</strong><time>{entry.date}</time></div><p>{entry.text}</p></article>)}</div></div></div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
