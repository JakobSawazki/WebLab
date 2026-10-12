// Shared inline SVGs also work offline and with a direct file:// start.
const paths = {
  home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
  path: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h8"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  book: '<path d="M12 5v16M3 3c4 0 7 0 9 2 2-2 5-2 9-2v16c-4 0-7 0-9 2-2-2-5-2-9-2Z"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/>',
  note: '<path d="M14 3H4v18h16V9Z M14 3v6h6M8 13h8m-8 4h5"/>',
  theme:
    '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/>',
  save: '<path d="M5 3h12l4 4v14H3V3Zm2 0v6h10V3M7 21v-8h10v8"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5"/>',
  refresh:
    '<path d="M20 7v5h-5M4 17v-5h5M6 6a8 8 0 0 1 14 6M4 12a8 8 0 0 0 14 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  image:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 5-5 4 4 4-7 5 8"/>',
  browser:
    '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="M2 8h20M6 5.5h.01m3 0h.01"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
};
export function icon(name) {
  if (!paths[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
export function decorateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
  const actions = {
    themeButton: "theme",
    backupButton: "save",
    runButton: "refresh",
    checkButton: "check",
    imageButton: "image",
    resetButton: "refresh",
    largePreviewButton: "browser",
    closeLargePreview: "code",
    htmlExport: "download",
    cssExport: "download",
    zipExport: "download",
    codeImportButton: "upload",
    exportButton: "download",
    lessonBackup: "save",
    completeButton: "check",
    takePrevious: "upload",
    csvExport: "download",
    confirmImport: "upload",
  };
  root.querySelectorAll(".button, .icon-button").forEach((node) => {
    if (
      node.querySelector("svg") ||
      node.classList.contains("profile-trigger") ||
      node.classList.contains("quiz-option")
    )
      return;
    const name = node.hasAttribute("data-close")
      ? "close"
      : actions[node.id] ||
        (node.tagName === "A"
          ? node.getAttribute("href") === "#lab"
            ? "code"
            : "arrow"
          : node.type === "submit"
            ? "save"
            : null);
    if (!name) return;
    if (node.classList.contains("icon-button")) node.textContent = "";
    node.insertAdjacentHTML("afterbegin", icon(name));
  });
}
