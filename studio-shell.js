(function () {
  var KEY = "portfolio-shell";
  var CASE = /(marina-guranda-project|rotoy-project|makerspace-project)\.html/i;
  var BLOG_INDEX = /(^|\/)blog\.html$/i;
  var PRIVACY = /(^|\/)privacy\.html$/i;
  var path = location.pathname || "";
  var inBlogPost = /\/blogs\//i.test(path);
  var fromParam = false;
  try {
    fromParam = new URLSearchParams(location.search).get("from") === "studio";
  } catch (e) {}
  var body = document.body;
  var isStudio = !!(body && body.classList.contains("page-studio"));
  var isMeeting = !!(body && body.classList.contains("page-meeting"));
  var isCase = CASE.test(path);
  var isBlog = BLOG_INDEX.test(path) || inBlogPost || !!(body && body.classList.contains("page-blog"));
  var isPrivacy = PRIVACY.test(path) || !!(body && body.classList.contains("page-legal"));
  var keepStudio = isCase || isBlog || isPrivacy;
  var isPortfolioHub = !!(
    body &&
    /page-home|page-work|page-cv|page-contact/.test(body.className)
  );

  function setShell(on) {
    try {
      if (on) sessionStorage.setItem(KEY, "studio");
      else sessionStorage.removeItem(KEY);
    } catch (err) {}
  }

  function hasShell() {
    try {
      return sessionStorage.getItem(KEY) === "studio";
    } catch (err) {
      return false;
    }
  }

  if (isStudio || isMeeting || (keepStudio && fromParam)) setShell(true);
  else if (isPortfolioHub) setShell(false);

  if (!keepStudio || (!fromParam && !hasShell())) return;

  var root = inBlogPost ? "../" : "";

  function toLocal(url) {
    var parts = url.pathname.split("/").filter(Boolean);
    var file = parts[parts.length - 1] || "index.html";
    var destInBlogs = parts.indexOf("blogs") !== -1;
    if (inBlogPost && !destInBlogs) return "../" + file + url.search + url.hash;
    if (!inBlogPost && destInBlogs) return "blogs/" + file + url.search + url.hash;
    return file + url.search + url.hash;
  }

  body.classList.add("page-studio-shell");

  var logo = document.querySelector(".site-header .logo");
  if (logo) logo.setAttribute("href", root + "studio.html");

  var links = document.querySelector(".site-header .nav-links");
  if (links) {
    links.innerHTML =
      '<li><a href="' + root + 'studio.html#work" data-i18n="studio.nav.work">Work</a></li>' +
      '<li><a href="' + root + 'studio.html#about" data-i18n="studio.nav.about">About</a></li>' +
      '<li><a href="' + root + 'studio.html#packages" data-i18n="studio.nav.packages">Packages</a></li>' +
      '<li><a href="' + root + 'studio.html#process" data-i18n="studio.nav.process">Process</a></li>' +
      '<li><a class="nav-cta" href="' + root + 'studio.html#book" data-i18n="studio.nav.book">Book a chat</a></li>';
  }

  var tagline = document.querySelector(".site-footer__tagline");
  if (tagline) {
    tagline.setAttribute("data-i18n", "studio.footer.tag");
    tagline.textContent = "Independent designer and developer";
  }

  var footerCopy = document.querySelector(".site-footer__brand p:last-of-type");
  if (footerCopy && !footerCopy.classList.contains("site-footer__tagline")) {
    footerCopy.innerHTML = "© 2026 Octavia Sirbu";
  }

  var footerList = document.querySelector(".site-footer__list");
  if (footerList) {
    footerList.innerHTML =
      '<li><a href="' + root + 'blog.html?from=studio" data-i18n="nav.blog">Blog</a></li>' +
      '<li><a href="' + root + 'privacy.html?from=studio" data-i18n="nav.privacy">Privacy</a></li>';
    var footerSocial = document.querySelector(".site-footer__social");
    if (footerSocial) footerSocial.remove();
  }

  var ctaBtn = document.querySelector(".project-cta .btn");
  if (ctaBtn) ctaBtn.setAttribute("href", root + "studio.html#book");

  if (isCase) {
    document.querySelectorAll(".more-project-card").forEach(function (card) {
      var href = card.getAttribute("href") || "";
      var url;
      try {
        url = new URL(href, location.href);
      } catch (err) {
        return;
      }
      if (!CASE.test(url.pathname)) card.remove();
    });
  }

  document.querySelectorAll("a[href]").forEach(function (anchor) {
    var raw = anchor.getAttribute("href");
    if (!raw || raw.charAt(0) === "#") return;
    var url;
    try {
      url = new URL(raw, location.href);
    } catch (err) {
      return;
    }
    var stampCase = CASE.test(url.pathname);
    var stampBlog = BLOG_INDEX.test(url.pathname) || /\/blogs\//i.test(url.pathname);
    var stampPrivacy = PRIVACY.test(url.pathname);
    if (!stampCase && !stampBlog && !stampPrivacy) return;
    url.searchParams.set("from", "studio");
    anchor.setAttribute("href", toLocal(url));
  });
})();
