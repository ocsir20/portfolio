(function () {
  try {
    localStorage.removeItem("portfolio-theme");
  } catch (e) {}
  document.documentElement.removeAttribute("data-theme");
})();
