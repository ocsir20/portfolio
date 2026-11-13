(function () {
  var PREFIX_TO_LANG = { fr: "fr", ro: "ro", dk: "da" };
  var LANG_TO_PREFIX = { en: "", fr: "fr", da: "dk", ro: "ro" };

  function stripLangPrefix(pathname) {
    var path = pathname || "/";
    path = path.replace(/^\/(fr|ro|dk)(?=\/|$)/, "");
    if (!path) path = "/";
    return path;
  }

  function langFromPath(pathname) {
    var match = String(pathname || "").match(/^\/(fr|ro|dk)(?=\/|$)/);
    if (!match) return "en";
    return PREFIX_TO_LANG[match[1]] || "en";
  }

  function withLangPrefix(lang, pathname, search, hash) {
    var path = stripLangPrefix(pathname || "/");
    if (path === "/index.html") path = "/";
    var prefix = LANG_TO_PREFIX[lang] || "";
    var out;
    if (!prefix) {
      out = path === "/" ? "/" : path;
    } else if (path === "/") {
      out = "/" + prefix + "/";
    } else {
      out = "/" + prefix + path;
    }
    return out + (search || "") + (hash || "");
  }

  window.portfolioLangPath = {
    stripLangPrefix: stripLangPrefix,
    langFromPath: langFromPath,
    withLangPrefix: withLangPrefix
  };

  var lang = "en";
  try {
    lang = langFromPath(location.pathname);
    localStorage.setItem("portfolio-lang", lang);
    if (location.hostname === "studio.octaviasirbu.com") {
      var studioPath = stripLangPrefix(location.pathname);
      if (studioPath === "/" || studioPath === "/index.html") {
        location.replace(withLangPrefix(lang, "/studio.html", location.search, location.hash));
      }
    }
  } catch (e) {
    lang = "en";
  }
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("data-lang", lang);
})();
