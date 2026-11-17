const WIDTH_KEY = "weblab-sidebar-width-v1";
const minWidth = 220;
const maxWidth = 440;

export function bindSidebarDivider() {
  const root = document.documentElement,
    sidebar = document.getElementById("sidebar"),
    divider = document.getElementById("sidebarDivider"),
    compactViewport = matchMedia("(max-width: 1150px)");
  let preferredWidth = null, drag = null;
  try {
    const raw = Number(localStorage.getItem(WIDTH_KEY));
    if (Number.isInteger(raw) && raw >= minWidth && raw <= maxWidth)
      preferredWidth = raw;
  } catch {}

  const limit = () => Math.max(minWidth, Math.min(maxWidth, innerWidth - 540));
  const clampWidth = (width) => Math.max(minWidth, Math.min(limit(), Math.round(width)));
  const defaultWidth = () => compactViewport.matches ? 235 : 292;
  function apply() {
    if (preferredWidth === null) root.style.removeProperty("--sidebar-width");
    else root.style.setProperty("--sidebar-width", preferredWidth + "px");
    divider.setAttribute("aria-valuemax", String(limit()));
    divider.setAttribute("aria-valuenow", String(clampWidth(preferredWidth ?? defaultWidth())));
  }
  function remember() {
    try {
      if (preferredWidth === null) localStorage.removeItem(WIDTH_KEY);
      else localStorage.setItem(WIDTH_KEY, String(preferredWidth));
    } catch {}
  }
  function reset() {
    preferredWidth = null;
    apply();
    remember();
  }
  apply();
  window.addEventListener("resize", apply);
  divider.addEventListener("dblclick", reset);
  divider.addEventListener("keydown", (event) => {
    const current = sidebar.getBoundingClientRect().width;
    const step = event.shiftKey ? 40 : 10;
    const widths = {
      ArrowLeft: current - step, ArrowRight: current + step,
      Home: minWidth, End: limit(),
    };
    if (event.key !== "Enter" && !Object.hasOwn(widths, event.key)) return;
    event.preventDefault();
    if (event.key === "Enter") reset();
    else {
      preferredWidth = clampWidth(widths[event.key]);
      apply();
      remember();
    }
  });
  divider.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || drag) return;
    divider.setPointerCapture(event.pointerId);
    drag = {
      id: event.pointerId, x: event.clientX,
      initialWidth: sidebar.getBoundingClientRect().width,
      previous: preferredWidth, moved: false,
    };
    root.dataset.sidebarDragging = "";
    divider.focus({ preventScroll: true });
    event.preventDefault();
  });
  divider.addEventListener("pointermove", (event) => {
    if (event.pointerId !== drag?.id || (!drag.moved && event.clientX === drag.x)) return;
    drag.moved = true;
    preferredWidth = clampWidth(drag.initialWidth + event.clientX - drag.x);
    apply();
  });
  function finish(event) {
    if (event.pointerId !== drag?.id) return;
    if (event.type === "pointercancel") {
      preferredWidth = drag.previous;
      apply();
    } else if (drag.moved) remember();
    drag = null;
    delete root.dataset.sidebarDragging;
  }
  divider.addEventListener("pointerup", finish);
  divider.addEventListener("pointercancel", finish);
  divider.addEventListener("lostpointercapture", finish);
}
