{
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    const sections = document.querySelectorAll("main section:not(.hero)");

    sections.forEach(section => {
      [...section.children].forEach((child, i) => {
        child.classList.add("reveal");
        child.style.setProperty("--delay", `${i * 80}ms`);
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else if (entry.boundingClientRect.top > 0) {
          // It left through the BOTTOM of the screen (you scrolled up): hide it
          el.classList.remove("is-visible");
        }
        // If it left through the TOP (you scrolled past it), leave it visible
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }
}