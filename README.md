# WebLab

Statische Lernumgebung zu **BPE2: Entwicklung von Internetseiten**, im Aufbau und Design an WorkbenchLab angelehnt.

- [WebLab öffnen](https://jakobsawazki.github.io/WebLab/)
- [Zentrale Dokumentation für Jakob, Codex und Claude](documentation/documentation.md)

16 aufeinander aufbauende Lerneinheiten führen von der ersten HTML-Datei zur eigenen statischen Webseite. Dazu gehören ein HTML-/CSS-Editor mit Live-Vorschau, Übungen, Nachschlagewerk, lokale Schülerprofile, XP und NAGOLD sowie Lernstandsicherung und Projektexport. Transferaufträge bereiten auf Notepad++ 7.5.1 vom Informatik-Stick vor.

## Lokal starten

`index.html` per Doppelklick öffnen. Den Projektordner zusammenlassen; zum Lernen sind weder Node.js noch ein Server erforderlich.

## Weiterentwickeln

Arbeitsstand, Entscheidungen, Quellen und Prüfprotokolle stehen in der zentralen Dokumentation. Offene Fragen werden lokal in `documentation/tasks.md` gesammelt. Quellmodule, erforderliche Tests und Werkzeuge liegen unter `development/`.

Mit Node.js ab Version 22, ohne zusätzliche Bibliotheksinstallation:

```text
npm test
npm run build
npm run qa
npm run serve
```

Der Build erzeugt `weblab.js` und das Veröffentlichungspaket unter `dist/`. GitHub Actions prüft den Stand vor der Veröffentlichung auf GitHub Pages.

Unterrichtsoriginale unter `ressources/BPE2/` und persönliche Lernstände bleiben privat. Profile sind lokale Lernstände, keine Serverkonten oder manipulationssicheren Leistungsnachweise.
