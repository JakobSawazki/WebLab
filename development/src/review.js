// Revision round on the notes page: five random comprehension questions from
// completed lessons, with the explanation for every answer. It never changes
// the learning state, quiz results or points.
import { lessons } from "./content.js";
import { guidance } from "./guidance.js";
import { esc } from "./html.js";

export function reviewQuestions(completed, count = 5, random = Math.random) {
  const pool = lessons.filter((l) => completed.includes(l.id));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function reviewPanel(state) {
  const questions = reviewQuestions(state.completed);
  if (!questions.length)
    return '<section class="panel review-round" aria-labelledby="reviewTitle"><h2 class="panel-title" id="reviewTitle">Wiederholungsrunde</h2><p class="muted">Sobald du eine Einheit abgeschlossen hast, kannst du hier ihre Verständnisfrage wiederholen.</p></section>';
  return `<section class="panel review-round" aria-labelledby="reviewTitle"><h2 class="panel-title" id="reviewTitle">Wiederholungsrunde</h2><p class="muted">${questions.length} ${questions.length === 1 ? "Frage" : "Fragen"} aus abgeschlossenen Einheiten. Die Runde zählt nicht für Punkte; neu laden mischt neue Fragen.</p><ol class="review-list">${questions
    .map(
      (l, q) =>
        `<li data-review="${l.id}"><p id="reviewQ${q}"><span class="muted">Einheit ${l.id.slice(1).padStart(2, "0")}:</span> ${esc(l.question)}</p><div class="quiz-options" role="group" aria-labelledby="reviewQ${q}">${l.options
          .map((o, i) => `<button type="button" class="button secondary quiz-option" data-review-answer="${i}" aria-pressed="false">${esc(o)}</button>`)
          .join("")}</div><p class="review-result" role="status" aria-atomic="true"></p></li>`,
    )
    .join("")}</ol><p id="reviewScore" class="review-score" role="status"></p></section>`;
}

export function bindReview(root = document) {
  const items = [...root.querySelectorAll("[data-review]")];
  if (!items.length) return;
  const firstTry = new Map();
  items.forEach((item) => {
    const lesson = lessons.find((l) => l.id === item.dataset.review);
    item.querySelectorAll("[data-review-answer]").forEach((button) => {
      button.onclick = () => {
        const answer = Number(button.dataset.reviewAnswer),
          ok = answer === lesson.answer;
        if (!firstTry.has(lesson.id)) firstTry.set(lesson.id, ok);
        item.querySelectorAll("[data-review-answer]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        const result = item.querySelector(".review-result");
        result.className = `review-result ${ok ? "pass" : "fail"}`;
        result.textContent = `${ok ? "✓ " : "Noch nicht. "}${guidance[lesson.id].quiz[answer]}`;
        if (firstTry.size === items.length)
          root.querySelector("#reviewScore").textContent = `Beim ersten Versuch richtig: ${[...firstTry.values()].filter(Boolean).length} von ${items.length}.`;
      };
    });
  });
}
