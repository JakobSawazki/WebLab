# WebLab

Statische Lernumgebung zu **BPE2: Entwicklung von Internetseiten**, im Aufbau und Design an WorkbenchLab angelehnt.

- **Live:** https://jakobsawazki.github.io/WebLab/
- **Repository:** https://github.com/JakobSawazki/WebLab
- **Gemeinsamer Arbeitsstand:** [documentation/documentation.md](documentation/documentation.md)

16 Lerneinheiten, lokales Schülerprofil, HTML-/CSS-Labor, 109 Glossareinträge, XP, NAGOLD, JSON-Lernstandsicherung und Projektexport.

Seit Version 1.1.0: Editor mit Dateireitern, Zeilennummern, Live-/Handyvorschau, lokalem HTML-/CSS-Import und Übungsablauf für Notepad++ 7.5.1 auf dem Informatik-Stick.

Seit Version 1.2.0: durchgehender Lernpfad mit nächstem Lernschritt, Vorwissen, drei Arbeitsschritten und Beobachtungsauftrag je Einheit. Neue Einheiten übernehmen eine Kopie des vorherigen Entwurfs; die eigene Webseite wächst weiter. Die Vorschau kann als große Browseransicht geöffnet werden.

Seit Version 1.3.0: kompakte Startseite mit vier Etappen, Fortschrittsanzeigen und hervorgehobenem nächsten Schritt. Jede Lerneinheit erhält die Ablaufnavigation Verstehen → Anwenden → Prüfen → Sichern nach dem Vorbild WorkbenchLab.

Seit Version 1.4.0: WebLab direkt durch Doppelklick auf `index.html` starten. Der gesamte Projektordner muss zusammenbleiben; Node.js und ein lokaler Server sind zum Lernen nicht erforderlich.

Seit Version 1.5.0: einheitliche SVG-Icons, edlere Buttons, ruhigere Flächen und abgestimmte helle/dunkle Gestaltung. Quellcode, Tests und Werkzeuge liegen aufgeräumt unter `development/`; diese Dateien werden für die Weiterentwicklung und Prüfung benötigt.

Seit Version 1.6.0: gebürstete Stahl- und Aluminiumflächen mit feiner Körnung, metallischen Buttons und Lichtkanten. Die Gestaltung entsteht vollständig lokal in CSS.

Seit Version 1.7.0: verbindlicher Lernpfad. Einheit 01 ist frei; jeder Abschluss bringt 100 XP und schaltet die nächste Einheit frei. Punkte bleiben erhalten. Spätere Einheiten sind auch über Direktlinks gesperrt.

Entwicklung und Browserprüfungen:

```text
npm test
npm run build
npm run qa
npm run serve
```

Keine Installation von Bibliotheken notwendig. Node.js ab Version 22 wird nur für Entwicklung, Tests und Neubau benötigt. `npm run build` erzeugt die mitgelieferte klassische Skriptdatei `weblab.js` und das Veröffentlichungspaket. Der Einstieg erfolgt ausschließlich über `index.html`; die bisherige `start.cmd` wurde entfernt. `dist/` wird bei Bedarf für Entwicklung und Veröffentlichung neu erzeugt.

Originalmaterialien unter `ressources/BPE2/` bleiben lokal und werden nicht veröffentlicht. Profile sind lokale Lernstände, keine Serverkonten oder manipulationssicheren Leistungsnachweise.

Seit Version 1.7.1: neues fotorealistisches Metalllogo; dasselbe Motiv dient als PNG-Tab-Icon.

Seit Version 1.8.0: kurze freiwillige Fehlersuchübungen mit erklärenden Rückmeldungen, seit 1.17.0 in allen 16 Einheiten.

Seit Version 1.9.0: interaktive Box-Modell-Hilfe in Einheit 12 mit Innen-/Außenabstand, Rahmen und Vergleich von content-box und border-box.

Seit Version 1.13.0: Profil mit XP-Level, Fortschrittsbalken und direktem Zugang zur bearbeitbaren NAGOLD-Tabelle nach dem Vorbild WorkbenchLab. Einträge ergänzen, bearbeiten und löschen; Änderungen werden erst mit Speichern übernommen.

Seit Version 1.14.0: Jedes offene Kriterium nennt einen konkreten nächsten Schritt; jede Einheit listet typische Stolpersteine. Seit 1.15.0 erklärt der Verständnischeck jede Antwort, und eine Checkliste zeigt vor dem Abschluss, was noch fehlt. Seit 1.16.0 hat das Nachschlagewerk „Siehe auch“-Verweise und eine Suche mit exakten Treffern zuerst.

Prüfungen: `npm test` (Node-Tests, darunter Farbkontraste beider Farbschemata aus `styles.css`) und nach `npm run build` mit `npm run qa` alle Browserprüfungen ohne sichtbares Fenster in Edge oder Chrome. Alternativ nach `npm run serve` unter `http://127.0.0.1:4188/__qa`. Die Prüfseite fängt Sicherungsdownloads der App ab. GitHub Actions veröffentlicht nur, wenn beide Prüfungen bestehen.
