import test from "node:test";
import assert from "node:assert/strict";
import { exercises, checkExercise, exerciseTypes as types } from "../src/exercises.js";
import { lessons } from "../src/content.js";

const all = Object.entries(exercises).flatMap(([id, list]) => list.map((e, i) => [`${id}-${i + 1}`, id, e]));

test("Every exercise is complete, fails as given and passes with its reference solution", () => {
  for (const [name, id, e] of all) {
    assert.ok(lessons.some((l) => l.id === id), `${name}: Einheit existiert`);
    assert.ok(e.type in types, `${name}: Art`);
    for (const field of ["title", "task", "remember"])
      assert.ok(typeof e[field] === "string" && e[field].trim().length > 10, `${name}: ${field}`);
    assert.ok(e.checks.length >= 2, `${name}: mindestens zwei Kriterien`);
    assert.ok(checkExercise(e, e.code).some((r) => !r.passed), `${name}: Ausgangscode fällt durch`);
    assert.ok(checkExercise(e, e.fixed).every((r) => r.passed), `${name}: Referenzlösung besteht`);
  }
});

test("In repair exercises, fixing only one mistake leaves exactly one check open", () => {
  const halfFixed = {
    "l1-1": "<h1>Unser Schulgarten</h1>\n<p>Wir pflanzen <strong>Gemüse</p></strong>",
    "l3-1": "<h1>Unsere AG</h1>\n<h2>Termine</h2>\nWir treffen uns freitags.<br><br>Bitte pünktlich sein.",
    "l4-1": "<ul>\n  <li>Erde</li>\n  <li>Samen</li>\n  <li>Gießkanne\n</ul>",
    "l5-1": '<a href="#ideen">Zu den Ideen</a>\n<a href="C:\\Users\\max\\kontakt.html">Kontakt</a>\n<h2 id="ideen">Ideen</h2>',
    "l10-1": ".hinweis { color: darkgreen; }\n#Start { text-align: center; }",
    "l6-1": '<img src="bilder/beet.jpg" width="640" height="360">',
    "l7-4": exercises.l7[3].code.replace("<td>Montag</td>", '<td rowspan="2">Montag</td>'),
    "l8-1": '<video src="medien/garten.mp4" controls autoplay width="480"></video>',
    "l9-1": '<link rel="stylesheet" href="Style.css">',
    "l9-2": "h1 { color: navy; }\np { color: dimgray;",
    "l11-1": "body { font-size: 18px; line-height: 1,6; }",
    "l12-1": ".karte { padding: 1rem; border: 2px navy; }",
    "l14-1": '<img src="bilder/beet.jpg" alt="Hochbeet im Schulhof">\n<footer>\n  <h2>Quellen und Rechte</h2>\n</footer>',
    "l15-1": '<link rel="stylesheet" href="style.css">\n<img src="Bilder/Beet.jpg" alt="Hochbeet im Schulhof">',
  };
  for (const [name, source] of Object.entries(halfFixed)) {
    const e = all.find(([n]) => n === name)[2];
    assert.equal(checkExercise(e, source).filter((r) => !r.passed).length, 1, name);
  }
});

test("Write exercises accept other correct answers, not only the reference", () => {
  const variants = {
    "l1-2": '<h1 >Fußball</h1>\n<p>Mein Verein heißt <strong>TSV</strong> und spielt sonntags.</p>'.replace("<h1 >", "<h1>"),
    "l3-2": "<p>Ich <em>liebe</em> Musik.</p><p>Bitte <strong>leise</strong> sein.</p>",
    "l4-2": "<OL><li>Öffnen</li><li>Lesen</li><li>Schließen</li></OL>",
    "l5-2": '<nav><a href="index.html">Zur Startseite</a> | <a href="https://www.schule.de/ag">AG-Seite</a></nav>',
    "l6-2": '<img alt="" src="bilder/linie.png">\n<img width="640" src="bilder/team.jpg" alt="Die Robotik-AG im Werkraum">',
    "l7-2": '<table><caption>Noten</caption>\n<tr><th scope="col">Fach</th><th scope="col">Note</th></tr>\n<tr><td>Deutsch</td><td>2</td></tr></table>',
    "l8-2": '<video width="400" controls><source src="film.mp4" type="video/mp4"></video>\n<p>Im Film erklären wir unseren Roboter Schritt für Schritt.</p>',
    "l10-2": "p{color:gray}\n.hinweis{color:green}\n#start{text-align:center}",
    "l11-2": 'body{color:#111;background-color:white;font-family:"Open Sans", sans-serif}',
    "l12-2": ".karte{max-width:80%;margin:0 auto;box-sizing:border-box}",
    "l13-2": '<NAV><a href="index.html">Start</a> <a href="kontakt.html">Kontakt</a></NAV>\n<footer>Klasse 8b, 2026</footer>',
    "l15-2": "<ol><li>Startseite öffnet per Doppelklick.</li><li>Rücklink führt zu index.html.</li><li>Umlaute werden richtig angezeigt.</li></ol>",
    "l16-1": '<!DOCTYPE html><html lang="de"><head><title>Kontakt</title><link href="style.css" rel="stylesheet"></head><body><nav><a href="index.html">Start</a></nav></body></html>',
  };
  for (const [name, source] of Object.entries(variants)) {
    const e = all.find(([n]) => n === name)[2];
    assert.ok(checkExercise(e, source).every((r) => r.passed), name);
  }
});

test("Every lesson offers at least one exercise", () => {
  for (const l of lessons) assert.ok(exercises[l.id]?.length >= 1, l.id);
});

test("HTML exercises accept quote, whitespace and tag-name variants without editing the source", () => {
  for (const [id, , exercise] of all.filter(([, , e]) => e.kind !== "css")) {
    const variant = exercise.fixed.replace(/<[^>]+>/g, (tag) => tag
      .replace(/(<\/?)([a-z][a-z0-9-]*)/i, (_, open, name) => open + name.toUpperCase())
      .replace(/([a-z-]+)="([^"]*)"/gi, (_, key, value) => `${key.toUpperCase()} = '${value}'`)
      .replace(/>$/, " >"));
    assert.ok(checkExercise(exercise, variant).every(r => r.passed), id);
    assert.ok(variant.includes(" >"), "the fixture actually differs");
  }
  assert.ok(checkExercise(exercises.l9[0], '<LINK REL=STYLESHEET HREF=style.css />').every(r => r.passed));
  assert.ok(!checkExercise(exercises.l9[0], '<link rel=stylesheet href=style.css/>').every(r => r.passed), "slash belongs to an unquoted filename");
  assert.ok(checkExercise(exercises.l8[1], "<video controls><source src='film.mp4' type='video/mp4'/></video><p>Wir sehen ein Beet entstehen.</p>").every(r => r.passed));
  assert.ok(checkExercise(exercises.l1[1], '<h1>Mein Hobby</h1><p>Los geht es<br/><strong>gemeinsam</strong>.</p>').every(r => r.passed));
  assert.ok(checkExercise(exercises.l5[1], "<a href='index.html'>Start</a><a href='HTTPS://example.org'>Extern</a>").every(r => r.passed));
  assert.ok(checkExercise(exercises.l6[1], '<img src="bilder/linie.png" alt><img src="bilder/team.jpg" alt="Unsere AG im Schulgarten">').every(r => r.passed), "empty attribute syntax is equivalent to an empty value");
});

test("Spelling normalization preserves case-sensitive file paths and ids", () => {
  assert.equal(checkExercise(exercises.l5[1], exercises.l5[1].fixed.replace('index.html', 'INDEX.HTML'))[0].passed, false);
  assert.equal(checkExercise(exercises.l5[0], exercises.l5[0].fixed.replace('id="ideen"', "id='Ideen'"))[0].passed, false);
  assert.equal(checkExercise(exercises.l13[1], exercises.l13[1].fixed.replace('kontakt.html', 'Kontakt.html'))[0].passed, false);
  assert.equal(checkExercise(exercises.l16[0], exercises.l16[0].fixed.replace('style.css', 'Style.CSS'))[2].passed, false);
  assert.equal(checkExercise(exercises.l16[0], exercises.l16[0].fixed.replace('index.html', 'INDEX.HTML'))[3].passed, false);
  assert.equal(checkExercise(exercises.l10[0], exercises.l10[0].fixed.replace('#start', '#Start'))[1].passed, false, "CSS is not normalized as HTML");
});

test("HTML spelling normalization never supplies missing tags or counts hidden examples", () => {
  for (const [id, , exercise] of all.filter(([, , e]) => e.kind !== "css")) {
    for (const tag of ["script", "style", "textarea", "template"]) {
      assert.ok(!checkExercise(exercise, `<${tag}>${exercise.fixed}</${tag}>`).every(r => r.passed), `${id}: ${tag}`);
    }
    assert.ok(!checkExercise(exercise, `<!-- ${exercise.fixed} -->`).every(r => r.passed), `${id}: comment`);
  }
  assert.ok(!checkExercise(exercises.l1[0], '<h1>Titel<h1><p><strong>Text</p></strong>').every(r => r.passed));
  assert.ok(!checkExercise(exercises.l5[1], '<a href="index.html>Start</a><a href="https://example.org">Extern</a>').every(r => r.passed));
  assert.ok(!checkExercise(exercises.l5[1], '<a href="falsch.html" href="index.html">Start</a><a href="https://example.org">Extern</a>').every(r => r.passed));
});

test("License practice requires footer text, not words in an attribute or elsewhere", () => {
  const e = exercises.l14[1];
  const words = "Lena Beispiel, commons.wikimedia.org, CC BY 4.0";
  assert.ok(checkExercise(e, `<footer class='quellen'><p>Lena <em>Beispiel</em>, commons.wikimedia.org, CC BY 4.0</p></footer>`).every(r => r.passed));
  assert.ok(!checkExercise(e, `<footer title='${words}'><p>Foto im Frühling</p></footer>`).every(r => r.passed));
  assert.ok(!checkExercise(e, `<p>${words}</p><footer>Foto im Frühling</footer>`).every(r => r.passed));
});

test("Row colors require active rules for the right classes and complete color values", () => {
  const exercise = exercises.l11[2];
  const result = (source) => checkExercise(exercise, source).map((r) => r.passed);
  assert.deepEqual(result(".ungerade { background-color: lightblue; }"), [true, false]);
  assert.deepEqual(result(".gerade { background-color: white; }"), [false, true]);
  assert.deepEqual(result("/* " + exercise.fixed + " */"), [false, false]);
  assert.deepEqual(result(".ungerade { background-color: lightblueish; } .gerade { background-color: whitewash; }"), [false, false]);
  assert.deepEqual(result(".Ungerade { background-color: lightblue; } #gerade { background-color: white; }"), [false, false]);
  assert.deepEqual(result(".ungerade { background-color: ; } .gerade { color: white; }"), [false, false]);
  assert.deepEqual(result("tr.gerade { BACKGROUND-COLOR: #FFF } tr.ungerade { background-color: #ADD8E6; }"), [true, true]);
});

test("List marker practice distinguishes the two lists and rejects comments or incomplete values", () => {
  const exercise = exercises.l11[3];
  const result = (source) => checkExercise(exercise, source).map((r) => r.passed);
  assert.deepEqual(result("ul { list-style-type: square; }"), [true, false]);
  assert.deepEqual(result("ol { list-style-type: lower-alpha; }"), [false, true]);
  assert.deepEqual(result("ul { list-style-type: lower-alpha; } ol { list-style-type: square; }"), [false, false]);
  assert.deepEqual(result("/* " + exercise.fixed + " */"), [false, false]);
  assert.deepEqual(result("ul { list-style-type: squareish; } ol { list-style-type: lower-alphabet; }"), [false, false]);
  assert.deepEqual(result("ul { x-list-style-type: square; } ol { --list-style-type: lower-alpha; }"), [false, false]);
  assert.deepEqual(result("UL { LIST-STYLE-TYPE: SQUARE } OL { list-style-type: LOWER-ALPHA }"), [true, true]);
});

test("Rowspan practice requires the actual attribute and removal of the occupied cell", () => {
  const e = exercises.l7[3];
  const result = (source) => checkExercise(e, source).map((r) => r.passed);
  assert.deepEqual(result(e.code), [false, false]);
  assert.deepEqual(result(e.fixed.replace('rowspan="2"', 'rowspan="3"')), [false, true]);
  assert.deepEqual(result(e.fixed.replace('rowspan="2"', 'data-rowspan="2"')), [false, true]);
  assert.deepEqual(result(e.fixed.replace('<td>15 Uhr</td>', '<td>Montag</td><td>15 Uhr</td>')), [true, false]);
  assert.deepEqual(result('<!-- ' + e.fixed + ' -->'), [false, false]);
  assert.deepEqual(result(e.fixed.replace('rowspan="2"', "class='tag' rowspan='2'")), [true, true]);
});

test("Responsive image practice requires both a width limit and automatic height", () => {
  const e = exercises.l12[3];
  const result = (source) => checkExercise(e, source).map((r) => r.passed);
  assert.deepEqual(result("img { max-width: 100%; height: 360px; }"), [true, false]);
  assert.deepEqual(result("img { height: auto; }"), [false, true]);
  assert.deepEqual(result("img { max-width: 100px; height: auto%; }"), [false, false]);
  assert.deepEqual(result('/* ' + e.fixed + ' */'), [false, false]);
  assert.deepEqual(result("IMG { HEIGHT: AUTO; MAX-WIDTH: 100% }"), [true, true]);
  assert.match(e.context, /src="data:image\/svg\+xml,/);
});

test("CSS practice matches whole properties and exact class/id names while accepting HTML tag case", () => {
  const results = (e, source) => checkExercise(e, source).map(r => r.passed);
  assert.deepEqual(results(exercises.l11[1], 'body { background-color: white; font-family: Arial, sans-serif; }'), [false, true, true]);
  assert.deepEqual(results(exercises.l10[1], 'p { color: gray; } .Hinweis { color: green; } #Start { text-align: center; }'), [true, false, false]);
  assert.deepEqual(results(exercises.l10[0], '.hinweis { background-color: green; } #start { text-align: center; }'), [false, true]);
  assert.deepEqual(results(exercises.l10[1], 'P { COLOR: gray } .hinweis { COLOR: green } #start { TEXT-ALIGN: CENTER }'), [true, true, true]);
  assert.ok(checkExercise(exercises.l11[1], 'BODY, main { COLOR: black; BACKGROUND-COLOR: white; FONT-FAMILY: "/* Example; { font } */", sans-serif; }').every(r => r.passed));
});

test("CSS practice ignores comments, conditional blocks and property-like text inside strings", () => {
  assert.ok(checkExercise(exercises.l10[1], '/* ' + exercises.l10[1].fixed + ' */').every(r => !r.passed));
  assert.equal(checkExercise(exercises.l9[1], '/* h1 { color: red; } */')[1].passed, false);
  assert.equal(checkExercise(exercises.l10[0], '.hin/**/weis { color: green; } #start { text-align: center; }')[0].passed, false);
  assert.equal(checkExercise(exercises.l10[0], '.hinweis { content: "hello; color: green;"; } #start { text-align: center; }')[0].passed, false);
  assert.equal(checkExercise(exercises.l10[1], 'p { color:gray } .hinweis { color:green } @media print { #start { text-align:center } }')[2].passed, false);
});

test("CSS practice checks complete values and the winning simple declaration", () => {
  const results = (e, source) => checkExercise(e, source).map(r => r.passed);
  assert.deepEqual(results(exercises.l12[1], '.karte { max-width:30remXYZ; margin:1rem auto; box-sizing:border-boxish }'), [false, true, false]);
  assert.deepEqual(results(exercises.l12[1], '.karte { max-width:.5em; margin:1rem auto 2rem; box-sizing:BORDER-BOX }'), [true, true, true]);
  assert.equal(checkExercise(exercises.l12[1], '.karte { max-width:30rem; margin:auto 1rem; box-sizing:border-box }')[1].passed, false);
  assert.equal(checkExercise(exercises.l12[0], '.karte { padding:0 1rem; border:2px solid navy }')[0].passed, true);
  assert.equal(checkExercise(exercises.l12[0], '.karte { padding:1..5rem; border:2px solid navy }')[0].passed, false);
  assert.equal(checkExercise(exercises.l11[0], 'body { font-size:1..8px; line-height:1.6 }')[0].passed, false);
  assert.equal(checkExercise(exercises.l10[1], exercises.l10[1].fixed + '\n#start { text-align:left }')[2].passed, false);
  assert.equal(checkExercise(exercises.l10[1], exercises.l10[1].fixed.replace('center;', 'center ! important;') + '\n#start { text-align:left }')[2].passed, true);
  assert.equal(checkExercise(exercises.l11[2], 'tr.gerade { background-color:white } .gerade { background-color:cyan }')[1].passed, true);
  assert.equal(checkExercise(exercises.l11[2], 'tr.gerade { background-color:white } .gerade { background-color:cyan !important }')[1].passed, false);
});

test("Every exercise has exactly one hint, and hints never contain the full solution", async () => {
  const { exerciseHints } = await import("../src/exercises.js");
  assert.deepEqual(Object.keys(exerciseHints).sort(), all.map(([name]) => name).sort());
  for (const [name, , e] of all) {
    const hint = exerciseHints[name];
    assert.ok(hint.length > 30 && hint.length < 220, name);
    assert.notEqual(hint.trim(), e.fixed.trim(), name);
  }
});

test("Solved markers from a backup keep only known exercise ids", async () => {
  const { normalizeSolved } = await import("../src/exercises.js");
  assert.equal(normalizeSolved(undefined), null);
  assert.equal(normalizeSolved("l1-1"), null);
  assert.deepEqual(normalizeSolved(["l1-1", "l1-1", "l99-1", 7, "<img>", "l16-1"]), ["l1-1", "l16-1"]);
});
