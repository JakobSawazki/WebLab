# Übergabe für KI-Agenten

## Auftrag

WebLab wird eine moderne, motivierende Lernumgebung für Webentwicklung am
beruflichen Gymnasium und in BK-Klassen. Die fachliche Flughöhe soll zum
nichtgewerblichen beruflichen Gymnasium passen; Sprache und Bedienung bleiben
einfach. Die Referenz `informatik.systems/thommyWeb/grundkurs.html` liefert die
thematische Reihenfolge, aber weder Texte noch altes Kartendesign sollen kopiert
werden.

## Aktueller Stand

Version 0.1.0 enthält das vollständige Einstiegskapitel **„Deine erste
Webseite“**. Alles liegt in `app/page.tsx` und `app/globals.css`. Der Lernstand
wird lokal unter `weblab-state-v1` gespeichert und als WebLab-JSON mit
`formatVersion: 1` exportiert. Es gibt vier Missionen mit zusammen 320 XP.

## Einstieg

1. `README.md`, `TASKS.md` und diese Datei lesen.
2. `git status -sb` und die letzten Commits prüfen.
3. `app/page.tsx`, `app/globals.css` und `.openai/hosting.json` öffnen.
4. Den vorhandenen Stil und den Ein-Seiten-Lernzyklus beibehalten.
5. Vor dem Push Build und `git diff --check` ausführen.

## Wichtige Grenzen

- Der lokale Coach ist transparent als lokale Hilfe gekennzeichnet; er ist noch
  keine externe generative KI.
- Eine KI-API nur über einen serverseitigen Endpunkt und ein Hosting-Secret
  anbinden. Niemals einen API-Schlüssel in Browsercode oder GitHub ablegen.
- Das Kürzel ist kein echtes Konto. Fortschritt ist veränderbar und nicht für
  benotete Leistungsnachweise geeignet.
- Bei einem neuen Kapitel zuerst Inhalt und Aufgaben festlegen, dann erst die
  Navigation erweitern.

## Nächster sinnvoller Auftrag

> Entwickle Kapitel 02 „Text, Links und Bilder“ im bestehenden WebLab-Stil.
> Baue es wieder als zusammenhängende Kapitel-Seite mit kurzer Erklärung,
> visuellen Beispielen, Spickzettel, Studio-Aufgaben und lokaler Prüfung. Passe
> Lernstand, XP, JSON-Import/-Export und Dokumentation konsistent an.

