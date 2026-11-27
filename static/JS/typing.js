{
  // The sentence comes from translations.py, via data-parts in index.html
  const intro = document.querySelector(".intro-text");
  const parts = JSON.parse(intro.dataset.parts);

  const target = document.getElementById("typed");
  const ghost = document.getElementById("typed-ghost");
  const speed = 60;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Invisible copy of the full sentence (plus cursor) to reserve the space
  ghost.textContent = parts.map(part => part.text).join("") + "_";

  const spans = parts.map(part => {
    const span = document.createElement("span");
    if (part.highlight) span.className = "highlight";
    target.appendChild(span);
    return span;
  });

  if (reduceMotion) {
    parts.forEach((part, i) => {
      spans[i].textContent = part.text;
    });
  } else {
    let partIndex = 0;
    let charIndex = 0;

    function typeNext() {
      if (partIndex >= parts.length) return;

      const part = parts[partIndex];
      spans[partIndex].textContent += part.text[charIndex];
      charIndex++;

      if (charIndex === part.text.length) {
        partIndex++;
        charIndex = 0;
      }

      setTimeout(typeNext, speed);
    }

    typeNext();
  }
}