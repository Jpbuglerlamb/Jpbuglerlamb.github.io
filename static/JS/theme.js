{
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");

  function updateSwitch() {
    button.setAttribute("aria-checked", root.dataset.theme === "dark");
  }

  button.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    updateSwitch();
  });

  updateSwitch();
}