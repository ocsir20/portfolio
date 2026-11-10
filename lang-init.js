(function () {
  try {
    var stored = localStorage.getItem("portfolio-lang");
    var lang;
    if (stored === "fr" || stored === "en") {
      lang = stored;
    } else {
      lang = String(navigator.language || "").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
    }
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
  } catch (e) {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("data-lang", "en");
  }
})();
