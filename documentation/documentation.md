# WebLab – gemeinsame Projektdokumentation

Stand: **12. Oktober 2026, Europe/Berlin · Codex**

Version: **1.7.4** · Status: **veröffentlicht und online geprüft**.

Diese Datei ist der zentrale Einstieg für **Jakob, Codex und Claude**. Frühere verteilte Projektstände wurden außerhalb des Projekts gesichert. README und CLAUDE.md verweisen hierher. Künftige Änderungen werden hier mit Autor, Datum, Ergebnis, Prüfung und offenen Punkten dokumentiert.

## 1. Ziel und aktueller Funktionsumfang

Schülerinnen und Schüler verstehen HTML und CSS und entwickeln selbständig eine eigene statische Webseite. Die Gestaltung übernimmt Seitenrahmen, Farbwerte, Metallflächen, dunklen Standardmodus, helles Farbschema, Profilkopf und Navigationsidee von WorkbenchLab. Die Anwendung selbst ist auf Webentwicklung zugeschnitten und enthält keine SQL-/Datenbankmodule.

Repository: https://github.com/JakobSawazki/WebLab

Live-Adresse der aktuellen Version: https://jakobsawazki.github.io/WebLab/

Das bereits vorhandene öffentliche Repository wird weitergeführt. Es wird kein zweites Repository mit abweichendem Verlauf angelegt. Die frühere Sites-Adresse `https://weblab-sawazki.jakob-sawazki.chatgpt.site` ist ein Altstand; sie wird in diesem Arbeitsblock nicht aktualisiert oder abgeschaltet. Für 1.0.0 ist GitHub Pages die Veröffentlichungsplattform wie bei WorkbenchLab. Ein Wechsel der Domain übernimmt Browserdaten nicht automatisch: Auf der alten Seite JSON sichern, auf der neuen Seite laden.

| Bereich | Version 1.7.4 |
| --- | --- |
| Lerneinheiten | 16 vollständige Einstiegsfassungen in vier Etappen; Einheit 01 frei, weitere Einheiten nacheinander durch Abschluss-XP freigeschaltet |
| Ablauf je Einheit | Ziel, Erklärung, Beispiel, Praxisauftrag, Hinweis, Editor, technische Prüfung, Verständnischeck, Selbstkontrolle, Notizen |
| Roter Faden | Nächster offener Lernschritt, 16 Schritte mit aktueller Position, Vorwissen, drei konkrete Arbeitsschritte und Beobachtungsauftrag; eigene Webseite wächst durch Kopien des vorherigen Entwurfs |
| Orientierung | Vier Etappen mit Fortschritt auf der Startseite; direkte Ablaufnavigation Verstehen → Anwenden → Prüfen → Sichern in den Einheiten |
| Schülerprofil | Lokales Kürzel `MUS.MAX` und Klasse; kein Passwort und kein Serverkonto |
| XP | 100 je abgeschlossenem Auftrag, einmalig; frühere K1-Missions-XP bleiben zusätzlich erhalten |
| NAGOLD | 5 je abgeschlossener Einheit; datierte automatische Einträge und manuelle Einträge von −10 bis +5 ohne 0 |
| Abschluss | Technische Kriterien erfüllt, Quiz richtig, alle Selbstkontrollen bestätigt, Profil vollständig |
| Lehrkraft | Gespräch und Prüfung außerhalb der App; CSV-Übersicht für den Abgleich |
| Labor | HTML-/CSS-Dateireiter, Zeilennummern, Einrückung, Live-/manuelle isolierte Vorschau, Handyansicht und große Browseransicht, eigenständiger freier Entwurf |
| Informatik-Stick | HTML-/CSS-Import und Export, Notepad++-Transferauftrag mit Strg+S/F5 und Dateiverknüpfung |
| Export | `index.html`, `style.css`, Projekt-ZIP, Lernstand als JSON, Übersicht als CSV |
| Nachschlagen | 84 übernommene eigene Glossareinträge aus WebLab 0.5.0, Suche und Bereichsfilter |
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

**Noch offen: Originalanhänge als DOCX/ZIP herunterladen.** Ein Anhang wurde über „Speichern unter“ und die normale OneNote-Downloadwarnung angefordert. Der Browser lieferte jedoch kein abrufbares Downloadartefakt. Die gesicherten Textdateien sind Auszüge der sichtbaren Seiten, kein Ersatz für die eingebetteten Informations-, Aufgaben- und Lösungsdateien. Diese Anhänge wurden nicht als gelesen oder inhaltlich ausgewertet verbucht. Lösungen sollen auch künftig lokal bleiben.

ThommyWeb: https://informatik.systems/thommyWeb/grundkurs.html

Der Direktabruf über das Webwerkzeug war in diesem Arbeitsblock nicht erfolgreich. Der Link ist in OneNote bestätigt. Frühere WebLab-Themen und das eigene Glossar sind erhalten; fremde Texte oder Bilder wurden nicht kopiert. Eine spätere Integration erfolgt als eigenständig formulierte Ergänzung nach fachlicher Prüfung und mit geklärter Herkunft.

Aktuell geprüfte offizielle Referenzen für Einheit 14:

- https://creativecommons.org/cc-licenses/ – Lizenzbedingungen, insbesondere BY und SA.
- https://www.gesetze-im-internet.de/ddg/__5.html – Anbieterinformationen; Anwendbarkeit ist vom Angebot abhängig und wird für die konkrete Schulveröffentlichung mit der Lehrkraft geklärt.

Die WebLab-Texte und Aufgaben sind eigenständig formuliert. Logo und Hero stammen aus der bisherigen WebLab-Fassung. Keine Unterrichtsoriginale, Lösungen oder Schülerzuordnungen werden ins Repository oder in das Veröffentlichungspaket aufgenommen.

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
    tests/                   18 Node-Tests und Browserprüfseite
  documentation/documentation.md
  documentation/WebLab-1.7.4.png
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

Google Drive erzeugt gelegentlich `desktop.ini` innerhalb `.git/refs`. Git deutet diese als ungültige Referenzen. Solche Dateien werden bei Bedarf ausschließlich aus dem geprüften refs-Unterbaum ins externe Archiv verschoben; fachliche Git-Referenzen bleiben erhalten.

## 7. Prüfstand und verbleibende Arbeit

Geprüft durch Codex am 12.10.2026:

- 18 Node-Tests bestanden (zusätzlich drei Freischaltungsprüfungen): Inhaltsvollständigkeit, Abschlussvoraussetzungen, einmalige Punkte, Migration, Roundtrip, ungültiger Import, Begrenzungen, ZIP-Struktur, Einrückung, Code-Dateiimport sowie vollständige Lernkette und Erhalt vorhandener Entwürfe.
- Browserprüfungen: die bisherigen 86 Funktions- und Layoutprüfungen sowie zusätzliche Kontrollen für beide Farbschemata, SVG-Navigation, Buttonhöhen und Textkontrast. Ergebnis siehe neuestes Arbeitsprotokoll.
- Profil und erste Einheit per Oberfläche durchgespielt, Punkte nach Neuladen erhalten.
- Glossarsuche, unabhängiger freier Entwurf, beide Farbschemata und manuelle NAGOLD-Einträge über die Oberfläche geprüft. Keine Anwendungsfehler im Browserprotokoll.
- ZIP-Inhalt und CRC32 zusätzlich unabhängig mit Python zipfile geprüft.
- GitHub-Actions-Workflow erfolgreich, Live-Startseite und Einheit 1 unter dem /WebLab/-Unterpfad geöffnet. Aktueller Screenshot: `WebLab-1.5.0.png` in diesem Dokumentationsordner; frühere Screenshots liegen im externen Archiv und in den jeweiligen Git-Tags.
- Responsive Prüfung: Startseite, Einheiten 1 und 12 sowie Glossar bei tatsächlich 360 Pixel breiten eingebetteten Browserfenstern ohne horizontalen Überlauf. Der direkte Viewport-Schalter des Browserwerkzeugs änderte die native Ansicht nicht; deshalb wurde die Breite unabhängig in der lokalen Browser-Testseite geprüft. Physische Mobilgeräte und Bildschirmleser bleiben noch ungetestet.

Offene Erweiterungen, nach Priorität:

1. **Unterrichtserprobung:** Sprache, Hinweise und Aufgaben mit einer Klasse erproben. Die 16 Einstiegsfassungen sind eine arbeitsfähige Grundlage, keine behauptete pädagogische Endabnahme.
2. **Originalquellen:** DOCX-/ZIP-Anhänge aus OneNote vollständig lokal sichern, inventarisieren und fachlich abgleichen. Veraltete Rechtsmaterialien gesondert prüfen.
3. **Lehrkraftablauf:** Nach Jakobs Unterrichtserprobung entscheiden, ob wie bei WorkbenchLab eine separate lokale Klassenübersicht und Lehrkraft-Bestätigungsliste ergänzt wird. Der aktuelle Schülerabschluss ist bewusst als Selbstmeldung kenntlich.
4. **Didaktische Vertiefung:** mehr Fehlersuchaufträge, visuelle Box-Modell-/Selektorhilfen, gestufte HTML-Aufgaben, Tabellenformatierung und weitere Medienaufgaben.
5. **Projektwerkstatt:** zusätzliche HTML-Unterseiten und Medienverwaltung ergänzen. index.html und style.css sind seit 1.1.0 als Reiter vorhanden; ein Projekt mit beliebig vielen Dateien bleibt offen.
6. **Betrieb:** echter Schul-PC-/Tablet-Test, Bildschirmleser, weitere Browser, optionale Offline-Kopie und Browserprüfungen in CI.
7. **ThommyWeb:** gezielt fachliche Ergänzungen prüfen und eigenständig ausarbeiten, keine pauschale Inhaltsübernahme.

## 8. Gemeinsames Arbeitsprotokoll

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
