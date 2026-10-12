// Optional diagnosis exercises. These never modify drafts or award points.
export const debugging = {
  l1: {
    code: "<p>Wir lernen <strong>HTML</p></strong>",
    question:
      "Welche Änderung bringt die verschachtelten Elemente in die richtige Reihenfolge?",
    options: [
      "Zuerst </strong>, danach </p> schließen.",
      "Den Absatz mit <br> statt </p> beenden.",
      "Alle End-Tags weglassen.",
    ],
    answer: 0,
    feedback: [
      "Richtig: Was zuletzt geöffnet wurde, wird zuerst geschlossen. So wird daraus <p>Wir lernen <strong>HTML</strong></p>.",
      "br erzeugt einen Zeilenumbruch. Es beendet weder strong noch einen Absatz. Prüfe, welches Element zuletzt geöffnet wurde.",
      "strong braucht ein End-Tag. Schreibe auch das Absatzende ausdrücklich, damit die Verschachtelung klar bleibt.",
    ],
  },
  l2: {
    code: "<head>\n  <title>Meine AG</title>\n  <h1>Willkommen</h1>\n</head>\n<body></body>",
    question:
      "Die sichtbare Überschrift steht im falschen Bereich. Was änderst du?",
    options: [
      "title durch h1 ersetzen.",
      "h1 in den body verschieben; title bleibt im head.",
      "body entfernen, weil head schon Text enthält.",
    ],
    answer: 1,
    feedback: [
      "title und h1 haben verschiedene Aufgaben: title benennt den Browser-Tab, h1 die sichtbare Hauptüberschrift.",
      "Richtig: Sichtbare Seiteninhalte gehören in den body. Der Browser kann falsches HTML zwar reparieren, aber darauf solltest du dich nicht verlassen.",
      "Die Seite braucht einen Inhaltsbereich. head enthält Metadaten und Verweise, nicht den sichtbaren Seiteninhalt.",
    ],
  },
  l3: {
    code: "<h1>Unsere AG</h1>\n<h4>Termine</h4>\n<p>Wir treffen uns freitags.</p>",
    question:
      "Termine ist ein direktes Unterthema der Hauptüberschrift. Welche Änderung passt?",
    options: [
      "h4 beibehalten, weil die Schrift kleiner ist.",
      "Termine mit strong auszeichnen, damit es fett ist.",
      "h2 statt h4 für die direkte Unterüberschrift verwenden.",
    ],
    answer: 2,
    feedback: [
      "Wähle die Überschriftenebene nach der Gliederung. Für die Schriftgröße ist später CSS zuständig.",
      "strong betont wichtige Wörter, markiert aber keine Überschrift in der Seitenstruktur.",
      "Richtig: h2 folgt als direkte Unterebene auf h1. Die Struktur bestimmt das Tag, die Gestaltung folgt später mit CSS.",
    ],
  },
  l4: {
    code: "<ul>\n  <p>Schrauben</p>\n  <p>Kabel</p>\n</ul>",
    question:
      "Die beiden Materialien sollen Listeneinträge sein. Welche Tags brauchst du?",
    options: [
      "li anstelle von p für jeden Eintrag.",
      "br anstelle von p für jeden Eintrag.",
      "Nur die ul in ol ändern.",
    ],
    answer: 0,
    feedback: [
      "Richtig: ul enthält li-Elemente. ol wäre eine nummerierte Liste und braucht ebenfalls li für ihre Einträge.",
      "br bricht eine Zeile um, macht daraus aber keinen Listeneintrag.",
      "ol ändert die Art der Liste. Die Einträge selbst brauchen weiterhin li.",
    ],
  },
  l5: {
    code: '<a href="#termine">Zu den Terminen</a>\n<h2 id="termin">Termine</h2>',
    question: "Warum führt der Sprunglink nicht zur Überschrift?",
    options: [
      "In href fehlt https://.",
      "Das Sprungziel muss ein p statt h2 sein.",
      "Der Name hinter # stimmt nicht mit der id überein.",
    ],
    answer: 2,
    feedback: [
      "Ein Sprung innerhalb derselben Seite beginnt mit #. Dafür brauchst du keine vollständige Webadresse.",
      "Auch eine Überschrift kann eine id und damit ein Sprungziel haben.",
      'Richtig: termine und termin sind unterschiedliche Namen. Verwende zum Beispiel id="termine", passend zu href="#termine".',
    ],
  },
  l6: {
    code: '<!-- Im Ordner bilder liegt die Datei team.jpg. -->\n<img src="bilder/team.png" alt="Unser Team beim Aufbau">',
    question: "Das Bild fehlt, obwohl der Ordner stimmt. Was prüfst du zuerst?",
    options: [
      "alt entfernen.",
      "Die Dateiendung in src an die vorhandene JPG-Datei anpassen.",
      "img durch image ersetzen.",
    ],
    answer: 1,
    feedback: [
      "alt ist die Textalternative und sollte erhalten bleiben. Es steuert nicht, welche Datei geladen wird.",
      "Richtig: Der Pfad muss zum tatsächlichen Dateinamen einschließlich Endung und Schreibweise passen. Hier lautet er bilder/team.jpg.",
      "Das HTML-Element heißt img. Der Fehler liegt hier im angegebenen Dateinamen.",
    ],
  },
  l7: {
    code: "<table>\n  <tr><th>Tag</th><th>Raum</th></tr>\n  <tr><td>Montag</td></tr>\n</table>",
    question:
      "In dieser einfachen Tabelle soll jeder Termin einen Tag und einen Raum haben. Was fehlt?",
    options: [
      "Ein Rahmen um table.",
      "Ein br hinter Montag.",
      "Eine zweite td-Zelle mit dem Raum in der Datenzeile.",
    ],
    answer: 2,
    feedback: [
      "Ein Rahmen ist Gestaltung. Er ergänzt keine fehlenden Datenzellen.",
      "Ein Zeilenumbruch innerhalb einer Zelle erzeugt keine zweite Spalte.",
      "Richtig: Die Kopfzeile beschreibt zwei Spalten. Ergänze in derselben tr eine zweite td-Zelle für den Raum.",
    ],
  },
  l8: {
    code: '<audio src="medien/interview.mp3"></audio>',
    question:
      "Der Dateipfad ist korrekt. Wie bekommen Besucher eine sichtbare Bedienung zum Abspielen?",
    options: [
      "Das Attribut controls ergänzen.",
      "audio in img ändern.",
      "Die Datei in interview.html umbenennen.",
    ],
    answer: 0,
    feedback: [
      "Richtig: controls blendet die Bedienung ein. Ergänze außerdem eine Textfassung der gesprochenen Informationen für Menschen, die den Ton nicht hören können.",
      "img zeigt Bilder und kann keine Audiodatei abspielen.",
      "Umbenennen verändert das Dateiformat nicht. Die Audiodatei bleibt eine MP3-Datei; es fehlt hier die Bedienung.",
    ],
  },
  l9: {
    code: '<!-- Die Datei style.css liegt neben index.html. -->\n<link rel="stylesheet" href="styles.css">',
    question:
      "Die externe Gestaltung wird nicht geladen. Welche Korrektur passt zu dieser Ordnerstruktur?",
    options: [
      'rel="stylesheet" entfernen.',
      'href="style.css" schreiben.',
      "Die CSS-Regeln in title schreiben.",
    ],
    answer: 1,
    feedback: [
      'rel="stylesheet" erklärt dem Browser den Zweck des Verweises. Das Attribut soll erhalten bleiben.',
      "Richtig: style.css und styles.css sind verschiedene Dateinamen. href muss genau die vorhandene CSS-Datei nennen.",
      "title ist für den Titel des Browser-Tabs. Externe CSS-Regeln bleiben in der CSS-Datei.",
    ],
  },
  l10: {
    code: '<p class="hinweis">Bitte anmelden.</p>\n\n/* In style.css: */\n#hinweis { color: navy; }',
    question:
      "Der Absatz hat eine Klasse, aber die Regel trifft ihn nicht. Was muss sich ändern?",
    options: [
      "Dem Klassennamen im HTML einen Punkt voranstellen.",
      "Die geschweiften Klammern entfernen.",
      "Im CSS .hinweis statt #hinweis verwenden.",
    ],
    answer: 2,
    feedback: [
      "Im class-Attribut steht der Name ohne Punkt. Der Punkt gehört zum CSS-Selektor.",
      "Die geschweiften Klammern begrenzen den CSS-Regelblock. Sie sind hier richtig.",
      'Richtig: .hinweis trifft class="hinweis". #hinweis wäre für ein Element mit id="hinweis".',
    ],
  },
  l11: {
    code: "h1 {\n  font-size: 24;\n}",
    question:
      "Die Überschrift soll eine feste Schriftgröße von 24 Pixeln bekommen. Was fehlt?",
    options: [
      "Die Einheit px: font-size: 24px;",
      "Anführungszeichen um 24.",
      "Ein # vor 24.",
    ],
    answer: 0,
    feedback: [
      "Richtig: Bei diesem Längenwert brauchst du eine Einheit. 24px ist gültig; 24 ohne Einheit wird für font-size verworfen.",
      "Anführungszeichen machen daraus keine gültige Schriftgröße. Ergänze die gewünschte Längeneinheit.",
      "Die Raute gehört zum Beispiel zu Hex-Farben und ID-Selektoren, nicht zu einer Schriftgröße.",
    ],
  },
  l12: {
    code: ".karte {\n  padding: 20px;\n  margin: 0;\n}",
    question:
      "Der Abstand zu benachbarten Karten soll wachsen, der Innenabstand aber gleich bleiben. Welche Eigenschaft änderst du?",
    options: ["padding erhöhen.", "margin erhöhen.", "font-size erhöhen."],
    answer: 1,
    feedback: [
      "padding schafft Platz zwischen Inhalt und Rahmen. Das verändert den Innenabstand.",
      "Richtig: margin ist der Außenabstand. padding bleibt für den Innenabstand unverändert.",
      "font-size verändert die Schriftgröße. Sie ist kein gezielter Ersatz für den Abstand zwischen Karten.",
    ],
  },
};
