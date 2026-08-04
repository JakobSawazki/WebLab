# Arbeitsauftrag für Claude

## Kurze Einweisung

WebLab ist eine moderne Lernumgebung für Schülerinnen und Schüler des
beruflichen Gymnasiums und der Berufskollegs. Sie sollen Webentwicklung in
kleinen, motivierenden Kapiteln verstehen, Code direkt ausprobieren, Missionen
prüfen und XP sammeln können. Sprache und Bedienung bleiben einfach; der
fachliche Anspruch orientiert sich langfristig am nichtgewerblichen beruflichen
Gymnasium.

Version 0.3.0 enthält Kapitel 01 **„Deine erste Webseite“**. Es behandelt
bewusst nur `h1`, `p`, `strong` und `br`. CSS wird erst ab Kapitel 05 erklärt.
Die verlinkte Seite von informatik.systems ist ausschließlich Inspiration für
die thematische Richtung. Texte, Aufgaben und Gestaltung müssen eigenständig
bleiben.

Vor jeder Änderung:

1. `README.md`, `TASKS.md` und `UEBERGABE.md` vollständig lesen.
2. `git status -sb` prüfen. Vorhandene, nicht von dir stammende Änderungen
   niemals überschreiben oder zurücksetzen.
3. `app/page.tsx`, `app/globals.css` und die betroffenen Tests ansehen.
4. Immer nur **ein** Arbeitspaket bearbeiten und separat darüber berichten.
5. Nach Codeänderungen mindestens Build, passende Tests und `git diff --check`
   ausführen. Nicht selbst veröffentlichen oder pushen, solange dies nicht
   ausdrücklich beauftragt wurde.

## Unveränderliche Leitplanken

- Dark Mode bleibt Standard; Light Mode muss weiterhin funktionieren.
- Blau-metallische Bildsprache, Rasterlogo und Hero-Motiv beibehalten.
- Kapitel bleiben zusammenhängende Lernseiten: Ziel, Erklärung, Spickzettel,
  Studio, Missionen und Lernstand.
- Kapitel 01 nicht nachträglich mit Attributen oder CSS überfrachten.
- Das Kürzel ist kein echtes Konto; `localStorage` und JSON bleiben der
  datensparsame Standard.
- Der aktuelle Lerncoach ist lokale Hilfslogik, keine echte generative KI.
- Keine API-Schlüssel, Musterlösungen oder kopierten Unterrichtstexte ablegen.
- `start.cmd` muss unter Windows per Doppelklick funktionieren und CRLF-Zeilen
  behalten.

## Arbeitspaket 1 – Mobile und barrierefreie Kapitelnavigation

**Priorität: hoch**

Die Desktop-Navigation funktioniert mit Untermenüs; auf kleinen Bildschirmen
wird sie derzeit ausgeblendet. Entwickle eine klare mobile Kapitel-Navigation,
ohne das Desktop-Design zu verschlechtern.

Akzeptanzkriterien:

- Auf Smartphone und Tablet sind Kapitel und Kapitelgruppen erreichbar.
- Menüs funktionieren per Maus, Touch und Tastatur und nicht nur über Hover.
- Schalter verwenden passende `aria-expanded`- und `aria-controls`-Angaben.
- `Escape` schließt ein geöffnetes Menü; der Fokus bleibt nachvollziehbar.
- Das aktive Kapitel **„01 · Deine erste Webseite“** ist eindeutig markiert.
- Geplante Kapitel wirken sichtbar gesperrt und sind nicht versehentlich
  aufrufbar.
- Keine horizontalen Überläufe bei 360 Pixel Breite.

## Arbeitspaket 2 – Kapitel 01 robuster prüfen

**Priorität: hoch**

Verbessere die technische Prüfung der vier vorhandenen Missionen, ohne die
Aufgaben schwieriger zu machen. Fehlermeldungen sollen sagen, was noch fehlt,
aber keine komplette Lösung verraten.

Akzeptanzkriterien:

- Für jede Mission gibt es positive und negative automatisierte Testfälle.
- Leere Elemente und unveränderter Startcode zählen nicht als Lösung.
- Groß-/Kleinschreibung und zusätzliche sinnvolle HTML-Elemente führen nicht
  zu falschen Fehlern.
- Defektes importiertes JSON wird sicher abgelehnt; gültige alte Lernstände
  bleiben ladbar.
- Alle erreichbaren XP entsprechen weiterhin den angezeigten 320 XP.
- Die Hinweise sind kurz, freundlich und für Anfänger verständlich.

## Arbeitspaket 3 – Kapitel 02 konzipieren und umsetzen

**Priorität: danach**

Entwickle Kapitel 02 **„Attribute richtig nutzen“** als eigenständige
Fortsetzung. Das Kapitel darf in der Navigation erst freigeschaltet werden,
wenn Inhalt, Studio, Aufgabenprüfung und Lernstand vollständig funktionieren.

Vorgesehener Lernumfang:

- Grundidee `name="wert"` in sehr einfacher Sprache erklären.
- `href` bei Links sowie `src` und `alt` bei Bildern behandeln.
- Den Aufbau eines Elements mit Attribut visuell und textlich erklären.
- Einen kompakten Spickzettel und vier aufeinander aufbauende Missionen
  entwickeln.
- Weiter nur HTML bearbeiten; CSS bleibt gesperrt.

Akzeptanzkriterien:

- Kapitel 01 bleibt vollständig erreichbar und sein Lernstand erhalten.
- Kapitel 02 besitzt eigene Ziele, Inhalte, Startdatei, Missionen und XP.
- Kapitelwechsel aktualisiert Breadcrumbs, Fortschritt und aktive Navigation.
- Speicherung und JSON-Import/-Export unterscheiden beide Kapitel sauber.
- Bildbeschreibungen werden fachlich sinnvoll erklärt und nicht als bloße
  Formalität behandelt.
- Inhalte sind neu formuliert und nicht aus der Referenzseite übernommen.

## Gewünschte Rückmeldung nach jedem Paket

Berichte kompakt:

1. Was wurde geändert?
2. Welche Dateien wurden berührt?
3. Was wurde geprüft?
4. Welche fachliche oder technische Entscheidung muss noch getroffen werden?
