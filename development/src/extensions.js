// Optionale Vertiefungen je Einheit, eigenständig formuliert. Sie vergeben
// keine Punkte und verändern weder Kriterien noch Entwürfe.
export const extensions = {
  l1: {
    title: "Ausprobieren: So liest der Browser deinen Code",
    explanation:
      "Der Browser baut aus deinem HTML einen Baum aus Elementen. Den geschriebenen Code siehst du mit Strg+U als Quelltext, den daraus gebauten Baum in den Entwicklerwerkzeugen unter Elemente. Fehlt ein End-Tag, repariert der Browser den Baum nach festen Regeln. Das Ergebnis sieht oft trotzdem richtig aus, entspricht aber nicht mehr genau deinem Code.",
    code: "<!-- So steht es im Code -->\n<p>Wir lernen <strong>HTML</p>\n<p>Zweiter Absatz</p>\n\n<!-- So kann es der Browser reparieren -->\n<p>Wir lernen <strong>HTML</strong></p>\n<p><strong>Zweiter Absatz</strong></p>",
    steps: [
      "Exportiere deinen Entwurf als index.html und öffne die Datei im Browser. Drücke Strg+U und vergleiche den Quelltext mit deinem Code.",
      "Drücke F12 und öffne den Bereich Elemente. Klappe body auf und finde deine h1 und deinen Absatz mit strong.",
      "Lösche in der exportierten Datei mit Notepad++ das End-Tag </strong>, speichere mit Strg+S und lade mit F5 neu. Beobachte, welcher Text jetzt fett ist und wie der Baum aussieht.",
      "Stelle das End-Tag wieder her und prüfe, dass Darstellung und Baum wieder deinem Code entsprechen.",
    ],
    observe:
      "Kannst du erklären, warum ein fehlendes End-Tag auch nachfolgende Inhalte betreffen kann? Verlasse dich nicht auf die Reparatur des Browsers, sondern schließe Elemente selbst. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l2: {
    title: "Ausprobieren: Grundgerüst und Umlaute in Notepad++",
    explanation:
      "In Notepad++ gibt es keine Vorschau und keine automatische Prüfung. Umso wichtiger sind Grundgerüst, Dateiname und Kodierung. Die Statusleiste unten rechts zeigt die Kodierung der Datei. Steht dort nicht UTF-8, erscheinen Umlaute im Browser falsch, obwohl im head meta charset=\"utf-8\" steht.",
    code: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Grüße aus der AG</title>\n</head>\n<body>\n  <h1>Schöne Grüße</h1>\n  <p>Äpfel, Öl und Übungen.</p>\n</body>\n</html>',
    steps: [
      "Starte Notepad++ vom Informatik-Stick und lege eine neue Datei an. Prüfe unten rechts in der Statusleiste die Kodierung; wähle bei Bedarf im Menü Kodierung den Eintrag UTF-8.",
      "Tippe das Grundgerüst aus dem Beispiel selbst ab, ohne zu kopieren. Wähle im Menü Sprache unter H den Eintrag HTML, damit Notepad++ die Tags farbig hervorhebt.",
      "Speichere die Datei mit Strg+S als index.html in deinem Projektordner. Öffne sie per Doppelklick im Browser und prüfe Titel im Tab und Umlaute.",
      "Wandle die Datei testweise über das Menü Kodierung in ANSI um, speichere und lade den Browser mit F5 neu. Beobachte die Umlaute und stelle danach UTF-8 wieder her.",
    ],
    observe:
      "Kannst du erklären, warum Datei-Kodierung und meta charset zusammenpassen müssen? Vergleiche deinen getippten Code anschließend mit deinem Entwurf im WebLab. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l3: {
    title: "Ausprobieren: Die Gliederung nur an den Überschriften prüfen",
    explanation:
      "Viele Menschen überfliegen eine Seite zuerst über die Überschriften, Vorleseprogramme springen gezielt von Überschrift zu Überschrift. Deine Überschriften sollten deshalb allein schon verraten, worum es geht. Eine h1 nennt das Thema, h2 die Unterthemen, h3 Teile eines Unterthemas. Keine Ebene wird übersprungen.",
    code: "h1 Unser Schulgarten\n  h2 Die Idee\n  h2 Mitmachen\n    h3 Termine\n    h3 Material\n  h2 Kontakt",
    steps: [
      "Schreibe alle Überschriften deines Entwurfs eingerückt untereinander, so wie im Beispiel. Lass den übrigen Text weg.",
      "Prüfe: Gibt es genau eine h1? Folgt auf eine h2 höchstens eine h3? Wurde eine Ebene übersprungen?",
      "Lies nur die Überschriften einer Mitschülerin oder einem Mitschüler vor. Kann die Person sagen, worum es auf deiner Seite geht?",
      "Verbessere unklare Überschriften wie „Text“ oder „Infos“ durch aussagekräftige Formulierungen und passe die Ebenen in deinem Entwurf an.",
    ],
    observe:
      "Kannst du begründen, warum eine Überschrift h2 oder h3 ist, unabhängig von ihrer Schriftgröße? Die Größe passt du später mit CSS an. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l4: {
    title: "Ausprobieren: Listen in Listen",
    explanation:
      "Listen lassen sich verschachteln: Eine Unterliste steht innerhalb eines li, direkt nach dessen Text. So entsteht zum Beispiel eine Einkaufsliste mit Unterpunkten oder eine Anleitung mit Teilschritten. Auch Navigationen bestehen häufig aus einer ul mit Links, weil sie eine Liste von Zielen sind.",
    code: "<ul>\n  <li>Saatgut\n    <ul>\n      <li>Radieschen</li>\n      <li>Salat</li>\n    </ul>\n  </li>\n  <li>Gießkanne</li>\n</ul>",
    steps: [
      "Ergänze in deiner ul bei einem Eintrag eine Unterliste mit zwei Punkten. Sie steht vor dem </li> des übergeordneten Eintrags.",
      "Prüfe in der Vorschau, dass die Unterpunkte eingerückt erscheinen und ein eigenes Aufzählungszeichen haben.",
      "Setze die Unterliste absichtlich hinter das </li> und vergleiche die Darstellung. Stelle danach die richtige Position wieder her.",
      "Rücke deinen Code so ein, dass du an der Einrückung erkennst, welche Liste zu welchem Eintrag gehört.",
    ],
    observe:
      "Kannst du erklären, warum eine Unterliste innerhalb eines li stehen muss und nicht direkt in der ul? Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l5: {
    title: "Ausprobieren: Pfade in einer Ordnerstruktur",
    explanation:
      "Relative Pfade gehen immer von der Datei aus, in der sie stehen. Liegt eine Seite in einem Unterordner, führt ../ einen Ordner nach oben. Ordner- und Dateinamen müssen exakt übereinstimmen, auch in Groß- und Kleinschreibung. Im Labor kannst du nur eine Seite bearbeiten; die Pfade zwischen mehreren Dateien testest du nach dem Export im Projektordner.",
    code: 'mein-projekt/\n  index.html\n  kontakt.html\n  bilder/\n    beet.jpg\n  seiten/\n    team.html\n\n<!-- in index.html -->\n<a href="seiten/team.html">Unser Team</a>\n<img src="bilder/beet.jpg" alt="Hochbeet im Schulhof">\n\n<!-- in seiten/team.html -->\n<a href="../index.html">Zur Startseite</a>\n<img src="../bilder/beet.jpg" alt="Hochbeet im Schulhof">',
    steps: [
      'Ergänze in deinem Entwurf einen Link auf seiten/team.html. Er führt von index.html in den Unterordner seiten.',
      "Überlege, welche Pfade in seiten/team.html zur Startseite und zum Bild führen. Notiere sie in deinen Notizen, bevor du weiterliest: Aus dem Unterordner geht es mit ../ zurück.",
      "Exportiere das Projekt-ZIP und entpacke es. Lege den Ordner seiten an und darin mit Notepad++ die Datei team.html mit Rücklink und Bild. Speichere mit Strg+S und teste alle Links im Browser.",
      "Ändere absichtlich einen Pfad in Bilder/beet.jpg mit großem B. Beobachte, was der Browser anzeigt, und stelle den richtigen Pfad wieder her.",
    ],
    observe:
      "Kannst du für jede Datei erklären, von welchem Ordner ihr Pfad ausgeht? Ein Pfad, der in index.html stimmt, ist in seiten/team.html falsch, wenn ../ fehlt. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l6: {
    title: "Ausprobieren: Den passenden Alternativtext finden",
    explanation:
      "Ein guter Alternativtext hängt vom Zweck des Bildes ab, nicht nur von seinem Inhalt. Ein informatives Bild beschreibt die Information, die es vermittelt. Ein Bild, das als Link dient, nennt das Ziel. Ein rein dekoratives Bild erhält ein leeres alt=\"\", damit Vorleseprogramme es überspringen. Wiederhole im alt-Text nicht, was direkt daneben schon steht.",
    code: '<!-- informativ: Was zeigt das Bild? -->\n<img src="bilder/beet.jpg" alt="Drei Hochbeete mit jungen Salatpflanzen">\n\n<!-- als Link: Wohin führt es? -->\n<a href="kontakt.html"><img src="bilder/brief.png" alt="Kontakt"></a>\n\n<!-- dekorativ: wird übersprungen -->\n<img src="bilder/linie.png" alt="">',
    steps: [
      "Suche in deinem Entwurf jedes Bild und entscheide: informativ, Link oder dekorativ?",
      "Schreibe für jedes informative Bild einen Alternativtext, der die wichtige Information in einem kurzen Satz nennt. Vermeide Anfänge wie „Bild von“.",
      "Lies deinen Absatz mit Bild laut vor und ersetze dabei das Bild durch seinen alt-Text. Klingt der Text sinnvoll und ohne Doppelungen?",
      "Ändere absichtlich einen Bildpfad, sodass das Bild nicht geladen wird. Beobachte in der Vorschau, wo der Browser jetzt den alt-Text zeigt, und stelle den Pfad wieder her.",
    ],
    observe:
      "Kannst du für jedes Bild deiner Seite begründen, warum sein alt-Text so lautet? Dasselbe Foto kann je nach Seite einen anderen alt-Text brauchen. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l7: {
    title: "Ausprobieren: Zeilenüberschriften und Tabellenbereiche",
    explanation:
      "Manche Tabellen haben Überschriften in der ersten Spalte, zum Beispiel einen Wochentag pro Zeile. Solche Kopfzellen sind ebenfalls th, aber mit scope=\"row\". thead und tbody trennen Kopfzeile und Datenzeilen. So können Vorleseprogramme zu jeder Zelle die passende Spalten- und Zeilenüberschrift nennen.",
    code: '<table>\n  <caption>Gießplan</caption>\n  <thead>\n    <tr><th scope="col">Tag</th><th scope="col">Gruppe</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Montag</th><td>Klasse 8a</td></tr>\n    <tr><th scope="row">Mittwoch</th><td>Klasse 8b</td></tr>\n  </tbody>\n</table>',
    steps: [
      "Überlege, ob deine Tabelle aus Einheit 07 eine Spalte hat, die jede Zeile benennt. Wenn ja, mache deren Zellen zu th mit scope=\"row\".",
      "Umschließe die Kopfzeile mit thead und die Datenzeilen mit tbody.",
      "Prüfe in der Vorschau, dass Zeilenüberschriften standardmäßig fett erscheinen. Die Darstellung kannst du später mit CSS anpassen.",
      "Lies eine Datenzelle so vor, wie es ein Vorleseprogramm tun würde: Zeilenüberschrift, Spaltenüberschrift, Inhalt. Ergibt das einen verständlichen Satz?",
    ],
    observe:
      "Kannst du für jede th-Zelle begründen, ob sie eine Spalte oder eine Zeile beschreibt? Die automatische Prüfung der Einheit bleibt unverändert. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l8: {
    title: "Ausprobieren: Untertitel als WebVTT-Datei",
    explanation:
      "Untertitel stehen in einer eigenen Textdatei im Format WebVTT. Jede Zeitangabe nennt Beginn und Ende im Format Stunden:Minuten:Sekunden.Millisekunden, darunter folgt der Text. Das track-Element verbindet die Datei mit dem Video. Wichtig: Beim Öffnen per Doppelklick blockieren Edge und Chrome die Untertiteldatei aus Sicherheitsgründen. Untertitel testest du deshalb über einen Webserver, etwa die Unterrichtsplattform der Lehrkraft.",
    code: 'WEBVTT\n\n00:00:00.500 --> 00:00:04.000\nWir bereiten das Hochbeet vor.\n\n00:00:04.500 --> 00:00:08.000\nJetzt säen wir die Radieschen.\n\n<video controls width="480">\n  <source src="medien/garten.mp4" type="video/mp4">\n  <track src="medien/untertitel.vtt" kind="subtitles" srclang="de" label="Deutsch" default>\n</video>',
    steps: [
      "Schreibe zu deinem geplanten Video zwei bis drei kurze Untertitel mit Zeitangaben auf. Jeder Untertitel steht höchstens wenige Sekunden.",
      "Lege in Notepad++ eine Datei untertitel.vtt im Ordner medien an. Die erste Zeile lautet WEBVTT; speichere die Datei als UTF-8.",
      "Ergänze in deinem Entwurf im video-Element das track-Element mit src, kind, srclang und label.",
      "Teste die Untertitel auf der Unterrichtsplattform oder einem anderen Webserver. Über den Doppelklick auf index.html erscheinen sie nicht; das ist kein Fehler in deinem Code.",
    ],
    observe:
      "Kannst du erklären, warum Untertitel und Textfassung den Inhalt auch ohne Ton zugänglich machen? Die Laborvorschau lädt keine Mediendateien. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l9: {
    title: "Ausprobieren: Drei Wege zu derselben Gestaltung",
    explanation:
      "Nutze deine beiden h2-Überschriften aus Einheit 03. Ein style-Attribut gestaltet nur das jeweilige Element. Eine Regel im style-Element des head kann mehrere passende Elemente dieser Seite gestalten. Dieselbe Regel in style.css kann von mehreren HTML-Seiten verwendet werden. Teste die drei Varianten nacheinander. Ob eine Regel im head oder in einer externen Datei steht, gibt ihr allein keinen Vorrang; konkurrierende Regeln untersuchst du in Einheit 10.",
    code: '<!-- 1. Inline: im body am einzelnen Element -->\n<h2 style="color: navy;">Aktuelles</h2>\n\n<!-- 2. Intern: im head deiner HTML-Datei -->\n<style>\n  h2 { color: navy; }\n</style>\n\n<!-- 3. Extern: im head mit style.css verbinden -->\n<link rel="stylesheet" href="style.css">\n\n/* Die folgende Regel steht in style.css: */\nh2 { color: navy; }',
    steps: [
      'Lasse das CSS-Feld für h2 zunächst ohne Farbregel. Ergänze bei genau einer deiner beiden h2-Überschriften style="color: navy;". Beobachte, welche Überschrift ihre Farbe ändert.',
      "Entferne dieses style-Attribut wieder. Ergänze im head ein style-Element mit der gezeigten h2-Regel. Prüfe in der Vorschau, dass nun beide h2-Überschriften gestaltet werden.",
      "Verschiebe die h2-Regel aus dem style-Element in den CSS-Reiter und entferne das nun leere style-Element. Behalte die Verknüpfung zu style.css im head. Die Vorschau sollte gleich aussehen.",
      "Exportiere das Projekt-ZIP und entpacke es auf dem Informatik-Stick. Öffne index.html und style.css in Notepad++. Ändere die h2-Farbe nur in style.css, speichere mit Strg+S und lade index.html im Browser mit F5 neu. Prüfe, dass beide Überschriften reagieren.",
    ],
    observe:
      "Zeige im Code, wo die Gestaltung bei jeder Variante steht. Erkläre, warum eine gemeinsame CSS-Datei für mehrere Seiten praktisch ist. Im Labor wird das CSS-Feld direkt in die Vorschau eingesetzt; erst der Test der exportierten Dateien zeigt, ob dein link zur externen Datei richtig gesetzt ist. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l10: {
    title: "Ausprobieren: Welche Regel gewinnt?",
    explanation:
      "Treffen mehrere Regeln dasselbe Element, entscheidet zuerst die Spezifität des Selektors: Eine ID wiegt mehr als eine Klasse, eine Klasse mehr als ein Tag. Haben zwei Regeln dieselbe Spezifität, gewinnt die Regel, die später steht. Sage das Ergebnis jeweils vorher, bevor du in die Vorschau schaust.",
    code: '<p class="hinweis" id="wichtig">Bitte Handschuhe mitbringen.</p>\n\np { color: navy; }\n.hinweis { color: darkgreen; }\n#wichtig { color: darkred; }\n.hinweis { color: purple; }',
    steps: [
      'Ergänze einen Absatz mit class="hinweis" und id="wichtig". Schreibe nur die p-Regel ins CSS und beobachte die Farbe.',
      "Ergänze die Regel für .hinweis. Sage vorher, ob der Absatz navy oder darkgreen wird, und prüfe deine Vermutung in der Vorschau.",
      "Ergänze die Regel für #wichtig und darunter die zweite .hinweis-Regel mit purple. Erkläre, warum der Absatz trotzdem darkred bleibt, obwohl die purple-Regel zuletzt steht.",
      "Entferne die Regel für #wichtig. Vertausche danach die Reihenfolge der beiden .hinweis-Regeln und beobachte, welche Farbe jetzt gilt.",
    ],
    observe:
      "Kannst du für jede Farbe begründen, ob die Spezifität oder die Reihenfolge entschieden hat? Für wiederkehrende Gestaltung bleiben Klassen die beste Wahl; IDs nutzt du sparsam. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l11: {
    title: "Ausprobieren: Kontrast mit den Entwicklerwerkzeugen prüfen",
    explanation:
      "Ob Text gut lesbar ist, hängt vom Kontrast zwischen Schrift- und Hintergrundfarbe ab. Für normalen Text gilt ein Verhältnis von mindestens 4,5 : 1 als gut lesbar, für große Schrift 3 : 1. Edge und Chrome zeigen dieses Verhältnis in den Entwicklerwerkzeugen an. Teste dafür deine exportierte Seite im Browser.",
    code: "body {\n  color: #9aa5b1;          /* hellgrau: zu schwach */\n  background-color: #ffffff;\n}\n\nbody {\n  color: #2f3b47;          /* dunkelgrau: gut lesbar */\n  background-color: #ffffff;\n}",
    steps: [
      "Gib body in deinem Entwurf zunächst die hellgraue Schriftfarbe aus dem Beispiel. Exportiere die Seite und öffne index.html im Browser.",
      "Drücke F12, wähle mit dem Pfeilsymbol einen Absatz aus und klicke im Bereich Styles auf das Farbquadrat neben color. Lies das angezeigte Kontrastverhältnis ab.",
      "Ändere die Farbe in deiner style.css so lange, bis das Verhältnis mindestens 4,5 : 1 erreicht. Speichere mit Strg+S und lade mit F5 neu.",
      "Übernimm die gut lesbare Farbe in deinen Entwurf im WebLab und notiere das erreichte Verhältnis in deinen Notizen.",
    ],
    observe:
      "Wichtige Informationen dürfen nicht nur über Farbe erkennbar sein; ergänze zum Beispiel ein Wort wie „Achtung“. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l12: {
    title: "Transfer: Deine Tabelle aus Einheit 07 gestalten",
    explanation:
      "Greife deine Datentabelle wieder auf. Ihre HTML-Struktur mit caption, tr, th und td bleibt erhalten. Die Gestaltung kommt in style.css. padding schafft Platz zwischen Zellinhalt und Rahmen. border-collapse: collapse lässt benachbarte Zellen gemeinsame Rahmen verwenden. Die durch Komma getrennten Selektoren th, td wählen beide Zelltypen aus.",
    code: "table {\n  border-collapse: collapse;\n}\nth, td {\n  border: 1px solid #345;\n  padding: 0.5rem;\n  text-align: left;\n}\nth {\n  color: #fff;\n  background-color: #234;\n}",
    steps: [
      "Suche deine Tabelle aus Einheit 07 im HTML-Reiter. Falls sie fehlt, ergänze eine passende Datentabelle mit Beschreibung, zwei Spaltenüberschriften und zwei Datenzeilen.",
      "Ergänze die CSS-Regeln im CSS-Reiter. Verändere padding von 0.5rem auf 1rem und beobachte den Platz innerhalb der Zellen.",
      "Vergleiche border-collapse: collapse mit separate. Wähle danach eine gut lesbare Gestaltung für deine eigene Tabelle. Prüfe auch die schmale Vorschau.",
      "Exportiere HTML und CSS. Öffne beide Dateien in Notepad++ vom Informatik-Stick, ändere eine Rahmenfarbe, speichere mit Strg+S und lade die Seite im Browser mit F5 neu.",
    ],
    observe:
      "Kannst du an deiner Tabelle erklären, welche Regel die Rahmen, welche die Innenabstände und welche die Kopfzeile gestaltet? Die Tabelle dient weiterhin zur Darstellung von Daten; für das Seitenlayout verwendest du keine Tabelle. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l13: {
    title: "Ausprobieren: Erst skizzieren, dann programmieren",
    explanation:
      "Eine Skizze klärt, welche Inhalte wohin gehören, bevor Code entsteht. Zeichne auf Papier oder notiere in Textform Kasten für Kasten: Was steht im header, welche Links stehen in nav, welche Abschnitte enthält main, was gehört in den footer? Aus der Skizze ergeben sich Überschriften, Dateinamen und Links fast von selbst.",
    // 33 characters wide, so the sketch does not wrap on narrow screens.
    code: [
      "+------------ header -----------+",
      "| h1: Unser Schulgarten         |",
      "+------------- nav -------------+",
      "| Start | Mitmachen             |",
      "+------------- main ------------+",
      "| h2 Die Idee   + Bild Hochbeet |",
      "| h2 Pflanzplan + Tabelle       |",
      "+------------ footer -----------+",
      "| Quellen und Rechte            |",
      "+-------------------------------+",
    ].join("\n"),
    steps: [
      "Notiere Ziel und Zielgruppe deiner Seite in einem Satz. Beispiel: „Schülerinnen und Schüler der Klasse 8 erfahren, wie sie im Schulgarten mitmachen können.“",
      "Skizziere deine Startseite mit den vier Bereichen header, nav, main und footer. Schreibe in jeden Kasten, welcher Inhalt dort steht.",
      "Leite aus der Skizze die Dateinamen und Links ab, zum Beispiel index.html und kontakt.html, und plane einen Ordner bilder für deine Bilder.",
      "Übertrage die Bereiche in deinen Entwurf. Vergleiche die Vorschau mit deiner Skizze und halte Abweichungen in deinen Notizen fest.",
    ],
    observe:
      "Zeige anhand deiner Skizze, warum jeder Inhalt in seinem Bereich steht. Die Gestaltung mit Farben und Abständen folgt erst danach. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l14: {
    title: "Ausprobieren: Eine vollständige Lizenzangabe schreiben",
    explanation:
      "Für Werke unter einer Creative-Commons-Lizenz hat sich eine Angabe aus vier Teilen bewährt: Titel, Urheberin oder Urheber, Quelle und Lizenz. Hast du das Werk verändert, nennst du auch die Änderung. Bei eigenen Inhalten dokumentierst du deine eigene Urheberschaft. Prüfe die Lizenz immer auf der Seite, von der das Werk stammt.",
    code: '<footer>\n  <h2>Quellen und Rechte</h2>\n  <p>Foto „Hochbeet im Frühling“ von Lena Beispiel,\n     Quelle: <a href="https://commons.wikimedia.org/">Wikimedia Commons</a>,\n     Lizenz: <a href="https://creativecommons.org/licenses/by/4.0/deed.de">CC BY 4.0</a>,\n     zugeschnitten.</p>\n  <p>Alle Texte: eigene Inhalte der Klasse 8b.</p>\n</footer>',
    steps: [
      "Liste alle Bilder, Videos und fremden Texte deiner Seite auf. Markiere, was du selbst erstellt hast.",
      "Suche für jedes fremde Werk die Herkunftsseite und lies dort die Lizenz ab. Notiere Titel, Urheberin oder Urheber, Quelle und Lizenz.",
      "Schreibe die Angaben in deinen footer. Verlinke Quelle und Lizenz, wenn möglich, und nenne Änderungen wie „zugeschnitten“.",
      "Entferne jedes Werk, dessen Lizenz du nicht sicher klären kannst, oder ersetze es durch ein eigenes Foto ohne erkennbare fremde Personen.",
    ],
    observe:
      "Kann eine andere Person mit deiner Angabe das Original wiederfinden und die Lizenz prüfen? Ein Disclaimer oder „Bild aus dem Internet“ ersetzt keine Lizenzangabe. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l15: {
    title: "Vorlage: Testprotokoll vor der Übertragung",
    explanation:
      "Ein Testprotokoll hält fest, was du geprüft hast und mit welchem Ergebnis. Teste immer die exportierten Dateien im Projektordner, nicht nur die Laborvorschau. Schreibe jeden Test so, dass eine andere Person ihn wiederholen kann: Was wird getan, was soll passieren, was ist passiert?",
    code: "<ol>\n  <li>Startseite öffnen: index.html zeigt Titel, Text und Bild. Ergebnis: in Ordnung.</li>\n  <li>Navigation: Der Link Kontakt öffnet kontakt.html, der Rücklink führt zur Startseite. Ergebnis: in Ordnung.</li>\n  <li>Bild: bilder/beet.jpg wird angezeigt; der Pfad ist kleingeschrieben. Ergebnis: korrigiert.</li>\n  <li>Schmale Ansicht: Fenster verkleinert, kein waagerechtes Scrollen. Ergebnis: in Ordnung.</li>\n</ol>",
    steps: [
      "Öffne index.html per Doppelklick aus dem entpackten Projektordner. Prüfe Titel im Browser-Tab, Überschriften und Bilder.",
      "Klicke jeden Link einmal, auch alle Rücklinks. Notiere fehlerhafte Ziele mit dem genauen Dateinamen.",
      "Vergleiche alle Pfade mit den Dateinamen im Ordner, Buchstabe für Buchstabe, einschließlich Groß- und Kleinschreibung und Dateiendung.",
      "Verkleinere das Browserfenster, bis es etwa so schmal wie ein Handy ist. Prüfe, ob Texte lesbar bleiben und nichts seitlich herausragt.",
      "Übertrage erst danach den gesamten Ordner mit der Lehrkraft auf die geschützte Plattform und wiederhole dort die Linktests.",
    ],
    observe:
      "Dein Testbericht im Praxisauftrag nennt mindestens drei solcher Tests mit Ergebnis. Fehler, die du gefunden und behoben hast, gehören ausdrücklich dazu. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
  l16: {
    title: "Vorbereiten: Dein Projekt präsentieren",
    explanation:
      "In der Präsentation zeigst du nicht nur das Ergebnis, sondern erklärst deine Entscheidungen und deinen Code. Plane etwa fünf Minuten. Arbeite mit den exportierten Dateien im Browser und in Notepad++, damit du Änderungen live vorführen kannst.",
    code: "1. Ziel und Zielgruppe (1 Satz)\n2. Seitenstruktur: header, nav, main, footer\n3. Eine Code-Stelle erklären, z. B. eine CSS-Regel\n4. Live-Änderung: Farbe in style.css ändern, Strg+S, F5\n5. Quellen, Rechte und durchgeführte Tests\n6. Was würde ich als Nächstes verbessern?",
    steps: [
      "Lege fest, welche Code-Stelle du erklärst. Wähle etwas, das du selbst geschrieben hast, zum Beispiel deine Navigation oder eine Klasse im CSS.",
      "Übe die Live-Änderung: Öffne index.html im Browser und style.css in Notepad++, ändere eine Farbe, speichere mit Strg+S und lade mit F5 neu.",
      "Zeige den Weg von der Startseite zur Unterseite und zurück. Erkläre, warum die relativen Pfade auch nach der Übertragung funktionieren.",
      "Nenne deine Quellen und Lizenzen sowie mindestens einen Test, bei dem du einen Fehler gefunden und behoben hast.",
    ],
    observe:
      "Kannst du jede Zeile deines Codes erklären und auf Nachfrage selbst verändern? Verwendete KI-Hilfen nennst du offen. Diese Vertiefung vergibt keine zusätzlichen Punkte.",
  },
};
