// loader.js
export function initLoader(opts = {}) {
  const el = document.querySelector(opts.selector || ".loader-overlay");
  if (!el) return;
  window.addEventListener("load", () => {
    el.classList.add("loaded");
    setTimeout(() => el.remove(), 600);
  });
}
