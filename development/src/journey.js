import { lessons } from "./content.js";
import { copyDraft } from "./pages.js";

// Gemeinsame Arbeit am Schulgarten, danach ein eigenständiges Projekt.
const stages = [
  [
    "Die Garten-AG möchte neuen Schülerinnen und Schülern ihren Schulgarten zeigen. Die Klasse baut dafür eine Informationsseite.",
    "Wir schreiben die erste Überschrift und den ersten Absatz.",
    [
      "Ändere zwischen <h1> und </h1> nur den Text zu „Unser Schulgarten“. Schau in die Live-Vorschau.",
      "Ersetze den Startsatz zwischen <p> und </p> durch „Wir pflanzen gemeinsam Gemüse.“. Vergleiche die Vorschau.",
      "Setze <strong> direkt vor „gemeinsam“ und </strong> direkt danach. Prüfe deinen Auftrag."
    ],
    "Alle sehen dieselbe Überschrift und denselben Satz. Vergleicht, welches Wort fett ist. Zeigt im Code, wo die Überschrift beginnt und endet. Welche Zeichen haben euch beim Tippen Schwierigkeiten gemacht?"
  ],
  [
    "Überschrift und Absatz sind schon da. Jetzt machen wir daraus eine vollständige HTML-Datei.",
    "Wir setzen den vorhandenen Inhalt in ein Grundgerüst.",
    [
      "Tippe das Grundgerüst aus dem Beispiel ab, falls es noch fehlt. Setze die Überschrift und den Satz aus Einheit 01 zwischen <body> und </body>.",
      "Schreibe „Garten-AG unserer Schule“ zwischen <title> und </title>. Behalte „Unser Schulgarten“ als sichtbare Überschrift.",
      "Speichere index.html aus der Werkstatt und öffne die Datei im Browser."
    ],
    "Vergleicht „Garten-AG unserer Schule“ im Browser-Tab und „Unser Schulgarten“ auf der Seite. Zeigt die beiden Stellen im Code. Wofür brauchen wir UTF-8?"
  ],
  [
    "Unsere Seite hat ein Grundgerüst und eine Hauptüberschrift.",
    "Wir gliedern den Schulgarten in zwei Abschnitte.",
    [
      "Füge unter dem ersten Absatz eine h2 mit dem Text „Unsere Ideen“ ein. Schreibe darunter den Absatz „Wir bauen Gemüse und Kräuter an.“.",
      "Ergänze die zweite h2 „Mitmachen“ und den Absatz „Jeden Mittwoch treffen wir uns im Garten.“.",
      "Setze <em> und </em> um „Mittwoch“. Prüfe die Reihenfolge der Abschnitte in der Vorschau."
    ],
    "Vergleicht die Reihenfolge der Überschriften und die Betonung von „Mittwoch“. Erklärt am gemeinsamen Beispiel, wann eine h2 sinnvoll ist."
  ],
  [
    "Unter „Unsere Ideen“ und „Mitmachen“ stehen bereits zwei Absätze.",
    "Wir listen Material und Arbeitsschritte auf.",
    [
      "Ergänze im Abschnitt „Unsere Ideen“ eine ungeordnete Liste (ul) mit Erde, Samen und Gießkanne.",
      "Ergänze im Abschnitt „Mitmachen“ eine geordnete Liste (ol) mit „Beet vorbereiten“, „Samen aussäen“ und „Beet gießen“.",
      "Vertausche probeweise zwei Arbeitsschritte und beobachte die Nummern. Stelle dann die vorgegebene Reihenfolge wieder her."
    ],
    "Vergleicht die drei Materialien und die Schritte 1 bis 3. Warum braucht nur der Ablauf eine feste Reihenfolge?"
  ],
  [
    "Der Schulgarten hat Abschnitte und Listen. Jetzt sollen Besucher ihre Ziele schnell finden.",
    "Wir verlinken einen Abschnitt, eine Unterseite und eine Beispieladresse.",
    [
      "Gib „Unsere Ideen“ die id ideen. Füge nach der Hauptüberschrift einen Link mit href=\"#ideen\" und dem Text „Zu unseren Ideen“ ein.",
      "Lege über „+ Unterseite“ kontakt.html an. Setze dort die sichtbare Überschrift „Kontakt zur Garten-AG“ und einen Link „Zur Startseite“ zu index.html. Auf der Startseite ergänzt du den Link „Kontakt“ zu kontakt.html.",
      "Ergänze auf der Startseite den Link „Beispielseite im Internet“ zu https://example.org/. Entpacke das Projekt-ZIP und teste Sprunglink, Hin- und Rücklink im Browser."
    ],
    "Zeigt, welcher Link mit # beginnt, welcher nur einen Dateinamen hat und welcher mit https:// beginnt. Prüft gemeinsam, ob Kontaktseite und Rückweg im entpackten Projekt funktionieren."
  ],
  [
    "Du kennst bereits die Zieladresse eines Links. Ein Bild hat ebenfalls eine Quelle.",
    "Wir fügen denselben Beetplan mit Alternativtext ein.",
    [
      "Lade den Beetplan über den Link unter der Anleitung herunter. Füge ihn über „Bild einfügen“ unter „Unsere Ideen“ ein.",
      "Setze als alt-Text „Zwei Beete: Radieschen links, Bohnen rechts.“. Prüfe am neuen img-Element, ob width und height eingetragen sind.",
      "Vergleiche Bild und Beschreibung. Nenne bilder/beetplan.png als möglichen Pfad, wenn das Bild in einem Ordner neben index.html abgelegt wird."
    ],
    "Vergleicht den Beetplan und den alt-Text im Code. Erklärt, warum der Text auch ohne das Bild verrät, wo Radieschen und Bohnen wachsen."
  ],
  [
    "Der Beetplan zeigt Radieschen und Bohnen. Jetzt vergleichen wir ihre Pflanzzeiten.",
    "Wir stellen zwei Beispieldaten in einer Tabelle dar.",
    [
      "Setze unter den Beetplan eine Tabelle mit der Beschriftung „Pflanzzeiten“ (caption).",
      "Schreibe die Kopfzeile „Pflanze“ und „Monat“ als th mit scope=\"col\". Ergänze die Datenzeilen „Radieschen | April“ und „Bohnen | Mai“ mit td-Zellen.",
      "Lies die Tabelle in der Vorschau. In jeder Zeile sollen genau zwei Zellen stehen."
    ],
    "Vergleicht Tabellenbeschriftung, Spaltenköpfe und beide Datenzeilen. Zeigt im Code je ein Beispiel für th und td."
  ],
  [
    "Bild und Tabelle sind fertig. Ein kurzer Clip zeigt zusätzlich die Arbeitsschritte.",
    "Wir binden einen gemeinsamen Clip mit Textfassung ein.",
    [
      "Lade den Clip zur Aussaat unter dieser Anleitung herunter. Setze nach den Arbeitsschritten ein video mit controls ein.",
      "Verwende in source den Pfad medien/aussaat.webm und type=\"video/webm\". Schreibe darunter „Textfassung: Beet vorbereiten, Samen aussäen, Beet gießen.“ als Absatz.",
      "Entpacke dein Projekt-ZIP. Lege dort den Ordner medien an, speichere aussaat.webm darin und teste den Clip in index.html."
    ],
    "Vergleicht die Bedienleiste und die Textfassung. Spielt den Clip im entpackten Projekt ab. Prüft gemeinsam den Pfad, falls er bei jemandem fehlt."
  ],
  [
    "Unser HTML hat jetzt mehrere Inhalte. Mit CSS ändern wir ihr Aussehen.",
    "Wir färben die Überschrift und verbinden zwei Dateien.",
    [
      "Öffne style.css in der Werkstatt und tippe h1 { color: navy; }. Beobachte die Überschrift.",
      "Ersetze navy durch darkgreen. Ergänze body { font-family: Arial, sans-serif; } in einer neuen Zeile.",
      "Füge im HTML-Kopf die link-Zeile aus dem Beispiel ein. Öffne index.html aus dem entpackten Projekt und prüfe, ob die Farbe gleich bleibt."
    ],
    "Vergleicht die dunkelgrüne Überschrift. Zeigt gemeinsam, welche Datei den Text enthält, welche die Farbe festlegt und wie die Dateien verbunden sind."
  ],
  [
    "Eine einfache CSS-Regel färbt die Überschrift bereits dunkelgrün.",
    "Wir gestalten zwei Hinweise gemeinsam und die Überschrift gezielt.",
    [
      "Gib den Absätzen „Wir bauen Gemüse und Kräuter an.“ und „Jeden Mittwoch treffen wir uns im Garten.“ jeweils class=\"hinweis\".",
      "Gib der h1 id=\"start\". Schreibe .hinweis { color: darkgreen; } und #start { text-align: center; } in style.css.",
      "Ändere probeweise nur die Farbe der Hinweise. Prüfe, welche Texte sich ändern, und stelle darkgreen wieder her."
    ],
    "Vergleicht die zwei grünen Absätze und die mittige Überschrift. Warum hat die Klasse im CSS einen Punkt und die ID eine Raute?"
  ],
  [
    "Die gemeinsamen Hinweise und die Hauptüberschrift lassen sich bereits gezielt gestalten.",
    "Wir geben der Schulgartenseite ein lesbares Schriftbild.",
    [
      "Ergänze in der body-Regel color: #182c35; und background-color: #f4f7f6;. Behalte Arial, sans-serif als Schriftfamilie.",
      "Ergänze font-size: 1rem; und line-height: 1.6;. Füge in der h1-Regel text-align: center; hinzu.",
      "Vergleiche normale Breite und Handyansicht. Ändere probeweise line-height auf 1.0 und stelle anschließend 1.6 wieder her."
    ],
    "Vergleicht Hintergrund, Text und Zeilenabstand. Erklärt, welche Änderung beim Lesen eines längeren Absatzes hilft."
  ],
  [
    "Die Schrift und die Farben der Schulgartenseite sind festgelegt.",
    "Wir fassen die Ideen in einem Bereich mit Rahmen zusammen.",
    [
      "Umschließe den Bereich „Unsere Ideen“ samt zugehörigem Inhalt bis vor „Mitmachen“ mit <section class=\"karte\"> und </section>.",
      "Gib .karte die Werte padding: 1rem; border: 1px solid darkgreen; margin: 1rem auto; max-width: 40rem; und box-sizing: border-box;. Ergänze danach für img, video die Regel aus dem Beispiel.",
      "Ändere probeweise nur padding. Stelle danach 1rem wieder her und prüfe die Karte in der Handyansicht."
    ],
    "Vergleicht Text, Rahmen und Abstand. Zeigt an derselben Karte, wo padding und wo margin sichtbar wird."
  ],
  [
    "Die Inhalte sind fertig. Wir ordnen sie so, dass neue Schülerinnen und Schüler sich schnell zurechtfinden.",
    "Wir gliedern die Startseite in Kopf, Navigation, Hauptinhalt und Fuß.",
    [
      "Schreibe in deine Notizen die Zielgruppe „Neue Schülerinnen und Schüler“ und zeichne Start- und Kontaktseite als Skizze.",
      "Verschiebe die h1 in header, die Links zu „Unseren Ideen“ und „Kontakt“ in nav und die Inhaltsabschnitte in main.",
      "Ergänze am Anfang von main „Diese Seite zeigt neuen Schülerinnen und Schülern, wie sie in der Garten-AG mitmachen können.“ als Absatz. Setze unten einen footer mit „Schulprojekt Garten-AG“ ein."
    ],
    "Vergleicht die vier Bereiche anhand eures Codes. Wo sucht ein neuer Schüler nach dem Kontakt? Was hat sich in der sichtbaren Seite geändert?"
  ],
  [
    "Die Schulgartenseite hat eine klare Zielgruppe und eine übersichtliche Struktur.",
    "Wir dokumentieren die Herkunft des gemeinsamen Materials.",
    [
      "Ergänze im footer die h2 „Quellen und Rechte“.",
      "Schreibe darunter „Beetplan und Aussaat-Clip: WebLab-Unterrichtsmaterial. Texte: gemeinsamer Unterrichtsentwurf.“. Setze <cite> und </cite> jeweils um die Titel „Beetplan“ und „Aussaat-Clip“.",
      "Besprecht mit der Lehrkraft, welche Angaben für Material aus fremden Quellen und eine Veröffentlichung nötig wären."
    ],
    "Vergleicht die Quellenzeile. Zeigt die beiden Werktitel zwischen <cite> und </cite>. Welche zusätzlichen Informationen bräuchtet ihr für ein fremdes Foto? Wo würdet ihr eine passende Erlaubnis nachschlagen?"
  ],
  [
    "Die gestaltete Schulgartenseite ist fertig und hat Quellenangaben.",
    "Wir testen die exportierten Dateien mit demselben Protokoll.",
    [
      "Entpacke das Projekt-ZIP. Lege den Aussaat-Clip wieder unter medien/aussaat.webm ab. Öffne index.html im Browser.",
      "Prüfe nacheinander den Hin- und Rücklink, den Aussaat-Clip und die Karte bei schmaler Fensterbreite. Behebe Fehler in Notepad++.",
      "Schreibe auf der Startseite ein Testprotokoll. Öffne den Bereich mit <details>. Schreibe „Testprotokoll“ zwischen <summary> und </summary>. Ergänze darunter eine ol mit den drei Ergebnissen und schließe mit </details>. Klappe das Protokoll in der Vorschau auf. Nutze für die Übertragung das von der Lehrkraft vorgegebene geschützte Ziel."
    ],
    "Öffnet das Testprotokoll und vergleicht die Ergebnisse der gleichen drei Tests. Haltet einen typischen Fehler und seinen Lösungsweg fest. Welche Fragen sind vor dem eigenen Projekt offen?"
  ],
  [
    "Du hast am Schulgarten eine vollständige Website aufgebaut und gemeinsam geprüft.",
    "Jetzt planst, baust und präsentierst du eine Webseite zu deinem eigenen Thema.",
    [
      "Wähle ein Thema und notiere Zielgruppe, Ziel und zwei Seiten. Lege für die eigene Webseite einen separaten Projektordner an und starte mit dem Grundgerüst dieser Einheit.",
      "Entwickle index.html und kontakt.html mit Hin- und Rücklink und gemeinsamer style.css. Nutze den Abschlussauftrag als Checkliste.",
      "Entpacke das Projekt-ZIP, teste Links und Darstellung, dokumentiere die Quellen und präsentiere deine Webseite. Erkläre ein HTML-Element, eine CSS-Regel und einen relativen Pfad."
    ],
    "Du kannst erklären, für wen deine Seite gedacht ist, wie sie aufgebaut ist und wie du geprüft hast, dass sie funktioniert."
  ],
];

const buildingBlocks = [
  ["<h1>", "<p>", "<strong>"],
  ["<!doctype html>", "<html>", "<head>", "<meta charset>", "<title>", "<body>"],
  ["<h2>", "<em>"],
  ["<ul>", "<ol>", "<li>"],
  ["<a>", "href", "id", "relative Pfade"],
  ["<img>", "src", "alt", "width", "height"],
  ["<table>", "<caption>", "<tr>", "<th scope>", "<td>"],
  ["<video controls>", "<source>", "Textfassung"],
  ["style.css", "color", "font-family", "<link>"],
  ["class", ".hinweis", "#start", "text-align"],
  ["background-color", "font-size", "line-height"],
  ["<section>", "padding", "border", "margin", "max-width", "height", "box-sizing"],
  ["<header>", "<nav>", "<main>", "<footer>"],
  ["<cite>", "Quellen im Footer", "Bildrechte"],
  ["<details>", "<summary>", "Dateien im Browser testen"],
  ["Zwei verknüpfte Seiten", "Gemeinsame style.css", "Eigener Projektordner"],
];

const materials = {
  l6: ["assets/beetplan.png", "Beetplan herunterladen"],
  l8: ["assets/aussaat.webm", "Aussaat-Clip herunterladen"],
};

export const journey = Object.fromEntries(
  lessons.map((lesson, index) => [
    lesson.id,
    {
      previous: lessons[index - 1]?.id || null,
      shared: index < lessons.length - 1,
      material: materials[lesson.id],
      blocks: buildingBlocks[index],
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
  const step = journey[id];
  const previous = step?.shared && step.previous;
  if (previous && drafts[previous]) return copyDraft(drafts[previous]);
  return { html: lessons.find((lesson) => lesson.id === id).starter, css: "" };
}
