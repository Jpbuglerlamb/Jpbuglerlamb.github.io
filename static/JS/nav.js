{
  const links = document.querySelectorAll(".site-header nav a");
  const sections = [...links].map(link => document.querySelector(link.getAttribute("href")));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      links.forEach(link => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, {
    rootMargin: "-40% 0px -55% 0px",
  });

  sections.forEach(section => observer.observe(section));
}
{
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");

  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
    // labels come from data-label-open / data-label-close, so they're translated
    toggle.setAttribute("aria-label", open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
  }

  // Tap the button: open if closed, close if open
  toggle.addEventListener("click", () => {
    setMenu(!header.classList.contains("menu-open"));
  });

  // Tap a link: close the menu (the page still scrolls to the section)
  header.querySelectorAll(".site-nav a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Escape key closes it too
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMenu(false);
  });
}