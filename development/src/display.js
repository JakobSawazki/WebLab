const DISPLAY_KEY = "weblab-display-v1";
const THEME_KEY = "weblab-theme-v1";
const defaults = { size: "100", ink: "default", surface: "default" };

export function bindDisplayOptions(doc = document) {
  const root = doc.documentElement,
    get = (id) => doc.getElementById(id),
    fields = {
      size: get("displaySize"),
      ink: get("displayInk"),
      surface: get("displaySurface"),
    },
    status = get("displayStatus");
  let settings = { ...defaults };
  try {
    const stored = JSON.parse(localStorage.getItem(DISPLAY_KEY) || "null");
    for (const [key, field] of Object.entries(fields)) {
      if ([...field.options].some((option) => option.value === stored?.[key]))
        settings[key] = stored[key];
    }
  } catch {}
  try {
    root.dataset.theme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {}

  function apply() {
    root.dataset.fontSize = settings.size;
    root.dataset.ink = settings.ink;
    root.dataset.surface = settings.surface;
    for (const [key, field] of Object.entries(fields)) field.value = settings[key];
  }
  apply();

  get("optionsButton").onclick = () => get("optionsDialog").showModal();
  for (const [key, field] of Object.entries(fields)) {
    field.onchange = () => {
      if (!field.value) return;
      settings[key] = field.value;
      apply();
      try {
        localStorage.setItem(DISPLAY_KEY, JSON.stringify(settings));
        status.textContent = "";
      } catch {
        status.textContent = "Die Darstellung ist geändert, konnte aber nicht gespeichert werden.";
      }
    };
  }
  get("themeButton").onclick = () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  };
  get("resetDisplay").onclick = () => {
    settings = { ...defaults };
    root.dataset.theme = "dark";
    apply();
    try {
      localStorage.removeItem(DISPLAY_KEY);
      localStorage.removeItem(THEME_KEY);
      status.textContent = "Standarddarstellung wiederhergestellt.";
    } catch {
      status.textContent = "Die Standarddarstellung ist aktiv, konnte aber nicht gespeichert werden.";
    }
  };
}
