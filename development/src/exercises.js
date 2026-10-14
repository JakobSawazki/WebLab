// Short practice exercises with their own small editor and live preview.
// Types: "repair" (fix two mistakes), "complete" (add what is missing) and
// "write" (write it yourself). Checks read the written source on purpose:
// browsers silently repair broken HTML, so a parsed document would hide the
// very mistakes to practise. `fixed` is a reference solution for the tests and
// is never shown. `remember` is the short rule shown once an exercise is solved.
// Exercises never touch drafts, completion or points.
const count = (source, pattern) => (source.match(pattern) || []).length;
const inside = (source, open, close) => {
  const start = source.indexOf(open);
  const end = source.indexOf(close, start + open.length);
  return start < 0 || end < 0 ? null : source.slice(start + open.length, end);
};
const text = "[^<]*[^<\\s][^<]*"; // at least one visible character
const has = (source, pattern) => new RegExp(pattern, "i").test(source);
// True if a rule for `selector` (regex source) sets `property`, optionally to a value pattern.
const rule = (source, selector, property, value = "") =>
  new RegExp(`(^|[\\s};])${selector}\\s*\\{[^}]*\\b${property}\\s*:\\s*${value}`, "i").test(source);
const imgTag = (source, src) =>
  (source.match(/<img\b[^>]*>/gi) || []).find((tag) => tag.includes(`src="${src}"`)) || "";

export const exerciseTypes = {
  repair: "Reparieren",
  complete: "Ergänzen",
  write: "Selbst schreiben",
};

export const exercises = {
  l1: [
    {
      type: "repair",
      title: "Überschrift und Betonung reparieren",
      task: "Die Überschrift wird nicht geschlossen, und strong und p sind falsch verschachtelt. Repariere beides.",
      code: "<h1>Unser Schulgarten<h1>\n<p>Wir pflanzen <strong>Gemüse</p></strong>",
      fixed: "<h1>Unser Schulgarten</h1>\n<p>Wir pflanzen <strong>Gemüse</strong></p>",
      checks: [
        ["Genau ein Start-Tag <h1> und ein End-Tag </h1>", (s) => count(s, /<h1>/g) === 1 && count(s, /<\/h1>/g) === 1],
        ["</strong> steht vor </p>", (s) => /<strong>[^<]*<\/strong>[^<]*<\/p>/.test(s)],
      ],
      remember: "Was zuletzt geöffnet wurde, wird zuerst geschlossen.",
    },
    {
      type: "write",
      title: "Dein erstes Element-Paar",
      task: "Schreibe eine Überschrift zu deinem Hobby und darunter einen Absatz, in dem ein wichtiges Wort mit strong betont ist.",
      code: "<!-- Schreibe hier deine Überschrift und deinen Absatz. -->\n",
      fixed: "<h1>Mein Hobby</h1>\n<p>Ich spiele gern <strong>Schach</strong>.</p>",
      checks: [
        ["Eine h1 mit eigenem Text", (s) => has(s, `<h1>${text}</h1>`)],
        ["Ein Absatz mit einem strong-Wort darin", (s) => has(s, `<p>[^]*?<strong>${text}</strong>[^]*?</p>`)],
      ],
      remember: "Start-Tag, Inhalt und End-Tag bilden zusammen ein Element.",
    },
  ],
  l2: [
    {
      type: "repair",
      title: "Die Überschrift an den richtigen Ort",
      task: "Die sichtbare Überschrift steht im falschen Bereich des Grundgerüsts. Verschiebe sie, ohne den title zu verändern.",
      code: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Meine AG</title>\n  <h1>Willkommen</h1>\n</head>\n<body>\n</body>\n</html>',
      fixed: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Meine AG</title>\n</head>\n<body>\n  <h1>Willkommen</h1>\n</body>\n</html>',
      checks: [
        ["Die h1 steht im body", (s) => s.indexOf("<body") > -1 && s.indexOf("<h1") > s.indexOf("<body") && s.indexOf("<h1") < s.indexOf("</body>")],
        ["Der title steht weiterhin im head", (s) => s.indexOf("<title>") > -1 && s.indexOf("<title>") < s.indexOf("</head>")],
      ],
      remember: "Sichtbares gehört in den body, Angaben für den Browser in den head.",
    },
    {
      type: "complete",
      title: "Das Grundgerüst vervollständigen",
      task: "Diesem Grundgerüst fehlen drei Angaben: der Doctype, die Dokumentsprache Deutsch und der Zeichensatz UTF-8. Ergänze sie.",
      code: "<html>\n<head>\n  <title>Meine AG</title>\n</head>\n<body>\n  <h1>Willkommen</h1>\n</body>\n</html>",
      fixed: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Meine AG</title>\n</head>\n<body>\n  <h1>Willkommen</h1>\n</body>\n</html>',
      checks: [
        ["Erste Zeile <!doctype html>", (s) => /^\s*<!doctype html>/i.test(s)],
        ['Start-Tag <html lang="de">', (s) => /<html lang="de">/i.test(s)],
        ['<meta charset="utf-8"> im head', (s) => /<meta charset="utf-8">/i.test(s) && s.search(/<meta charset/i) < s.indexOf("</head>")],
      ],
      remember: "Doctype zuerst, dann html mit lang, im head meta charset.",
    },
  ],
  l3: [
    {
      type: "repair",
      title: "Gliederung statt Zeilenumbrüche",
      task: "Die Gliederung überspringt eine Überschriftenebene, und zwei Gedanken sind nur mit br getrennt. Mache daraus eine h2 und zwei Absätze.",
      code: "<h1>Unsere AG</h1>\n<h3>Termine</h3>\nWir treffen uns freitags.<br><br>Bitte pünktlich sein.",
      fixed: "<h1>Unsere AG</h1>\n<h2>Termine</h2>\n<p>Wir treffen uns freitags.</p>\n<p>Bitte pünktlich sein.</p>",
      checks: [
        ["Das Unterthema ist eine h2", (s) => has(s, `<h2>${text}</h2>`) && !/<h3/i.test(s)],
        ["Zwei Absätze ohne br", (s) => count(s, new RegExp(`<p>${text}</p>`, "gi")) >= 2 && !/<br/i.test(s)],
      ],
      remember: "Die Überschriftenebene folgt der Gliederung, nicht der Schriftgröße.",
    },
    {
      type: "write",
      title: "Betonen mit em und strong",
      task: "Schreibe einen Absatz, in dem ein Wort sprachlich mit em betont ist, und einen zweiten Absatz mit einem wichtigen Hinweis in strong.",
      code: "<!-- Zwei Absätze: einer mit em, einer mit strong -->\n",
      fixed: "<p>Das war <em>wirklich</em> spannend.</p>\n<p><strong>Achtung:</strong> Der Raum ist geschlossen.</p>",
      checks: [
        ["Ein Absatz mit em", (s) => has(s, `<p>[^]*?<em>${text}</em>[^]*?</p>`)],
        ["Ein Absatz mit strong", (s) => has(s, `<p>[^]*?<strong>${text}</strong>[^]*?</p>`)],
      ],
      remember: "em betont die Aussprache, strong die Wichtigkeit.",
    },
  ],
  l4: [
    {
      type: "repair",
      title: "Eine kaputte Liste",
      task: "In dieser Liste stimmt zweimal etwas nicht: ein Eintrag ohne li und ein li ohne End-Tag. Repariere die Liste.",
      code: "<ul>\n  Erde\n  <li>Samen</li>\n  <li>Gießkanne\n</ul>",
      fixed: "<ul>\n  <li>Erde</li>\n  <li>Samen</li>\n  <li>Gießkanne</li>\n</ul>",
      checks: [
        ["Drei Einträge mit <li> und </li>", (s) => count(s, /<li>/g) === 3 && count(s, /<\/li>/g) === 3],
        ["Kein Text direkt in der ul", (s) => {
          const list = inside(s, "<ul>", "</ul>");
          // Closed and unclosed li items are removed; whatever is left stands bare in the ul.
          return list !== null && !list.replace(/<li>[\s\S]*?<\/li>/g, "").replace(/<li>[^<]*/g, "").trim();
        }],
      ],
      remember: "Jeder Listeneintrag steht in einem eigenen li.",
    },
    {
      type: "write",
      title: "Eine Anleitung in Schritten",
      task: "Schreibe eine Anleitung mit drei Schritten, deren Reihenfolge wichtig ist, zum Beispiel zum Händewaschen. Wähle die passende Liste.",
      code: "<!-- Drei Schritte in der richtigen Reihenfolge -->\n",
      fixed: "<ol>\n  <li>Hände nass machen</li>\n  <li>Einseifen</li>\n  <li>Abspülen</li>\n</ol>",
      checks: [
        ["Eine geordnete Liste ol", (s) => /<ol>/i.test(s) && /<\/ol>/i.test(s)],
        ["Drei Schritte als li in der ol", (s) => count(inside(s.toLowerCase(), "<ol>", "</ol>") || "", new RegExp(`<li>${text}</li>`, "g")) >= 3],
      ],
      remember: "Reihenfolge wichtig: ol. Reihenfolge egal: ul.",
    },
  ],
  l5: [
    {
      type: "repair",
      title: "Zwei Links, die nicht funktionieren",
      task: "Der Sprunglink springt nicht, und der Kontaktlink funktioniert nur auf einem einzigen Rechner. Repariere beide Links.",
      code: '<a href="#Ideen">Zu den Ideen</a>\n<a href="C:\\Users\\max\\kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
      fixed: '<a href="#ideen">Zu den Ideen</a>\n<a href="kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
      checks: [
        ['Sprunglink href="#ideen" passt genau zu id="ideen"', (s) => /href="#ideen"/.test(s) && /id="ideen"/.test(s)],
        ["Relativer Link auf kontakt.html ohne Laufwerkspfad", (s) => /href="kontakt\.html"/.test(s) && !/[A-Z]:\\/.test(s)],
      ],
      remember: "Ein Sprungziel muss exakt passen; relative Pfade gelten auf jedem Rechner.",
    },
    {
      type: "write",
      title: "Eine kleine Navigation",
      task: "Schreibe zwei Links: einen zur eigenen Startseite index.html und einen externen Link auf eine Webseite mit https://. Beide Linktexte nennen das Ziel.",
      code: "<!-- Zwei Links: Startseite und externe Seite -->\n",
      fixed: '<a href="index.html">Startseite</a>\n<a href="https://example.org">Beispielseite</a>',
      checks: [
        ["Relativer Link auf index.html mit Linktext", (s) => has(s, `<a href="index\\.html">${text}</a>`)],
        ["Externer Link mit https:// und Linktext", (s) => has(s, `<a href="https://[^"\\s]+">${text}</a>`)],
      ],
      remember: "Eigene Seiten relativ verlinken, fremde mit https://; der Linktext nennt das Ziel.",
    },
  ],
  l6: [
    {
      type: "repair",
      title: "Ein Bild, das nicht erscheint",
      task: "Das Bild liegt im Projekt unter bilder/beet.jpg. Der Pfad im Code stimmt nicht, und die Bildbeschreibung fehlt. Repariere beides. Die Vorschau lädt keine Bilddateien; sie zeigt deshalb deinen alt-Text.",
      code: '<img src="Bilder/Beet.JPG" width="640" height="360">',
      fixed: '<img src="bilder/beet.jpg" alt="Drei Hochbeete mit jungem Salat" width="640" height="360">',
      checks: [
        ["Pfad exakt bilder/beet.jpg", (s) => /<img\b[^>]*src="bilder\/beet\.jpg"/.test(s)],
        ["alt beschreibt das Bild (mindestens 8 Zeichen)", (s) => /<img\b[^>]*alt="[^"]{8,}"/.test(s)],
      ],
      remember: "Pfade genau wie Ordner und Datei schreiben; jedes informative Bild braucht alt.",
    },
    {
      type: "complete",
      title: "Dekoration oder Information?",
      task: "Die Linie ist reine Dekoration, das Teamfoto zeigt unsere AG beim Pflanzen. Ergänze bei beiden Bildern ein passendes alt-Attribut.",
      code: '<img src="bilder/linie.png" width="600" height="8">\n<img src="bilder/team.jpg" width="640" height="360">',
      fixed: '<img src="bilder/linie.png" alt="" width="600" height="8">\n<img src="bilder/team.jpg" alt="Unsere AG beim Pflanzen im Schulgarten" width="640" height="360">',
      checks: [
        ['Dekoratives Bild mit leerem alt=""', (s) => /\balt=""/.test(imgTag(s, "bilder/linie.png"))],
        ["Teamfoto mit beschreibendem alt (mindestens 10 Zeichen)", (s) => /\balt="[^"]{10,}"/.test(imgTag(s, "bilder/team.jpg"))],
      ],
      remember: 'Dekoration bekommt alt="", Information eine Beschreibung.',
    },
  ],
  l7: [
    {
      type: "repair",
      title: "Eine verrutschte Tabelle",
      task: "Die Kopfzellen stehen ohne Zeile direkt in der Tabelle, und eine Datenzeile hat zu wenige Zellen. Repariere die Tabelle.",
      code: '<table>\n  <caption>Pflanzzeiten</caption>\n  <th scope="col">Pflanze</th><th scope="col">Monat</th>\n  <tr><td>Radieschen</td><td>April</td></tr>\n  <tr><td>Salat</td></tr>\n</table>',
      fixed: '<table>\n  <caption>Pflanzzeiten</caption>\n  <tr><th scope="col">Pflanze</th><th scope="col">Monat</th></tr>\n  <tr><td>Radieschen</td><td>April</td></tr>\n  <tr><td>Salat</td><td>Mai</td></tr>\n</table>',
      checks: [
        ["Die Kopfzellen stehen in einem <tr>", (s) => /<tr>\s*<th scope="col">[^<]+<\/th>\s*<th scope="col">[^<]+<\/th>\s*<\/tr>/.test(s)],
        ["Jede Datenzeile hat zwei td-Zellen", (s) => {
          const data = (s.match(/<tr>[\s\S]*?<\/tr>/g) || []).filter((row) => row.includes("<td"));
          return data.length >= 2 && data.every((row) => count(row, /<td>[^<]+<\/td>/g) === 2);
        }],
      ],
      remember: "Jede Zelle steht in einer Zeile tr, und jede Zeile hat gleich viele Zellen.",
    },
    {
      type: "write",
      title: "Deine eigene kleine Tabelle",
      task: "Schreibe eine Tabelle mit caption, einer Kopfzeile aus zwei th mit scope=\"col\" und einer Datenzeile mit zwei td, zum Beispiel zu deinem Stundenplan.",
      code: "<!-- Tabelle mit caption, Kopfzeile und Datenzeile -->\n",
      fixed: '<table>\n  <caption>Mein Montag</caption>\n  <tr><th scope="col">Stunde</th><th scope="col">Fach</th></tr>\n  <tr><td>1</td><td>Informatik</td></tr>\n</table>',
      checks: [
        ["Eine caption mit Text", (s) => has(s, `<table>\\s*<caption>${text}</caption>`)],
        ['Kopfzeile mit zwei th scope="col"', (s) => has(s, `<tr>\\s*<th scope="col">${text}</th>\\s*<th scope="col">${text}</th>\\s*</tr>`)],
        ["Datenzeile mit zwei td", (s) => has(s, `<tr>\\s*<td>${text}</td>\\s*<td>${text}</td>\\s*</tr>`)],
      ],
      remember: "caption benennt die Tabelle, th überschreibt, td enthält die Daten.",
    },
  ],
  l8: [
    {
      type: "repair",
      title: "Ein Video ohne Bedienung",
      task: "Das Video startet von selbst und lässt sich nicht bedienen. Ergänze die Bedienleiste und entferne das automatische Abspielen. Die Vorschau lädt keine Mediendateien; die Bedienleiste erscheint trotzdem.",
      code: '<video src="medien/garten.mp4" autoplay width="480"></video>',
      fixed: '<video src="medien/garten.mp4" controls width="480"></video>',
      checks: [
        ["Das video-Element hat controls", (s) => /<video\b[^>]*\bcontrols\b/i.test(s)],
        ["Kein autoplay", (s) => /<video\b/i.test(s) && !/autoplay/i.test(s)],
      ],
      remember: "controls zeigt die Bedienleiste; automatisches Abspielen stört.",
    },
    {
      type: "write",
      title: "Video mit Textfassung",
      task: "Binde ein Video mit controls ein, nenne die Datei in einem source-Element mit type=\"video/mp4\" und schreibe direkt darunter eine Textfassung als Absatz mit mindestens 25 Zeichen.",
      code: "<!-- Video mit source und Textfassung -->\n",
      fixed: '<video controls width="480">\n  <source src="medien/garten.mp4" type="video/mp4">\n</video>\n<p>Textfassung: Wir säen Radieschen in das Hochbeet.</p>',
      checks: [
        ['video mit controls und source mit type="video/mp4"', (s) => /<video\b[^>]*\bcontrols\b[^>]*>[\s\S]*?<source\b[^>]*src="[^"]+"[^>]*type="video\/mp4"[\s\S]*?<\/video>/i.test(s)],
        ["Textfassung direkt nach dem Video (mindestens 25 Zeichen)", (s) => /<\/video>\s*<p>[^<]{25,}<\/p>/i.test(s)],
      ],
      remember: "Was man nur hören oder sehen kann, braucht auch eine Textfassung.",
    },
  ],
  l9: [
    {
      type: "repair",
      title: "Die Verknüpfung zur CSS-Datei",
      task: "Diese Zeile im head soll style.css einbinden, hat aber zwei Fehler: den Wert von rel und die Schreibweise des Dateinamens. Repariere beides.",
      code: '<head>\n  <meta charset="utf-8">\n  <link rel="style" href="Style.css">\n</head>',
      fixed: '<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="style.css">\n</head>',
      checks: [
        ['rel="stylesheet"', (s) => /<link\b[^>]*rel="stylesheet"/i.test(s)],
        ['href="style.css" in Kleinbuchstaben', (s) => /<link\b[^>]*href="style\.css"/.test(s)],
      ],
      remember: 'rel="stylesheet" und der exakte Dateiname verbinden HTML und CSS.',
    },
    {
      type: "repair",
      kind: "css",
      context: '<h1 id="start">Schulgarten</h1>\n<p>Wir pflanzen gemeinsam.</p>\n<p class="hinweis">Bitte Handschuhe mitbringen.</p>',
      title: "Reines CSS im CSS-Feld",
      task: "Im CSS-Feld stehen HTML-Tags, und eine Regel wird nicht geschlossen. Deshalb wirkt keine Farbe. Repariere beides und beobachte die Vorschau.",
      code: "<style>\nh1 { color: navy; }\np { color: dimgray;\n</style>",
      fixed: "h1 { color: navy; }\np { color: dimgray; }",
      checks: [
        ["Keine style-Tags im CSS", (s) => !/<\/?style/i.test(s)],
        ["Jede Regel mit } geschlossen", (s) => count(s, /\{/g) > 0 && count(s, /\{/g) === count(s, /\}/g)],
      ],
      remember: "Im CSS-Feld steht reines CSS, und jede Regel endet mit }.",
    },
  ],
  l10: [
    {
      type: "repair",
      kind: "css",
      context: '<h1 id="start">Schulgarten</h1>\n<p class="hinweis">Bitte Handschuhe mitbringen.</p>',
      title: "Zwei Selektoren, die nichts treffen",
      task: 'Beide Regeln wirken nicht auf <p class="hinweis"> und <h1 id="start">. Finde die zwei Schreibfehler in den Selektoren.',
      code: ". hinweis { color: darkgreen; }\n#Start { text-align: center; }",
      fixed: ".hinweis { color: darkgreen; }\n#start { text-align: center; }",
      checks: [
        ["Klassenselektor .hinweis ohne Leerzeichen mit color", (s) => /(^|[\s}])\.hinweis\s*\{[^}]*color\s*:/.test(s)],
        ["ID-Selektor #start in Kleinbuchstaben mit text-align", (s) => /(^|[\s}])#start\s*\{[^}]*text-align\s*:/.test(s)],
      ],
      remember: "Punkt und Klassenname gehören zusammen; Namen müssen exakt übereinstimmen.",
    },
    {
      type: "write",
      kind: "css",
      context: '<h1 id="start">Schulgarten</h1>\n<p>Wir pflanzen gemeinsam.</p>\n<p class="hinweis">Bitte Handschuhe mitbringen.</p>',
      title: "Drei Selektoren, drei Reichweiten",
      task: "Färbe alle Absätze dunkelgrau, gib den Hinweisen der Klasse hinweis eine dunkelgrüne Farbe und richte die Überschrift mit der ID start mittig aus.",
      code: "/* Regeln für p, .hinweis und #start */\n",
      fixed: "p { color: dimgray; }\n.hinweis { color: darkgreen; }\n#start { text-align: center; }",
      checks: [
        ["Tagselektor p mit color", (s) => rule(s, "p", "color")],
        ["Klassenselektor .hinweis mit color", (s) => rule(s, "\\.hinweis", "color")],
        ["ID-Selektor #start mit text-align: center", (s) => rule(s, "#start", "text-align", "center")],
      ],
      remember: "Tag für alle, .klasse für eine Gruppe, #id für genau ein Element.",
    },
  ],
  l11: [
    {
      type: "repair",
      kind: "css",
      context: '<h1 id="start">Schulgarten</h1>\n<p>Wir pflanzen gemeinsam.</p>\n<p class="hinweis">Bitte Handschuhe mitbringen.</p>',
      title: "Zwei Werte, die der Browser verwirft",
      task: "Beide Deklarationen wirken nicht: Bei der Schriftgröße fehlt die Einheit, bei der Zeilenhöhe steht ein Komma. Repariere beide Werte.",
      code: "body {\n  font-size: 18;\n  line-height: 1,6;\n}",
      fixed: "body {\n  font-size: 18px;\n  line-height: 1.6;\n}",
      checks: [
        ["font-size mit Einheit (px, rem, em oder %)", (s) => rule(s, "body", "font-size", "[\\d.]+(px|rem|em|%)")],
        ["line-height mit Punkt statt Komma", (s) => rule(s, "body", "line-height", "\\d+(\\.\\d+)?(px|rem|em|%)?\\s*[;}]") && !/line-height\s*:\s*\d+,/.test(s)],
      ],
      remember: "Längen brauchen eine Einheit, Dezimalzahlen einen Punkt.",
    },
    {
      type: "write",
      kind: "css",
      context: '<h1 id="start">Schulgarten</h1>\n<p>Wir pflanzen gemeinsam.</p>\n<p class="hinweis">Bitte Handschuhe mitbringen.</p>',
      title: "Lesbare Grundgestaltung",
      task: "Gib body eine Schriftfarbe, eine Hintergrundfarbe und eine Schriftfamilie mit Ersatzschrift (zum Beispiel sans-serif).",
      code: "body {\n  \n}",
      fixed: "body {\n  color: #222;\n  background-color: #f4f7f6;\n  font-family: Arial, sans-serif;\n}",
      checks: [
        ["body mit color", (s) => rule(s, "body", "color")],
        ["body mit background-color", (s) => rule(s, "body", "background-color")],
        ["font-family mit Ersatzschrift (serif, sans-serif oder monospace)", (s) => rule(s, "body", "font-family", "[^;}]*,\\s*(sans-serif|serif|monospace)")],
      ],
      remember: "Eine Schriftfamilie nennt immer auch eine Ersatzschrift.",
    },
  ],
  l12: [
    {
      type: "repair",
      kind: "css",
      context: '<div class="karte">Bitte Handschuhe mitbringen.</div>',
      title: "Text klebt am unsichtbaren Rahmen",
      task: "Der Text klebt am Rand, und der Rahmen bleibt unsichtbar, weil der Linienstil fehlt. Gib der Karte Innenabstand und einen vollständigen Rahmen.",
      code: ".karte {\n  margin: 20px;\n  padding: 0;\n  border: 2px navy;\n}",
      fixed: ".karte {\n  margin: 20px;\n  padding: 1rem;\n  border: 2px solid navy;\n}",
      checks: [
        ["padding größer als 0", (s) => rule(s, "\\.karte", "padding", "(0*[1-9][\\d.]*|0?\\.\\d*[1-9]\\d*)(px|rem|em|%)")],
        ["border mit Breite, Stil und Farbe", (s) => rule(s, "\\.karte", "border", "[^;}]*\\b(solid|dashed|dotted|double)\\b")],
      ],
      remember: "padding liegt innen, margin außen; ein Rahmen braucht Breite, Stil und Farbe.",
    },
    {
      type: "write",
      kind: "css",
      context: '<div class="karte">Unser Schulgarten sucht Helferinnen und Helfer für die Gießdienste in den Ferien.</div>',
      title: "Eine zentrierte, flexible Karte",
      task: "Begrenze die Karte auf höchstens 30rem Breite, zentriere sie mit margin und auto und sorge mit box-sizing dafür, dass Innenabstand und Rahmen in der Breite enthalten sind.",
      code: ".karte {\n  padding: 1rem;\n  border: 1px solid navy;\n}",
      fixed: ".karte {\n  padding: 1rem;\n  border: 1px solid navy;\n  max-width: 30rem;\n  margin: 1rem auto;\n  box-sizing: border-box;\n}",
      checks: [
        ["max-width für die Karte", (s) => rule(s, "\\.karte", "max-width", "[\\d.]+(px|rem|em|%)")],
        ["margin mit auto zum Zentrieren", (s) => rule(s, "\\.karte", "margin", "[^;}]*\\bauto\\b")],
        ["box-sizing: border-box", (s) => rule(s, "\\.karte", "box-sizing", "border-box")],
      ],
      remember: "max-width und margin: auto zentrieren eine Box, ohne sie starr zu machen.",
    },
  ],
  l13: [
    {
      type: "repair",
      title: "Bereiche mit Bedeutung",
      task: "Diese Seite besteht nur aus div-Elementen. Ersetze sie durch header, nav und main, damit jeder Bereich seine Aufgabe nennt. Die Klassen kannst du weglassen.",
      code: '<div class="kopf"><h1>Schulgarten</h1></div>\n<div class="menue"><a href="kontakt.html">Mitmachen</a></div>\n<div class="inhalt"><p>Ein Garten für alle.</p></div>',
      fixed: '<header><h1>Schulgarten</h1></header>\n<nav><a href="kontakt.html">Mitmachen</a></nav>\n<main><p>Ein Garten für alle.</p></main>',
      checks: [
        ["Die h1 steht in einem header", (s) => /<header\b[^>]*>\s*<h1>/i.test(s)],
        ["Der Link steht in einem nav", (s) => /<nav\b[^>]*>\s*<a\b[^>]*href="kontakt\.html"/i.test(s)],
        ["Der Absatz steht in main", (s) => /<main\b[^>]*>\s*<p>/i.test(s)],
      ],
      remember: "header, nav, main und footer sagen, wozu ein Bereich da ist.",
    },
    {
      type: "write",
      title: "Navigation und Fußbereich",
      task: "Schreibe eine nav mit zwei Links, zur Startseite index.html und zur Unterseite kontakt.html, und einen footer mit einer kurzen Zeile, zum Beispiel zum Projekt.",
      code: "<!-- nav mit zwei Links und ein footer -->\n",
      fixed: '<nav>\n  <a href="index.html">Start</a>\n  <a href="kontakt.html">Mitmachen</a>\n</nav>\n<footer>\n  <p>Ein Projekt der Klasse 8b</p>\n</footer>',
      checks: [
        ["nav mit Links auf index.html und kontakt.html", (s) => {
          const nav = inside(s.toLowerCase(), "<nav>", "</nav>") || "";
          return has(nav, `<a href="index\\.html">${text}</a>`) && has(nav, `<a href="kontakt\\.html">${text}</a>`);
        }],
        ["footer mit eigenem Text", (s) => has(s, "<footer>[^]*?[^<\\s][^]*?</footer>") && (inside(s, "<footer>", "</footer>") || "").replace(/<[^>]+>/g, "").trim().length >= 5],
      ],
      remember: "Jede Seite bekommt dieselbe Navigation, damit man immer zurückfindet.",
    },
  ],
  l14: [
    {
      type: "repair",
      title: "Ein fremdes Bild ohne Rechte",
      task: "Das Bild wird direkt von einer fremden Adresse geladen, und seine Herkunft ist unklar. Verwende stattdessen dein eigenes Foto bilder/beet.jpg und ergänze im footer den Hinweis „Foto: eigene Aufnahme“.",
      code: '<img src="https://bilder.example.com/beet.jpg" alt="Hochbeet im Schulhof">\n<footer>\n  <h2>Quellen und Rechte</h2>\n</footer>',
      fixed: '<img src="bilder/beet.jpg" alt="Hochbeet im Schulhof">\n<footer>\n  <h2>Quellen und Rechte</h2>\n  <p>Foto: eigene Aufnahme</p>\n</footer>',
      checks: [
        ["Eigenes Bild über den relativen Pfad bilder/beet.jpg", (s) => /<img\b[^>]*src="bilder\/beet\.jpg"/.test(s) && !/src="https?:/i.test(s)],
        ["Im footer steht „eigene Aufnahme“", (s) => /eigene Aufnahme/i.test(inside(s, "<footer>", "</footer>") || "")],
      ],
      remember: "Verwende eigene Inhalte oder solche mit passender Lizenz, und nenne die Herkunft.",
    },
    {
      type: "complete",
      title: "Eine Lizenzangabe vervollständigen",
      task: "Vervollständige die Angabe zu einem fremden Foto: Nenne die Urheberin Lena Beispiel, die Quelle commons.wikimedia.org und die Lizenz CC BY 4.0.",
      code: "<footer>\n  <h2>Quellen und Rechte</h2>\n  <p>Foto „Hochbeet im Frühling“</p>\n</footer>",
      fixed: "<footer>\n  <h2>Quellen und Rechte</h2>\n  <p>Foto „Hochbeet im Frühling“ von Lena Beispiel, Quelle: commons.wikimedia.org, Lizenz: CC BY 4.0</p>\n</footer>",
      checks: [
        ["Urheberin genannt", (s) => /Lena Beispiel/.test(s)],
        ["Quelle genannt", (s) => /commons\.wikimedia\.org/i.test(s)],
        ["Lizenz CC BY 4.0 genannt", (s) => /CC[ -]BY 4\.0/i.test(s)],
      ],
      remember: "Titel, Urheber, Quelle, Lizenz: Vier Angaben machen eine Quelle prüfbar.",
    },
  ],
  l15: [
    {
      type: "repair",
      title: "Lokal klappt es, auf dem Server nicht",
      task: "Im Projektordner heißen die Dateien style.css und bilder/beet.jpg. Unter Windows funktioniert alles, auf dem Webserver fehlen Gestaltung und Bild. Repariere beide Pfade.",
      code: '<link rel="stylesheet" href="Style.CSS">\n<img src="Bilder/Beet.jpg" alt="Hochbeet im Schulhof">',
      fixed: '<link rel="stylesheet" href="style.css">\n<img src="bilder/beet.jpg" alt="Hochbeet im Schulhof">',
      checks: [
        ['href="style.css" genau wie die Datei', (s) => /<link\b[^>]*href="style\.css"/.test(s)],
        ['src="bilder/beet.jpg" genau wie Ordner und Datei', (s) => /<img\b[^>]*src="bilder\/beet\.jpg"/.test(s)],
      ],
      remember: "Auf dem Server zählt jeder Buchstabe: Groß- und Kleinschreibung genau übernehmen.",
    },
    {
      type: "write",
      title: "Ein kurzer Testbericht",
      task: "Schreibe einen Testbericht als geordnete Liste mit drei Tests. Jeder Eintrag nennt, was du geprüft hast und mit welchem Ergebnis, zum Beispiel „Link zu kontakt.html öffnet die Unterseite“.",
      code: "<!-- ol mit drei Testeinträgen -->\n",
      fixed: "<ol>\n  <li>Link zu kontakt.html öffnet die Unterseite.</li>\n  <li>Das Bild bilder/beet.jpg wird angezeigt.</li>\n  <li>Im schmalen Fenster scrollt nichts seitlich.</li>\n</ol>",
      checks: [
        ["Eine geordnete Liste ol", (s) => /<ol>/i.test(s) && /<\/ol>/i.test(s)],
        ["Drei Einträge mit je mindestens 15 Zeichen", (s) => count(inside(s.toLowerCase(), "<ol>", "</ol>") || "", /<li>[^<]{15,}<\/li>/g) >= 3],
      ],
      remember: "Ein guter Test nennt, was geprüft wurde und was dabei herauskam.",
    },
  ],
  l16: [
    {
      type: "write",
      title: "Das Grundgerüst der Unterseite",
      task: "Schreibe das Grundgerüst für kontakt.html: Doctype, html mit lang=\"de\", im head ein eigener title und die Verknüpfung zu style.css, im body eine nav mit Rücklink zu index.html.",
      code: "<!-- Grundgerüst für kontakt.html -->\n",
      fixed: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Kontakt</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <nav><a href="index.html">Zur Startseite</a></nav>\n</body>\n</html>',
      checks: [
        ['Doctype und <html lang="de">', (s) => /^\s*<!doctype html>/i.test(s) && /<html lang="de">/i.test(s)],
        ["Eigener title im head", (s) => has(s, `<head>[^]*?<title>${text}</title>[^]*?</head>`)],
        ["Verknüpfung zu style.css im head", (s) => /<head>[\s\S]*?<link\b[^>]*rel="stylesheet"[^>]*href="style\.css"[\s\S]*?<\/head>/i.test(s) || /<head>[\s\S]*?<link\b[^>]*href="style\.css"[^>]*rel="stylesheet"[\s\S]*?<\/head>/i.test(s)],
        ["nav mit Rücklink zu index.html", (s) => has(inside(s.toLowerCase(), "<nav>", "</nav>") || "", `<a href="index\\.html">${text}</a>`)],
      ],
      remember: "Jede Seite bindet dieselbe style.css ein und führt zurück zur Startseite.",
    },
  ],
};

export const exerciseId = (lessonId, index) => `${lessonId}-${index + 1}`;
export const checkExercise = (exercise, source) =>
  exercise.checks.map(([label, test]) => ({ label, passed: test(source) }));

// One hint per exercise, shown on request after a failed check. It names the
// next step without giving away the whole solution.
export const exerciseHints = {
  "l1-1": "Dem zweiten <h1> in Zeile 1 fehlt der Schrägstrich. In Zeile 2 tauschen </p> und </strong> die Plätze.",
  "l1-2": "Beginne mit <h1>…</h1>. Darunter folgt <p>…</p>; setze <strong> und </strong> um ein Wort mitten im Absatz.",
  "l2-1": "Schneide die Zeile mit <h1> aus und füge sie zwischen <body> und </body> wieder ein.",
  "l2-2": "Ganz oben steht <!doctype html>. Aus <html> wird <html lang=\"de\">. Im head ergänzt du <meta charset=\"utf-8\">.",
  "l3-1": "Aus <h3> und </h3> werden <h2> und </h2>. Setze jeden Satz in <p> … </p> und lösche die <br>.",
  "l3-2": "Schreibe zwei Absätze <p>…</p>. Im ersten umschließt <em>…</em> ein Wort, im zweiten <strong>…</strong>.",
  "l4-1": "„Erde“ braucht <li> und </li>. Hinter „Gießkanne“ fehlt das End-Tag </li>.",
  "l4-2": "Das Gerüst ist <ol> … </ol>. Darin stehen drei Zeilen, jede als <li>…</li>.",
  "l5-1": "id und href müssen exakt gleich geschrieben sein, auch in Kleinbuchstaben. Im zweiten Link bleibt nur kontakt.html stehen.",
  "l5-2": "Du brauchst zwei a-Elemente: eines mit href=\"index.html\", eines mit href=\"https://…\". Dazwischen steht jeweils ein Linktext.",
  "l6-1": "Schreibe Ordner und Datei klein: bilder/beet.jpg. Ergänze alt=\"…\" mit einer kurzen Beschreibung des Bildes.",
  "l6-2": "Die Linie bekommt alt=\"\" ohne Text. Beim Teamfoto beschreibt alt in einem Satz, was zu sehen ist.",
  "l7-1": "Umschließe die beiden <th> mit <tr> und </tr>. In der Salat-Zeile fehlt eine zweite <td>-Zelle, zum Beispiel ein Monat.",
  "l7-2": "Reihenfolge: <table>, <caption>, eine <tr> mit zwei <th scope=\"col\">, eine <tr> mit zwei <td>, zum Schluss </table>.",
  "l8-1": "Ergänze im Start-Tag von video das Wort controls und lösche autoplay.",
  "l8-2": "<video controls> … </video> umschließt <source src=\"…\" type=\"video/mp4\">. Direkt nach </video> folgt ein Absatz <p>…</p>.",
  "l9-1": "Der Wert von rel heißt stylesheet. Den Dateinamen schreibst du genau wie die Datei: style.css.",
  "l9-2": "Lösche die Zeilen <style> und </style>. Hinter dimgray; fehlt die schließende Klammer }.",
  "l10-1": "Zwischen Punkt und hinweis steht ein Leerzeichen zu viel. Die ID im HTML heißt start, kleingeschrieben.",
  "l10-2": "Du brauchst drei Regeln, eine für p, eine für .hinweis und eine für #start. Die letzte setzt text-align: center;.",
  "l11-1": "Hänge an 18 eine Einheit wie px an. Schreibe 1.6 mit Punkt statt Komma.",
  "l11-2": "In body { … } stehen drei Zeilen: color, background-color und font-family mit Komma und Ersatzschrift, etwa Arial, sans-serif.",
  "l12-1": "Setze padding auf einen Wert größer als 0, zum Beispiel 1rem. Ergänze bei border den Stil solid zwischen Breite und Farbe.",
  "l12-2": "Du brauchst drei Eigenschaften: max-width mit einer Breite, margin mit dem Wort auto und box-sizing mit dem Wert border-box.",
  "l13-1": "Aus der div mit h1 wird <header>, aus der Menü-div <nav>, aus der Inhalt-div <main>. Passe auch die End-Tags an.",
  "l13-2": "Schreibe <nav> mit zwei a-Elementen für index.html und kontakt.html, darunter <footer> mit einer kurzen Zeile Text.",
  "l14-1": "Ersetze die Adresse im src durch bilder/beet.jpg. Ergänze im footer einen Absatz mit „Foto: eigene Aufnahme“.",
  "l14-2": "Ergänze im Absatz hinter dem Titel: von wem das Foto ist, wo du es gefunden hast und unter welcher Lizenz es steht.",
  "l15-1": "Vergleiche Buchstabe für Buchstabe mit den Dateinamen: style.css und bilder/beet.jpg, alles kleingeschrieben.",
  "l15-2": "Schreibe <ol> mit drei <li>. Jeder Eintrag nennt in einem kurzen Satz einen Test und sein Ergebnis.",
  "l16-1": "Beginne mit dem Grundgerüst aus Einheit 02. Ergänze im head die link-Zeile aus Einheit 09 und im body eine nav mit Link auf index.html.",
};
