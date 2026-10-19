import { esc } from "./html.js";

// Independently written classroom cases; no grading or persistent state.
export const caseStudies = {
  l5: {
    title: "Lernsituation: Zwei Seiten für die Schul-AG",
    intro: "Die Robotik-AG möchte ihre Ideen vorstellen. Auf der Startseite stehen die Projekte; eine zweite Seite erklärt, wie man bei der AG mitmachen kann. Beide HTML-Dateien liegen im selben Ordner. Entscheide erst selbst und öffne danach die Erklärung. Die Lernsituation ist freiwillig und vergibt keine zusätzlichen Punkte.",
    code: 'ag-webseite/\n  index.html\n  kontakt.html\n\n<!-- in index.html -->\n<a href="kontakt.html">Bei der AG mitmachen</a>\n\n<!-- in kontakt.html -->\n<a href="index.html">Zur Startseite</a>',
    cases: [
      {
        title: "Ein Link legt noch keine Seite an",
        background: "Auf index.html steht bereits der Link auf kontakt.html. Im Projekt gibt es aber bisher nur index.html. In der Verweisprüfung steht deshalb „Diese Seite fehlt noch“.",
        question: "Reicht es, den Linktext zu ändern? Was fehlt im Projekt?",
        answer: "Der Linktext beschreibt das Ziel. Er erzeugt die Zieldatei nicht. Lege über „+ Unterseite“ die Datei kontakt.html an und schreibe dort einen kurzen Text zum Mitmachen. Alternativ erstellst du die Datei nach dem Export in Notepad++. Der Dateiname muss zum Wert von href passen.",
        sources: [],
      },
      {
        title: "Auch der Rückweg gehört dazu",
        background: "Die Kontaktseite lässt sich öffnen. Nun soll man von dort wieder zur Startseite gelangen. Die Startdatei heißt index.html und liegt neben kontakt.html.",
        question: "Welches Ziel braucht der Rücklink: #index, index.html oder ein Pfad zu deinem privaten Windows-Ordner? Begründe deine Wahl.",
        answer: "href=\"index.html\" verweist auf die Datei im selben Ordner. #index wäre ein Sprungziel innerhalb der aktuellen Seite. Ein Pfad wie C:\\Users\\... passt nur zu einem bestimmten Rechner. Gib dem Rücklink einen verständlichen Text, zum Beispiel „Zur Startseite“. Auch ./index.html ist hier richtig.",
        sources: [],
      },
      {
        title: "Zwei grüne Haken sind noch kein Klicktest",
        background: "Die Verweisprüfung findet jetzt beide Zieldateien. Sie bestätigt damit, dass die Namen zu vorhandenen Projektdateien passen. Sie prüft noch nicht, ob die Kontaktseite die gewünschten Informationen enthält.",
        question: "Wie prüfst du, dass Hin- und Rückweg wirklich funktionieren und die Seite zum Linktext passt?",
        answer: "Lade das Projekt-ZIP herunter und entpacke es. Öffne index.html im normalen Browser, klicke auf „Bei der AG mitmachen“ und danach auf „Zur Startseite“. Lies dabei die Zielseite: Passt ihr Inhalt zum Linktext? Im WebLab wechselst du zum Bearbeiten mit den Dateireitern; Linkklicks in der isolierten Vorschau wechseln nicht zwischen den Projektdateien.",
        sources: [],
      },
    ],
    transfer: "Verwende dein eigenes Seitenthema: Lege eine passende Unterseite an, schreibe dort einen kurzen eigenen Text und ergänze Hin- und Rücklink. Kontrolliere die Verweisprüfung und teste beide Wege im entpackten Export. Notiere einen gefundenen Fehler oder einen erfolgreichen Test in deinen Notizen.",
  },
  l14: {
    title: "Vor der Veröffentlichung: drei Entscheidungen",
    intro: "Begründe zuerst deine Entscheidung und öffne dann die Erklärung. Halte offene Fragen zu deiner eigenen Seite in den Notizen fest. Die Fälle vergeben keine zusätzlichen Punkte. Quellenstand: 16. Oktober 2026.",
    cases: [
      {
        title: "Wer ist für die Seite verantwortlich?",
        background: "Ein Impressum macht den Anbieter und seine Erreichbarkeit erkennbar. § 5 DDG regelt Informationspflichten für geschäftsmäßige, in der Regel gegen Entgelt angebotene digitale Dienste. § 18 MStV erfasst auch Angebote, die nicht ausschließlich persönlichen oder familiären Zwecken dienen. Deshalb ist „Unsere Seite kostet nichts“ allein keine ausreichende Begründung gegen Anbieterangaben.",
        question: "Eine öffentliche Vereinsseite nennt nur die Vornamen zweier Mitglieder. Welche Angaben würdest du mit dem Verein prüfen?",
        answer: "Prüfe den vollständigen Anbieternamen, die Anschrift und die Vertretungsberechtigten; je nach anwendbarer Vorschrift auch Kontakt, Rechtsform, Register und weitere Angaben. Der Link muss leicht erkennbar, unmittelbar erreichbar und dauerhaft verfügbar sein. Für das Schulprojekt klärt die Lehrkraft den verantwortlichen Anbieter. Trage keine privaten Schüleradressen als Ersatz ein.",
        sources: [
          { label: "§ 5 DDG: Anbieterinformationen", url: "https://www.gesetze-im-internet.de/ddg/__5.html" },
          { label: "§ 18 MStV: Informationspflichten", url: "https://www.gesetze-bayern.de/Content/Document/MStV-18" },
        ],
      },
      {
        title: "Welche Lizenz passt zur geplanten Nutzung?",
        background: "CC bietet sechs Standardlizenzen. BY verlangt Namensnennung; SA betrifft die Lizenz beim Teilen bearbeiteter Werke; NC beschränkt die Nutzung auf nicht kommerzielle Zwecke; ND erlaubt unter dieser Lizenz kein Verbreiten bearbeiteter Fassungen. CC0 ist ein separates Werkzeug für einen möglichst weitgehenden Rechteverzicht. Persönlichkeits- oder Markenrechte können trotzdem bestehen.",
        question: "Du willst ein Foto kreativ verändern und diese Fassung veröffentlichen. Das Original steht unter CC BY-ND 4.0. Reicht die Namensnennung?",
        answer: "Nein. Unter CC BY-ND 4.0 darfst du die bearbeitete Fassung nicht verbreiten. Eine private Bearbeitung und das Veröffentlichen sind zu unterscheiden. Wähle für diesen Plan ein eigenes Bild, eine passende andere Lizenz oder hole eine gesonderte Erlaubnis ein. Prüfe auch bei kostenlosen Bildportalen die konkrete Lizenz des einzelnen Werks.",
        sources: [
          { label: "CC: die sechs Standardlizenzen", url: "https://creativecommons.org/cc-licenses/" },
          { label: "CC BY-ND 4.0", url: "https://creativecommons.org/licenses/by-nd/4.0/deed.de" },
          { label: "CC0 und andere Rechte", url: "https://creativecommons.org/publicdomain/zero/1.0/deed.de" },
        ],
      },
      {
        title: "Quelle und Disclaimer ersetzen keine Erlaubnis",
        background: "Fotos, Texte, Musik und Programmcode können geschützt sein. Urheber entscheiden grundsätzlich über die Nutzung; Lizenzen und gesetzliche Erlaubnisse können Nutzungen gestatten. Kopieren und öffentliches Bereitstellen sind unterschiedliche Nutzungshandlungen. Ein Disclaimer ist ein Text, mit dem jemand seine Haftung begrenzen möchte; er verschafft dir keine Nutzungsrechte.",
        question: "Du übernimmst ein fremdes Foto ohne geklärte Erlaubnis. Darunter stehen eine Quellenangabe und „Für fremde Inhalte übernehme ich keine Haftung“. Ist die Nutzung dadurch erlaubt?",
        answer: "Nein. Die Quellenangabe benennt die Herkunft, ersetzt aber keine Nutzungserlaubnis. Ein pauschaler Disclaimer löst das Problem ebenfalls nicht. Bei einer Rechtsverletzung kommen Beseitigung und Unterlassung, bei Vorsatz oder Fahrlässigkeit auch Schadensersatz in Betracht. Kläre die Rechte vor der Veröffentlichung und verwende bis dahin eigenes oder passend freigegebenes Material.",
        sources: [
          { label: "UrhG: Werke, Nutzungsrechte und § 97", url: "https://www.gesetze-im-internet.de/urhg/BJNR012730965.html" },
        ],
      },
    ],
    transfer: "Übertrage das auf dein Projekt: Notiere Anbieter, geplanten Veröffentlichungsort und noch offene Rechtefragen. Entwirf bei Bedarf über „+ Unterseite“ oder in Notepad++ eine impressum.html mit klar gekennzeichneten Platzhaltern und verlinke sie von beiden Seiten. Prüfe den Entwurf mit der Lehrkraft, bevor daraus eine öffentliche Seite wird. Eine bestandene Codeprüfung bestätigt keine Rechtskonformität.",
  },
  l15: {
    title: "Vom Projektordner zum Schulserver",
    intro: "WebLab selbst startet weiterhin per index.html. Für diese Unterrichtsübung stellt die Lehrkraft einen Webserver und das Zielverzeichnis bereit. Die Fälle vergeben keine zusätzlichen Punkte.",
    cases: [
      {
        title: "localhost zeigt immer auf den eigenen Rechner",
        background: "Beim Doppelklick liest der Browser eine Datei direkt vom Gerät. Bei http://localhost/projekt/index.html beantwortet ein Webserver auf demselben Gerät die Anfrage. 127.0.0.1 ist ebenfalls eine lokale Rückadresse. Ein anderer Schulrechner braucht den von der Lehrkraft genannten Servernamen oder dessen Netzwerkadresse und eine erlaubte Verbindung.",
        question: "Deine Seite funktioniert unter localhost. Dein Sitznachbar gibt dieselbe Adresse ein und erhält einen Fehler. Warum?",
        answer: "Auf seinem Gerät meint localhost seinen eigenen Rechner, nicht deinen. Kopiere das vollständige Projekt in das vorgegebene Serververzeichnis und nutze dort die passende HTTP-Adresse. Testet anschließend vom zweiten Gerät die Serveradresse. Falls der Zugriff scheitert, prüft ihr die Vorgaben mit der Lehrkraft statt selbst Firewall oder Netzwerkfreigaben zu ändern.",
        sources: [
          { label: "RFC 1122: lokale Rückadressen", url: "https://www.rfc-editor.org/rfc/rfc1122#section-3.2.1.3" },
        ],
      },
      {
        title: "Übertragen und im Browser abrufen sind zwei Schritte",
        background: "WinSCP überträgt Dateien zum Server; der Browser ruft sie anschließend über HTTP oder HTTPS ab. Die Lehrkraft nennt für die Übung Protokoll, Host und dein Zielverzeichnis. SFTP ist eine verschlüsselte Übertragung; eine vorbereitete FTP-Übung ist ein anderes Protokoll. Zugangsdaten stehen nicht im HTML. Ein öffentlicher Tunnel ist für die geschützte Abgabe nicht nötig.",
        question: "Nach der Übertragung erscheint der Text, aber bilder/beet.jpg fehlt. Was prüfst du?",
        answer: "Vergleiche den vollständigen Projektordner auf beiden Seiten: HTML, CSS, Bilder, Medien und verlinkte PDF-Dateien samt Unterordnern. Prüfe Schreibweise und Pfade. Übertrage nur in dein zugewiesenes Ziel, ohne fremde Ordner zu löschen. Öffne danach die von der Lehrkraft genannte Webseitenadresse und wiederhole die Link- und Bildtests. Eine schwer zu erratende öffentliche URL ist kein Zugriffsschutz.",
        sources: [
          { label: "WinSCP: Dateien übertragen", url: "https://winscp.net/eng/docs/task_upload" },
        ],
      },
    ],
    transfer: "Führe mit der Lehrkraft drei Schritte durch: vollständigen Projektordner auf den vorbereiteten Server kopieren oder übertragen, Startseite über dessen HTTP-Adresse öffnen, Hin- und Rücklinks sowie Medien von einem zweiten Schulgerät prüfen. Ergänze die Ergebnisse in deinem Testprotokoll. Der tatsächliche Serverzugriff erfolgt außerhalb der Laborvorschau.",
  },
};

export function caseStudyPanel(lessonId) {
  const guide = caseStudies[lessonId];
  if (!guide) return "";
  return `<section class="panel study-cases" aria-labelledby="caseStudyTitle"><h3 id="caseStudyTitle">${esc(guide.title)}</h3><p>${esc(guide.intro)}</p>${guide.code ? `<pre><code>${esc(guide.code)}</code></pre>` : ""}${guide.cases.map((item, index) => `<article class="study-case"><h4>Fall ${index + 1}: ${esc(item.title)}</h4><p>${esc(item.background)}</p><p><strong>Deine Entscheidung:</strong> ${esc(item.question)}</p><details class="debug-challenge"><summary>Erklärung ansehen</summary><p>${esc(item.answer)}</p>${item.sources.length ? `<p class="muted">Nachlesen: ${item.sources.map((source) => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a>`).join(" · ")}</p>` : ""}</details></article>`).join("")}<p><strong>Auf deine Webseite übertragen:</strong> ${esc(guide.transfer)}</p></section>`;
}
