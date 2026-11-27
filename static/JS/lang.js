{
  const toggle = document.querySelector(".lang-toggle");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (toggle && !reduceMotion) {
    toggle.addEventListener("click", (event) => {
      // Cmd/Ctrl/Shift-click should still open a new tab or window as normal
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

      event.preventDefault();             // don't leave the page yet
      toggle.classList.toggle("is-fr");   // knob slides (CSS transition)

      setTimeout(() => {
        window.location.href = toggle.href;   // now go to the other language
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