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
  ],
};

export const exerciseId = (lessonId, index) => `${lessonId}-${index + 1}`;
export const checkExercise = (exercise, source) =>
  exercise.checks.map(([label, test]) => ({ label, passed: test(source) }));
