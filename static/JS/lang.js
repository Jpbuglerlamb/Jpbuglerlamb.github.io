{
  const toggle = document.querySelector(".lang-toggle");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const KEY = "langScroll";

  // ---- On page load: if we just switched language, go back to the same spot ----
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(KEY));
    sessionStorage.removeItem(KEY);          // use it once only
  } catch (e) {}

  if (saved) {
    const anchor = saved.id ? document.getElementById(saved.id) : null;
    const anchorTop = anchor ? anchor.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo(0, anchorTop + saved.offset);
  }

  // ---- Before leaving: remember which section we're in, and how far into it ----
  function savePosition() {
    let current = null;
    document.querySelectorAll("section[id], footer[id]").forEach(section => {
      if (section.getBoundingClientRect().top <= 100) current = section;
    });

    const position = current
      ? { id: current.id, offset: -current.getBoundingClientRect().top }
      : { id: null, offset: window.scrollY };   // still in the hero

    try { sessionStorage.setItem(KEY, JSON.stringify(position)); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener("click", (event) => {
      // Cmd/Ctrl/Shift-click opens a new tab as normal: nothing to restore there
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

      savePosition();
      if (reduceMotion) return;              // go straight away, no slide

      event.preventDefault();                // don't leave the page yet
      toggle.classList.toggle("is-fr");      // knob slides (CSS transition)
      setTimeout(() => {
        window.location.href = toggle.href;  // now go to the other language
      }, 300);
    });

    // Pressing Back can restore this page from the browser's cache with the
    // knob still on the wrong side, so reset it to match the page's language
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        toggle.classList.toggle("is-fr", document.documentElement.lang === "fr");
      }
    });
  }
}