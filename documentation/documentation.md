# WebLab – gemeinsame Projektdokumentation

Stand: **14. Oktober 2026, Europe/Berlin · Claude**

Version: **1.18.0** · Status: **lokal geprüft und veröffentlicht**.

Diese Datei ist der zentrale Einstieg für **Jakob, Codex und Claude**. Frühere verteilte Projektstände wurden außerhalb des Projekts gesichert. README und CLAUDE.md verweisen hierher. Künftige Änderungen werden hier mit Autor, Datum, Ergebnis, Prüfung und offenen Punkten dokumentiert.

## 1. Ziel und aktueller Funktionsumfang

Schülerinnen und Schüler verstehen HTML und CSS und entwickeln selbständig eine eigene statische Webseite. Die Gestaltung übernimmt Seitenrahmen, Farbwerte, Metallflächen, dunklen Standardmodus, helles Farbschema, Profilkopf und Navigationsidee von WorkbenchLab. Die Anwendung selbst ist auf Webentwicklung zugeschnitten und enthält keine SQL-/Datenbankmodule.

Repository: https://github.com/JakobSawazki/WebLab

Live-Adresse der aktuellen Version: https://jakobsawazki.github.io/WebLab/

Das bereits vorhandene öffentliche Repository wird weitergeführt. Es wird kein zweites Repository mit abweichendem Verlauf angelegt. Die frühere Sites-Adresse `https://weblab-sawazki.jakob-sawazki.chatgpt.site` ist ein Altstand; sie wird in diesem Arbeitsblock nicht aktualisiert oder abgeschaltet. Für 1.0.0 ist GitHub Pages die Veröffentlichungsplattform wie bei WorkbenchLab. Ein Wechsel der Domain übernimmt Browserdaten nicht automatisch: Auf der alten Seite JSON sichern, auf der neuen Seite laden.

| Bereich | Version 1.18.0 |
| --- | --- |
| Lerneinheiten | 16 vollständige Einstiegsfassungen in vier Etappen; Einheit 01 frei, weitere Einheiten nacheinander durch Abschluss-XP freigeschaltet |
| Ablauf je Einheit | Ziel, Erklärung, Beispiel, optionale Fehlersuche in allen 16 Einheiten, Praxisauftrag, Hinweis, typische Stolpersteine, Editor, technische Prüfung, Verständnischeck, Selbstkontrolle, Notizen |
| Roter Faden | Nächster offener Lernschritt, 16 Schritte mit aktueller Position, Vorwissen, drei konkrete Arbeitsschritte und Beobachtungsauftrag; eigene Webseite wächst durch Kopien des vorherigen Entwurfs |
| Orientierung | Vier Etappen mit Fortschritt auf der Startseite; direkte Ablaufnavigation Verstehen → Anwenden → Prüfen → Sichern in den Einheiten |
| Schülerprofil | Kürzel/Klasse, XP-Level und Fortschrittsbalken, direkte NAGOLD-Tabelle; kein Serverkonto |
| XP | 100 je abgeschlossenem Auftrag, einmalig; frühere K1-Missions-XP bleiben zusätzlich erhalten |
| NAGOLD | Zunächst 5 je Abschluss; bearbeitbare Tabelle mit Datum/Uhrzeit, Anlass, −10 bis +5 ohne 0, Ergänzen und Löschen |
| Abschluss | Technische Kriterien erfüllt, Quiz richtig, alle Selbstkontrollen bestätigt, Profil vollständig |
| Lehrkraft | Gespräch und Prüfung außerhalb der App; CSV-Übersicht für den Abgleich |
| Labor | HTML-/CSS-Dateireiter, Zeilennummern, Einrückung, Live-/manuelle isolierte Vorschau, Handyansicht und große Browseransicht, eigenständiger freier Entwurf |
| Informatik-Stick | HTML-/CSS-Import und Export, Notepad++-Transferauftrag mit Strg+S/F5 und Dateiverknüpfung |
| Export | `index.html`, `style.css`, Projekt-ZIP, Lernstand als JSON, Übersicht als CSV |
| Nachschlagen | 107 Glossareinträge (84 aus WebLab 0.5.0, 23 ergänzt), Suche mit Trefferreihenfolge, Bereichsfilter, „Siehe auch“-Verweise |
| Datenschutz | Lernstand auf dem Gerät; kein Tracking, keine externe KI, keine zentrale Schülerdatenbank |

**Grenze:** Die Selbstkontrolle ist eine eigene Erklärung der Lernenden. Sie ist keine authentifizierte Lehrkraftfreigabe. LocalStorage, Sicherungsdateien, XP und NAGOLD sind veränderbar. Sie dürfen nicht ungeprüft als Leistungsbewertung verwendet werden. Automatische Kriterien erkennen ausgewählte Bausteine, keine vollständige HTML-Konformität, Eigenständigkeit oder gestalterische Qualität.

## 2. Bildungsplan und Lernpfad

Grundlage ist der von Jakob benannte Bildungsplan Informatik, berufliches Gymnasium, Ausgabe 23.07.2020. **BPE2 steht auf PDF-Seite 11 und hat einen Zeitrichtwert von 14 Unterrichtsstunden.** Eine lokale Kopie liegt unter `ressources/BPE2/Bildungsplan-Informatik.pdf`. Die Lernzeiten sind Richtwerte und einschließlich individueller Vertiefung und Projektarbeit zu verstehen; sie sind keine Behauptung, dass sämtliche Aufgaben innerhalb der 14 Stunden abgeschlossen werden müssen.

| Einheit | Inhalt | Bezug |
| --- | --- | --- |
| 1 | Erste Webseite, Tags, Elemente, Absatz, Betonung | BPE 2.1 |
| 2 | Grundgerüst, UTF-8, Dateinamen, Groß-/Kleinschreibung | BPE 2.1 |
| 3 | Überschriftenstruktur und Absätze | BPE 2.1 |
| 4 | Ungeordnete und geordnete Listen | BPE 2.1 |
| 5 | Relative/absolute Pfade, interne/externe Links, Download-Attribut erklärt | BPE 2.1 |
| 6 | Bilder, Quellenpfad, Alternativtext | BPE 2.1 |
| 7 | Tabellen ohne Formatierung | BPE 2.1 |
| 8 | Audio/Video, Bedienung und Textalternativen | BPE 2.1 |
| 9 | Trennung von Inhalt und Design, externe Datei/head/Tag | BPE 2.2 |
| 10 | Tag-, Klassen- und ID-Selektoren | BPE 2.2 |
| 11 | Farben, Schriftfamilie/-größe, Zeilenhöhe und Ausrichtung | BPE 2.2 |
| 12 | Box-Modell, Innen-/Außenabstand, Rahmen, Bereiche | BPE 2.2 |
| 13 | Zielgruppe, Seitenplan, semantische Bereiche | Anwendung 2.1/2.2 |
| 14 | Urheberrecht, CC-Lizenzen, Quellen, Anbieterinformationen/Disclaimer | BPE 2.3 |
| 15 | Lokaler Test, vollständige Ordnerstruktur, geschützte Unterrichtsplattform, FTP-Übung mit Lehrkraft | BPE 2.3 |
| 16 | Eigene statische Webseite, Präsentation und Codeerklärung | Anwendung 2.1–2.3 |

Der eigentliche Upload der Schülerseite ist eine praktische Unterrichtsaufgabe mit der Lehrkraft. Er ist im Browser-Labor nicht automatisiert. Die öffentlich zugängliche Lernplattform auf GitHub Pages ist nicht die im Bildungsplan verlangte nicht öffentliche Abgabeplattform.

Das Abschlussprojekt fordert in dieser ersten WebLab-Fassung zwei verknüpfte Seiten und eine gemeinsame CSS-Datei. Der bisherige BPE3-Auftrag in OneNote nennt als Mindestbestand index.html und style.css; die zweite Seite ist eine hier gewählte Vertiefung. Empfehlenswerte Projektthemen sind Client-Server, WLAN, Datensicherheit oder Datenschutz. Der separate EC-Webshop-Auftrag aus OneNote mit fünf Seiten gehört zu einer anderen Lerngruppe und wird nicht unbemerkt als Pflicht für BPE2 übernommen.

## 3. Unterrichtsquellen und Herkunft

OneNote: Notizbuch **Lernfelder**, Abschnitt **2. Internetseiten**. Alle sechs Seiten wurden über die bereits geöffnete, angemeldete Browseransicht gelesen. Sichtbare Seiteninhalte wurden als UTF-8-Text nach `ressources/BPE2/` gesichert:

- `01-Teil-1.txt`: Grundlagenübersicht mit Informations-/Aufgaben-/Lösungsanhängen, Kompetenzraster, Ich-Kann-Liste und Befehlssammlung.
- `02-Teil-2.txt`: Recht, Impressum, Webserver, Veröffentlichung, Urheberrecht und Creative Commons.
- `03-Projekt-Informationshomepage.txt`: BPE3-Informationshomepage, Projektphasen, Quellen-/KI-Angaben, Bewertung 30/30/40. Die dortigen Termine im Juni 2026 sind historisch und werden nicht als neue Fristen übernommen.
- `04-Projekt-EC-Webshop.txt`: gesonderte EC-Projektarbeit. Kann Schülernamen enthalten und bleibt ausschließlich lokal.
- `05-Replit.txt` und `06-ThommyWeb.txt`: sichtbare Referenzen/Vorlagenhinweise.
- `Bildungsplan-Informatik.pdf`: lokale Kopie des Bildungsplans aus WorkbenchLab.

Das lokale Anhang-Inventar `ressources/BPE2/Anhang-Inventar.json` erfasst 81 sichtbare Dateiverweise: 49 in Teil 1 und 32 in Teil 2. Gleiche Dateinamen in Informations-, Aufgaben- und Lösungsspalten sind unterschiedliche Anhänge. Erfasst wurden nur sichtbare Metadaten, keine Dateiinhalte. Der erneute Downloadversuch für den Informationsanhang 1.docx zum HTML-Grundgerüst lieferte auch nach Bestätigung keine Datei; im normalen Downloads-Ordner lag keine entsprechende Datei. Ein erneuter Login ist derzeit nicht nötig. Auch der direkte Öffnungsversuch führt zur OneNote-Meldung, dass die Datei nicht geöffnet, sondern nur als Kopie heruntergeladen werden kann. Es wurde kein Word-Dokument geöffnet und kein Originalinhalt gelesen.

**Noch offen: Originalanhänge als DOCX/ZIP herunterladen.** Ein Anhang wurde über „Speichern unter“ und die normale OneNote-Downloadwarnung angefordert. Der Browser lieferte jedoch kein abrufbares Downloadartefakt. Die gesicherten Textdateien sind Auszüge der sichtbaren Seiten, kein Ersatz für die eingebetteten Informations-, Aufgaben- und Lösungsdateien. Diese Anhänge wurden nicht als gelesen oder inhaltlich ausgewertet verbucht. Lösungen sollen auch künftig lokal bleiben.

ThommyWeb: https://informatik.systems/thommyWeb/grundkurs.html

Der direkte Abruf über das Webwerkzeug scheitert weiterhin. Am 12.10.2026 war die Seite dagegen im integrierten Browser erreichbar. Die sichtbare Übersicht enthält 13 Wissenskapitel und 11 Projektabschnitte. Das lokale Inventar mit Prüfstatus liegt in ressources/BPE2/ThommyWeb-Abgleich.json. Im Detail gelesen wurden bisher K2 (Attribute) und K6 (CSS-Einbindung); alle übrigen Kapitel sind bisher nur über die Übersicht erfasst. Keine Texte, Bilder oder Aufgaben wurden in WebLab kopiert.

| ThommyWeb-Thema aus der Übersicht | WebLab-Bezug / Vorgehen |
| --- | --- |
| HTML-Grundlagen, Grundgerüst, Textstruktur | Einheiten 01–03 |
| Attribute | Einheiten 05–06 und Glossar; Syntax in eigenen Beispielen vertiefen |
| CSS-Regeln und Einbindung | Einheiten 09–10; eigener Vergleich der drei Einbindungsarten seit 1.9.2 in Einheit 09 |
| Links, Bilder, Tabellen, Listen, Medien | Einheiten 04–08; Tabellenformatierung in Einheit 12 |
| Externe Fonts und Karten | Freiwillige spätere Themen; keine externe Ressource in das offlinefähige Laufzeitpaket aufgenommen |
| Schulplaner-Projektabschnitte | Mögliche Themenalternative für Einheiten 13–16; keine unveränderte Projektübernahme |

Fachliche Anpassungen vor einer späteren Übernahme: In K2 werden unter anderem ältere Gestaltungsattribute für Bilder und Absätze verwendet. WebLab verwendet dafür CSS und behält alt als Bildbeschreibung bei. K6 beschreibt die Einbindungsarten passend zu BPE2, behauptet aber eine pauschale Rangfolge intern vor extern. Diese Vereinfachung wird nicht übernommen: Wichtigkeit, Selektorgewicht und Reihenfolge der Regeln sind zu beachten. Abgeglichen mit [WHATWG: veraltete HTML-Funktionen](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features) und [W3C: CSS-Kaskade](https://www.w3.org/TR/css-cascade-5/#cascade-sort). Die bisherigen WebLab-Texte behaupten eine solche pauschale Rangfolge nicht.

Aktuell geprüfte offizielle Referenzen für Einheit 14:

- https://creativecommons.org/cc-licenses/ – Lizenzbedingungen, insbesondere BY und SA.
- https://www.gesetze-im-internet.de/ddg/__5.html – Anbieterinformationen; Anwendbarkeit ist vom Angebot abhängig und wird für die konkrete Schulveröffentlichung mit der Lehrkraft geklärt.

Die WebLab-Texte und Aufgaben sind eigenständig formuliert. Das aktuelle Metalllogo wurde mit dem integrierten Bildgenerator erstellt (Bildprompt im Protokoll zu 1.7.1); das Hero stammt aus der früheren WebLab-Fassung. Keine Unterrichtsoriginale, Lösungen oder Schülerzuordnungen werden ins Repository oder in das Veröffentlichungspaket aufgenommen.

## 4. Softwarestruktur und Start

Wie WorkbenchLab und Excel-Lab ist WebLab jetzt eine **statische Anwendung aus HTML, CSS und JavaScript**. React, Next, vinext, Cloudflare-Worker, D1, Drizzle und deren Vorlagendateien sind aus dem aktiven Projekt entfernt. Es gibt keine Laufzeitbibliotheken, keinen Installationsschritt und keine API-Schlüssel.

```text
WebLab/
  index.html                 direkt per Doppelklick starten
  weblab.js                  erzeugtes klassisches Skript
  styles.css                 gemeinsame Gestaltung
  assets/                    Logo, Titelbild, Favicon
  development/
    src/                     gepflegte Quellmodule, Inhalte und SVG-Icons
    tools/                   Bundler, Build und lokaler Browserprüfserver
    tests/                   25 Node-Tests und Browserprüfseite
  documentation/documentation.md
  documentation/WebLab-1.11.0.png
  ressources/BPE2/            lokale, nicht versionierte Unterrichtsquellen
  README.md                  kurze Startanleitung
  CLAUDE.md                  Wegweiser auf diese Dokumentation
  package.json               Befehle für Entwicklung und Veröffentlichung
  .github/workflows/pages.yml
```

Voraussetzung für Entwicklung: **Node.js ab 22**. In PowerShell im Projektordner:

```powershell
npm test
npm run build
npm run serve
```

Vorschau: `http://127.0.0.1:4188/`. Browserprüfungen: `http://127.0.0.1:4188/__qa`. Nach Quelländerungen neu bauen und im Browser neu laden. Zum Lernen reicht seit 1.4.0 ein Doppelklick auf `index.html` im Projektordner. Der ganze Ordner mit `weblab.js`, `styles.css` und `assets/` muss zusammenbleiben. Node.js und Server sind dafür nicht erforderlich. `start.cmd` wurde beim anschließenden Aufräumen entfernt; der einzige Einstieg für Lernende ist `index.html`. Der Build fasst die weiterhin modular gepflegten Quellen in ein klassisches Skript zusammen; nach Quelländerungen immer neu bauen und `weblab.js` mit committen. Lokaler Dateistart, localhost und Online-Seite haben getrennte Lernstände; bei einem Wechsel JSON-Sicherung verwenden.

Der Build schreibt ausschließlich sieben erlaubte Dateien nach `dist/`. Unerwartete Dateien oder symbolische Links lassen die Veröffentlichung scheitern. Die Browser-Testseite und die Dokumentation sind nicht Teil der ausgelieferten Lernseite. GitHub Actions führt die Node-Tests aus, baut das Paket und veröffentlicht ausschließlich dist. Die Browserprüfungen werden in dieser Fassung lokal ausgeführt, noch nicht automatisch in CI.

## 5. Lernstand, Migration und Sicherheit

**Freischaltung seit 1.7.0:** Einheit 01 kostet 0 Lernpfad-XP, Einheit 02 braucht 100, Einheit 03 braucht 200, bis Einheit 16 mit 1.500. Ein erfolgreicher Abschluss vergibt weiterhin einmalig 100 XP und 5 NAGOLD. Punkte werden nicht verbraucht. Für Freischaltungen zählt ausschließlich die lückenlos abgeschlossene Folge ab Einheit 01; alte K1-XP und manuelle NAGOLD-Einträge erlauben kein Überspringen. Die Summe aller XP im Profil kann deshalb höher als die angezeigten Lernpfad-XP sein.

Eine zentrale Funktion `lessonAccess()` in `development/src/state.js` steuert Karten, Etappen, Schrittfolge, Weiter-Buttons, Direktlinks und den Abschluss. Gesperrte Direktlinks zeigen eine Sperrseite statt Aufgabe oder Editor und legen keinen Entwurf an. Nach Abschluss werden alle Verknüpfungen sofort aktualisiert. Vorhandene Abschlüsse und Entwürfe bleiben unverändert gespeichert; bei Lücken sind spätere Einheiten bis zum Schließen der Lücke gesperrt. Nach Neuladen und JSON-Import werden Freischaltungen aus dem gespeicherten Stand neu abgeleitet. Kein neues Sicherungsformat. Freies Labor und Nachschlagewerk bleiben nutzbar. Die lokale Sperre ist Lernführung, keine manipulationssichere Zugangskontrolle.


- Neuer Speicher: `weblab-state-v3`; separate Entwürfe pro Einheit und freiem Labor, Notizen, Quiz/Selbstkontrolle, Abschlussdatum und NAGOLD-Einträge.
- Export: `{ app: "WebLab", formatVersion: 3, exportedAt, state }`. Importformate 1 und 2 werden als alter K1-Stand migriert. Alter Code und die ursprünglichen Missionswerte 60/80/80/100 XP bleiben erhalten. Es entstehen daraus keine erfundenen neuen Einheitenabschlüsse oder NAGOLD-Punkte.
- Der alte LocalStorage-Schlüssel wird bei der Migration nicht gelöscht. Ein Origin-Wechsel benötigt einen manuellen JSON-Transfer.
- Ein Kürzelwechsel beginnt nach Sicherungsdownload und Bestätigung mit einem neuen Stand. Eine Klassenkorrektur bei gleichem Kürzel erhält den Fortschritt.
- Laden und Zurücksetzen sichern den aktuellen Stand vorher als Datei. Der Browser kann einen Download blockieren; Nutzer müssen die Datei tatsächlich aufbewahren. Eine erfolgreich ausgelöste Downloadaktion beweist nicht, dass der Stick beschrieben wurde.
- Defekter vorhandener Speicher wird nicht automatisch überschrieben. Bei Veränderungen durch einen anderen Tab wird weiteres Speichern bis zum Neuladen blockiert. Speicherfehler werden sichtbar gemeldet.
- Sicherungen werden auf App/Version und erwartete Felder geprüft. Texte, Entwürfe und Eintragszahlen werden begrenzt; unbekannte IDs und doppelte Abschlüsse entfernt. Dateigrenze für den Import: 32 MB.
- Die Vorschau verwendet ein iframe mit leerem sandbox-Attribut und CSP. Skripte, Formulare, entfernte Bilder, Fonts und Medien werden blockiert. Lokale Bilder bis 500 KB werden ohne Upload als Datenadresse eingebettet. Relative Dateien/Links werden im exportierten Projekt getestet.
- Schülertext wird beim Anzeigen als HTML maskiert; CSV-Zellen werden gegen übliche Formelpräfixe geschützt. Der HTML-Projektexport enthält bewusst den eigenen Code der Lernenden und ist keine bereinigte Webveröffentlichung. Fremde Skripte gehören nicht in ein Unterrichtsprojekt.
- Es werden keine Dienste zur KI-Codebewertung oder Analyse verwendet. Hilfe besteht aus lokalen Hinweisen.

## 6. Sicherung und Aufräumen

Vor dem Umbau wurden auch die vorhandenen uncommitteten Änderungen gesichert:

```text
C:\Users\PC\WebLab-Sicherungen\vor-umbau-2026-10-12\
C:\Users\PC\WebLab-Sicherungen\vor-umbau-2026-10-12.bundle
C:\Users\PC\WebLab-Sicherungen\aus-projekt-entfernt-2026-10-12\
C:\Users\PC\WebLab-Sicherungen\dist-vor-statischem-build-2026-10-12\
G:\Meine Ablage\Codex\.archive\WebLab-dependencies-2026-10-12\
```

Das Git-Bundle enthält den bisherigen main-Verlauf. Die Arbeitskopie enthält zusätzlich die zuvor uncommitteten Dateien. Entfernte Quelldateien liegen im externen Archiv. Alte node_modules wurden teilweise dorthin verschoben; der verbleibende Teil liegt im genannten Archiv auf G:, um eine langsame dateiweise Übertragung zu vermeiden. Im aktiven Projekt liegt kein node_modules mehr; damit bleibt der aktive Ordner übersichtlich und alte Arbeit wiederherstellbar. Die bisherigen Dokumente TASKS.md und UEBERGABE.md wurden dort archiviert und durch diese Dokumentation ersetzt. CLAUDE.md bleibt als kurzer Wegweiser erhalten.

Google Drive erzeugt `desktop.ini` in jedem synchronisierten Ordner, auch innerhalb `.git/refs`. Git deutet diese als ungültige Referenzen; `git fetch` scheitert dann mit „bad object refs/desktop.ini“. Abhilfe: ausschließlich die `desktop.ini` im refs-Unterbaum von `.git` entfernen; fachliche Git-Referenzen bleiben erhalten. Die Dateien sind von Drive erzeugte 106-Byte-Platzhalter und müssen nicht archiviert werden. Im `dist/`-Ordner entfernt der Build sie seit dem 12.10.2026 selbst; alle anderen unerwarteten Dateien lassen den Build weiterhin scheitern.

### Zwei Laptops, ein Drive-Ordner

Jakob arbeitet an zwei Geräten mit demselben Google-Drive-Ordner. Pfade in dieser Dokumentation sind entsprechend zu übersetzen:

| Gerät | Projektpfad | Benutzerordner |
| --- | --- | --- |
| Lenovo-Laptop (bisherige Codex-Arbeit) | `G:\Meine Ablage\Codex\WebLab` | `C:\Users\PC` |
| Gaming-Laptop (seit 12.10.2026) | `D:\Google Drive\Codex\WebLab` | `C:\Users\Jakob` |

Das Drive-Archiv `Codex\.archive\` ist auf beiden Geräten erreichbar. Die Sicherungen unter `C:\Users\PC\WebLab-Sicherungen\` liegen dagegen nur auf der lokalen SSD des Lenovo. Das ist nach Jakobs Entscheidung in Ordnung: Gearbeitet wird im Drive-Ordner, der verbindliche Verlauf liegt auf GitHub. Vor Arbeitsbeginn auf dem jeweils anderen Gerät abwarten, bis Drive fertig synchronisiert hat, und `git status` sowie `git fetch` prüfen. Nicht auf beiden Geräten gleichzeitig am Projekt arbeiten.

**Arbeitsabsprache seit 12.10.2026:** Jakob öffnet `index.html` aus dem Projektordner in Edge und gibt Rückmeldungen. Claude und Codex arbeiten dazwischen selbständig weiter, committen sinnvolle Stände und veröffentlichen bei geeigneten Versionsständen. Nicht benötigte Dateien werden entfernt; der erzeugte `dist/`-Ordner bleibt nach der Arbeit nicht im Projektordner liegen.

## 7. Prüfstand und verbleibende Arbeit

**Aktueller Stand (14.10.2026, Claude, Version 1.18.0):** 31 Node-Tests in elf Dateien (Lernstand und Migration, Freischaltung, NAGOLD-Tabelle, Lernpfad-Kette, Editor, Bundle, Box-Modell, Fehlersuche, Lernhilfen, Glossar, Farbkontraste) und 164 Browserprüfungen unter `/__qa` bestehen. Die Prüfseite fängt Sicherungsdownloads der App ab und löst keine Speichern-Dialoge mehr aus. Jede Veröffentlichung dieser Runde wurde per SHA-256-Vergleich des ausgelieferten `weblab.js` mit dem lokal geprüften Bundle bestätigt. Ergebnis der Qualitätsrunde vom 14.10.2026 (Pakete 1–6, Versionen 1.13.1 bis 1.17.0): siehe Arbeitsprotokoll.

Älterer Prüfstand, geprüft durch Codex am 12.10.2026:

- 21 Node-Tests bestanden (einschließlich Box-Modell, Freischaltung und vollständiger Fehlersuchaufgaben): Inhaltsvollständigkeit, Abschlussvoraussetzungen, einmalige Punkte, Migration, Roundtrip, ungültiger Import, Begrenzungen, ZIP-Struktur, Einrückung, Code-Dateiimport sowie vollständige Lernkette und Erhalt vorhandener Entwürfe.
- Browserprüfungen: die bisherigen 86 Funktions- und Layoutprüfungen sowie zusätzliche Kontrollen für beide Farbschemata, SVG-Navigation, Buttonhöhen und Textkontrast. Ergebnis siehe neuestes Arbeitsprotokoll.
- Profil und erste Einheit per Oberfläche durchgespielt, Punkte nach Neuladen erhalten.
- Glossarsuche, unabhängiger freier Entwurf, beide Farbschemata und manuelle NAGOLD-Einträge über die Oberfläche geprüft. Keine Anwendungsfehler im Browserprotokoll.
- ZIP-Inhalt und CRC32 zusätzlich unabhängig mit Python zipfile geprüft.
- GitHub-Actions-Workflow erfolgreich, Live-Startseite und Einheit 1 unter dem /WebLab/-Unterpfad geöffnet. Aktueller Screenshot: `WebLab-1.11.0.png` in diesem Dokumentationsordner; frühere Screenshots liegen im externen Archiv und in den jeweiligen Git-Tags.
- Responsive Prüfung: Startseite, Einheiten 1 und 12 sowie Glossar bei tatsächlich 360 Pixel breiten eingebetteten Browserfenstern ohne horizontalen Überlauf. Der direkte Viewport-Schalter des Browserwerkzeugs änderte die native Ansicht nicht; deshalb wurde die Breite unabhängig in der lokalen Browser-Testseite geprüft. Physische Mobilgeräte und Bildschirmleser bleiben noch ungetestet.

Offene Erweiterungen, nach Priorität:

1. **Unterrichtserprobung:** Sprache, Hinweise und Aufgaben mit einer Klasse erproben. Die 16 Einstiegsfassungen sind eine arbeitsfähige Grundlage, keine behauptete pädagogische Endabnahme.
2. **Originalquellen:** DOCX-/ZIP-Anhänge aus OneNote vollständig lokal sichern, inventarisieren und fachlich abgleichen. Veraltete Rechtsmaterialien gesondert prüfen.
3. **Lehrkraftablauf:** Nach Jakobs Unterrichtserprobung entscheiden, ob wie bei WorkbenchLab eine separate lokale Klassenübersicht und Lehrkraft-Bestätigungsliste ergänzt wird. Der aktuelle Schülerabschluss ist bewusst als Selbstmeldung kenntlich.
4. **Didaktische Vertiefung:** Optionale Fehlersuchaufträge gibt es seit 1.8.0 (01–12) und seit 1.17.0 in allen 16 Einheiten; seit 1.14.0 nennen offene Kriterien einen konkreten nächsten Schritt, und jede Einheit listet typische Stolpersteine, seit 1.15.0 erklärt der Verständnischeck jede Antwort; seit 1.9.0 gibt es eine interaktive Box-Modell-Hilfe in Einheit 12. Noch offen sind vertiefende Korrekturaufgaben, visuelle Selektorhilfen, gestufte HTML-Aufgaben und weitere Medienaufgaben. Tabellenformatierung wird seit 1.9.1 als Transfer von Einheit 07 zu 12 geübt.
5. **Projektwerkstatt:** zusätzliche HTML-Unterseiten und Medienverwaltung ergänzen. index.html und style.css sind seit 1.1.0 als Reiter vorhanden; ein Projekt mit beliebig vielen Dateien bleibt offen.
6. **Betrieb:** echter Schul-PC-/Tablet-Test, Bildschirmleser, weitere Browser, optionale Offline-Kopie und Browserprüfungen in CI.
7. **ThommyWeb:** Browserzugriff ist möglich, K2/K6 geprüft. Übrige Kapitel gezielt prüfen und geeignete Ergänzungen eigenständig ausarbeiten; keine pauschale Inhaltsübernahme.

### Anforderungsabgleich am 12.10.2026

Dieser Abgleich betrifft Jakobs ursprünglichen Auftrag und die anschließend konkret gewünschten Änderungen. Die obigen Erweiterungsideen sind keine neu vereinbarten Pflichtanforderungen. Eine Unterrichtserprobung kann Codex nicht als bereits erfolgt bestätigen.

| Anforderung | Aktuelle Nachweise | Ergebnis |
| --- | --- | --- |
| Aufbau und Gestaltung wie WorkbenchLab | WorkbenchLab/index.html und state.js erneut mit WebLab verglichen: statische Anwendung, dunkle/helle Gestaltung, Profil mit Kürzel/Klasse, Lernpfad und lokaler Lernstand | Umgesetzt; fachliche Inhalte für HTML/CSS eigenständig |
| Verständlicher roter Faden durch BPE2 | 16 Einheiten in content.js, Vorwissen/Arbeitsschritte/Beobachtung in journey.js; Kette und Entwurfübernahme in journey.test.mjs und Browserprüfung | Umgesetzt; praktische Unterrichtserprobung empfohlen |
| Bildungsplan BPE2 als Grundlage | PDF-Seite 11 erneut vollständig als Text gelesen; 2.1 HTML/Dateinamen/Pfade/Medien/Listen/Links/Tabellen, 2.2 CSS-Ebenen/Selektoren/Box-Modell/Typografie, 2.3 Recht und geschützter Upload den Einheiten zugeordnet | Themen abgedeckt; echter Upload bleibt ausdrücklich Unterrichtsaufgabe |
| Schülerprofil, Punkte und NAGOLD | Lokales Profil wie WorkbenchLab, state.js; state.test.mjs und Browserablauf Profil/Abschluss/Sicherung | Umgesetzt; keine Serveranmeldung beauftragt oder behauptet |
| Anfangs nur Einheit 01, danach 02, 03 usw. | progression.test.mjs prüft sämtliche 16 Freischaltstufen, einmalige XP und Lücken; Browserprüfung prüft Direktlinks und Erhalt nach Neuladen | Umgesetzt |
| HTML direkt programmieren und echte Darstellung sehen | HTML/CSS-Reiter, sandbox-Vorschau, Handyansicht, große Browseransicht; Browserprüfung kontrolliert Eingabe, Darstellung, manuelle Aktualisierung und Entwurftrennung | Umgesetzt |
| Vorbereitung auf Notepad++ 7.5.1 vom Informatik-Stick | Import, HTML/CSS/ZIP-Export, Transferaufträge mit Strg+S/F5; ZIP-Struktur und Import geprüft | Umgesetzt; Schuleinsatz auf echtem Stick nicht vorgetäuscht |
| Eigene statische Webseite entwickeln | Abschlussprojekt in Einheit 16, Projektentwurf wächst fortlaufend; Export echter index.html und style.css | Umgesetzt; zusätzliche Unterseite wird aktuell in Notepad++ erstellt |
| Start durch index.html ohne start.cmd | Klassisches defer-Skript weblab.js, lokale CSS-/Bilddateien, keine Modulimporte oder Netzabrufe im Laufzeitpaket gefunden; start.cmd fehlt | Technisch vorbereitet; Doppelklick und Live-Vorschau im normalen Benutzerbrowser noch praktisch zu bestätigen |
| Unnötige Dateien entfernen, Tests/tools aufräumen | Frameworkreste und Startskript archiviert; notwendige Entwicklungsdateien unter development/; Prettier legte einen leeren Cache mit Windows-Metadaten an, am 12.10. wieder extern archiviert | Aktiver Stammordner aufgeräumt; keine Laufzeitinstallation nötig |
| Einheitliche documentation/documentation.md für Jakob/Codex/Claude | Diese Datei; README und CLAUDE.md verweisen hierher | Umgesetzt |
| GitHub-Repository und Veröffentlichung | Repository JakobSawazki/WebLab; Release v1.9.1; Pages-Workflow 38293274258 für finalen Dokumentationscommit 80345ce erfolgreich; Runtime-Bundle bereits live per SHA-256 identisch bestätigt | Umgesetzt |
| Edle Buttons, gebürstetes Metall, passende Schrift und Icons | styles.css, icons.js; visuell geprüft, Kontrast und 360-Pixel-Layout in Browserprüfungen | Umgesetzt |
| Neues fotorealistisches Logo auch als Tab-Icon | assets/weblab-logo.png und favicon.png; beide in index.html referenziert und veröffentlicht | Umgesetzt |
| Versions-/Gerätehinweis unten links entfernen | sidebar-bottom enthält nur noch Motto; Version steht im allgemeinen Seitenfuß | Umgesetzt |
| Menü ein- und ausklappen | menuButton mit aria-expanded, desktop Iconleiste und mobilem Einblenden; acht Browserprüfungen für Zustand/Neuladen/Layout | Umgesetzt |
| Elemente oben rechts gleich hoch | topbar-actions mit gemeinsamer Streckung; zuletzt im echten Online-Tab alle drei Elemente mit 56 px und gleicher Oberkante gemessen | Umgesetzt |
| OneNote-Materialien lokal sichern | Sechs Seitenauszüge, Bildungsplan und Inventar von 81 Anhangverweisen lokal vorhanden; Originaldownload liefert weiterhin keine Datei | Teilweise; Dateiinhalte der Anhänge noch nicht geprüft |
| ThommyWeb mit der Zeit ergänzen | Browserzugriff erfolgreich; Übersicht inventarisiert und K2/K6 fachlich geprüft; Abweichungen zu aktuellen Standards dokumentiert | Quellenabgleich begonnen; kein behaupteter vollständiger Inhaltsimport |

Der praktische Dateistart wurde Jakob zur kurzen Prüfung vorgelegt. Ohne dessen Ergebnis wird dieser Punkt nicht als erfolgreich getestet verbucht. Der Agentenbrowser unterstützt für diese Prüfung nur HTTP/HTTPS; diese Begrenzung wird nicht umgangen. Der Abgleich ist eine technische Bestandsaufnahme und keine pädagogische Endabnahme.

## 8. Gemeinsames Arbeitsprotokoll

### 14.10.2026 – Claude – Version 1.18.0 (Paket 8: Vertiefungen zu Pfaden und Tests)

Aufklappbare Vertiefungen gab es bisher in den Einheiten 09 und 12. Zwei weitere, eigenständig formulierte Vertiefungen setzen an typischen Schwachstellen an:

- **Einheit 05 „Ausprobieren: Pfade in einer Ordnerstruktur“:** Beispielordner mit Unterordnern `bilder/` und `seiten/`, Pfade aus index.html und aus `seiten/team.html` (mit `../`). Die Lernenden notieren die Pfade zuerst selbst, bauen die Unterseite nach dem Export in Notepad++ und testen einen absichtlich falschen Pfad mit großem Anfangsbuchstaben.
- **Einheit 15 „Vorlage: Testprotokoll vor der Übertragung“:** Musterprotokoll als ol mit nachvollziehbaren Tests (Was getan, was erwartet, Ergebnis) und fünf Prüfschritte vom Doppelklick bis zur Wiederholung der Linktests auf der geschützten Plattform. Passt zum Praxisauftrag der Einheit, ohne dessen Kriterien zu ändern.

Wie bisher ohne Zusatzpunkte, ohne Änderung an Entwürfen oder Abschlüssen. Neuer Node-Test: Alle Vertiefungen sind vollständig und nennen ausdrücklich „keine zusätzlichen Punkte“.

Prüfung: 31 Node-Tests und Build bestanden; 164/164 Browserprüfungen. Beide Vertiefungen im Browser geöffnet (kein Überlauf bei 461 Pixeln), Editor-Sprung behält jeweils die Einheit.

### 14.10.2026 – Claude – Version 1.17.1 (Paket 7: Zugänglichkeit und Wartbarkeit)

Weiterarbeit nach Jakobs Ziel (`/goal`): selbständig in kleinen Paketen.

- **Zugänglichkeitsprüfung** in neun Ansichten (Übersicht, Lernpfad, Labor, Nachschlagen, Erfolge, Notizen, Einheiten 01/12/16) per Skript: keine Bedienelemente ohne Namen, keine Felder ohne Beschriftung, keine doppelten IDs, keine Überschriftensprünge, keine Bilder ohne alt. Ohne Befund.
- **Kontraste:** Gesperrte Einheiten im Lernpfad-Menü waren mit 50 % Deckkraft nur 3,4:1 (dunkel) bzw. 2,3:1 (hell) lesbar. Sie stehen jetzt in voller Hilfstextfarbe, kursiv und mit gestrichelter Nummer. Im hellen Schema lagen Grün, Rot und Bernstein auf den dunkelsten Metallflächen knapp unter 4,5:1; die drei Tokens sind etwas dunkler (`--green #195f41`, `--amber #7a470c`, `--red #973330`). Das dunkle Schema ist unverändert.
- **Neuer Node-Test `contrast.test.mjs`:** liest die Farb-Tokens beider Schemata aus `styles.css` und verlangt für alle sechs Textfarben auf allen sechs Flächen mindestens 4,5:1. Künftige Farbänderungen können Kontraste so nicht mehr unbemerkt verschlechtern.
- **README** auf den aktuellen Stand gebracht (107 Glossareinträge, Fehlersuche in allen Einheiten, Lernhilfen, Prüfablauf).

Prüfung: 30 Node-Tests und Build bestanden; 164/164 Browserprüfungen. Lernpfad-Menü mit drei abgeschlossenen und zwölf gesperrten Einheiten in Dark und Light visuell geprüft. Veröffentlicht mit Commit `64206f7`; [Pages-Lauf 38623688981](https://github.com/JakobSawazki/WebLab/actions/runs/38623688981) erfolgreich, `weblab.js` und `styles.css` live per SHA-256 identisch.

### 14.10.2026 – Claude – Version 1.17.0 (Qualitätsrunde, Paket 6: Fehlersuche in den Projekteinheiten)

Die optionalen Denkaufgaben „Fehler finden“ gab es nur in den Einheiten 01–12. Die Projekteinheiten 13–16 erhalten je eine eigene, eigenständig formulierte Aufgabe mit drei Antworten und individueller Begründung:

- **13 Webseite planen:** zwei main-Elemente – richtig ist ein main mit section und h2.
- **14 Rechte und Quellen:** „Bild: Google“ – welche Angabe für ein Foto unter CC BY 4.0 ist nachvollziehbar (Titel, Urheberin, Fundort, Lizenz)?
- **15 Lokal testen:** Bild erscheint unter Windows, auf dem Webserver nicht – Groß- und Kleinschreibung im Pfad.
- **16 Eigene Webseite:** Unterseite ohne Gestaltung – fehlender link auf die gemeinsame style.css.

Wie bisher verändern die Aufgaben weder Entwurf noch Punkte. Der Node-Test verlangt jetzt für alle 16 Einheiten eine vollständige Aufgabe.

Prüfung: 29 Node-Tests und Build bestanden; 164/164 Browserprüfungen. Alle vier neuen Aufgaben mit einer Antwort im Browser geprüft. Hinweis zur Prüfumgebung: Ist der Browserbereich des Agenten ausgeblendet, kann der Prüflauf unter `/__qa` hängen bleiben; er wurde dann im sichtbaren Bereich neu gestartet. Veröffentlicht mit Commit `68196ce`; [Pages-Lauf 38622981518](https://github.com/JakobSawazki/WebLab/actions/runs/38622981518) erfolgreich, Live-Bundle per SHA-256 identisch, Release v1.17.0.

### 14.10.2026 – Claude – Version 1.16.0 (Qualitätsrunde, Paket 5: Nachschlagewerk)

Abgleich: Welche Fachbegriffe verwenden die 16 Einheiten, fehlen aber im Glossar? Ergebnis: unter anderem die semantischen Bereiche aus Einheit 13, Pfadarten, Dateinamen, UTF-8, Längeneinheiten, Farbangaben, Kaskade/Spezifität, Creative Commons, Webserver und FTP/SFTP.

- **23 neue, eigenständig formulierte Einträge** (jetzt 107): Relativer Pfad, Absoluter Pfad, Dateiname, UTF-8, lang, download, header, nav, main, footer, section, source, track, scope, border-collapse, max-width, Längeneinheiten, Farbangaben, Kaskade, Spezifität, Creative Commons, Webserver, FTP und SFTP. Im Feld `chapter` steht bei den neuen Einträgen die zugehörige WebLab-Einheit; bei den 84 übernommenen bleiben die alten Kapitelkürzel.
- **„Siehe auch“:** Die bisher unsichtbaren Querverweise (`related`) erscheinen als Links unter jedem Eintrag; ein Klick sucht den verwandten Begriff.
- **Suchreihenfolge:** Exakte Begriffstreffer stehen vorn, dann Begriffe, die mit der Eingabe beginnen. Zuvor fand die Suche nach „p“ zuerst Einträge, in deren Beschreibung irgendwo ein p vorkam.
- Neuer Node-Test `glossary.test.mjs`: Pflichtfelder, eindeutige Begriffe, gültiger Bereich und alle Querverweise vorhanden.

Prüfung: 29 Node-Tests und Build bestanden; 164/164 Browserprüfungen. Suche „p“ (erster Treffer p), „kaskade“ und „Siehe auch: Spezifität“ im Browser geprüft. Veröffentlicht mit Commit `95f6d98`; [Pages-Lauf 38622525520](https://github.com/JakobSawazki/WebLab/actions/runs/38622525520) erfolgreich, Live-Bundle per SHA-256 identisch.

### 14.10.2026 – Claude – Version 1.15.0 (Qualitätsrunde, Paket 4: Rückmeldung und Abschluss)

- **Verständnischeck erklärt jede Antwort:** `guidance.js` enthält zu allen 48 Antwortmöglichkeiten eine kurze, eigenständig formulierte Begründung. Eine falsche Antwort nennt, warum sie nicht passt (z. B. „Ein style-Attribut wirkt nur auf genau dieses eine Element.“), die richtige bestätigt den Kern. Zuvor kam bei jeder falschen Antwort derselbe allgemeine Satz. Neuer Node-Test: je Antwort genau eine Erklärung, nur die richtige beginnt mit „Richtig“.
- **Abschluss-Checkliste:** Über „Einheit abschließen“ steht eine Liste der vier Voraussetzungen (Praxisauftrag x von y Kriterien, Verständnischeck, Selbstkontrolle x von y, Profil). Sie aktualisiert sich nach jeder Vorschau-Aktualisierung, Quizantwort, Selbstkontrolle und Profiländerung. Zuvor erfuhr man erst nach dem Klick, was fehlt. Die Liste spiegelt nur `complete()`; die Abschlussregeln sind unverändert. Nach dem Abschluss entfällt sie.
- **Browserprüfungen ohne Speichern-Dialog:** Jakob musste bei jedem Prüflauf einen Speichern-Dialog für `WebLab-Gast-….json` wegklicken. Ursache: Die Prüfseite testet Profilwechsel und Sicherung, und die App löst dabei echte Downloads aus. `development/tests/browser.html` ersetzt jetzt in jedem App-Rahmen `click()` für Download-Links durch eine Protokollierung; die Zusammenfassung meldet die Zahl abgefangener Downloads. Der App-Code bleibt unverändert, normale Links funktionieren weiter.

Prüfung: 28 Node-Tests und Build bestanden; 164/164 Browserprüfungen, dabei 1 Sicherungsdownload abgefangen und kein Dialog. Quiz (falsch, dann richtig), Checkliste nach Code-Eingabe, Selbstkontrolle und Profilspeicherung in Einheit 01 bei 461 Pixeln im Browser geprüft. Veröffentlicht mit Commit `1a89ad8`; [Pages-Lauf 38621972838](https://github.com/JakobSawazki/WebLab/actions/runs/38621972838) erfolgreich, Live-Bundle per SHA-256 identisch.

### 14.10.2026 – Claude – Version 1.14.0 (Qualitätsrunde, Paket 3: Didaktik)

Alle 16 Einheiten (Erklärung, Beispiel, Auftrag, Hinweis, Quiz, Selbstkontrolle, automatische Kriterien und Vertiefungen) fachlich durchgesehen. Fachlich keine Fehler gefunden; die Inhalte sind stimmig zu BPE2 und den in Abschnitt 3 genannten Referenzen. Die Lücke lag in der Rückmeldung: Ein nicht erfülltes Kriterium zeigte nur ein Stichwort wie „○ Zwei Absätze“ oder bei Einheit 11/12 nur einen Eigenschaftsnamen wie „○ line-height“. Typische Fehler gab es bisher nur als je eine Denkaufgabe in den Einheiten 01–12.

- **Neues Modul `development/src/guidance.js`:** Für jedes der 61 Kriterien ein eigenständig formulierter, konkreter nächster Schritt (z. B. „Ergänze in der body-Regel eine Schriftgröße mit Einheit, zum Beispiel font-size: 1rem;“) und je Einheit drei typische Stolpersteine. Kein Text aus fremden Quellen übernommen.
- **Rückmeldung zum Praxisauftrag:** Zählt „x von y Kriterien erfüllt“; offene Kriterien zeigen darunter den passenden Tipp. Für Bildschirmleser sind Zustände als „erfüllt“/„noch offen“ ausgeschrieben, die Symbole ✓/○ sind ausgeblendet.
- **Typische Stolpersteine:** Neuer aufklappbarer Abschnitt unter „Ein Hinweis hilft mir weiter“ in allen 16 Einheiten, z. B. Komma statt Punkt bei Zahlen in CSS, Raute im id-Wert, `index.html.txt`, Groß-/Kleinschreibung bei Dateinamen, fehlende Namensnennung bei CC BY.
- **Verständlichere Kriteriennamen** in Einheit 11 („Schriftgröße für body (font-size)“) und 12 („Innenabstand der Karte (padding)“).
- Bemerkenswert für den Unterricht: Ungültige CSS-Werte wie `font-size: 16` (ohne Einheit) verwirft der Browser; das Kriterium bleibt offen und der Tipp nennt die fehlende Einheit.

Unverändert: alle Prüfregeln und Schwellenwerte, Freischaltung, Punkte, Speicherformat. Bestehende Abschlüsse bleiben gültig.

Prüfung: 27 Node-Tests (neu: `guidance.test.mjs` prüft je Kriterium genau einen Tipp, Länge und Doppelungen) und Build bestanden; 164/164 Browserprüfungen. Rückmeldung in Einheit 11 mit teilweise falschem CSS im Browser bei 461 Pixeln geprüft. Offen: Formulierungen mit einer Klasse erproben. Veröffentlicht mit Commit `6243833`; [Pages-Lauf 38621393990](https://github.com/JakobSawazki/WebLab/actions/runs/38621393990) erfolgreich, Live-Bundle per SHA-256 identisch, Release v1.14.0.

### 14.10.2026 – Claude – Version 1.13.2 (Qualitätsrunde, Paket 2: Bedienung)

- **Lernpfad-Fenster per Tastatur:** Innerhalb der Liste wandern Pfeil hoch/runter (mit Umlauf), Pos1 und Ende durch die freigeschalteten Einheiten; Pfeil links schließt und setzt den Fokus auf den Schalter. Die Liste ist als Gruppe „Lerneinheiten“ benannt. Zwei neue Browserprüfungen (1200 und 360 Pixel).
- **Verständnischeck und Fehlersuche:** Die Antwortknöpfe sind als Gruppe mit der Frage verknüpft und zeigen die gewählte Antwort mit `aria-pressed` und sichtbarer Markierung (blaue Kante, im Metall-Design). Eine bereits richtig beantwortete Frage zeigt die richtige Antwort beim erneuten Öffnen markiert. Antwortknöpfe sind ausdrücklich `type="button"`.
- **Profil:** Beim Öffnen steht der Fokus im Feld Schülerkürzel statt auf dem Schließen-Knopf.
- **NAGOLD-Tabelle auf dem Handy:** Bis 640 Pixel war jede Zeile eine hohe Karte mit sechs beschrifteten Feldern; bei 16 Einheiten sehr lang. Nur gelesene Zeilen sind jetzt kompakte Zweizeiler (Anlass und Punkte oben, Datum/Uhrzeit und Aktionen unten). Zeilen im Bearbeitungsmodus behalten die beschrifteten Eingabefelder. Fehlende Uhrzeiten erscheinen als „–“ statt ein zweites „Nicht erfasst“.

Prüfung: 26 Node-Tests und Build bestanden; 164/164 Browserprüfungen. Lernpfad-Tastatur, NAGOLD-Tabelle schmal (461 Pixel) in Dark sowie breit in Light visuell geprüft, Bearbeitungsmodus schmal geprüft. Keine Änderung an Lernstand, Freischaltung oder Punkten. Veröffentlicht mit Commit `7c11e21`; [Pages-Lauf 38620790322](https://github.com/JakobSawazki/WebLab/actions/runs/38620790322) erfolgreich, Live-Bundle per SHA-256 identisch.

### 14.10.2026 – Claude – Version 1.13.1 (Qualitätsrunde, Paket 1: Profil, NAGOLD, Sicherung)

Auftrag von Codex/Jakob: eigenständige Qualitäts- und Didaktikrunde. Claude arbeitet währenddessen allein in dieser Arbeitskopie. Paket 1 prüft Profil, NAGOLD, Sicherung und Wiederherstellung; gefundene Fehler und Schwachstellen:

- **Fehler „Diese Seite gibt es nicht“:** Der Knopf „Im eigenen Code ausprobieren“ in den aufklappbaren Vertiefungen (Einheiten 09 und 12) setzte die Adresse auf `#studioTitle`. Da die Adresse die App-Route ist, landete man auf der Übersicht mit Fehlermeldung. Alle Editor-Sprünge laufen jetzt über `data-editor-jump`: Scrollen zum Editor und Fokus auf den HTML-Code, die Route bleibt erhalten. Neue Browserprüfung.
- **CSV-Übersicht:** Der Formelschutz setzte vor negative NAGOLD-Zahlen ein Apostroph (`'-3`); Tabellenprogramme lasen sie als Text. Zahlen werden jetzt unverändert als Zahl ausgegeben, nur Textzellen erhalten den Formelschutz.
- **Speicherfehler sichtbar:** Profil speichern, Abschluss, manueller NAGOLD-Eintrag und Laden einer Sicherung prüfen jetzt das Ergebnis von `save()`. Zuvor überschrieb z. B. „Profil gespeichert“ die Speicherwarnung. Profiländerungen werden bei Fehlschlag vollständig zurückgenommen, der Dialog bleibt mit Hinweis offen.
- **Profilwechsel:** Der neue Stand wird erst nach erfolgreichem Speichern übernommen; danach wird die Ansicht neu aufgebaut (zuvor zeigte z. B. eine geöffnete Einheit noch den alten Abschlussstand bis zur nächsten Navigation). Eigene Meldung „Neues Profil angelegt …“.
- **Profil fehlt:** „Einheit abschließen“ und „Eintrag dokumentieren“ öffnen das Profil jetzt mit einer Erklärung, warum es gebraucht wird (zuvor öffnete sich der Dialog kommentarlos).
- **NAGOLD-Tabelle:** Bei einem Eingabefehler wird die betroffene Zeile geöffnet, das fehlerhafte Feld fokussiert und mit `aria-invalid` und Verweis auf die Fehlermeldung markiert (`ledgerChanges` liefert dafür `row` und `field`). Ungespeicherte Änderungen gehen bei Escape oder „×“ nicht mehr stillschweigend verloren; es erscheint eine Rückfrage. Dafür lösen alle „×“-Schalter `requestClose()` aus (Fallback `close()`), sodass Dialoge ihr `cancel`-Ereignis auswerten können.
- **Sicherungsdialog:** Beim Öffnen werden alte Dateiauswahl, Zusammenfassung und Ladeknopf zurückgesetzt; dieselbe Datei lässt sich erneut wählen. Ebenso beim Bild-Einfügen.
- **Kleinigkeit:** Brotkrumen zeigen „Einheit 09“ statt „Einheit 9“, passend zu den übrigen Nummern.

Unverändert: Speicherformat 3, Freischaltreihenfolge, Punktevergabe, Design. Geprüft und ohne Befund: Normalisierung alter/fehlerhafter Sicherungen, Begrenzungen, Zeitstempelerhalt, Altformate 1/2.

Prüfung: 26 Node-Tests (neu: Zeile/Feld bei ungültigen NAGOLD-Zeilen) und Build bestanden; 162/162 Browserprüfungen (neu: Editor-Sprung). Zusätzlich im Browser durchgespielt: Vertiefungslink, CSV mit −3 NAGOLD, NAGOLD-Fehler mit Fokus auf dem Punktefeld, Rückfrage bei „×“ (Abbrechen hält offen, Bestätigen verwirft, unveränderte Tabelle schließt ohne Rückfrage), Abschluss ohne Profil, Profilwechsel mit Sicherung, Sicherungsdialog-Reset und simulierter voller Browserspeicher beim Profil. Browserspeicher der Prüfumgebung danach wiederhergestellt. Veröffentlicht mit Commit `0d1b258`; [Pages-Lauf 38620209931](https://github.com/JakobSawazki/WebLab/actions/runs/38620209931) erfolgreich; das online ausgelieferte `weblab.js` stimmt per SHA-256 mit dem lokal geprüften überein.

### 14.10.2026 – Codex – Version 1.13.0

Auf Jakobs Wunsch den Profilablauf von `D:\Google Drive\Codex\WorkbenchLab` übernommen und auf WebLab angepasst: Kürzel/Klasse nebeneinander, Infofenster zur bestehenden WebLab-Kürzelkonvention, Level/XP-Anzeige mit Fortschrittsbalken und nächstem Level, abgeschlossene Einheiten und NAGOLD-Schaltfläche. Die sechs rein motivierenden WebLab-Level starten bei 0/100/300/600/1000/1600 XP; weder Punkte noch Freischaltungen werden dadurch verändert.

NAGOLD öffnet eine separate Tabelle mit Datum, Uhrzeit, Wofür, Punkten, Bearbeiten-/Löschen-Schaltern, Plus-Schalter und Gesamtsumme. Anlass als freier Text mit nativen Auswahlvorschlägen, doppelklickbare Bearbeitung wie im Vorbild. Ganze Punkte von −10 bis +5 ohne 0. Alle Änderungen zunächst nur als Entwurf; erst „NAGOLD speichern“ schreibt den Lernstand, Schließen/Escape verwirft den Entwurf. Automatische Abschlusszeilen lassen sich wie im Vorbild bearbeiten oder entfernen, ohne den Abschluss oder seine XP rückgängig zu machen. Neue Einheiten bringen weiterhin einmalig 5 NAGOLD. Keine Serverkonten oder Lehrkraftauthentifizierung hinzugefügt. Keine Änderungen an WorkbenchLab.

Datenkompatibilität: Speicher/JSON-Format bleiben bei Version 3. Bestehende `nagoldEntries`, Profile, Entwürfe und Notizen bleiben erhalten. Optionale `nagoldOverrides` speichern nur Änderungen/Löschungen der automatisch abgeleiteten Abschlusszeilen; `null` bedeutet entfernt. Import normalisiert diese Zuordnungen ausschließlich für bekannte abgeschlossene Einheiten, begrenzt Punkte und Anlass und ignoriert ungültige Überschreibungen. Unbekannte historische Abschlussdaten werden als „Nicht erfasst“ angezeigt, keine Zeitstempel erfunden. Unveränderte Zeitstempel bleiben einschließlich Sekunden/Millisekunden erhalten. Ein erneuter Import in ältere WebLab-Versionen kennt die Überschreibungen nicht; Bearbeitungen daher nur mit 1.13.0 oder neuer weiterführen. NAGOLD-Übersicht, CSV und Profil verwenden denselben Stand. Quellmodule `nagold.js` und `profile.js`, weiterhin klassischer Offline-Build ohne neue Abhängigkeit.

Prüfung: 25 Node-Tests und Build erfolgreich, inklusive vier neuer Tests für Altbestand, Zeitstempelerhalt, Bearbeiten/Löschen ohne XP-/Freischaltänderung, Sicherungs-Roundtrip und ungültige Eingaben. 161/161 Browserprüfungen bestanden, einschließlich neun neuer Prüfungen für Profil-/Tabellenablauf. Zusätzlicher echter Edge-Ablauf mit alten Einträgen, neuer Zeile, Bearbeiten/Löschen, Fehler bei 0, Abbrechen, erneutes Öffnen/Neuladen und Erhalt von Code/Notizen erfolgreich. Profil und Tabelle bei 1440/390 Pixeln in Dark/Light visuell geprüft; keine horizontalen Überläufe. Veröffentlicht mit Commit `5c73fcd`; [Pages-Lauf 38618112665](https://github.com/JakobSawazki/WebLab/actions/runs/38618112665) erfolgreich. Online den Profilknopf, Level-/XP-Anzeige, NAGOLD-Schaltfläche, neue Tabellenzeile und Schließen ohne Speichern im Browser geprüft.

### 14.10.2026 – Codex – Version 1.12.0

Auf Jakobs Wunsch die Lerneinheitenliste in ein schwebendes Menü rechts neben „Lernpfad“ umgebaut. Öffnet am Desktop bei Maus-Hover, auch aus der eingeklappten Iconleiste; kurze Schließverzögerung erlaubt den Weg über den Abstand zum Fenster. Kein Verschieben der übrigen Navigation. Position und Höhe bleiben innerhalb des sichtbaren Fensters; bei Bedarf eigener Scrollbereich, vollständige Titel umbrechend. Auf schmalen Ansichten per Pfeilschalter als schwebendes Fenster innerhalb des Bildschirms. Tastatur: Schalter oder Pfeil rechts/unten öffnet, Pfeiltasten öffnen mit Fokus auf dem ersten freien Eintrag; Escape schließt und setzt den Fokus zurück. Außenklick, Fokuswechsel nach außen und Ändern der Fenstergröße schließen. Auswahl eines freigeschalteten Eintrags schließt ebenfalls. Liste weiterhin nur geöffnet im DOM; Sperren, Abschlüsse und nächste Einheit werden unverändert aus `lessonAccess()` abgeleitet. Der alte separate Offen-/Geschlossen-Speicherwert wird nicht mehr ausgewertet: klassische Menüs starten geschlossen. Lernstände bleiben unverändert. Prüfung: 21 Node-Tests und Build bestanden, 152/152 Browserprüfungen bestanden (zwölf neue Prüfungen für das Lernpfadfenster). Zusätzlich echter Maus-Hover und Mausweg ins Fenster, Auswahl mit Routennavigation und Schließen, Außenklick, Escape/Fokusrückkehr, Tastaturöffnung, eingeklappte Iconleiste und Mobilansicht bei 390 × 700 in Edge geprüft; Dark/Light visuell kontrolliert. Keine Anwendungsfehler; die reine QA-Seite fordert ein nicht vorhandenes Standard-favicon.ico an (404), die eigentliche App nutzt ihr vorhandenes PNG. `git diff --check` und Syntaxprüfung bestanden. Veröffentlicht mit Commit `12d7a6d` und Touch-Präzisierung `4fec1d5`; [Pages-Lauf 38615495401](https://github.com/JakobSawazki/WebLab/actions/runs/38615495401) erfolgreich. Live geprüft: Hover öffnet das rechte Fenster mit 16 Einträgen, Übergang ins Fenster stabil, Escape schließt; Touch-Klicks schalten auch auf Geräten mit Mausunterstützung unabhängig um.

### 14.10.2026 – Codex – Version 1.11.2

Auf Jakobs Wunsch der Marke oben links einen dezenten Logo-Effekt gegeben: Bild wächst bei Maus-Hover um 10 %, hebt sich 1 Pixel und erhält eine feine Lichtkante mit weichem Lichtschein in der zum Farbschema passenden Akzentfarbe. Text und Untertitel ohne Unterstreichung. Derselbe Effekt bei sichtbarem Tastaturfokus; Touchgeräte erhalten keinen bleibenden Maus-Hover. Bei reduzierter Bewegung entfallen Skalierung, Verschiebung und Übergang, die Lichtkante bleibt. Keine Änderung an Lernstand oder Lernfunktionen. Prüfung: 21 Node-Tests und Build bestanden; Edge-Hover und Tastaturfokus in Dark/Light mit berechneter Vergrößerung und Lichtschein geprüft, keine Unterstreichung. Reduzierte Bewegung ohne Transformation, Mobilansicht mit 390 Pixeln und eingeklappte Desktop-Navigation ohne Überlauf, keine Konsolenfehler. `git diff --check` bestanden. Veröffentlicht mit Commit `a319cc1`; [Pages-Lauf 38613587984](https://github.com/JakobSawazki/WebLab/actions/runs/38613587984) erfolgreich. Logo-Hover auf der Live-Seite im Browser geprüft: Vergrößerung aktiv, Text ohne Unterstreichung.

### 14.10.2026 – Codex – Version 1.11.1

Auf Jakobs Wunsch die neue fotorealistische WebLab-Projektgrafik aus Sawazki Electronics als Logo oben links übernommen. Motiv: gebürstetes Metall-Browserfenster mit HTML-Klammern und Navy-/Cyan-Flächen. Dasselbe mit integriertem Imagegen erzeugte PNG-Original wurde mit Lanczos auf 256 × 256 Pixel für `assets/weblab-logo.png` verkleinert. Darstellung bleibt 48 × 48 Pixel mit dem vorhandenen 8-Pixel-Radius; Bildkennung auf 1.11.1 aktualisiert. Keine neue Bildgenerierung. Herkunft und vollständiger Bildprompt: `D:\Google Drive\Gewerbe\Sawazki Electronics\docs\weblab-bildprompt.md`. Version in Paket, Quellmodul und erzeugtem Bundle wird gemeinsam angehoben. Prüfung: 21 Node-Tests und Build erfolgreich. Logo in Edge bei 1440 Pixeln in Dark/Light sowie bei 390 Pixeln mobil geprüft: 256-Pixel-Bild korrekt geladen, Anzeige 48 × 48 Pixel, kein horizontaler Überlauf und keine Konsolenfehler. `git diff --check` bestanden. Veröffentlicht mit Commit `5668a68`; [Pages-Lauf 38612052863](https://github.com/JakobSawazki/WebLab/actions/runs/38612052863) erfolgreich. Neue Logoreferenz online bestätigt; das ausgelieferte PNG stimmt per SHA-256 bytegenau mit dem lokal geprüften Bild überein.

### 12.10.2026 – Claude – Version 1.11.0

Weitere Rückmeldungen von Jakob aus Edge, direkt nach 1.10.0 umgesetzt:

- **Dunkler:** Die Tokens des dunklen Farbschemas (`--bg`, `--panel`, `--panel-strong`, `--line`, `--metal-*`, `--sheen`, `--glow`) sind eine Stufe dunkler; das helle Schema ist unverändert.
- **Menü kompakter:** Abstand zwischen den Menüpunkten und deren Innenabstand verringert (Zeilenhöhe 54 statt 67 Pixel).
- **Lerneinheiten im Menü:** Neben „Lernpfad“ sitzt ein Pfeilschalter (`#lessonMenuButton`, `aria-expanded`, `aria-controls`). Aufgeklappt listet `#lessonMenu` alle 16 Einheiten mit Nummer und Titel. Freigeschaltete Einheiten sind Links, die aktuelle ist markiert, abgeschlossene haben eine grüne Nummer, die nächste offene eine hervorgehobene. Gesperrte Einheiten sind keine Links, sondern abgeblendete Einträge mit dem Hinweis auf die nötigen Lernpfad-XP; maßgeblich ist weiterhin allein `lessonAccess()`. Die Liste wird nur im aufgeklappten Zustand ins DOM geschrieben und bei jedem `render()` aktualisiert. Zustand separat unter `weblab-lessonmenu-v1` im Browserspeicher, standardmäßig eingeklappt, unabhängig vom Lernstand. In der eingeklappten Iconleiste sind Schalter und Liste ausgeblendet; bis 760 Pixel erscheint die Liste zweispaltig über die volle Breite. Die Liste enthält bewusst keine SVGs, damit die Prüfung „sechs dekorative Navigationsicons“ gültig bleibt.
- **Sichern / Laden:** In der Kopfzeile nur noch das Disketten-Symbol (56 x 56 Pixel) mit `aria-label` und Tooltip „Lernstand sichern oder laden“.
- **Seitenleiste unten:** Der Block „Von der Idee zur Webseite …“ ist auf Jakobs Wunsch samt CSS entfernt.
- **Fußzeile:** nur noch „Designed by Sawazki Electronics“ mit Link auf https://jakobsawazki.github.io/sawazki-electronics/, rechtsbündig. Die Versionsnummer wird nicht mehr gedruckt; sie steht als Tooltip (`title`) an der Fußzeile und in `package.json` bzw. `content.js`.

Zur Frage der Sperre: Einheiten 02–16 sind bereits seit 1.7.0 anfangs gesperrt und werden nacheinander freigeschaltet; das wurde nicht verändert und gilt auch für das neue Menü.

Prüfung: 21 Node-Tests und Build bestanden; 140/140 Browserprüfungen. Zusätzlich im Browser geprüft: Menü aufgeklappt bei frischem Profil zeigt genau einen Link (Einheit 01) und 15 gesperrte Einträge, kein horizontaler Überlauf bei 573 und 1280 Pixeln, weiterhin sechs SVG-Icons in der Navigation, Fußzeile rechtsbündig mit Link und Versions-Tooltip, keine Konsolenfehler. Screenshot: `documentation/WebLab-1.11.0.png`. Veröffentlicht: 1.10.0 mit Commit 6668817 ([Pages-Workflow 38302038137](https://github.com/JakobSawazki/WebLab/actions/runs/38302038137)), 1.11.0 mit Commit 6af40b9 ([Pages-Workflow 38302595479](https://github.com/JakobSawazki/WebLab/actions/runs/38302595479)); beide erfolgreich, Online-Version 1.11.0 bestätigt, Release v1.11.0 angelegt (für 1.10.0 gibt es keinen eigenen Tag). Offen: Für das Lerneinheiten-Menü gibt es noch keine eigene automatische Browserprüfung in `development/tests/browser.html`. Hinweis (bis 1.14.0): Der Prüflauf unter `/__qa` löste über die Sicherungsfunktion einen echten JSON-Download aus; seit 1.15.0 fängt die Prüfseite solche Downloads ab.

### 12.10.2026 – Claude – Version 1.10.0

Gestaltung nach Jakobs Rückmeldungen aus Edge (Dateistart über `index.html`). Geändert wurde ausschließlich `styles.css`; Inhalte, Lernstand, Kriterien und Markup bleiben unverändert.

- **Gebürstetes dunkelblaues Metall für Hintergrund und Fenster:** dunkles Farbschema von Graublau auf Marineblau umgestellt (`--bg`, `--panel`, `--panel-strong`, `--line`, `--metal-*`). `--brushed` besteht jetzt aus drei überlagerten Linienrhythmen (3, 5 und 23 Pixel), damit die Bürstung nicht als gleichmäßiges Streifenmuster wirkt. Neu: `--sheen-bands` (breite diagonale Lichtbänder), `--plate-shadow` (helle Oberkante, dunkle Unterkante, Schlagschatten) sowie die Tokens `--sheen`, `--bevel-dark`, `--panel-shadow` für beide Farbschemata. Karten, Kennzahlen, Panels, Hero, Kopfzeile und Seitenleiste nutzen diese Flächen. Weiterhin reines CSS ohne Bilddateien, also offlinefähig.
- **Menü-Icons:** statt silberner Plaketten blau eloxierte Stahlkacheln mit polierter Fase, Glanzkante und hell leuchtendem Symbol; aktiver Eintrag mit blauem Lichtsaum und Markierungsleiste links. Die SVG-Symbole selbst sind unverändert.
- **Buttons:** Primärbutton als gebürstetes Akzentmetall mit heller Oberkante, dunklerem Fuß und farbigem Schimmer beim Überfahren; gedrückter Zustand sichtbar eingelassen. Sekundär-, Icon- und Profilbutton als blaue Stahlflächen mit Fase und blauem Lichtsaum beim Überfahren. Mindesthöhen und die Tokens `--accent`, `--accent-end`, `--accent-text` sind unverändert, die Kontrastprüfung bleibt gültig.
- **Titelbild:** Die Bildspalte ist breiter (0,85 : 1,25) und übernimmt das Seitenverhältnis der Grafik (1672 : 941). Der frühere Verlauf, der die linke Bildhälfte überdeckte, ist entfernt; die Grafik ist vollständig sichtbar. Bis 1150 Pixel Breite steht das Bild in voller Breite über dem Text.

Prüfung: 21 Node-Tests und Build bestanden; 140/140 Browserprüfungen unter `/__qa`, darunter 360-Pixel-Layout, Buttonhöhen und Kontrast in beiden Farbschemata. Startseite im dunklen Schema bei 1600 x 1000 (Edge headless) und im hellen Schema bei 573 Pixeln Breite visuell geprüft. Screenshot: `documentation/WebLab-1.10.0.png`; der Screenshot zu 1.9.2 bleibt über den Tag v1.9.2 abrufbar. Offen: Jakobs Rückmeldung zum neuen Aussehen; die übrigen Ansichten (Einheit, Labor, Glossar) nutzen dieselben Flächen und wurden nur über die automatischen Prüfungen abgedeckt, nicht einzeln begutachtet.

Hinweis für die Arbeit unter Windows: Quelldateien nicht mit `Get-Content`/`Set-Content` aus Windows PowerShell 5.1 umschreiben. Die Dateien sind UTF-8 ohne BOM; PowerShell 5.1 liest sie als ANSI und zerstört Umlaute. Ein solcher Versuch wurde sofort mit `git checkout` zurückgenommen.

### 12.10.2026 – Codex – Version 1.9.2

Einheit 09 erhält einen eigenständig formulierten Vergleich von Inline-CSS, style im head und externer style.css. Lernende greifen die beiden h2-Überschriften aus Einheit 03 auf, gestalten erst eine Überschrift inline und anschließend beide über dieselbe Regel im head bzw. in der CSS-Datei. Der letzte Schritt führt zu Notepad++, Strg+S und F5 mit den exportierten Dateien. Der Unterschied zwischen der Laborvorschau und einer echten externen CSS-Verknüpfung wird ausdrücklich erklärt. Bestehende Kriterien, Lernstände, Freischaltungen und Punkte bleiben unverändert.

Der Abgleich mit ThommyWeb K6 war Anlass für die Vertiefung. Texte und Beispiele sind selbst formuliert. Eine pauschale Rangfolge intern vor extern wird nicht vermittelt; fachliche Grundlage ist [W3C CSS Cascade, Abschnitt 6.1](https://www.w3.org/TR/css-cascade-5/#cascade-sort). 21 Node-Tests und Build bestanden. Browserprüfung und Veröffentlichung folgen.

**12.10.2026 – Claude – Prüfung von 1.9.2 auf Jakobs Gaming-Laptop.** Derselbe Google-Drive-Ordner liegt hier unter `D:\Google Drive\Codex\WebLab` (auf dem Lenovo `G:\Meine Ablage\Codex\WebLab`); die Sicherungen unter `C:\Users\PC\...` liegen nur lokal auf dem Lenovo. Lokaler main stimmt mit origin/main (d0cfedd) überein; die vier uncommitteten 1.9.2-Dateien von Codex sind unverändert angekommen. Mit Node v24.18.0: 21 Node-Tests bestanden, Build erfolgreich und byteidentisches weblab.js, 140/140 Browserprüfungen unter `/__qa` bestanden. Die neue Vertiefung in Einheit 09 wurde mit einem Testprofil (Einheiten 01–08 abgeschlossen) geöffnet: Text, Codebeispiel und vier Schritte werden vollständig dargestellt, kein horizontaler Überlauf bei 1024 und 375 Pixeln, keine Konsolenfehler; der vorherige Browserspeicher wurde danach wiederhergestellt. Keine Änderung an Quellcode oder Inhalten.

Aufräumen und Build (Claude, auf Jakobs Auftrag): Google Drive hatte `desktop.ini` in `.git/refs` und im mitsynchronisierten `dist/` angelegt; `git fetch` und `npm run build` scheiterten deshalb auf diesem Gerät. Die Dateien wurden entfernt. `development/tools/build-site.mjs` löscht `desktop.ini` in `dist/` jetzt vor der Allowlist-Prüfung selbst. Geprüft: Build mit zwei eingeschleusten `desktop.ini` erfolgreich und danach ohne diese Dateien; Build mit einer anderen fremden Datei scheitert weiterhin mit Exitcode 1. Der in Abschnitt 4 und 7 genannte Screenshot `documentation/WebLab-1.9.2.png` fehlte und wurde mit Edge (headless, 1440 x 900) direkt aus der lokalen `index.html` per Dateiadresse erzeugt; damit ist zugleich belegt, dass die Startseite beim Dateistart in Edge ohne Server lädt. `WebLab-1.9.1.png` wurde entfernt und bleibt über den Tag v1.9.1 abrufbar. Neu versioniert: `.claude/launch.json` (startet `npm run serve` auf Port 4188 für Claudes Browser-Vorschau; für Codex ohne Bedeutung). Der erzeugte `dist/`-Ordner wurde nach der Prüfung wieder gelöscht. Veröffentlicht mit Commit cc04a07; [Pages-Workflow 38301559343](https://github.com/JakobSawazki/WebLab/actions/runs/38301559343) erfolgreich, Online-Version 1.9.2 bestätigt, Release v1.9.2 angelegt. Abschnitt 6 beschreibt jetzt die beiden Laptops und die Arbeitsabsprache.

### 12.10.2026 – Codex – Version 1.9.1

Die sichtbare OneNote-Übersicht nennt Tabellenformatierung ausdrücklich. Im bisherigen Lernpfad fehlte die Rückkehr zur Datentabelle nach Einführung von CSS. Einheit 12 erhält deshalb einen aufklappbaren Transferauftrag zur eigenen Tabelle aus Einheit 07: Zellrahmen, padding, gemeinsame Rahmen mit border-collapse, Kopfzeile, schmale Vorschau und Bearbeitung der exportierten Dateien mit Notepad++/Strg+S/F5. Eigenständig formulierter Inhalt; die nicht heruntergeladenen Originalaufgaben wurden nicht als gelesen ausgegeben. Die Vertiefung verändert weder Pflichtkriterien noch bestehende Abschlüsse oder Punkte.

Fachliche Referenz: [MDN border-collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-collapse), am 12.10.2026 geprüft. Lokales Anhang-Inventar mit 81 Dateiverweisen ergänzt; Originaldateien bleiben offen. 21 Node-Tests und 140 Browserprüfungen bestanden. Der aufgeklappte Transferauftrag bleibt bei 360 Pixeln in beiden Farbschemata ohne horizontalen Überlauf. Build erfolgreich. Screenshot documentation/WebLab-1.9.1.png zeigt die lokale Prüfansicht mit freigeschalteter Einheit 12. Veröffentlicht mit Commit 8d72433; [Pages-Workflow 38293105039](https://github.com/JakobSawazki/WebLab/actions/runs/38293105039) erfolgreich. Das online ausgelieferte weblab.js stimmt per SHA-256 exakt mit der lokal getesteten Datei überein; Online-Version 1.9.1 bestätigt. Vorheriger Screenshot und erzeugte dist-Ausgabe sind extern unter C:/Users/PC/WebLab-Sicherungen/Tabellen-1.9.1 archiviert.

### 12.10.2026 – Codex – Version 1.9.0

Autonome didaktische Vertiefung in Einheit 12: optionale aufklappbare Box-Modell-Ansicht mit Reglern für padding (0–24), border (0–8) und margin (0–24 Pixel) sowie Schalter für content-box/border-box. Echte CSS-Darstellung mit 120 Pixel Ausgangsbreite, farbigen Bereichen, beschrifteter Legende, berechneter Inhalts-/Rahmen-/Gesamtbreite und synchronem CSS-Beispiel. Die Ansicht erklärt ausdrücklich waagerechte Breiten; das Zusammenfallen senkrechter Margins wird nicht simuliert. Ein Beobachtungsauftrag verbindet die Regler mit der eigenen Anwendung im Editor.

Keine Änderungen an eigenen Entwürfen, Punkten, Quiz oder Freischaltungen, keine zusätzliche Abschlusspflicht, keine gespeicherte Modelleinstellung. Die Hilfe erscheint nur in der freigeschalteten Einheit 12. Native beschriftete Regler und Checkbox, textliche Statusausgabe ergänzt die rein dekorative Grafik. Quellmodul development/src/box-model.js, weiterhin klassischer Offline-Build ohne Laufzeitabhängigkeiten.

21 Node-Tests bestanden. Die Berechnung wird für alle zulässigen Reglerkombinationen geprüft. 138 Browserprüfungen bestanden, darunter Abgleich mit tatsächlich gerenderten Breiten in beiden Box-Modi, maximale Werte, 360-Pixel-Layout in beiden Farbschemata und unveränderter Lernstand. Die lokale Browserprüfseite kann mit /__qa#box-preview das Modell nach dem Prüflauf zur visuellen Kontrolle stehen lassen; der vorherige Browserspeicher wird dabei wie im normalen Prüflauf wiederhergestellt. Die Prüfseite wird nie veröffentlicht. Build erfolgreich. Veröffentlicht mit Commit 5e45c77; [Pages-Workflow 38291747586](https://github.com/JakobSawazki/WebLab/actions/runs/38291747586) erfolgreich. Das online ausgelieferte weblab.js und styles.css stimmen per SHA-256 exakt mit den lokal getesteten Dateien überein. Online-Version 1.9.0 geprüft; Gast-Direktlink auf Einheit 12 bleibt gesperrt und zeigt kein Modell. Screenshot documentation/WebLab-1.9.0.png zeigt die lokale Prüfansicht mit freigeschalteter Testeinheit. Vorheriger Screenshot und dist-Ausgabe sind extern unter C:/Users/PC/WebLab-Sicherungen/Box-Modell-1.9.0 archiviert.

### 12.10.2026 – Codex – Version 1.8.0

Autonome didaktische Weiterentwicklung: Zwölf kurze Fehlersuchübungen in den HTML-/CSS-Grundlageneinheiten 01–12. Jede zeigt einen typischen Fehler, drei Korrekturvorschläge und eine eigene konkrete Begründung für jede Auswahl. Themen: Verschachtelung, head/body, Überschriften, Listeneinträge, Sprungziele, Bildpfade, Tabellenzellen, Medienbedienung, CSS-Dateinamen, Selektoren, Längeneinheiten und Außenabstand.

Die Aufgaben sind im Abschnitt Verstehen als native aufklappbare Details zugänglich und zunächst geschlossen. Sie sind freiwillige Diagnoseübungen ohne Zusatzpunkte; Entwürfe, Verständnischeck, Abschlüsse und Freischaltungen werden nicht verändert. Rückmeldung als vorlesbarer Status, HTML-Beispiele maskiert. Nicht in den Projekteinheiten 13–16, keine neue Pflicht zum Abschluss und kein neues Speicherformat. Quellmodul `development/src/debugging.js` wird in das klassische Offline-Skript gebündelt, keine Laufzeitabhängigkeit.

19 Node-Tests bestanden, Build erfolgreich. Lokale Fehlersuche mit falscher und richtiger Auswahl visuell geprüft. 131 Browserprüfungen bestanden, darunter falsche/richtige Diagnose, ausbleibende Änderungen am Lernstand und die geöffnete Fehlersuche bei 360 Pixeln ohne horizontalen Überlauf. Veröffentlicht mit Commit fdb6584; [Pages-Workflow 38290664277](https://github.com/JakobSawazki/WebLab/actions/runs/38290664277) erfolgreich. Online falsche und richtige Auswahl in Einheit 01 geprüft. Screenshot documentation/WebLab-1.8.0.png; vorheriger Screenshot und Build-Ausgabe liegen extern unter C:/Users/PC/WebLab-Sicherungen/Fehlersuche-1.8.0.

### 12.10.2026 – Codex – Version 1.7.5

Die drei Bedienelemente oben rechts auf einheitliche Höhe gebracht: mindestens 56 Pixel, innerhalb einer Zeile gemeinsam gestreckt. Der Farbschemaschalter ist 56 Pixel breit. Profil und Sicherungsbutton bleiben vertikal mittig ausgerichtet; bei größeren Schriftgrößen kann die gemeinsame Zeilenhöhe mitwachsen. Im lokalen Browser identische Höhen und Oberkanten aller drei Elemente gemessen; Build und alle 126 Browserprüfungen erfolgreich.

### 12.10.2026 – Codex – Version 1.7.4

Menü ein- und ausklappbar: Schalter oben links in der Kopfzeile, auch bei ausgeblendetem Menü erreichbar. Desktop eingeklappt als 88 Pixel breite Iconleiste mit benannten Links und Tooltips; bis 760 Pixel wird die Seitenleiste komplett ausgeblendet. Wiederaufklappen stellt alle Beschriftungen her. Einstellung separat unter `weblab-menu-v1` im Browserspeicher, unabhängig vom Lernstand und dessen Import/Export. Bei gesperrtem Speicher funktioniert der Schalter ohne dauerhafte Speicherung weiter. Keine neuen Abhängigkeiten.

Barrierefreiheit: nativer Tastaturschalter mit aria-controls und synchronem aria-expanded; Enter-Bedienung manuell geprüft. Icons behalten in der kompakten Ansicht ihre zugänglichen Linknamen. 18 Node-Tests und 126 Browserprüfungen bestanden. Acht neue Browserprüfungen decken Einklappen, Wiederaufklappen, fehlenden horizontalen Überlauf und Erhalt nach Neuladen bei 1200 und 360 Pixeln ab. Desktop lokal visuell geprüft. Build erfolgreich. Veröffentlicht mit Commit 8225de2, [Pages-Workflow 38289805809](https://github.com/JakobSawazki/WebLab/actions/runs/38289805809) erfolgreich. Online ein- und ausgeklappt geprüft. Screenshot documentation/WebLab-1.7.4.png; vorheriger Screenshot und Build-Ausgabe archiviert unter C:/Users/PC/WebLab-Sicherungen/Menue-1.7.4.

### 12.10.2026 – Codex – Version 1.7.3

Die sechs Menüsymbole erhalten auf Jakobs Wunsch einheitliche Metallplaketten: gebürstete silberne Oberfläche, doppelter Rahmen, dezente Prägung und hervorgehobene aktive Plakette. Die vorhandenen klaren Inline-SVG-Symbole bleiben offline verfügbar. Desktop 38 Pixel, mobil 32 Pixel mit Beschriftung unter dem Icon. Keine neuen Bilddateien oder externen Abhängigkeiten. Build erfolgreich; alle 118 Browserprüfungen bestanden, darunter 360-Pixel-Layout und beide Farbschemata. Metallplaketten lokal visuell geprüft.

### 12.10.2026 – Codex – Version 1.7.2

Auf Jakobs Wunsch die Versionszeile und den Hinweis „Lernstand auf diesem Gerät“ unten links entfernt. Der nicht mehr vorhandene DOM-Knoten wird auch im App-Einstieg nicht mehr beschrieben. Die Versionsangabe im Seitenfuß bleibt erhalten.

### 12.10.2026 – Codex – Version 1.7.1

Neues fotorealistisches Logo auf Jakobs Wunsch: breites W aus gebürstetem Silber/Titan mit HTML-Winkelklammern und dezenten blauen Reflexen. Mit dem integrierten image_gen-Werkzeug erstellt; transparenter Hintergrund. Das generierte Original liegt unter C:/Users/PC/.codex/generated_images/01a12ffc-8dc4-7670-b306-fdd3448d7504/exec-66014b85-b5f0-475b-ad7e-02dd5aa08243.png. Die Projektdateien sind assets/weblab-logo.png (512 x 512) und assets/favicon.png (64 x 64), beide mit Alpha; das Tab-Icon zeigt dasselbe Motiv. Technischer Export mit Sharp: transparente Ränder gekürzt, proportional skaliert und quadratisch mit Transparenz aufgefüllt. Keine Bildgenerierungs-API oder neue Laufzeitabhängigkeit.

Logo und Icon haben versionsgebundene URLs gegen alte Browser-Caches. Das alte SVG-Icon ist entfernt und die Build-Allowlist entsprechend auf PNG umgestellt, weiterhin sieben veröffentlichte Dateien. Alte Assets gesichert unter C:/Users/PC/WebLab-Sicherungen/Logo-1.7.1. 18 Node-Tests bestanden; Build erfolgreich; Logo in beiden Farbschemata und Icon-Verweis im lokalen Browser geprüft. Veröffentlicht mit Commit f46b28e; [Pages-Workflow 38288928671](https://github.com/JakobSawazki/WebLab/actions/runs/38288928671) erfolgreich. Online-Version 1.7.1, geladenes Logo und PNG-Icon-Verweis bestätigt. Screenshot: documentation/WebLab-1.7.1.png. Vorheriger Screenshot und erzeugtes dist-Paket sind ebenfalls im externen Sicherungsordner archiviert.

Finaler Bildprompt (integriertes image_gen, kein CLI-Fallback):

> Use case: logo-brand. Create one entirely new premium photorealistic logo emblem for WebLab, a school web development learning app with a brushed metal interface. A bold compact capital W monogram sculpted from thick precision-machined brushed titanium and polished silver, integrated subtly with two small HTML angle-bracket shapes framing its outer silhouette. Front-facing, nearly orthographic, substantial broad strokes, beautifully balanced simple silhouette, shallow realistic bevels, fine physical brushed grain and soft studio highlights. A restrained cool blue reflection on the lower metal edges ties it to a dark steel UI; bright silver face must also read on light backgrounds through a charcoal edge. One standalone emblem, centered and filling roughly 85% of a square canvas. Truly transparent background with clean alpha, no ground plane or cast shadow outside the emblem. This same image must remain immediately recognizable at favicon size 32x32; prioritize large continuous forms and open negative spaces. Photorealistic product photography of a real premium metal badge, not a line drawing. No words, no tiny inscriptions, no globes, no laptop, no laboratory flask, no intricate circuitry, no decorative frame, no mockup, no watermark. Only the W and the integrated bracket silhouette.

### 12.10.2026 – Codex – Version 1.7.0

Auf Jakobs Auftrag verbindliche Reihenfolge 01 → 02 → 03 usw. umgesetzt. Einheiten werden mit 100 zusätzlichen Abschluss-XP je Schritt freigeschaltet. Gesperrte Karten und Etappen zeigen Schloss und erforderliche Punkte. Die nummerierte Schrittfolge und Weiter-Buttons erlauben kein Überspringen; Direktlinks zeigen einen Sperrhinweis mit Link auf die nächste offene Einheit. Erfolgreicher Abschluss aktualisiert die Freischaltung sofort und setzt den Tastaturfokus auf die Rückmeldung. Bestehende Daten bleiben erhalten, alte Bonuspunkte umgehen die Reihenfolge nicht.

Prüfungen: 18 Node-Tests bestanden, einschließlich aller 16 Freischaltstufen, einmaliger Vergabe, Lücken, Alt-XP, Bonus-NAGOLD und Sicherungs-Roundtrip. 118 Browserprüfungen bestanden: frisches Profil mit 15 Sperren, Direktlink-Sperre ohne Editor, 360-Pixel-Sperrseite, echter Abschluss 01 mit sofortiger Freischaltung 02, Erhalt nach Neuladen und weiterhin gesperrte Einheit 03 sowie alle bisherigen Lernfunktionen. Lernpfad visuell geprüft. Veröffentlicht mit Implementierungscommit `d9dfca0`; Pages-Workflow [38288204622](https://github.com/JakobSawazki/WebLab/actions/runs/38288204622) erfolgreich. Online mit Gastprofil geprüft: genau eine offene und 15 gesperrte Einheiten, Direktlink zu 03 zeigt die Sperrseite. Aktueller Screenshot: `documentation/WebLab-1.7.0.png`. Build-Ausgabe und vorheriger Screenshot liegen außerhalb des Projekts unter `C:\Users\PC\WebLab-Sicherungen\Lernpfad-1.7.0`; der Projektordner enthält keinen erzeugten dist-Ordner.


### 12.10.2026 – Codex – Version 1.6.0

Auf Jakobs Auftrag gebürstete Metalloptik umgesetzt. Gemeinsame CSS-Variablen für feine horizontale Körnung, Stahl-/Aluminium-Verläufe und Lichtkanten. Oberflächen, Seitenleiste, Kopfzeile, Karten, Dialoge, Werkstattkopf und Dateireiter abgestimmt. Primäre Aktionen behalten ihren deutlichen Akzent, sekundäre Buttons erhalten Metallflächen mit feiner Einfassung. Dunkles Schema: gebürsteter Stahl; helles Schema: silbernes Aluminium. Schreibflächen und Webseitenvorschau ohne Körnung. Alles als statisches CSS, keine neuen Assets, Bibliotheken oder Netzwerkanfragen.

Prüfungen: 15 Node-Tests bestanden. Beide Farbschemata visuell kontrolliert; Kontrast der Nebenbeschriftung gegen die jeweils kritischste Metall-Grundfarbe: dunkel 4,93:1, hell 5,01:1 (ohne die dezente transparente Körnung). 110 Browserprüfungen bestanden, darunter beide Farbschemata bei 360 Pixeln, Buttons, Kontrast und alle bisherigen Lernfunktionen. Veröffentlicht mit Implementierungscommit `46608b74ad668444ab842bf682aaf36be96f73de`; [Pages-Workflow 38287253446](https://github.com/JakobSawazki/WebLab/actions/runs/38287253446) erfolgreich. Metalloptik und Version 1.6.0 live geprüft; aktueller Screenshot `WebLab-1.6.0.png`. Vorheriger Screenshot und erzeugtes dist-Paket liegen außerhalb des Projekts unter `C:\Users\PC\WebLab-Sicherungen\Metall-1.6.0`. Klassischer Dateistart und unverändertes Sicherungsformat bleiben erhalten; direkter file://-Test auf dem Schul-PC und Bildschirmlesertest bleiben offen.


### 12.10.2026 – Codex – Version 1.5.0

Auf Jakobs Auftrag weiter aufgeräumt: die weiterhin nötigen Tests und Werkzeuge sowie alle Quellmodule liegen gesammelt in `development/`. Hauptordner bleibt der klare Startpunkt über `index.html`. Der vorherige Screenshot 1.4.0 und das zur Prüfung erzeugte dist-Paket liegen außerhalb des Projekts unter `C:\Users\PC\WebLab-Sicherungen\Design-1.5.0`. Paketbefehle, Modulpfade und lokaler Prüfserver angepasst. Öffentliches Paket von 15 auf sieben Dateien verkleinert: index.html, styles.css, weblab.js, .nojekyll und drei Assets. Quellmodule werden nur lokal für Browserprüfungen angeboten.

Design: ruhige Marineblau-Flächen, dezenter Verlauf im Hintergrund, abgestimmtes helles Farbschema, lokale Systemschrift mit klarer Hierarchie, größere Radien und feinere Schatten. Wichtige Aktionen im dunklen Schema warm akzentuiert, sekundäre Aktionen zurückhaltend. Einheitliche Inline-SVG-Icons für Navigation und Aktionen, keine externe Bibliothek, keine Font- oder CDN-Abhängigkeit. Buttons mit Hover-, Aktiv-, Fokus- und Deaktiviert-Zustand; reduzierte Bewegung wird beachtet. Lernstandformat und Vorschau-Sandbox unverändert.

Prüfungen: 15 Node-Tests und 110 Browserprüfungen bestanden, darunter beide Farbschemata bei echten 360 Pixeln, mindestens 44 Pixel hohe sichtbare Buttons, dekorative SVG-Navigation und primärer Button-Textkontrast von mindestens 4,5:1. Startseite in Hell/Dunkel und Werkstatt visuell geprüft. Veröffentlicht mit Implementierungscommit `b0556847fe987c2e7e1c757a7066290fe4746c04`; [Pages-Workflow 38286555951](https://github.com/JakobSawazki/WebLab/actions/runs/38286555951) erfolgreich. Online-Version 1.5.0, SVG-Icons und neue Buttons geprüft. Aktueller Screenshot: `WebLab-1.5.0.png`. Direkter file://-Test bleibt wegen der URL-Beschränkung des Agentenbrowsers offen; klassischer Skripteinstieg bleibt erhalten.


### 12.10.2026 – Codex – Aufräumen nach Umstellung auf index.html

Auf Jakobs Auftrag entfernt: `start.cmd`, `.tmp/` mit alten Test-/Release-Dateien, sechs Screenshots der Versionen 1.0 bis 1.3, der erzeugte `dist/`-Ordner sowie die vorhandene Windows-Metadatendatei `desktop.ini` im Hauptordner. Sicherung außerhalb des Projekts unter `C:\Users\PC\WebLab-Sicherungen\Aufraeumen-2026-10-12-index-html`. Historische Screenshotnamen in den folgenden Versionsprotokollen beziehen sich auf dieses Archiv oder die alten Git-Tags. Im Dokumentationsordner bleiben diese zentrale Dokumentation und der aktuelle Screenshot 1.4.0.

Erhalten: Startdatei, Skriptbündel, CSS und Assets; Quellmodule, Tests und Entwicklungswerkzeuge; GitHub-Veröffentlichung, README/Claude-Wegweiser und lokale Unterrichtsquellen. Diese Dateien werden weiterhin benötigt. `dist/` ist nur ein jederzeit durch `npm run build` erzeugbarer Ausgabeordner und liegt nach dem Aufräumen nicht mehr dauerhaft als zweite Seitenkopie im Projekt. Keine Änderung an Lernfunktionen oder Lernständen. Prüfung: 15 Node-Tests bestanden; Veröffentlichungspaket neu erzeugt; alle lokalen Start-Assets und der klassische Skripteinstieg vorhanden. Die zuvor bestandenen 86 Browserprüfungen gelten unverändert, da kein Laufzeitcode geändert wurde. Der zur Prüfung erzeugte Ausgabeordner wurde anschließend ebenfalls aus dem Projekt verschoben.

### 12.10.2026 – Codex – Version 1.4.0

Direkter Start durch `index.html`: klassisches, lokal mitgeliefertes `weblab.js` ersetzt ES-Module im Seitenrahmen. Die Quellmodule bleiben für Entwicklung und Tests erhalten. `start.cmd` ist nur noch eine Abkürzung, Node.js bleibt ein Entwicklungswerkzeug. Der Vorschau-Sandboxschutz bleibt erhalten.

15 Node-Tests bestanden. 86/86 Browserprüfungen mit dem neuen klassischen Skript bestanden; Live-Vorschau, Dateireiter, Lernkette, Speichern und Vorschau-Isolation geprüft. Veröffentlicht mit Implementierungscommit `38d39dfbbe6be12a16d72a008abe7035a153ad09`; [Pages-Workflow 38285087487](https://github.com/JakobSawazki/WebLab/actions/runs/38285087487) erfolgreich. Live-Version 1.4.0 und Startseite geprüft; Screenshot `WebLab-1.4.0.png`. Direkter `file://`-Aufruf kann mit dem integrierten Agentenbrowser nicht getestet werden, weil dessen URL-Regeln nur HTTP/HTTPS erlauben. Doppelklick-Test im normalen Schulbrowser bleibt offen.

### 12.10.2026 – Codex – Version 1.3.0

Auftrag: autonom weiterarbeiten und die Gestaltung an WorkbenchLab anlehnen. Jakob möchte informiert werden, wenn eine Anmeldung notwendig wird. Für diesen Arbeitsblock war keine neue Anmeldung erforderlich.

Designabgleich: WorkbenchLab/styles.css und styles-lesson.css gelesen. Die vorhandenen gemeinsamen Farbwerte, Metallflächen, Seitenleiste und Profile bleiben die Basis. Ergänzt wurden die vierteilige Ablaufnavigation, nummerierte Etappen und Fortschrittsanzeigen im Stil des Vorbilds. WorkbenchLab selbst wurde nicht verändert.

Startseite: Hero steht wieder am Anfang. Die mehrfachen Hinweise auf den nächsten Schritt und die komplette Liste aller 16 Einheiten wurden durch eine Weiterlernempfehlung und vier kompakte Etappen ersetzt. Jede Etappe zeigt ihren eigenen Fortschritt und führt zur ersten offenen Einheit dieser Etappe. Die vollständige Liste bleibt unter Lernpfad erreichbar; dort ist die nächste offene Einheit hervorgehoben.

Einheiten: Oben führt die Ablaufnavigation direkt zu Verstehen, Anwenden, Prüfen und Sichern. Die Navigation setzt den Tastaturfokus, ohne den Hash-Router aus der Einheit zu führen. Unter Sichern stehen Notizen, ein direkter JSON-Sicherungsdownload und die Erklärung zum Unterschied zwischen Lernstand und Projekt-ZIP. Einrückung, Codeübernahme, Live-Vorschau und Vorschau-Sandbox bleiben erhalten. Reduzierte Bewegung wird bei den Sprungmarken berücksichtigt.

Prüfungen: 13 Node-Tests und 86 Browserprüfungen bestanden. Neue Navigation mit Fokus und Routenerhalt geprüft; Startseite und Einheiten bei 360 Pixeln ohne horizontalen Überlauf. Startseite visuell im hellen Design kontrolliert. Physischer Schul-PC und Bildschirmleser bleiben offen. Keine neue Abhängigkeit, unverändertes Sicherungsformat und weiterhin 14 veröffentlichte Dateien.

Veröffentlichung: **1.3.0 auf main**, Implementierungscommit `f5786f179c68592fca353c536421002d0bc16c95`; [Pages-Workflow 38280125680](https://github.com/JakobSawazki/WebLab/actions/runs/38280125680) erfolgreich. Live unter `/WebLab/?v=1.3.0#home` geprüft: vier Etappen und Fortschritt sichtbar; erste Einheit geöffnet, Sichern-Sprungmarke erhält Route und setzt Fokus auf den Sicherungsabschnitt. Screenshots: `WebLab-1.3.0-Start.png` und `WebLab-1.3.0.png`. Abschließender Dokumentationsstand unter `v1.3.0`.

### 12.10.2026 – Codex – Version 1.2.0

Auftrag: verständliche Grundlagen mit einem durchgehenden roten Faden von Einheit zu Einheit, direkter Anwendung im Editor und echter Browserdarstellung der eigenen Webseite.

Ergebnis: Startseite und Lernpfad empfehlen den ersten noch offenen Schritt. Jede der 16 Einheiten erhält Vorwissen, den neuen Projektbaustein, drei konkrete Arbeitsanweisungen und einen Beobachtungsauftrag. Eine nummerierte Lernkette zeigt die aktuelle Einheit und abgeschlossene Schritte. Vorwissen wird mit der vorherigen Einheit verlinkt; nach Abschluss führt ein direkter Link weiter. Einheiten bleiben zum Wiederholen und Vorab-Ansehen erreichbar, die empfohlene Reihenfolge ist ausdrücklich sichtbar.

Fortlaufendes Projekt: Beim ersten Öffnen einer neuen Einheit werden HTML und CSS aus der unmittelbar vorherigen Einheit kopiert, sofern dort ein Entwurf vorliegt. Bereits vorhandene Entwürfe – auch leere – werden nicht überschrieben; frühere Einheiten bleiben als eigene Zwischenstände erhalten. Ohne vorherigen Entwurf erscheint der bisherige Startcode. Bei vorhandenen älteren Entwürfen lässt sich die vorige Einheit bewusst übernehmen: Bestätigung und Sicherungsdownload gehen dem Ersetzen voraus. Es gibt keine automatische Rückübertragung späterer Änderungen und keine neue Lernstandversion.

Didaktik: Die Schüler wählen ein Thema und erweitern dieselbe Webseite von Texten über Listen/Links/Bilder/Tabellen/Medien zu CSS, Struktur, Quellen und Test. Die Schritte erklären erwartete Browserreaktionen und typische Grenzen: alt ist keine sichtbare Bildunterschrift, Tabellen brauchen keine Dekorationsrahmen, Semantik erzeugt allein kein Layout. Relative Dateien und externe CSS-Verknüpfung werden zusätzlich im exportierten Projekt auf dem Informatik-Stick geprüft. Der Export ergänzt technisch die CSS-Verknüpfung; die Aufgabenprüfung verlangt, dass die Schüler sie selbst im HTML verstehen und setzen.

Editor: „Webseite groß ansehen“ öffnet den aktuellen HTML-/CSS-Code in einer großen Browseransicht mit Rückkehr zum Editor. Auch diese Vorschau hat ein leeres sandbox-Attribut und die bestehende CSP. Keine Skript-/Netzwerkfreigabe und keine Veröffentlichung des Schülercodes. Über das Projekt-ZIP lässt sich die Seite weiterhin als echte Datei im Browser öffnen. Physischer Schul-PC und Notepad++ bleiben noch zu erproben.

Technik: journey.js ergänzt die Content-Daten um Lernschritte und eine reine Funktion für Entwurfskopien. Build-Allowlist auf 14 Dateien erweitert. Vorhandene Profile, XP/NAGOLD und Sicherungsformate bleiben kompatibel. Keine zusätzliche Abhängigkeit.

Veröffentlichungs-Cache: Der Build versieht App-Einstieg, CSS und alle lokalen ES-Modulimporte mit der aktuellen Versionskennung. Der Live-Test zeigte zuvor noch einzeln zwischengespeicherte Module aus 1.1.0. Die Versionskennung gilt für den gesamten Modulgraphen; Quelldateien bleiben unverändert. Bei jeder Codeänderung für eine Veröffentlichung die Version erhöhen. Veraltetes HTML kann weiterhin ein Neuladen benötigen.

Prüfungen: 13 Node-Tests und 81 Browserprüfungen bestanden, darunter der Übergang l1 → l2 → l3 und zurück mit HTML/CSS-Erhalt. Große Vorschau und Rückkehr zum Code visuell geprüft; 360-Pixel-Layoutprüfung bestanden. Unterrichtserprobung und Bildschirmlesertest bleiben offen.

Veröffentlichung: **1.2.0 auf main**, Implementierungscommit `8711cf3748da1a165e728090fc9eaf84e53f8ce5`, Cache-Korrektur `111072d678df4b08ac0ed5fa8783f85506202d68`; [Pages-Workflow 38252679822](https://github.com/JakobSawazki/WebLab/actions/runs/38252679822) erfolgreich. Live mit Versionskennung unter `/WebLab/?v=1.2.0#lesson/l1` geprüft: Version, Lernkette, Fokus auf Editor, große Browseransicht und Rückkehr. Abschließender Dokumentationsstand unter `v1.2.0`. Screenshots: `WebLab-1.2.0.png` und `WebLab-1.2.0-Editor.png`. Das Veröffentlichungspaket wurde nach Ergänzung der Versionskennungen erneut mit allen 81 Browserprüfungen geprüft.

### 12.10.2026 – Codex – Version 1.1.0

Auftrag: direkter HTML-Editor mit Live-Vorschau und Vorbereitung auf Notepad++ 7.5.1 vom Informatik-Stick. Die Version und die Klassenarbeitsregel stammen von Jakob.

Ergebnis: index.html und style.css als zugängliche Dateireiter; Klartext-Editor mit Zeilennummern, Cursorposition und Tab-/Umschalt-Tab-Einrückung. Escape, dann Tab verlässt den Editor. HTML und CSS werden weiterhin getrennt pro Einheit bzw. im freien Labor gespeichert. Keine externen Editorbibliotheken, kein CDN und keine automatische Codevervollständigung. Die Vorschau aktualisiert sich nach 500 ms Schreibpause, kann ausgeschaltet und manuell aktualisiert werden; optional echte 360-Pixel-Handybreite. Sandbox und Vorschau-CSP bleiben erhalten.

Transfer: Projekt-ZIP entpacken, beide Dateien in Notepad++ öffnen, index.html im Browser öffnen, Code mit Strg+S speichern und Browser mit F5 aktualisieren. Dateiendungen, UTF-8 und CSS-Verknüpfung sind erklärt. Ein konkreter Überschrift-/Farbauftrag verlangt Arbeit in Notepad++. WebLab ist die Trainingsumgebung; für die Klassenarbeit gilt laut Jakob der Informatik-Stick. Die alte Notepad++-Installation selbst wurde nicht geändert und noch nicht auf einem Schul-PC erprobt.

Dateiimport: eine HTML-/HTM-Datei und/oder eine CSS-Datei, lokal über File API, keine Übertragung. UTF-8, Größenlimits (HTML 1.500 KB, CSS 40 KB), Ablehnung von Binärdateien/ungültigem UTF-8 und doppelten Dateitypen. Vor Ersetzen Bestätigung und Lernstand-Download; nur ausgewählte Typen werden im aktuellen Entwurf ersetzt. Exportnamen bleiben index.html und style.css, importierte Unterseiten/relative Medien werden nicht automatisch mitgeladen. Der Editor unterstützt Klartext, Zeilennummern und Einrückung; Syntaxfärbung und ein vollständiges Notepad++-Abbild sind nicht implementiert.

Geänderte Dateien: app.js, styles.css, editor.js, content.js (Version), package.json, Build-Allowlist, tests/editor.test.mjs, tests/browser.html, README und diese Dokumentation. editor.js wird ausdrücklich in das Veröffentlichungspaket kopiert. Keine neue Abhängigkeit, kein neues Lernstandformat. Vorhandene Profile und Lernfortschritte bleiben kompatibel.

Prüfungen: 11 Node-Tests und 72 Browserprüfungen bestanden. Visuelle Kontrolle des Editors im hellen Farbschema, Live-Seite mit Dateireiterwechsel geprüft. Schul-PC/Notepad++ 7.5.1 und physische Mobilgeräte bleiben offen.

Veröffentlichung: **1.1.0 auf main**, Implementierungscommit `1cbc24c103b9c273cd9588ac3686fa63dc9c72a4`; [Pages-Workflow 38251400596](https://github.com/JakobSawazki/WebLab/actions/runs/38251400596) erfolgreich. Live unter /WebLab/#lab geöffnet und Version sowie Dateireiter geprüft. Der abschließende Dokumentationsstand wird unter `v1.1.0` geführt. Screenshot: `WebLab-1.1.0.png`.

### 12.10.2026 – Codex – Version 1.0.0

Auftrag: WebLab nach dem Vorbild WorkbenchLab/Excel-Lab aufräumen, BPE2-Lernpfad, lokales Profil, XP/NAGOLD, gemeinsame Dokumentation und eigenständig gewählter Veröffentlichungszeitpunkt.

Ergebnis: statische Anwendung, 16 Einheiten, freies Labor, Glossar, Sicherungen und Projektexporte. Alte Änderungen vorab gesichert, ungenutzte Framework-/Serverdateien außerhalb des Projekts archiviert. Sechs OneNote-Seitentexte und der Bildungsplan lokal gesichert. Die eingebetteten Originalanhänge sind noch offen.

Prüfungen: acht Node-Tests und 59 Browserprüfungen bestanden; ZIP unabhängig geprüft, Glossar/Profile/Entwurftrennung/NAGOLD/Farbschemata über die Oberfläche geprüft. Responsive 360-Pixel-Prüfungen bestanden; physische Geräte und Bildschirmleser bleiben offen (siehe Abschnitt 7). Code vor Abschluss einheitlich formatiert; Prettier 3.6.2 wurde nur als temporäres Entwicklungswerkzeug aus dem offiziellen npm-Register verwendet, nicht als Projektabhängigkeit installiert.

Veröffentlichung: **1.0.0 auf main** im bestehenden Repository. Erster Release-Commit `a6bf6b26fe7097e903ad3c9ac596a1d5e490d1f8`; [Pages-Workflow 38249482092](https://github.com/JakobSawazki/WebLab/actions/runs/38249482092) erfolgreich. Live-Seite am 12.10.2026 geöffnet und geprüft. Der abschließende Dokumentations-/Formatierungsstand wird auf demselben Branch und unter dem Release-Tag `v1.0.0` geführt. Kein Force-Push.

Nächster sinnvoller Schritt: Jakob erprobt den Lernablauf mit Schülern; parallel werden die Originalanhänge nachgesichert und die fachlichen Erläuterungen anhand realer Rückfragen vertieft.
