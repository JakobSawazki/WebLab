import { lessons } from "./content.js";
import { copyDraft } from "./pages.js";

// Each step adds to the same student-chosen website; no completed solutions.
const stages = [
  [
    "Du brauchst noch keine HTML-Kenntnisse. Wähle ein Thema, das du auf deiner eigenen Webseite vorstellen möchtest.",
    "Du gibst deiner Webseite einen Namen und schreibst ihren ersten Inhalt.",
    [
      "Lies das Beispiel: Welche Wörter stehen zwischen den Tags?",
      "Ersetze im HTML-Reiter die Überschrift und den Absatz durch eigene Texte. Betone ein wichtiges Wort mit strong.",
      "Ändere ein Wort erneut und beobachte rechts, welche Stelle sich verändert.",
    ],
    "Du siehst deine eigene Überschrift, einen Absatz und ein fett hervorgehobenes Wort. Die Tags selbst erscheinen nicht auf der Seite.",
  ],
  [
    "Du kannst bereits eine Überschrift und einen Absatz schreiben.",
    "Du ordnest deinen bisherigen Inhalt in das HTML-Grundgerüst ein.",
    [
      "Suche head und body im HTML-Code. Fehlt das Grundgerüst, baue es um deinen bisherigen Inhalt herum.",
      "Trage im title den Namen deiner Webseite ein und kontrolliere Doctype, lang und UTF-8.",
      "Exportiere index.html und öffne sie im Browser. Vergleiche den Browser-Tab mit der sichtbaren Überschrift.",
    ],
    "Der title steht im Browser-Tab; die h1 steht auf der Seite. Eine Änderung im head erzeugt keinen neuen Absatz im body.",
  ],
  [
    "Deine Seite hat ein Grundgerüst und erste eigene Inhalte.",
    "Du machst aus deinem Text zwei verständliche Themenabschnitte.",
    [
      "Überlege zwei Unterthemen zu deiner eigenen Webseite.",
      "Ergänze im body je eine h2 und einen Absatz. Behalte deine h1 bei und betone eine Stelle mit em.",
      "Lies die Vorschau von oben nach unten. Erkennst du Thema und Unterthemen ohne den Code?",
    ],
    "Eine Hauptüberschrift und zwei Unterüberschriften gliedern deine Seite. Absätze sind getrennt, em wird normalerweise kursiv angezeigt.",
  ],
  [
    "Du kannst deinen Inhalt mit Überschriften und Absätzen gliedern.",
    "Du ergänzt Materialien oder Merkmale und eine passende Schrittfolge.",
    [
      "Wähle drei Dinge, die zu deinem Thema gehören, und drei Schritte eines Ablaufs.",
      "Füge eine ul und eine ol im body hinzu. Schreibe jeden Eintrag in ein li.",
      "Vertausche zwei Schritte und beobachte die automatische Nummerierung.",
    ],
    "Die ul zeigt Aufzählungszeichen, die ol nummeriert die Schritte. Deine bisherigen Texte bleiben erhalten.",
  ],
  [
    "Deine Webseite enthält Texte und Listen.",
    "Du machst Abschnitte und weitere Seiten über Links erreichbar.",
    [
      "Ergänze einen Link zu kontakt.html und einen HTTPS-Link mit verständlichem Text.",
      "Gib einer h2 die id ideen und ergänze davor den Link mit href #ideen.",
      "Teste den Sprunglink in der Vorschau. kontakt.html kannst du mit „+ Unterseite“ oder nach dem Export in Notepad++ anlegen. Teste den relativen Link im entpackten Projekt.",
    ],
    "Ein Sprunglink führt zum passenden Abschnitt. Externe und relative Ziele prüfst du im exportierten Projekt im Browser.",
  ],
  [
    "Du kennst href und relative Pfade für Links.",
    "Du ergänzt ein eigenes Bild und beschreibst seine Information.",
    [
      "Wähle ein eigenes Bild, das zu deinem Seitenthema passt, und füge es über den Bildknopf ein.",
      "Suche das neue img im HTML. Ersetze den Platzhalter im alt und kontrolliere width und height.",
      "Vergleiche Bildgröße und Text in der Vorschau. Überlege den Dateipfad für den Bildordner auf dem Stick.",
    ],
    "Dein Bild erscheint in der Seite. alt ist eine Textalternative, keine Bildunterschrift; du kontrollierst ihn im Code.",
  ],
  [
    "Du kannst Texte, Listen, Links und ein Bild in deine Seite einfügen.",
    "Du ergänzt zusammengehörige Daten als Tabelle.",
    [
      "Wähle zwei Spalten für dein Thema, zum Beispiel Angebot und Termin.",
      "Baue table mit caption, einer Kopfzeile und zwei Datenzeilen. Nutze th mit scope und td.",
      "Zähle in der Vorschau die Zellen jeder Zeile. Die Tabelle benötigt noch keine dekorativen Rahmen.",
    ],
    "Deine Daten stehen in zwei Spalten. Die Kopfzellen heben sich hervor; fehlende Rahmen sind kein HTML-Fehler.",
  ],
  [
    "Du kannst Bilder und tabellarische Daten einbinden.",
    "Du ergänzt ein Medium mit Bedienung und einer Textalternative.",
    [
      "Lies das Video-Beispiel und übertrage die Struktur auf ein passendes Medium zu deinem Thema.",
      "Ergänze controls, source mit Dateipfad und Medientyp sowie einen erklärenden Text.",
      "Exportiere das Projekt, lege deine Mediendatei im angegebenen Ordner ab und teste sie im Browser.",
    ],
    "Im Labor können Bedienelemente erscheinen, relative Mediendateien spielen dort nicht ab. Den tatsächlichen Film oder Ton prüfst du im Projektordner.",
  ],
  [
    "Deine HTML-Seite enthält inzwischen mehrere Inhaltsbausteine.",
    "Du trennst zum ersten Mal Inhalt und Gestaltung in zwei Dateien.",
    [
      "Ergänze im head die Verknüpfung zu style.css. Der bisherige body bleibt erhalten.",
      "Wechsle zum CSS-Reiter. Lege eine Schriftfamilie für body und eine Farbe für h1 fest.",
      "Ändere die Farbe im CSS und beobachte die Vorschau. Exportiere anschließend beide Dateien in denselben Ordner.",
    ],
    "Der Inhalt bleibt gleich, seine Darstellung verändert sich. Die externe CSS-Verknüpfung prüfst du zusätzlich im exportierten Projekt.",
  ],
  [
    "Deine Seite verwendet eine eigene CSS-Datei.",
    "Du gestaltest mehrere Hinweise gemeinsam und einen Abschnitt gezielt.",
    [
      "Gib zwei eigenen Absätzen die Klasse hinweis und deiner Hauptüberschrift die id start.",
      "Schreibe im CSS Regeln für .hinweis und #start. Vergleiche diese mit einem Tagselektor wie p.",
      "Ändere die gemeinsame Hinweisfarbe. Prüfe, welche Elemente davon betroffen sind.",
    ],
    "Beide Hinweise reagieren auf eine Klassenregel; die ID-Regel trifft dein einzelnes Element. Ein Punkt oder # gehört zum CSS-Selektor.",
  ],
  [
    "Du kannst Elemente mit Tag-, Klassen- und ID-Selektoren auswählen.",
    "Du machst deine gesamte Webseite gut lesbar.",
    [
      "Lege für body Textfarbe, Hintergrund, Schriftfamilie, Schriftgröße und Zeilenhöhe fest.",
      "Ergänze eine passende Textausrichtung für h1. Ändere jeweils nur einen Wert.",
      "Lies deine Seite in normaler und schmaler Vorschau. Prüfe Kontrast und Lesbarkeit.",
    ],
    "Du erkennst die Wirkung jeder Eigenschaft einzeln. Text und Hintergrund sind unterscheidbar, längere Absätze bleiben gut lesbar.",
  ],
  [
    "Schrift und Farben deiner Webseite passen bereits zusammen.",
    "Du gibst einem Inhaltsbereich Abstände, Rahmen und eine begrenzte Breite.",
    [
      "Umschließe einen eigenen Abschnitt mit einem Element der Klasse karte.",
      "Gestalte .karte mit padding, border, margin, max-width und box-sizing.",
      "Ändere erst padding, dann margin. Vergleiche die Position des Textes zum Rahmen und zu den Nachbarelementen.",
    ],
    "padding schafft Raum innerhalb des Rahmens, margin außerhalb. In der Handyansicht passt der Bereich in die verfügbare Breite.",
  ],
  [
    "Du kannst Inhalt und Gestaltung deiner Seite aufbauen.",
    "Du ordnest dein gewachsenes Projekt für eine konkrete Zielgruppe.",
    [
      "Schreibe auf, für wen die Seite gedacht ist und was Besucher dort finden sollen.",
      "Ordne vorhandene Inhalte in header, nav, main und footer ein. Vermeide eine zweite h1 und doppelte IDs.",
      "Kontrolliere die Reihenfolge im Code und in der Vorschau. Passe Navigation und Texte an die Zielgruppe an.",
    ],
    "Die Seite bleibt lesbar und hat nachvollziehbare Bereiche. Semantische Tags erzeugen allein noch kein fertiges Layout.",
  ],
  [
    "Dein Projekt hat eine Zielgruppe und eine Seitenstruktur.",
    "Du prüfst die Herkunft deiner Inhalte und ergänzt nachvollziehbare Quellen.",
    [
      "Prüfe deine eigenen Bilder, Texte und Medien: selbst erstellt oder mit passender Nutzungserlaubnis?",
      "Ergänze im footer einen Abschnitt zu Quellen und Rechten mit konkreten Angaben zu deinem Projekt.",
      "Lies die Quellenangaben wie ein Besucher. Besprich mit der Lehrkraft, welche Anbieterinformationen für die geplante Veröffentlichung nötig sind.",
    ],
    "Die Herkunft deiner Inhalte ist sichtbar. Ein allgemeiner Disclaimer ersetzt keine Erlaubnis für fremde Bilder oder Texte.",
  ],
  [
    "Du hast eine gestaltete Seite mit Quellenangaben.",
    "Du testest die echten Dateien systematisch außerhalb des Labors.",
    [
      "Exportiere das Projekt-ZIP und entpacke es auf dem Stick. Vorhandene Unterseiten sind enthalten. Ergänze fehlende Seiten in Notepad++ sowie Bilder und Medien an ihren relativen Pfaden.",
      "Öffne index.html im Browser. Teste Links, Bilder und eine schmale Fensterbreite; bearbeite gefundene Fehler in Notepad++.",
      "Dokumentiere drei konkrete Testergebnisse als Liste auf deiner Seite. Lade korrigierte HTML-/CSS-Dateien bei Bedarf wieder hier hinein.",
    ],
    "Die exportierte Seite funktioniert mit ihrer Ordnerstruktur. Ein Häkchen im Labor ersetzt diesen Dateitest nicht.",
  ],
  [
    "Du hast alle Bausteine geübt und dein Projekt im Browser getestet.",
    "Du führst dein Projekt zu einer selbständig erklärbaren eigenen Webseite zusammen.",
    [
      "Vergleiche dein Projekt in der Werkstatt dieser Einheit mit dem Abschlussauftrag. Ergänze fehlende Inhalte passend zu deinem Thema.",
      "Entpacke das Projekt-ZIP auf dem Stick. Öffne index.html, teste Hin- und Rücklink und kontrolliere Quellen und Gestaltung. Präsentiere deine Webseite.",
      "Erkläre an deinem eigenen Code ein HTML-Element, eine CSS-Regel und einen relativen Pfad. Sichere zusätzlich deinen Lernstand als JSON und prüfe, dass die Datei auf deinem Stick liegt.",
    ],
    "Deine eigene statische Webseite stellt ein klares Thema vor. Du kannst Aufbau und Gestaltung begründen und Änderungen selbst durchführen.",
  ],
];

export const journey = Object.fromEntries(
  lessons.map((lesson, index) => [
    lesson.id,
    {
      previous: lessons[index - 1]?.id || null,
      next: lessons[index + 1]?.id || null,
      recall: stages[index][0],
      addition: stages[index][1],
      steps: stages[index][2],
      observe: stages[index][3],
    },
  ]),
);

export function startingDraft(drafts, id) {
  if (drafts[id]) return copyDraft(drafts[id]);
  const previous = journey[id]?.previous;
  if (previous && drafts[previous]) return copyDraft(drafts[previous]);
  return { html: lessons.find((lesson) => lesson.id === id).starter, css: "" };
}
