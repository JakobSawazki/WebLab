// A separate teaching model; it never reads or writes student drafts.
export function boxDimensions(padding, border, margin, borderBox) {
  const content = borderBox ? 120 - 2 * padding - 2 * border : 120;
  const element = content + 2 * padding + 2 * border;
  return { content, element, space: element + 2 * margin };
}

export function boxModelView() {
  return `<details class="box-model-helper"><summary>Box-Modell ausprobieren: Wo entsteht der Abstand?</summary>
    <p>Verändere immer nur einen Wert und beobachte die farbigen Bereiche. Die Beispielkarte hat <code>width: 120px</code>. Alle Abstände sind auf beiden Seiten gleich.</p>
    <div class="box-model-controls">
      <label for="boxPadding">Innenabstand · padding <output id="boxPaddingValue" for="boxPadding">16 px</output></label>
      <input type="range" id="boxPadding" min="0" max="24" value="16" step="1">
      <label for="boxBorder">Rahmen · border <output id="boxBorderValue" for="boxBorder">4 px</output></label>
      <input type="range" id="boxBorder" min="0" max="8" value="4" step="1">
      <label for="boxMargin">Außenabstand · margin <output id="boxMarginValue" for="boxMargin">12 px</output></label>
      <input type="range" id="boxMargin" min="0" max="24" value="12" step="1">
      <label class="check-row"><input type="checkbox" id="boxSizing"><span>box-sizing: border-box verwenden</span></label>
    </div>
    <div class="box-model-stage" aria-hidden="true"><div class="box-demo-margin"><div class="box-demo-border"><div class="box-demo-content">Inhalt</div></div></div></div>
    <ul class="box-model-legend"><li><span class="box-key content"></span>Blau: Inhalt</li><li><span class="box-key padding"></span>Grün: Innenabstand</li><li><span class="box-key border"></span>Silber: Rahmen</li><li><span class="box-key margin"></span>Orange: Außenabstand</li></ul>
    <p id="boxDimensions" role="status" aria-atomic="true"></p>
    <pre><code id="boxModelCode"></code></pre>
    <p class="muted">Bei content-box bezieht sich width auf den Inhalt. Bei border-box sind Innenabstand und Rahmen in width enthalten. Außenabstand kommt in beiden Fällen dazu. Vergleiche hier die waagerechten Breiten; das Zusammenfallen senkrechter Außenabstände wird nicht gezeigt.</p>
    <p><strong>Dein Versuch:</strong> Stelle margin auf 0 und vergrößere padding. Was verändert sich innerhalb des Rahmens? Aktiviere danach border-box. Erkläre, weshalb der Inhalt schmaler wird.</p>
  </details>`;
}

export function bindBoxModel(root = document) {
  if (!root.querySelector("#boxPadding")) return;
  const get = (id) => root.querySelector("#" + id);
  const update = () => {
    const padding = Number(get("boxPadding").value);
    const border = Number(get("boxBorder").value);
    const margin = Number(get("boxMargin").value);
    const borderBox = get("boxSizing").checked;
    const sizing = borderBox ? "border-box" : "content-box";
    for (const [name, value] of [
      ["Padding", padding],
      ["Border", border],
      ["Margin", margin],
    ])
      get("box" + name + "Value").textContent = value + " px";
    const model = root.querySelector(".box-demo-border");
    model.style.padding = padding + "px";
    model.style.borderWidth = border + "px";
    model.style.boxSizing = sizing;
    root.querySelector(".box-demo-margin").style.padding = margin + "px";
    const sizes = boxDimensions(padding, border, margin, borderBox);
    get("boxDimensions").textContent =
      `Inhalt: ${sizes.content} px · Karte mit Innenabstand und Rahmen: ${sizes.element} px · Platz mit Außenabstand links und rechts: ${sizes.space} px.`;
    get("boxModelCode").textContent =
      `.karte {\n  width: 120px;\n  padding: ${padding}px;\n  border: ${border}px solid gray;\n  margin: ${margin}px;\n  box-sizing: ${sizing};\n}`;
  };
  for (const id of ["boxPadding", "boxBorder", "boxMargin", "boxSizing"])
    get(id).addEventListener("input", update);
  update();
}
