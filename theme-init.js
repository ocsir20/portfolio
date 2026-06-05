(function () {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var theme =
      stored === "light" || stored === "dark" ? stored : "light";
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch (e) {
    document.documentElement.removeAttribute("data-theme");
  }
})();
