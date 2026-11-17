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