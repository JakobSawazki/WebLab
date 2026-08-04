"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type MissionId = "headline" | "paragraph" | "strong" | "list";

type LearningState = {
  profile: string;
  html: string;
  css: string;
  completed: MissionId[];
  updatedAt: string;
};

const STARTER_HTML = `<main class="profile-card">
  <p class="eyebrow">Meine erste Webseite</p>
  <h1>Hallo Web!</h1>
  <p>Hier entsteht meine persönliche Seite.</p>
</main>`;

const STARTER_CSS = `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  color: #172033;
  background: #dff8ee;
}

.profile-card {
  width: min(520px, 82vw);
  padding: 42px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 24px 70px rgba(28, 63, 52, .18);
}

.eyebrow {
  color: #657084;
  text-transform: uppercase;
  letter-spacing: .14em;
  font-size: 12px;
}`;

const MISSION_POINTS: Record<MissionId, number> = {
  headline: 60,
  paragraph: 80,
  strong: 80,
  list: 100,
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
    title: "Mach die Seite zu deiner",
    text: "Ersetze „Hallo Web!“ durch eine eigene Überschrift.",
    hint: "Ändere nur den Text zwischen <h1> und </h1>.",
  },
  {
    id: "paragraph",
    step: "02",
    title: "Erzähl etwas",
    text: "Schreibe einen Absatz mit mindestens 25 Zeichen.",
    hint: "Ein Absatz beginnt mit <p> und endet mit </p>.",
  },
  {
    id: "strong",
    step: "03",
    title: "Setze einen Fokus",
    text: "Hebe ein wichtiges Wort mit <strong> hervor.",
    hint: "Du kannst <strong> mitten in einem Absatz verwenden.",
  },
  {
    id: "list",
    step: "04",
    title: "Baue eine Liste",
    text: "Ergänze eine Liste mit mindestens drei Einträgen.",
    hint: "Nutze <ul> außen und für jeden Punkt ein <li>.",
  },
];

const TAGS = [
  { tag: "h1", name: "Hauptüberschrift", note: "Einmal pro Seite – sie sagt, worum es geht.", example: "<h1>Mein Lieblingsort</h1>" },
  { tag: "p", name: "Absatz", note: "Für normale, zusammenhängende Texte.", example: "<p>Hier beginnt mein Text.</p>" },
  { tag: "strong", name: "Wichtig", note: "Markiert einen inhaltlich wichtigen Teil.", example: "<strong>Unbedingt merken</strong>" },
  { tag: "a", name: "Link", note: "Verbindet deine Seite mit einem anderen Ziel.", example: "<a href=\"ziel.html\">Weiter</a>" },
  { tag: "img", name: "Bild", note: "Zeigt ein Bild; alt beschreibt es verständlich.", example: "<img src=\"bild.jpg\" alt=\"Berge\">" },
  { tag: "ul + li", name: "Liste", note: "ul sammelt, li enthält die einzelnen Punkte.", example: "<ul><li>Idee</li></ul>" },
  { tag: "section", name: "Bereich", note: "Gruppiert Inhalte, die thematisch zusammengehören.", example: "<section>…</section>" },
  { tag: "button", name: "Schaltfläche", note: "Eine Aktion, die später JavaScript auslösen kann.", example: "<button>Los geht’s</button>" },
];

function makeInitialState(): LearningState {
  return { profile: "", html: STARTER_HTML, css: STARTER_CSS, completed: [], updatedAt: new Date().toISOString() };
}

function parseStudentHtml(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

function missionPassed(id: MissionId, html: string) {
  const document = parseStudentHtml(html);
  if (id === "headline") {
    const title = document.querySelector("h1")?.textContent?.trim() ?? "";
    return title.length >= 4 && title.toLowerCase() !== "hallo web!";
  }
  if (id === "paragraph") {
    return [...document.querySelectorAll("p")].some((node) => (node.textContent?.trim().length ?? 0) >= 25);
  }
  if (id === "strong") return Boolean(document.querySelector("strong"));
  return document.querySelectorAll("ul li").length >= 3;
}

export default function Home() {
  const [state, setState] = useState<LearningState>(makeInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [activeFile, setActiveFile] = useState<"html" | "css">("html");
  const [previewKey, setPreviewKey] = useState(0);
  const [coachOpen, setCoachOpen] = useState(false);
  const [coachMessage, setCoachMessage] = useState("Ich schaue mir deinen Code an und gebe dir einen kleinen nächsten Schritt – nie sofort die ganze Lösung.");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState("");
  const [profileError, setProfileError] = useState("");
  const [toast, setToast] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("weblab-state-v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<LearningState>;
        setState({
          profile: typeof parsed.profile === "string" ? parsed.profile : "",
          html: typeof parsed.html === "string" ? parsed.html : STARTER_HTML,
          css: typeof parsed.css === "string" ? parsed.css : STARTER_CSS,
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
      setCoachMessage("Alle vier Missionen sind gelöst. Verändere jetzt Farben und Abstände im CSS-Tab – deine Seite darf unverwechselbar werden.");
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
    const payload = { app: "WebLab", formatVersion: 1, exportedAt: new Date().toISOString(), state };
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    link.download = `weblab-${state.profile || "lernstand"}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    setToast("Lernstand als JSON gespeichert");
  }

  function importProgress(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        if (payload.app !== "WebLab" || payload.formatVersion !== 1 || !payload.state) throw new Error("format");
        const imported = payload.state as LearningState;
        setState({
          profile: typeof imported.profile === "string" ? imported.profile : "",
          html: typeof imported.html === "string" ? imported.html : STARTER_HTML,
          css: typeof imported.css === "string" ? imported.css : STARTER_CSS,
          completed: Array.isArray(imported.completed)
            ? imported.completed.filter((id): id is MissionId => MISSIONS.some((mission) => mission.id === id))
            : [],
          updatedAt: new Date().toISOString(),
        });
        setToast("Lernstand geladen");
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
        <a className="brand" href="#start" aria-label="WebLab Startseite">
          <span className="brand-mark">W</span>
          <span><strong>WebLab</strong><small>Build the web.</small></span>
        </a>
        <nav className="topnav" aria-label="Kapitelnavigation">
          <a href="#verstehen">Verstehen</a>
          <a href="#bausteine">Befehle</a>
          <a href="#studio">Studio</a>
          <a href="#missionen">Missionen</a>
        </nav>
        <div className="top-actions">
          <div className="xp-pill"><span>✦</span><b>{xp}</b> XP</div>
          <button className="profile-button" onClick={() => { setProfileDraft(state.profile); setProfileOpen(true); }}>
            <span>{state.profile ? state.profile.slice(0, 2).toUpperCase() : "+"}</span>
            {state.profile || "Kürzel anlegen"}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="start">
          <div className="hero-copy">
            <div className="chapter-label"><span>Kapitel 01</span><i></i><span>HTML · Einstieg</span></div>
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
            <img src="/weblab-hero.png" alt="HTML-Bausteine werden zu einer Webseite zusammengesetzt" />
            <div className="floating-progress"><span>Kapitel-Fortschritt</span><b>{progress}%</b><i><u style={{ width: `${progress}%` }} /></i></div>
          </div>
        </section>

        <section className="outcomes section-pad" aria-labelledby="outcome-title">
          <div className="section-kicker">Dein Ziel</div>
          <h2 id="outcome-title">Am Ende kannst du …</h2>
          <div className="outcome-grid">
            <article><span>01</span><h3>Inhalte strukturieren</h3><p>Du weißt, warum Überschriften, Absätze und Listen unterschiedliche Aufgaben haben.</p></article>
            <article><span>02</span><h3>Tags sicher schreiben</h3><p>Du erkennst Start-Tag, Inhalt und End-Tag – und vermeidest typische Fehler.</p></article>
            <article><span>03</span><h3>Eine Seite bauen</h3><p>Du veränderst echten Code und gestaltest daraus deine persönliche erste Webseite.</p></article>
          </div>
        </section>

        <section className="explain section-pad" id="verstehen">
          <div className="explain-copy">
            <div className="section-kicker mint">Ganz einfach</div>
            <h2>HTML gibt Inhalten eine Bedeutung.</h2>
            <p className="lead">HTML ist keine Zaubersprache. Du markierst Text und sagst dem Browser: „Das ist eine Überschrift“, „Das ist ein Absatz“ oder „Das ist eine Liste“.</p>
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
          <div className="section-head"><div><div className="section-kicker violet">Spickzettel</div><h2>Die 8 wichtigsten HTML-Bausteine.</h2></div><p>Für den Start brauchst du nicht mehr. Klicke auf „Einsetzen“, um ein Beispiel direkt im Studio auszuprobieren.</p></div>
          <div className="tag-grid">
            {TAGS.map((item, index) => (
              <article className="tag-card" key={item.tag}>
                <div className="tag-card-top"><code>&lt;{item.tag}&gt;</code><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{item.name}</h3><p>{item.note}</p><pre>{item.example}</pre>
                <button onClick={() => insertExample(item.example)}>Im Studio einsetzen <span>↘</span></button>
              </article>
            ))}
          </div>
          <div className="attribute-note">
            <div><span>+</span></div>
            <div><h3>Attribute geben Zusatzinfos</h3><p>Ein Link braucht ein Ziel, ein Bild eine Quelle. Solche Zusatzinfos stehen im Start-Tag.</p></div>
            <code>&lt;a <b>href=&quot;kontakt.html&quot;</b>&gt;Kontakt&lt;/a&gt;</code>
          </div>
        </section>

        <section className="studio-section" id="studio">
          <div className="studio-intro section-pad"><div className="section-kicker mint">WebLab Studio</div><h2>Jetzt bist du dran.</h2><p>Ändere links den Code. Starte die Vorschau und beobachte rechts, was daraus wird.</p></div>
          <div className="studio">
            <div className="editor-pane">
              <div className="pane-bar">
                <div className="file-tabs">
                  <button className={activeFile === "html" ? "active" : ""} onClick={() => setActiveFile("html")}><span className="html-dot">◇</span> index.html</button>
                  <button className={activeFile === "css" ? "active" : ""} onClick={() => setActiveFile("css")}><span className="css-dot">#</span> style.css</button>
                </div>
                <button className="run-button" onClick={runPreview}>▶ Ausführen</button>
              </div>
              <div className="editor-wrap">
                <div className="line-numbers" aria-hidden="true">{(activeFile === "html" ? state.html : state.css).split("\n").map((_, index) => <span key={index}>{index + 1}</span>)}</div>
                <textarea aria-label={`${activeFile.toUpperCase()}-Editor`} spellCheck={false} value={activeFile === "html" ? state.html : state.css} onChange={(event) => updateCode(event.target.value)} />
              </div>
              <div className="editor-status"><span><i></i> automatisch lokal gespeichert</span><span>{activeFile.toUpperCase()}</span></div>
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
            <div><span>◎</span><div><h3>Dein Fortschritt gehört dir.</h3><p>WebLab speichert auf diesem Gerät. Mit einer JSON-Datei nimmst du deinen Lernstand mit.</p></div></div>
            <div className="save-actions"><button onClick={exportProgress}>↓ Lernstand speichern</button><button onClick={() => fileInput.current?.click()}>↑ Lernstand laden</button><input ref={fileInput} type="file" accept="application/json,.json" onChange={importProgress} hidden /></div>
          </div>
        </section>
      </main>

      <footer><a className="brand footer-brand" href="#start"><span className="brand-mark">W</span><span><strong>WebLab</strong><small>Version 0.1.0 · 04.08.2026</small></span></a><p>Lernen. Bauen. Verstehen.</p><span>Designed for the classroom.</span></footer>

      <button className="coach-fab" onClick={askCoach}><span>✦</span><div><b>Lerncoach</b><small>lokale Hilfe</small></div></button>
      {coachOpen && <aside className="coach-panel" aria-live="polite"><div className="coach-head"><span>✦</span><div><b>WebLab Lerncoach</b><small>Hinweis statt Lösung</small></div><button onClick={() => setCoachOpen(false)}>×</button></div><p>{coachMessage}</p><button onClick={() => setCoachOpen(false)}>Weiter ausprobieren</button><small>Der lokale Coach sendet keinen Code ins Internet.</small></aside>}

      {profileOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="profile-title"><div className="profile-modal"><button className="modal-close" onClick={() => setProfileOpen(false)}>×</button><span className="modal-symbol">W</span><h2 id="profile-title">Dein WebLab-Profil</h2><p>Das Kürzel bleibt auf diesem Gerät und wird nur in deiner JSON-Sicherung gespeichert.</p><label htmlFor="profile">Kürzel</label><input id="profile" value={profileDraft} onChange={(event) => setProfileDraft(event.target.value)} placeholder="max.mus" maxLength={7} autoFocus /><small>Drei Buchstaben · Punkt · drei Buchstaben</small>{profileError && <div className="form-error">{profileError}</div>}<button className="button primary modal-save" onClick={saveProfile}>Profil speichern</button></div></div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
