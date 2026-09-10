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
    title: "Coded my portfolio with AI assistance",
    desc: "Building a case-study portfolio in HTML with Cursor. Structure, craft, and what stayed human-led.",
    thumbClass: "thumb-portfolio",
    href: "blogs/portfolio-ai-coded.html",
  },
  "ui-ai": {
    title: "AI-powered Design System for Nabogo ApS",
    desc: "Tokens, components, and Storybook documentation for a consistent product surface across teams.",
    thumbClass: "thumb-nabogo-designsystem",
    href: "nbg-designsystem.html",
  },
  "ux-metrics": {
    title: "Designing Onboardings that convert - Nabogo ApS",
    desc: "UX strategy and onboarding flow improvements to help new carpoolers start faster.",
    thumbClass: "thumb-nabogo-onboarding",
    href: "nbg-onboarding.html",
  },
  pm: {
    title: "University Intranet Re-design based on UX Insights",
    desc: "Research-led intranet redesign for a large university. Clearer structure, navigation, and interfaces shaped by staff and student needs.",
    thumbClass: "thumb-sdu",
    href: "sdu-intranet-project.html",
  },
  branding: {
    title: "Designing a Website and Webshop for EdTech Startup Rotoy ApS",
    desc: "Marketing site and webshop experience for an EdTech startup. Clear storytelling, product discovery, and a purchase flow parents can trust.",
    thumbClass: "thumb-rotoy",
    href: "rotoy-project.html",
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

document.querySelectorAll("[data-testimonials-carousel]").forEach((root) => {
  const track = root.querySelector(".testimonials-carousel__track");
  const prev = root.querySelector("[data-testimonials-prev]");
  const next = root.querySelector("[data-testimonials-next]");
  const slides = track ? [...track.querySelectorAll(".testimonials-carousel__slide")] : [];
  if (!track || !prev || !next || slides.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;

  const getVisibleCount = () => {
    if (window.matchMedia("(max-width: 640px)").matches) return 1;
    if (window.matchMedia("(max-width: 1024px)").matches) return 2;
    return 3;
  };

  const viewport = root.querySelector(".testimonials-carousel__viewport");

  const layoutSlides = () => {
    if (!viewport) return { step: 0, maxIndex: 0 };
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    const visible = getVisibleCount();
    const slideWidth = (viewport.clientWidth - gap * (visible - 1)) / visible;
    slides.forEach((slide) => {
      slide.style.flexBasis = `${slideWidth}px`;
    });
    const step = slideWidth + gap;
    const maxIndex = Math.max(0, slides.length - visible);
    return { step, maxIndex };
  };

  const update = () => {
    const { step, maxIndex } = layoutSlides();
    index = Math.min(index, maxIndex);
    track.style.transform = `translateX(-${index * step}px)`;
    prev.disabled = index <= 0;
    next.disabled = index >= maxIndex;
  };

  prev.addEventListener("click", () => {
    if (index > 0) {
      index -= 1;
      update();
    }
  });

  next.addEventListener("click", () => {
    const { maxIndex } = layoutSlides();
    if (index < maxIndex) {
      index += 1;
      update();
    }
  });

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(update);
  });

  if (reduceMotion) {
    track.style.transition = "none";
  }

  update();
});

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
  const heroPortrait = document.querySelector(
    ".home-stack > .stack-card.hero .hero-visual--portrait"
  );

  /* Grey → orange + stats: on hover (CSS) or the moment scroll starts
     (next stack card begins moving up toward the sticky hero). */
  const updateHeroLit = () => {
    if (!heroPortrait) return;
    if (reduceMotion) {
      heroPortrait.classList.add("is-lit");
      return;
    }
    heroPortrait.classList.toggle("is-lit", window.scrollY > 2);
  };

  let litRaf = 0;
  const onScrollOrResize = () => {
    if (litRaf) return;
    litRaf = window.requestAnimationFrame(() => {
      litRaf = 0;
      updateHeroLit();
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      }
    });
  };

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  updateHeroLit();
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

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

/* CV sticky cards: story progression bars. Fill one segment per stacked card */
(function initCvStories() {
  if (!document.body.classList.contains("page-cv")) return;

  const stack = document.querySelector(".cv-stack");
  if (!stack) return;

  const cards = Array.from(stack.children).filter((el) => el.classList.contains("cv-card"));
  if (cards.length < 2) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storyNavs = cards.map((card) => card.querySelector(".cv-card__stories")).filter(Boolean);
  if (!storyNavs.length) return;

  const labelFor = (card, index) => {
    const heading = card.querySelector("h1, h2");
    const name = heading ? heading.textContent.trim() : `Section ${index + 1}`;
    return `Go to ${name}`;
  };

  storyNavs.forEach((nav) => {
    const segs = Array.from(nav.querySelectorAll(".cv-card__stories-seg"));
    segs.forEach((btn, segIndex) => {
      btn.setAttribute("aria-label", labelFor(cards[segIndex], segIndex));
      btn.addEventListener("click", () => {
        const target = cards[segIndex];
        if (!target) return;
        const stickyTop = parseFloat(getComputedStyle(target).top) || 0;
        const y = window.scrollY + target.getBoundingClientRect().top - stickyTop - 4;
        window.scrollTo({
          top: Math.max(0, y),
          behavior: reduceMotion.matches ? "auto" : "smooth",
        });
      });
    });
  });

  const update = () => {
    const n = cards.length;
    const stickyMode = getComputedStyle(cards[0]).position === "sticky";
    let active = 0;

    if (stickyMode) {
      for (let i = 0; i < n; i += 1) {
        const card = cards[i];
        const stickyTop = parseFloat(getComputedStyle(card).top) || 0;
        const rect = card.getBoundingClientRect();
        if (rect.top <= stickyTop + 4) active = i;
      }
    } else {
      const header = document.querySelector(".site-header");
      const headerH = header ? header.offsetHeight : 0;
      const mid = headerH + window.innerHeight * 0.28;
      for (let i = 0; i < n; i += 1) {
        if (cards[i].getBoundingClientRect().top <= mid) active = i;
      }
      if (stack.getBoundingClientRect().bottom <= window.innerHeight - 8) active = n - 1;
    }

    active = Math.max(0, Math.min(n - 1, active));

    cards.forEach((card, i) => {
      card.classList.toggle("is-front", i === active);
    });

    storyNavs.forEach((nav, cardIndex) => {
      const segs = nav.querySelectorAll(".cv-card__stories-seg");
      segs.forEach((seg, i) => {
        const fill = seg.querySelector(".cv-card__stories-fill");
        if (fill) fill.style.setProperty("--fill", i <= active ? "1" : "0");
        seg.classList.toggle("is-complete", i <= active);
        if (i === active) seg.setAttribute("aria-current", "step");
        else seg.removeAttribute("aria-current");
        seg.tabIndex = cardIndex === active ? 0 : -1;
      });
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
