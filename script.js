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

const serviceProjectMap = {
  "ai-design": {
    title: "NextMove Travel App",
    desc: "Product flows shaped with rapid exploration, clear hierarchy, and polish for travelers on the go.",
    thumbClass: "thumb-four",
  },
  "ui-ai": {
    title: "FinTrack Mobile Banking",
    desc: "A mobile-first interface redesign focused on clarity and speed.",
    thumbClass: "thumb-one",
  },
  "ux-metrics": {
    title: "HealthHub Patient Portal",
    desc: "User-tested portal flows with measurable improvements in completion.",
    thumbClass: "thumb-two",
  },
  pm: {
    title: "CareSync Dashboard",
    desc: "Cross-team project delivery for a data-heavy product dashboard.",
    thumbClass: "thumb-six",
  },
  branding: {
    title: "Nova eCommerce Redesign",
    desc: "Visual identity refresh paired with a conversion-ready store UI.",
    thumbClass: "thumb-three",
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

  const applyServiceTab = (tab) => {
    serviceTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

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
      servicePanelProject.href = "work.html";
    }
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
