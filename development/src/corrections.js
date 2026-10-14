// Optional correction tasks: learners repair faulty code and check it at once.
// The checks read the written source on purpose: browsers silently repair many
// HTML mistakes, so a parsed document would hide exactly the errors to train.
// Nothing here is stored or awarded points. `fixed` is a reference solution
// used by the tests; it is not shown in the app.
const count = (source, pattern) => (source.match(pattern) || []).length;
const inside = (source, open, close) => {
  const start = source.indexOf(open);
  const end = source.indexOf(close, start + open.length);
  return start < 0 || end < 0 ? null : source.slice(start + open.length, end);
};

export const corrections = {
  l1: {
    task: "Die Überschrift wird nicht geschlossen, und strong und p sind falsch verschachtelt. Repariere beides.",
    code: "<h1>Unser Schulgarten<h1>\n<p>Wir pflanzen <strong>Gemüse</p></strong>",
    fixed: "<h1>Unser Schulgarten</h1>\n<p>Wir pflanzen <strong>Gemüse</strong></p>",
    checks: [
      ["Genau ein Start-Tag <h1> und ein End-Tag </h1>", (s) => count(s, /<h1>/g) === 1 && count(s, /<\/h1>/g) === 1],
      ["</strong> steht vor </p>", (s) => /<strong>[^<]*<\/strong>[^<]*<\/p>/.test(s)],
    ],
  },
  l2: {
    task: "Die sichtbare Überschrift steht im falschen Bereich des Grundgerüsts. Verschiebe sie, ohne den title zu verändern.",
    code: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Meine AG</title>\n  <h1>Willkommen</h1>\n</head>\n<body>\n</body>\n</html>',
    fixed: '<!doctype html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Meine AG</title>\n</head>\n<body>\n  <h1>Willkommen</h1>\n</body>\n</html>',
    checks: [
      ["Die h1 steht im body", (s) => s.indexOf("<h1") > s.indexOf("<body") && s.indexOf("<body") > -1 && s.indexOf("<h1") < s.indexOf("</body>")],
      ["Der title steht weiterhin im head", (s) => s.indexOf("<title>") > -1 && s.indexOf("<title>") < s.indexOf("</head>")],
    ],
  },
  l4: {
    task: "In dieser Liste stimmt zweimal etwas nicht: ein Eintrag ohne li und ein li ohne End-Tag. Repariere die Liste.",
    code: "<ul>\n  Erde\n  <li>Samen</li>\n  <li>Gießkanne\n</ul>",
    fixed: "<ul>\n  <li>Erde</li>\n  <li>Samen</li>\n  <li>Gießkanne</li>\n</ul>",
    checks: [
      ["Drei Einträge mit <li> und </li>", (s) => count(s, /<li>/g) === 3 && count(s, /<\/li>/g) === 3],
      ["Kein Text direkt in der ul", (s) => {
        const list = inside(s, "<ul>", "</ul>");
        // Closed and unclosed li items are removed; whatever text is left stands bare in the ul.
        return list !== null && !list.replace(/<li>[\s\S]*?<\/li>/g, "").replace(/<li>[^<]*/g, "").trim();
      }],
    ],
  },
  l5: {
    task: "Der Sprunglink springt nicht, und der Kontaktlink funktioniert nur auf einem einzigen Rechner. Repariere beide Links.",
    code: '<a href="#Ideen">Zu den Ideen</a>\n<a href="C:\\Users\\max\\kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
    fixed: '<a href="#ideen">Zu den Ideen</a>\n<a href="kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
    checks: [
      ['Sprunglink href="#ideen" passt genau zu id="ideen"', (s) => /href="#ideen"/.test(s) && /id="ideen"/.test(s)],
      ["Relativer Link auf kontakt.html ohne Laufwerkspfad", (s) => /href="kontakt\.html"/.test(s) && !/[A-Z]:\\/.test(s)],
    ],
  },
  l7: {
    task: "Die Kopfzellen stehen ohne Zeile direkt in der Tabelle, und eine Datenzeile hat zu wenige Zellen. Repariere die Tabelle.",
    code: '<table>\n  <caption>Pflanzzeiten</caption>\n  <th scope="col">Pflanze</th><th scope="col">Monat</th>\n  <tr><td>Radieschen</td><td>April</td></tr>\n  <tr><td>Salat</td></tr>\n</table>',
    fixed: '<table>\n  <caption>Pflanzzeiten</caption>\n  <tr><th scope="col">Pflanze</th><th scope="col">Monat</th></tr>\n  <tr><td>Radieschen</td><td>April</td></tr>\n  <tr><td>Salat</td><td>Mai</td></tr>\n</table>',
    checks: [
      ["Die Kopfzellen stehen in einem <tr>", (s) => /<tr>\s*<th scope="col">[^<]+<\/th>\s*<th scope="col">[^<]+<\/th>\s*<\/tr>/.test(s)],
      ["Jede Datenzeile hat zwei td-Zellen", (s) => {
        const rows = s.match(/<tr>[\s\S]*?<\/tr>/g) || [];
        const data = rows.filter((row) => row.includes("<td"));
        return data.length >= 2 && data.every((row) => count(row, /<td>[^<]+<\/td>/g) === 2);
      }],
    ],
  },
  l10: {
    kind: "css",
    task: 'Beide Regeln wirken nicht auf <p class="hinweis"> und <h1 id="start">. Finde die zwei Schreibfehler in den Selektoren.',
    code: ". hinweis { color: darkgreen; }\n#Start { text-align: center; }",
    fixed: ".hinweis { color: darkgreen; }\n#start { text-align: center; }",
    checks: [
      ["Klassenselektor .hinweis ohne Leerzeichen mit color", (s) => /(^|[\s}])\.hinweis\s*\{[^}]*color\s*:/.test(s)],
      ["ID-Selektor #start in Kleinbuchstaben mit text-align", (s) => /(^|[\s}])#start\s*\{[^}]*text-align\s*:/.test(s)],
    ],
  },
};

export const checkCorrection = (id, source) =>
  corrections[id].checks.map(([label, test]) => ({ label, passed: test(source) }));
