(function () {
  var path = location.pathname;
  var match = path.match(/^\/(fr|ro|dk)(?=\/|$)/);

  function showMissing() {
    document.title = "Page not found | Octavia Sirbu";
    document.body.innerHTML =
      '<main style="font-family:Georgia,serif;padding:4rem 1.5rem;max-width:40rem;margin:auto;color:#252229">' +
      "<h1>Page not found</h1>" +
      '<p><a href="/" style="color:#BC6B46">Back to home</a></p>' +
      "</main>";
  }

  if (!match) {
    showMissing();
    return;
  }

  var rest = path.slice(match[0].length) || "/";
  if (rest === "/" || rest === "") rest = "/index.html";
  else if (rest.charAt(rest.length - 1) === "/") rest += "index.html";
  if (location.hostname === "studio.octaviasirbu.com" && rest === "/index.html") {
    rest = "/studio.html";
  }

  fetch(rest, { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) throw new Error("missing");
      return response.text();
    })
    .then(function (html) {
      if (!/<base\s/i.test(html)) {
        html = html.replace(/<head([^>]*)>/i, '<head$1><base href="/">');
      }
      document.open();
      document.write(html);
      document.close();
    })
    .catch(showMissing);
})();
