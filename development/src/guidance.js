// Eigenständige Lernhilfen zu den Einheiten in content.js.
// tips[i] erklärt, was für criteria[i] fehlt; die Reihenfolge muss übereinstimmen
// (geprüft in development/tests/guidance.test.mjs). pitfalls nennt typische Fehler,
// quiz[i] erklärt die Antwortmöglichkeit options[i] des Verständnischecks.
export const guidance = {
  l1: {
    quiz: [
      "Richtig: HTML beschreibt, was ein Inhalt ist – Überschrift, Absatz oder Betonung.",
      "Hochladen erledigen Übertragungsprogramme wie FTP, nicht HTML.",
      "Farben und Gestaltung legt CSS fest; HTML bestimmt die Bedeutung der Inhalte.",
    ],
    tips: [
      "Ersetze den Text zwischen <h1> und </h1> durch einen eigenen Projektnamen mit mindestens drei Zeichen.",
      "Schreibe einen eigenen Satz zwischen <p> und </p>. Der Startsatz zählt nicht.",
      "strong muss innerhalb des Absatzes stehen: <p>… <strong>Wort</strong> …</p>.",
    ],
    pitfalls: [
      "End-Tag vergessen: Ohne </p> ist nicht eindeutig, wo der Absatz endet.",
      "Falsch verschachtelt wie <p><strong>Text</p></strong>: Das innere Element wird zuerst geschlossen.",
      "End-Tag falsch geschrieben: Es lautet </h1>, nicht <h1/> oder <\\h1>.",
    ],
  },
  l2: {
    quiz: [
      "Der body enthält die sichtbaren Inhalte; der Tab-Titel ist eine Angabe für den Browser.",
      "Richtig: title steht im head und erscheint im Browser-Tab und in Lesezeichen.",
      "Der Dateiname bestimmt die Adresse, nicht den angezeigten Titel im Tab.",
    ],
    tips: [
      "Die erste Zeile lautet <!doctype html>. Davor steht nichts, auch kein Kommentar.",
      'Das Start-Tag des Dokuments lautet <html lang="de">.',
      'Ergänze im head <meta charset="utf-8">.',
      "Schreibe im head einen eigenen Titel zwischen <title> und </title>.",
      "Die sichtbare h1 gehört zwischen <body> und </body>.",
    ],
    pitfalls: [
      "Sichtbare Inhalte im head: Überschriften und Absätze gehören in den body.",
      "Als index.html.txt gespeichert: Blende in Windows die Dateiendungen ein und prüfe den Namen.",
      "Leerzeichen oder Umlaute im Dateinamen wie „Mein Garten.html“: besser mein-garten.html.",
    ],
  },
  l3: {
    quiz: [
      "Die Schriftgröße regelt CSS. Die Überschriftenebene drückt die Gliederung aus.",
      "Eine neue Zeile ist kein Unterthema; Fließtext gehört in p.",
      "Richtig: h2 kennzeichnet ein Unterthema unterhalb der h1.",
    ],
    tips: [
      "Die Seite braucht eine h1 für das Hauptthema.",
      "Ergänze zwei h2-Überschriften für deine Unterthemen, jede mit mindestens drei Zeichen.",
      "Schreibe zwei Absätze mit je mindestens 15 Zeichen, jeweils in <p> … </p>.",
      "Setze <em> … </em> um ein Wort innerhalb eines Absatzes.",
    ],
    pitfalls: [
      "Überschrift nach Schriftgröße gewählt: Die Ebene folgt der Gliederung, die Größe regelt später CSS.",
      "Ebenen übersprungen, zum Beispiel von h1 direkt zu h4.",
      "Mehrere <br> statt Absätzen: Ein neuer Gedanke bekommt ein eigenes p.",
    ],
  },
  l4: {
    quiz: [
      "Richtig: ol nummeriert die Einträge, weil ihre Reihenfolge wichtig ist.",
      "ul passt, wenn die Reihenfolge keine Rolle spielt, etwa bei einer Materialliste.",
      "Ein Absatz gliedert keine einzelnen Schritte; dafür gibt es Listen.",
    ],
    tips: [
      "Drei <li>-Einträge müssen direkt in <ul> … </ul> stehen.",
      "Drei <li>-Schritte müssen direkt in <ol> … </ol> stehen.",
    ],
    pitfalls: [
      "Text direkt in ul ohne li: Jeder Eintrag steht in einem eigenen li.",
      "Nummern oder Striche selbst getippt: Das übernimmt ol beziehungsweise ul.",
      "Liste nicht geschlossen: Ohne </ul> rutschen folgende Inhalte in die Liste.",
    ],
  },
  l5: {
    quiz: [
      "Ein Laufwerkspfad funktioniert nur auf diesem einen Rechner, nicht auf einem Webserver.",
      "Richtig: Ein relativer Pfad ohne Ordnerangabe verweist auf eine Datei im selben Ordner.",
      "Das ist eine absolute Adresse auf einem anderen Server, kein Pfad im eigenen Ordner.",
    ],
    tips: [
      'Schreibe <a href="kontakt.html">Kontakt</a> – ohne Laufwerksbuchstaben und ohne Ordner.',
      "Ein externer Link beginnt mit https:// und hat einen Linktext mit mindestens drei Zeichen.",
      'Der Sprunglink lautet <a href="#ideen">…</a> – mit Raute.',
      'Das Ziel ist eine h2 mit id="ideen" – ohne Raute und mit eigenem Text.',
    ],
    pitfalls: [
      "Lokale Pfade wie C:\\Users\\… funktionieren nur auf deinem eigenen Rechner.",
      'Raute im id-Wert: id="#ideen" ist falsch, richtig ist id="ideen".',
      "Linktext „hier klicken“: Benenne stattdessen das Ziel des Links.",
    ],
  },
  l6: {
    quiz: [
      "Den Dateipfad nennt src. alt beschreibt, was das Bild zeigt oder bedeutet.",
      "Rahmen und Farben gehören ins CSS.",
      "Richtig: alt ersetzt die Bildinformation, wenn das Bild nicht gesehen oder geladen wird.",
    ],
    tips: [
      "Das img braucht src, einen aussagekräftigen alt-Text mit mindestens acht Zeichen sowie width und height.",
    ],
    pitfalls: [
      "alt fehlt oder lautet nur „Bild“: Beschreibe die Information, die das Bild vermittelt.",
      "Groß- und Kleinschreibung: Foto.JPG und foto.jpg sind auf einem Webserver verschiedene Dateien.",
      'Bild nicht im angegebenen Ordner: src="bilder/beet.jpg" erwartet einen Ordner bilder neben index.html.',
    ],
  },
  l7: {
    quiz: [
      "Richtig: Tabellen ordnen zusammengehörige Daten in Zeilen und Spalten.",
      "Für das Seitenlayout sind Tabellen ungeeignet; Bereiche gestaltest du mit CSS.",
      "Überschriften zeichnest du mit h1 bis h6 aus.",
    ],
    tips: [
      "Setze <caption> direkt nach <table> und beschreibe darin die Tabelle.",
      'Beide Kopfzellen brauchen scope="col", zum Beispiel <th scope="col">Monat</th>.',
      "Du brauchst drei tr: eine Kopfzeile und zwei Datenzeilen.",
      "Die zwei Datenzeilen enthalten zusammen vier td-Zellen mit Inhalt.",
    ],
    pitfalls: [
      "Zellen direkt in table statt in einem tr.",
      "Unterschiedlich viele Zellen pro Zeile: Die Spalten verrutschen.",
      "Tabelle als Seitenlayout statt für zusammengehörige Daten.",
    ],
  },
  l8: {
    quiz: [
      "Der Dateiname steht in src; die Textfassung gibt den Inhalt wieder.",
      "Richtig: So erreicht der Inhalt auch Menschen, die nicht hören oder kein Video abspielen können.",
      "Die Textfassung ist selbst HTML, meist ein Absatz unter dem Video.",
    ],
    tips: [
      'Schreibe <video controls> und darin <source src="…" type="video/mp4">.',
      "Ergänze einen Absatz, der den Inhalt des Videos in eigenen Worten zusammenfasst (mindestens 25 Zeichen).",
    ],
    pitfalls: [
      "controls vergessen: Ohne Bedienleiste lässt sich das Video nicht starten.",
      "Medienpfad falsch: Teste den Pfad nach dem Export im Projektordner.",
      "Automatisches Abspielen mit Ton: Es stört und wird von vielen Browsern blockiert.",
    ],
  },
  l9: {
    quiz: [
      "Ein style-Attribut wirkt nur auf genau dieses eine Element.",
      "title benennt die Seite im Browser-Tab und gestaltet nichts.",
      "Richtig: Mehrere HTML-Seiten können dieselbe style.css einbinden.",
    ],
    tips: [
      'Ergänze im head: <link rel="stylesheet" href="style.css">.',
      "Schreibe im CSS-Reiter zum Beispiel: body { font-family: Arial, sans-serif; }",
      "Schreibe im CSS-Reiter eine h1-Regel mit color, zum Beispiel h1 { color: navy; }",
    ],
    pitfalls: [
      "<style>-Tags im CSS-Reiter: Dort steht reines CSS ohne HTML-Tags.",
      "Dateiname im link stimmt nicht: style.css und Style.css sind verschieden.",
      "Geschweifte Klammer oder Semikolon vergessen: Die folgende Regel wird ignoriert.",
    ],
  },
  l10: {
    quiz: [
      "Richtig: Eine ID ist eindeutig. Für wiederkehrende Gestaltung nimmst du eine Klasse.",
      "Mehrfach verwendbar ist eine Klasse, nicht eine ID.",
      "Eine ID kennzeichnet genau ein Element im Dokument.",
    ],
    tips: [
      'Zwei Absätze brauchen class="hinweis" und jeweils eigenen Text.',
      'Die h1 erhält id="start" und behält ihren Text.',
      "Im CSS beginnt der Klassenselektor mit einem Punkt: .hinweis { color: darkgreen; }",
      "Im CSS beginnt der ID-Selektor mit einer Raute: #start { text-align: center; }",
    ],
    pitfalls: [
      'Punkt oder Raute im HTML: class="hinweis", nicht class=".hinweis".',
      "Dieselbe ID mehrfach vergeben: Für wiederkehrende Gestaltung ist class gedacht.",
      "Leerzeichen im Selektor wie „. hinweis“: Punkt und Name gehören zusammen.",
    ],
  },
  l11: {
    quiz: [
      "font-family wählt die Schriftart, nicht den Zeilenabstand.",
      "Richtig: line-height legt die Zeilenhöhe fest, zum Beispiel 1.6.",
      "text-align richtet Text links, mittig oder rechts aus.",
    ],
    tips: [
      "Ergänze in der body-Regel eine Schriftfarbe, zum Beispiel color: #182c35;",
      "Ergänze in der body-Regel eine Hintergrundfarbe, zum Beispiel background-color: #f4f7f6;",
      "Ergänze in der body-Regel eine Schriftfamilie mit Ersatzschrift, zum Beispiel font-family: Arial, sans-serif;",
      "Ergänze in der body-Regel eine Schriftgröße mit Einheit, zum Beispiel font-size: 1rem;",
      "Ergänze in der body-Regel eine Zeilenhöhe, zum Beispiel line-height: 1.6;",
      "Schreibe eine h1-Regel mit text-align, zum Beispiel h1 { text-align: center; }",
    ],
    pitfalls: [
      "Komma statt Punkt bei Zahlen: line-height: 1.5, nicht 1,5.",
      "Einheit vergessen: font-size: 16 wirkt nicht, richtig ist 16px oder 1rem.",
      "Zu wenig Kontrast, zum Beispiel hellgrau auf weiß.",
    ],
  },
  l12: {
    quiz: [
      "Außerhalb des Rahmens liegt margin, der Außenabstand.",
      "Den Abstand zwischen Buchstaben regelt letter-spacing.",
      "Richtig: padding ist der Innenabstand zwischen Inhalt und Rahmen.",
    ],
    tips: [
      'Lege einen Bereich wie <section class="karte"> mit mindestens 15 Zeichen Text an.',
      "Ergänze in .karte { … } einen Innenabstand, zum Beispiel padding: 1.5rem;",
      "Ergänze in .karte { … } einen Rahmen mit Breite, Stil und Farbe, zum Beispiel border: 1px solid navy;",
      "Ergänze in .karte { … } einen Außenabstand, zum Beispiel margin: 1rem auto;",
      "Ergänze in .karte { … } eine Höchstbreite, zum Beispiel max-width: 40rem;",
      "Ergänze in .karte { … } box-sizing: border-box;",
    ],
    pitfalls: [
      "padding und margin verwechselt: padding liegt innerhalb, margin außerhalb des Rahmens.",
      "width statt max-width: Feste Breiten laufen in schmalen Ansichten über.",
      "border unvollständig: Ein sichtbarer Rahmen braucht Breite, Stil und Farbe.",
    ],
  },
  l13: {
    quiz: [
      "Richtig: Ziel, Zielgruppe und Inhalte bestimmen, was die Gestaltung leisten muss.",
      "Die Schriftgröße ist bereits eine Gestaltungsentscheidung.",
      "Die Zahl der CSS-Regeln sagt nichts über eine gute Seite aus.",
    ],
    tips: [
      "Setze deine h1 in <header> … </header>.",
      'Lege in <nav> einen Link <a href="kontakt.html">…</a> mit Linktext an.',
      "Schreibe in <main> einen Absatz mit mindestens 40 Zeichen zu Ziel und Zielgruppe.",
      "Ergänze <footer> … </footer> mit mindestens fünf Zeichen Text.",
    ],
    pitfalls: [
      "Alles in div: header, nav, main und footer beschreiben die Bereiche verständlicher.",
      "Mehrere main-Elemente: Eine Seite hat einen Hauptinhalt.",
      "Mit Farben begonnen: Erst Inhalt und Struktur, danach die Gestaltung.",
    ],
  },
  l14: {
    quiz: [
      "Verkleinern ändert nichts an den Rechten am Bild.",
      "Richtig: Du brauchst eine passende Erlaubnis oder Lizenz und gibst die Quelle an.",
      "Ein Disclaimer ersetzt keine Nutzungsrechte.",
    ],
    tips: [
      "Schreibe im footer eine h2, zum Beispiel „Quellen und Rechte“.",
      "Ergänze im footer einen Absatz mit mindestens 40 Zeichen: Wer hat Texte und Bilder erstellt, unter welcher Lizenz?",
    ],
    pitfalls: [
      "„Bild von Google“ ist keine Quelle: Nenne Urheber, Fundort und Lizenz.",
      "Lizenzbedingung nicht erfüllt, zum Beispiel fehlende Namensnennung bei CC BY.",
      "Fotos von anderen Personen ohne deren Einwilligung.",
    ],
  },
  l15: {
    quiz: [
      "Farben stehen in style.css; entscheidend ist, dass alle Dateien am richtigen Ort liegen.",
      "Der Titel allein reicht nicht; Links und Bilder brauchen ihre Dateien.",
      "Richtig: Relative Pfade funktionieren nur, wenn Dateinamen und Ordner gleich bleiben.",
    ],
    tips: [
      "Schreibe drei Tests als <li> in einer <ol>, jeder mit mindestens 15 Zeichen, zum Beispiel „Link zu kontakt.html öffnet die Unterseite“.",
    ],
    pitfalls: [
      "Nur einzelne Dateien statt des ganzen Projektordners übertragen.",
      "Groß- und Kleinschreibung: Lokal klappt Bild.JPG oft, auf dem Server nicht.",
      "Zugangsdaten im HTML oder in Notizen gespeichert.",
    ],
  },
  l16: {
    quiz: [
      "Richtig: Erst geprüfte Inhalte, Links, Rechte und Tests machen das Projekt präsentierbar.",
      "Eine Farbe ist nur ein kleiner Teil der Gestaltung.",
      "Ein Screenshot zeigt weder Links noch Code noch Rechte.",
    ],
    tips: [
      "Setze deinen Seitentitel als h1 in den header.",
      'Verlinke in nav die Unterseite: <a href="kontakt.html">…</a>.',
      "Schreibe in main eigene Inhalte, darunter ein Absatz mit mindestens 40 Zeichen.",
      "Ergänze ein Bild mit aussagekräftigem alt-Text (mindestens acht Zeichen).",
      "Ergänze eine ul mit mindestens drei Einträgen.",
      "Deine Tabelle braucht mindestens zwei th-Kopfzellen.",
      "Deine Tabelle braucht mindestens vier td-Datenzellen.",
      "Dokumentiere im footer in einem Absatz mit mindestens 40 Zeichen deine Quellen.",
      'Verknüpfe im head: <link rel="stylesheet" href="style.css">.',
      "Gib body im CSS-Reiter eine font-family.",
    ],
    pitfalls: [
      "Unterseite ohne Rücklink zur Startseite.",
      "kontakt.html ohne denselben link auf style.css: Die Unterseite bleibt ungestaltet.",
      "Fremde oder KI-erzeugte Texte ohne Kennzeichnung.",
    ],
  },
};
