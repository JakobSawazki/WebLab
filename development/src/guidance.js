// Eigenständige Lernhilfen zu den Einheiten in content.js.
// tips[i] erklärt, was für criteria[i] fehlt; die Reihenfolge muss übereinstimmen
// (geprüft in development/tests/guidance.test.mjs). pitfalls nennt typische Fehler.
export const guidance = {
  l1: {
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
