const themeToggle = document.querySelector("#themeToggle");
const copyEmailCard = document.querySelector("#copyEmailCard");
const copyFeedback = document.querySelector("#copyFeedback");
const emailValue = document.querySelector("#emailValue");
const serviceTabs = document.querySelectorAll(".service-tab");
const servicePanelTitle = document.querySelector("#servicePanelTitle");
const servicePanelDescription = document.querySelector("#servicePanelDescription");
const servicePanelProject = document.querySelector("#servicePanelProject");
const servicePanelProjectTitle = document.querySelector("#servicePanelProjectTitle");
const servicePanelProjectDesc = document.querySelector("#servicePanelProjectDesc");
const servicePanelThumb = document.querySelector("#servicePanelThumb");
const servicePanelLabels = document.querySelector("#servicePanelLabels");

const serviceProjectMap = {
  "ai-design": {
    title: "AI-powered Design System for Nabogo ApS",
    desc: "Tokens, components, and Storybook documentation for a consistent product surface across teams.",
    thumbClass: "thumb-nabogo-designsystem",
    href: "nbg-designsystem.html",
    labels: ["Design System", "Storybook"],
  },
  "ui-ai": {
    title: "Desining a Website and Webshop for EdTech startup Rotoy ApS",
    desc: "Marketing site and webshop experience with clear storytelling and a purchase flow parents can trust.",
    thumbClass: "thumb-rotoy",
    href: "rotoy-project.html",
    labels: ["EdTech", "Webshop"],
  },
  "ux-metrics": {
    title: "Leading Product UX for a SaaS Platform Nabogo ApS",
    desc: "End-to-end product design for a carpooling platform focused on sustainable mobility.",
    thumbClass: "thumb-airwallet-checkout",
    href: "nbg-project.html",
    labels: ["UX Prototype", "Mobile Payments"],
  },
  pm: {
    title: "Airwallet Operator Insights",
    desc: "Dashboard concept with washer and dryer usage-over-time charts and device filters.",
    thumbClass: "thumb-four",
    href: "airwallet-operator-insights.html",
    labels: ["Dashboard", "Analytics"],
  },
  branding: {
    title: "Leading Product UX for a SaaS Platform Nabogo ApS",
    desc: "UX strategy, research, and scalable UI for intuitive experiences aligned with business goals.",
    thumbClass: "thumb-airwallet-checkout",
    href: "nbg-project.html",
    labels: ["UX Prototype", "Mobile Payments"],
  },
};

if (themeToggle) {
  const syncThemeToggle = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  };

  syncThemeToggle();

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.setItem("portfolio-theme", "light");
      } catch (e) {
        /* ignore */
      }
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("portfolio-theme", "dark");
      } catch (e) {
        /* ignore */
      }
    }
    syncThemeToggle();
  });
}

if (copyEmailCard && copyFeedback && emailValue) {
  const emailText = emailValue.textContent.trim();

  const writeClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helperInput = document.createElement("textarea");
    helperInput.value = text;
    helperInput.setAttribute("readonly", "");
    helperInput.style.position = "absolute";
    helperInput.style.left = "-9999px";
    document.body.appendChild(helperInput);
    helperInput.select();
    document.execCommand("copy");
    helperInput.remove();
  };

  copyEmailCard.addEventListener("click", async () => {
    try {
      await writeClipboard(emailText);
      copyFeedback.textContent = "Email copied to clipboard.";
    } catch (error) {
      copyFeedback.textContent = "Could not copy email. Please copy it manually.";
    }
  });
}

if (
  serviceTabs.length &&
  servicePanelTitle &&
  servicePanelDescription &&
  servicePanelProject &&
  servicePanelProjectTitle &&
  servicePanelProjectDesc &&
  servicePanelThumb
) {
  const thumbClasses = Object.values(serviceProjectMap).map((project) => project.thumbClass);

  const servicePanelContent = document.querySelector("#servicePanelContent");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const usePanelFade = document.body.classList.contains("page-home") && servicePanelContent && !reduceMotion;

  const updateServicePanel = (tab) => {
    const title = tab.dataset.title || "Service";
    const description = tab.dataset.description || "";
    const serviceId = tab.dataset.serviceId || "";
    const project = serviceProjectMap[serviceId];

    servicePanelTitle.textContent = title;
    servicePanelDescription.textContent = description;

    if (project) {
      servicePanelProjectTitle.textContent = project.title;
      servicePanelProjectDesc.textContent = project.desc;
      servicePanelThumb.classList.remove(...thumbClasses);
      servicePanelThumb.classList.add(project.thumbClass);
      servicePanelProject.href = project.href || "work.html";

      if (servicePanelLabels && project.labels) {
        const labelSpans = servicePanelLabels.querySelectorAll("span");
        project.labels.forEach((label, index) => {
          if (labelSpans[index]) labelSpans[index].textContent = label;
        });
      }
    }
  };

  const applyServiceTab = (tab) => {
    serviceTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    if (!usePanelFade) {
      updateServicePanel(tab);
      return;
    }

    servicePanelContent.classList.add("is-switching");
    window.setTimeout(() => {
      updateServicePanel(tab);
      servicePanelContent.classList.remove("is-switching");
    }, 160);
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => applyServiceTab(tab));
  });

  const initial = document.querySelector(".service-tab.active");
  if (initial) {
    applyServiceTab(initial);
  }
}

document.querySelectorAll("[data-more-projects]").forEach((root) => {
  const track = root.querySelector(".more-projects__track");
  const prev = root.querySelector("[data-scroll-prev]");
  const next = root.querySelector("[data-scroll-next]");
  if (!track || !prev || !next) return;

  const step = () => Math.max(260, Math.min(420, track.clientWidth * 0.45));

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
});

/* Home page: scroll reveal, hero entrance, header shadow */
(function initHomePage() {
  if (!document.body.classList.contains("page-home")) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll("[data-reveal]");
  const header = document.querySelector(".site-header");

  const revealNow = (el, delayMs = 0) => {
    window.setTimeout(() => {
      el.classList.add("is-revealed");
    }, delayMs);
  };

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const heroEls = document.querySelectorAll("[data-reveal-hero]");
  heroEls.forEach((el, index) => {
    el.style.setProperty("--reveal-delay", `${index * 65}ms`);
    revealNow(el, 80 + index * 65);
  });

  const staggerIndex = (el) => {
    const group = el.parentElement;
    if (!group) return 0;
    const siblings = group.querySelectorAll("[data-reveal-stagger]");
    return Math.max(0, Array.from(siblings).indexOf(el));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.hasAttribute("data-reveal-stagger")) {
          el.style.setProperty("--reveal-delay", `${staggerIndex(el) * 85}ms`);
        }
        el.classList.add("is-revealed");
        observer.unobserve(el);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -48px 0px" }
  );

  revealEls.forEach((el) => {
    if (el.hasAttribute("data-reveal-hero")) return;
    observer.observe(el);
  });

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();

/* Back-to-top control (all pages; icon path differs under /blogs/) */
(function initBackToTop() {
  const iconSrc = document.location.pathname.includes("/blogs/")
    ? "../assets/icons/arrow-up-02.svg"
    : "assets/icons/arrow-up-02.svg";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");

  const img = document.createElement("img");
  img.src = iconSrc;
  img.alt = "";
  img.width = 24;
  img.height = 24;
  img.decoding = "async";
  btn.appendChild(img);

  document.body.appendChild(btn);

  const toggleVisible = () => {
    if (window.scrollY > 320) {
      btn.classList.add("back-to-top--visible");
    } else {
      btn.classList.remove("back-to-top--visible");
    }
  };

  window.addEventListener("scroll", toggleVisible, { passive: true });
  toggleVisible();

  btn.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    btn.blur();
  });
})();
