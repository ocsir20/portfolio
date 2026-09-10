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

/* Home + CV stack progress bars, sticky on desktop, Instagram swipe on mobile */
(function initStackStories() {
  const isHome = document.body.classList.contains("page-home");
  const isCv = document.body.classList.contains("page-cv");
  if (!isHome && !isCv) return;

  const stack = document.querySelector(isHome ? ".home-stack" : ".cv-stack");
  if (!stack) return;

  const cardClass = isHome ? "stack-card" : "cv-card";
  const originalCvHtml = isCv ? stack.innerHTML : "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMq = window.matchMedia("(max-width: 820px)");
  const navSelector = isHome ? ".stack-card__stories" : ".cv-card__stories";
  const segSelector = isHome ? ".stack-card__stories-seg" : ".cv-card__stories-seg";
  const fillSelector = isHome ? ".stack-card__stories-fill" : ".cv-card__stories-fill";

  let cards = [];
  let storyNavs = [];

  const labelFor = (card, index) => {
    const heading = card.querySelector("h1, h2");
    const name = heading ? heading.textContent.trim() : `Section ${index + 1}`;
    return `Go to ${name}`;
  };

  const wrapCardBody = (card) => {
    const bodyClass = isHome ? "stack-card__body" : "cv-card__body";
    if (card.querySelector(`:scope > .${bodyClass}`)) return;
    const body = document.createElement("div");
    body.className = bodyClass;
    const keep = card.querySelector(navSelector);
    Array.from(card.childNodes).forEach((node) => {
      if (node !== keep) body.appendChild(node);
    });
    card.appendChild(body);
  };

  const rebuildStoryBars = () => {
    cards.forEach((card) => {
      let nav = card.querySelector(navSelector);
      if (!nav) {
        nav = document.createElement("div");
        nav.className = isHome ? "stack-card__stories" : "cv-card__stories";
        nav.setAttribute("role", "navigation");
        nav.setAttribute("aria-label", isHome ? "Home sections" : "CV sections");
        card.insertBefore(nav, card.firstChild);
      }
      nav.innerHTML = "";
      cards.forEach((target, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = isHome ? "stack-card__stories-seg" : "cv-card__stories-seg";
        btn.setAttribute(isHome ? "data-story-index" : "data-cv-story", String(index));
        btn.setAttribute("aria-label", labelFor(target, index));
        const fill = document.createElement("span");
        fill.className = isHome ? "stack-card__stories-fill" : "cv-card__stories-fill";
        fill.style.setProperty("--fill", index === 0 ? "1" : "0");
        fill.setAttribute("aria-hidden", "true");
        btn.appendChild(fill);
        nav.appendChild(btn);
      });
    });
  };

  const cardOverflows = (card) => {
    const box = card.querySelector(".cv-card__body") || card;
    void box.offsetHeight;
    return box.scrollHeight > box.clientHeight + 8;
  };

  const unitsFor = (card) => {
    const q = (sel) => Array.from(card.querySelectorAll(sel));
    const entries = q(".cv-entries > .cv-entry");
    if (entries.length > 1) return entries;
    const skills = q(".cv-skills-tools > div");
    if (skills.length > 1) return skills;
    const certs = q(".cv-certs > .cv-cert");
    if (certs.length > 1) return certs;
    const langs = q(".cv-languages > .cv-language");
    if (langs.length > 1) return langs;
    const bullets = q(".cv-bullets > li");
    if (bullets.length > 1) return bullets;
    return [];
  };

  const makeCvContinuation = (sourceCard) => {
    const section = document.createElement("section");
    section.className = "cv-card stack-card cv-card--split";
    const labelled = sourceCard.getAttribute("aria-labelledby");
    if (labelled) section.setAttribute("aria-labelledby", labelled);
    const nav = document.createElement("div");
    nav.className = "cv-card__stories";
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "CV sections");
    section.appendChild(nav);
    const heading = sourceCard.querySelector("h1, h2");
    if (heading) {
      const clone = heading.cloneNode(true);
      clone.removeAttribute("id");
      section.appendChild(clone);
    }
    return section;
  };

  const prependEntryContext = (continuation, item) => {
    if (!item || !item.closest || !item.closest(".cv-bullets")) return;
    if (continuation.querySelector(".cv-entry__header")) return;
    const entry = item.closest(".cv-entry");
    if (!entry) return;
    [".cv-entry__header", ".cv-entry__org"].forEach((sel) => {
      const el = entry.querySelector(sel);
      if (el) continuation.appendChild(el.cloneNode(true));
    });
  };

  const fillHost = (card, host, remaining) => {
    const nextRemaining = remaining.slice();
    const taken = [];
    while (nextRemaining.length) {
      const item = nextRemaining[0];
      host.appendChild(item);
      taken.push(item);
      nextRemaining.shift();
      if (!cardOverflows(card)) continue;
      if (taken.length > 1) {
        host.removeChild(item);
        nextRemaining.unshift(item);
        taken.pop();
        break;
      }
      const nestedBullets = item.querySelectorAll ? item.querySelectorAll(".cv-bullets > li") : [];
      if (nestedBullets.length > 1) break;
      const chrome = card.querySelector(".cv-media-layout, .cv-media-figure, .cv-media, .cv-card__lead");
      if (chrome) {
        host.removeChild(item);
        nextRemaining.unshift(item);
        taken.pop();
        break;
      }
      break;
    }
    return nextRemaining;
  };

  const packUnits = (card, units) => {
    if (units.length < 1) return;
    const parent = units[0].parentElement;
    if (!parent) return;
    units.forEach((unit) => unit.remove());
    let remaining = fillHost(card, parent, units);
    let last = card;
    let guard = 0;
    while (remaining.length && guard < 24) {
      guard += 1;
      const cont = makeCvContinuation(card);
      prependEntryContext(cont, remaining[0]);
      const host = parent.cloneNode(false);
      cont.appendChild(host);
      last.after(cont);
      last = cont;
      const before = remaining.length;
      remaining = fillHost(cont, host, remaining);
      if (remaining.length === before) host.appendChild(remaining.shift());
    }
  };

  const splitCvCard = (card) => {
    if (!cardOverflows(card)) return;
    const units = unitsFor(card);
    if (units.length) packUnits(card, units);
    if (cardOverflows(card)) {
      const bullets = Array.from(card.querySelectorAll(".cv-bullets > li"));
      if (bullets.length > 1) packUnits(card, bullets);
    }
    if (cardOverflows(card)) {
      const entries = Array.from(card.querySelectorAll(".cv-entries > .cv-entry"));
      const chrome = card.querySelector(".cv-media-layout, .cv-media-figure, .cv-card__lead");
      if (chrome && entries.length) packUnits(card, entries);
    }
  };

  const applyCvMobileSplit = () => {
    if (!isCv) return;
    stack.innerHTML = originalCvHtml;
    stack.classList.remove("cv-stack--measuring");
    if (!mobileMq.matches) return;
    stack.classList.add("cv-stack--measuring");
    void stack.offsetHeight;
    Array.from(stack.children)
      .filter((el) => el.classList.contains("cv-card"))
      .forEach((card) => splitCvCard(card));
    stack.classList.remove("cv-stack--measuring");
  };

  const collectCards = () => {
    cards = Array.from(stack.children).filter((el) => el.classList.contains(cardClass));
    const cvStoriesOff = isCv && mobileMq.matches;
    if (cvStoriesOff) {
      cards.forEach((card) => {
        card.querySelectorAll(".cv-card__stories").forEach((nav) => nav.remove());
      });
    } else if (isHome || isCv) {
      rebuildStoryBars();
    }
    if (!cvStoriesOff) cards.forEach(wrapCardBody);
    storyNavs = cards.map((card) => card.querySelector(navSelector)).filter(Boolean);
  };

  const isStorySwipe = () => mobileMq.matches && isHome;

  const resetCardTop = (card) => {
    if (!card) return;
    card.scrollTop = 0;
    const body = card.querySelector(".stack-card__body, .cv-card__body");
    if (body) body.scrollTop = 0;
  };

  const goTo = (index) => {
    const target = cards[Math.max(0, Math.min(cards.length - 1, index))];
    if (!target) return;
    resetCardTop(target);
    if (isStorySwipe()) {
      const extra = (stack.clientWidth - target.offsetWidth) / 2;
      stack.scrollTo({
        left: Math.max(0, target.offsetLeft - extra),
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
      return;
    }
    target.scrollIntoView({
      behavior: reduceMotion.matches ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  stack.addEventListener("click", (event) => {
    const btn = event.target.closest(segSelector);
    if (!btn || !stack.contains(btn)) return;
    const nav = btn.closest(navSelector);
    if (!nav) return;
    const index = Array.from(nav.querySelectorAll(segSelector)).indexOf(btn);
    if (index < 0) return;
    event.stopPropagation();
    goTo(index);
  });

  const currentIndex = () => {
    const n = cards.length;
    let active = 0;

    if (isStorySwipe()) {
      const stackMid = stack.getBoundingClientRect().left + stack.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - stackMid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    }

    const stickyMode = getComputedStyle(cards[0]).position === "sticky";
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

    return Math.max(0, Math.min(n - 1, active));
  };

  const heroPortrait = document.querySelector(
    ".home-stack > .stack-card.hero .hero-visual--portrait"
  );

  let lastFront = -1;

  const update = () => {
    const active = currentIndex();

    cards.forEach((card, i) => {
      card.classList.toggle("is-front", i === active);
    });

    if (isStorySwipe() && active !== lastFront) {
      resetCardTop(cards[active]);
      lastFront = active;
    }

    storyNavs.forEach((nav, cardIndex) => {
      const segs = nav.querySelectorAll(segSelector);
      segs.forEach((seg, i) => {
        const fill = seg.querySelector(fillSelector);
        if (fill) fill.style.setProperty("--fill", i <= active ? "1" : "0");
        seg.classList.toggle("is-complete", i <= active);
        if (i === active) seg.setAttribute("aria-current", "step");
        else seg.removeAttribute("aria-current");
        seg.tabIndex = cardIndex === active ? 0 : -1;
      });
    });

    if (heroPortrait && isHome) {
      heroPortrait.classList.toggle("is-lit", active > 0 || window.scrollY > 2);
    }
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

  stack.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerStartT = 0;
  let pointerTracking = false;

  const isInteractive = (node) =>
    Boolean(
      node.closest(
        "a, button, input, textarea, select, label, [role='tab'], [data-testimonials-carousel] button, [data-balloon-play]"
      )
    );

  stack.addEventListener(
    "pointerdown",
    (event) => {
      if (!isStorySwipe()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerTracking = true;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerStartT = Date.now();
    },
    { passive: true }
  );

  stack.addEventListener("pointerup", (event) => {
    if (!pointerTracking || !isStorySwipe()) return;
    pointerTracking = false;
    const dx = event.clientX - pointerStartX;
    const dy = event.clientY - pointerStartY;
    const dt = Date.now() - pointerStartT;
    if (dt > 450) return;
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) return;
    if (isInteractive(event.target)) return;

    const active = currentIndex();
    const card = cards[active];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (x < rect.width * 0.3) goTo(active - 1);
    else goTo(active + 1);
  });

  stack.addEventListener("pointercancel", () => {
    pointerTracking = false;
  });

  let swipeX = 0;
  let swipeY = 0;
  let swipeAxis = "";
  let swipeActive = false;

  stack.addEventListener(
    "touchstart",
    (event) => {
      if (!isStorySwipe() || event.touches.length !== 1) return;
      swipeActive = true;
      swipeAxis = "";
      swipeX = event.touches[0].clientX;
      swipeY = event.touches[0].clientY;
    },
    { passive: true }
  );

  stack.addEventListener(
    "touchmove",
    (event) => {
      if (!swipeActive || !isStorySwipe() || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - swipeX;
      const dy = event.touches[0].clientY - swipeY;
      if (!swipeAxis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
        swipeAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (swipeAxis === "x") event.preventDefault();
    },
    { passive: false }
  );

  stack.addEventListener("touchend", (event) => {
    if (!swipeActive || !isStorySwipe()) return;
    swipeActive = false;
    if (swipeAxis !== "x") {
      swipeAxis = "";
      return;
    }
    const dx = event.changedTouches[0].clientX - swipeX;
    swipeAxis = "";
    if (Math.abs(dx) < 46) return;
    const active = currentIndex();
    if (dx < 0) goTo(active + 1);
    else goTo(active - 1);
  });

  const waitStackImages = (ms = 1800) =>
    Promise.race([
      Promise.all(
        Array.from(stack.querySelectorAll("img")).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        })
      ),
      new Promise((resolve) => window.setTimeout(resolve, ms)),
    ]);

  const bootStories = () => {
    applyCvMobileSplit();
    collectCards();
    if (cards.length < 2) return false;
    if (!isCv && !storyNavs.length) return false;
    stack.scrollTo({ left: 0, top: 0 });
    update();
    return true;
  };

  if (typeof mobileMq.addEventListener === "function") {
    mobileMq.addEventListener("change", () => {
      bootStories();
      waitStackImages().then(() => bootStories());
    });
  }

  bootStories();
  waitStackImages().then(() => bootStories());
})();
