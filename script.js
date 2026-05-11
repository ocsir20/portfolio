const themeToggle = document.querySelector("#themeToggle");
const copyEmailCard = document.querySelector("#copyEmailCard");
const copyFeedback = document.querySelector("#copyFeedback");
const emailValue = document.querySelector("#emailValue");
const serviceTabs = document.querySelectorAll(".service-tab");
const serviceModal = document.querySelector("#serviceModal");
const serviceModalClose = document.querySelector("#serviceModalClose");
const serviceModalTitle = document.querySelector("#serviceModalTitle");
const serviceModalDescription = document.querySelector("#serviceModalDescription");
const serviceModalProject = document.querySelector("#serviceModalProject");
const serviceModalProjectTitle = document.querySelector("#serviceModalProjectTitle");
const serviceModalProjectDesc = document.querySelector("#serviceModalProjectDesc");
const serviceModalThumb = document.querySelector("#serviceModalThumb");

const serviceProjectMap = {
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
  serviceModal &&
  serviceModalClose &&
  serviceModalTitle &&
  serviceModalDescription &&
  serviceModalProject &&
  serviceModalProjectTitle &&
  serviceModalProjectDesc &&
  serviceModalThumb
) {
  const thumbClasses = Object.values(serviceProjectMap).map(
    (project) => project.thumbClass
  );

  const openServiceModal = (tab) => {
    serviceTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const title = tab.dataset.title || "Service";
    const description = tab.dataset.description || "";
    const serviceId = tab.dataset.serviceId || "";
    const project = serviceProjectMap[serviceId];

    serviceModalTitle.textContent = title;
    serviceModalDescription.textContent = description;

    if (project) {
      serviceModalProjectTitle.textContent = project.title;
      serviceModalProjectDesc.textContent = project.desc;
      serviceModalThumb.classList.remove(...thumbClasses);
      serviceModalThumb.classList.add(project.thumbClass);
      serviceModalProject.href = "work.html";
    }

    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");
  };

  const closeServiceModal = () => {
    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => openServiceModal(tab));
  });

  serviceModalClose.addEventListener("click", closeServiceModal);

  serviceModal.addEventListener("click", (event) => {
    if (event.target === serviceModal) {
      closeServiceModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && serviceModal.classList.contains("open")) {
      closeServiceModal();
    }
  });
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
