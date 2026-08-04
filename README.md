# WebLab

**Version:** 0.1.0  
**Stand:** 4. August 2026  
**Status:** Erstes vollständiges Einstiegskapitel

WebLab ist eine browserbasierte Lernumgebung für Schülerinnen und Schüler des
beruflichen Gymnasiums und der Berufskollegs. Sie verbindet kurze Erklärungen,
einen Live-Editor, direkte Vorschau, automatische Aufgabenprüfung, Punkte und
einen datensparsamen Lernstand.

## Aktueller Umfang

- Kapitel **„Deine erste Webseite“** statt technischer Bezeichnungen wie „K1“
- schülergerechte Einführung in HTML-Elemente, Tags und Attribute
- kompakter Spickzettel mit acht zentralen HTML-Bausteinen
- HTML- und CSS-Editor mit isolierter Live-Vorschau
- vier automatisch prüfbare Missionen mit insgesamt 320 XP
- lokaler Lerncoach mit gestuften Hinweisen, ohne Datenübertragung
- lokales Profil im Format `abc.xyz`
- automatische Speicherung im Browser
- versionierter JSON-Export und -Import des vollständigen Lernstands
- responsive Oberfläche für Desktop, Tablet und Smartphone

## Didaktische Leitidee

Jedes Kapitel soll auf **einer zusammenhängenden Seite** funktionieren:

1. Ziel und Nutzen verstehen
2. wenige zentrale Begriffe visuell kennenlernen
3. wichtige Befehle kompakt nachschlagen
4. Code direkt verändern und ausführen
5. kleine Missionen prüfen und XP sammeln
6. Lernstand lokal sichern

Die Seite orientiert sich fachlich am Aufbau des verlinkten HTML-Grundkurses,
formuliert Erklärungen und Aufgaben aber eigenständig, kürzer und schülernäher.
Der fachliche Anspruch wird perspektivisch am Bildungsplan Informatik für das
nichtgewerbliche berufliche Gymnasium in Baden-Württemberg ausgerichtet.

## Lernstand und Datenschutz

Der Stand liegt unter `weblab-state-v1` im `localStorage`. Gespeichert werden
Kürzel, HTML-/CSS-Entwurf und gelöste Missionen. Es gibt derzeit kein zentrales
Schülerkonto und keine manipulationssichere Leistungsbewertung. Über JSON können
Lernende ihren Stand auf einen anderen Rechner übertragen.

Der erste Coach arbeitet vollständig lokal. Eine echte KI-Anbindung wird erst
nach einer separaten Datenschutz-, Kosten- und Secret-Entscheidung ergänzt.
API-Schlüssel dürfen nie im Browsercode oder Repository liegen.

## Entwicklung

```bash
npm install
npm run dev
npm run build
```

Die Anwendung nutzt React, TypeScript und vinext. Hosting-Konfiguration liegt
unter `.openai/hosting.json`; D1 und R2 werden in Version 0.1.0 nicht benötigt.

## Projektdateien

- `app/page.tsx` – Kapitelinhalt, Editor, Missionen und Lernstand
- `app/globals.css` – vollständige visuelle Gestaltung und responsive Regeln
- `app/layout.tsx` – Metadaten und Social Preview
- `public/weblab-hero.png` – Kapitelillustration
- `TASKS.md` – erledigte Arbeit, aktueller Fokus und Ideen
- `UEBERGABE.md` – kompakter Einstieg für weitere KI-Agenten

## Herkunft und Veröffentlichung

Öffentliche Inhalte müssen eigenständig formuliert sein. Verlinkte oder lokale
Unterrichtsmaterialien dienen nur als fachliche Referenz und werden nicht
ungeprüft übernommen.

