/**
 * Balloon dog inflate → explode → contact reveal (home page).
 * Edit BALLOON_DOG_CONFIG to tune pumps, timing, assets, and contact details.
 */
(function initBalloonDog() {
  const BALLOON_DOG_CONFIG = {
    MAX_PUMPS: 6,
    /* Gradual scale per pump count 0..MAX_PUMPS (last = 100% tense, then pop) */
    SCALES: [1, 1.08, 1.18, 1.32, 1.5, 1.72, 2.0],
    /* Color stages by inflation progress */
    COLOR_STAGES: [
      { until: 0.25, layer: "beige" },
      { until: 0.5, layer: "beige2" },
      { until: 0.75, layer: "mid" },
      { until: 1.01, layer: "red" },
    ],
    /* Progress width of soft crossfades between stages */
    COLOR_BLEND_SPAN: 0.12,
    /* Screen-reader-only stage labels (visible status UI removed) */
    STAGE_LABELS: [
      { at: 0, label: "Balloon dog ready" },
      { at: 0.25, label: "Getting bigger" },
      { at: 0.5, label: "Looking plump" },
      { at: 0.75, label: "Getting unstable" },
      { at: 0.9, label: "So tense" },
      { at: 1, label: "Pop" },
    ],
    WOBBLE_FROM_PUMP: 4,
    HOLD_BEFORE_POP_MS: 620,
    /* Per-pump organic inflate timing */
    SQUASH_PEAK_MS: 110,
    GROW_MS: 560,
    GROW_EASE: "outBack",
    SQUASH_X: 0.09,
    SQUASH_Y: 0.14,
    SETTLE_X: 0.035,
    SETTLE_Y: 0.02,
    TILT_DEG: 2.6,
    PUMP_ANIM_MS: 240,
    COLOR_CROSSFADE_MS: 560,
    AIR_PARTICLE_COUNT: 5,
    /* Pop burst (first-party canvas confetti, no third-party scripts) */
    CONFETTI_COUNT: 96,
    FRAGMENT_COUNT: 16,
    SPARK_COUNT: 18,
    BURST_DURATION_MS: 2600,
    BURST_GRAVITY: 0.22,
    BURST_DRAG: 0.988,
    BURST_SPREAD: 1,
    CONFETTI_COLORS: [
      "#BC6B46",
      "#CE9055",
      "#E3D0C1",
      "#AA4A32",
      "#F5F0EC",
      "#7AC143",
      "#252229",
      "#D4A574",
    ],
    FRAGMENT_COLORS: ["#AA4A32", "#BC6B46", "#CE9055"],
    FX_CLEANUP_MS: 2800,
    REVEAL_DELAY_MS: 520,
    /* Tail tip as % of dog image box (viewBox ~130×114, tip near rear) */
    TAIL_ANCHOR: { x: 0.9, y: 0.3 },
    CONTACT: {
      name: "Octavia Sirbu",
      role: "Hit me up",
      email: "octaviasirbu@gmail.com",
      phone: "+33 7 66 99 29 75",
      phoneHref: "tel:+33766992975",
      linkedin: "https://www.linkedin.com/in/octaviasirbu/",
    },
  };

  const root = document.querySelector("[data-balloon-dog]");
  if (!root) return;

  const cfg = BALLOON_DOG_CONFIG;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const playEl = root.querySelector("[data-balloon-play]");
  const revealEl = root.querySelector("[data-balloon-reveal]");
  const stageEl = root.querySelector("[data-balloon-stage]");
  const fxEl = root.querySelector("[data-balloon-fx]");
  const dogScaleEl = root.querySelector("[data-balloon-dog-scale]");
  const dogLayers = root.querySelectorAll("[data-dog-layer]");
  const pumpVisual = root.querySelector("[data-balloon-pump-visual]");
  const statusEl = root.querySelector("[data-balloon-status]");
  const pumpTriggers = root.querySelectorAll("[data-balloon-pump-trigger]");
  const replayBtn = root.querySelector("[data-balloon-replay]");
  const hoseSvg = root.querySelector("[data-balloon-hose]");
  const hosePath = root.querySelector("[data-balloon-hose-path]");
  const tailAnchor = root.querySelector("[data-hose-tail]");
  const nozzleAnchor = root.querySelector("[data-hose-nozzle]");

  const contactName = root.querySelector("[data-balloon-contact-name]");
  const contactRole = root.querySelector("[data-balloon-contact-role]");
  const contactLinkedin = root.querySelector("[data-balloon-contact-linkedin]");
  const contactEmailLabel = root.querySelector("[data-balloon-contact-email-label]");
  const contactPhone = root.querySelector("[data-balloon-contact-phone]");
  const contactPhoneLabel = root.querySelector("[data-balloon-contact-phone-label]");
  const copyEmailBtn = root.querySelector("[data-balloon-copy-email]");
  const copyFeedback = root.querySelector("[data-balloon-copy-feedback]");

  let pumps = 0;
  let busy = false;
  let exploded = false;
  let hoseRaf = 0;
  let hoseInterval = 0;
  let dogAnimRaf = 0;
  let burstRaf = 0;
  let burstCanvas = null;
  let burstCtx = null;
  const timers = new Set();
  const listeners = [];

  const dogAnim = {
    mode: "idle",
    scale: 1,
    fromScale: 1,
    targetScale: 1,
    sx: 1,
    sy: 1,
    rot: 0,
    startedAt: 0,
  };

  const schedule = (fn, ms) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  };

  const clearTimers = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  };

  const stopHoseLoop = () => {
    if (hoseRaf) {
      cancelAnimationFrame(hoseRaf);
      hoseRaf = 0;
    }
    if (hoseInterval) {
      window.clearInterval(hoseInterval);
      hoseInterval = 0;
    }
  };

  const stopBurst = () => {
    if (burstRaf) {
      cancelAnimationFrame(burstRaf);
      burstRaf = 0;
    }
    if (burstCanvas) {
      burstCanvas.remove();
      burstCanvas = null;
      burstCtx = null;
    }
    if (root) {
      root.classList.remove("is-bursting");
      root.querySelectorAll(".balloon-dog__shock").forEach((el) => el.remove());
    }
  };

  const clearFx = () => {
    if (fxEl) fxEl.replaceChildren();
    stopBurst();
  };

  const on = (el, type, handler, options) => {
    if (!el) return;
    el.addEventListener(type, handler, options);
    listeners.push({ el, type, handler, options });
  };

  const pick = (arr) => arr[(Math.random() * arr.length) | 0];

  const spawnPopBurst = () => {
    stopBurst();
    if (reduceMotion || !root) return;

    const rootBox = root.getBoundingClientRect();
    const dogBox = dogScaleEl
      ? dogScaleEl.getBoundingClientRect()
      : { left: rootBox.left + rootBox.width * 0.4, top: rootBox.top + rootBox.height * 0.45, width: 80, height: 70 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    canvas.className = "balloon-dog__burst-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = Math.max(1, Math.floor(rootBox.width * dpr));
    canvas.height = Math.max(1, Math.floor(rootBox.height * dpr));
    canvas.style.width = `${rootBox.width}px`;
    canvas.style.height = `${rootBox.height}px`;
    root.appendChild(canvas);
    burstCanvas = canvas;
    burstCtx = canvas.getContext("2d");
    if (!burstCtx) return;

    root.classList.add("is-bursting");

    const ox = (dogBox.left + dogBox.width * 0.48 - rootBox.left) * dpr;
    const oy = (dogBox.top + dogBox.height * 0.52 - rootBox.top) * dpr;
    const spread = cfg.BURST_SPREAD || 1;
    const gravity = (cfg.BURST_GRAVITY || 0.22) * dpr;
    const drag = cfg.BURST_DRAG || 0.988;
    const particles = [];

    const addParticle = (p) => {
      particles.push(p);
    };

    /* Balloon rubber shards */
    for (let i = 0; i < cfg.FRAGMENT_COUNT; i += 1) {
      const angle = (i / cfg.FRAGMENT_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = (6.5 + Math.random() * 9) * spread * dpr;
      addParticle({
        kind: "frag",
        x: ox + (Math.random() - 0.5) * 12 * dpr,
        y: oy + (Math.random() - 0.5) * 10 * dpr,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2 * dpr,
        w: (10 + Math.random() * 16) * dpr,
        h: (7 + Math.random() * 12) * dpr,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.35,
        color: pick(cfg.FRAGMENT_COLORS),
        stroke: "#1a1a1a",
        life: 1,
        decay: 0.008 + Math.random() * 0.006,
      });
    }

    /* Dense confetti: rectangles, ribbons, circles */
    for (let i = 0; i < cfg.CONFETTI_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (4 + Math.random() * 11) * spread * dpr;
      const shapeRoll = Math.random();
      const kind = shapeRoll > 0.72 ? "circle" : shapeRoll > 0.4 ? "ribbon" : "rect";
      addParticle({
        kind,
        x: ox + (Math.random() - 0.5) * 18 * dpr,
        y: oy + (Math.random() - 0.5) * 14 * dpr,
        vx: Math.cos(angle) * speed * (0.55 + Math.random() * 0.7),
        vy: Math.sin(angle) * speed * 0.75 - (3 + Math.random() * 7) * dpr,
        w: (kind === "ribbon" ? 3 + Math.random() * 3 : 4 + Math.random() * 6) * dpr,
        h: (kind === "ribbon" ? 10 + Math.random() * 12 : 5 + Math.random() * 8) * dpr,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.42,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.08 + Math.random() * 0.12,
        color: pick(cfg.CONFETTI_COLORS),
        life: 1,
        decay: 0.0045 + Math.random() * 0.004,
        flutter: 0.35 + Math.random() * 0.55,
      });
    }

    /* Bright impact sparks */
    for (let i = 0; i < cfg.SPARK_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (8 + Math.random() * 10) * spread * dpr;
      addParticle({
        kind: "spark",
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: (2 + Math.random() * 2.5) * dpr,
        h: (2 + Math.random() * 2.5) * dpr,
        rot: 0,
        vr: 0,
        color: pick(["#FFF8F0", "#CE9055", "#E3D0C1", "#FFFFFF"]),
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
      });
    }

    /* CSS shockwave + flash for impact punch (on card root so it outlives play layer) */
    const shock = document.createElement("div");
    shock.className = "balloon-dog__shock";
    shock.setAttribute("aria-hidden", "true");
    const flash = document.createElement("span");
    flash.className = "balloon-dog__flash";
    shock.appendChild(flash);
    for (let i = 0; i < 2; i += 1) {
      const ring = document.createElement("span");
      ring.className = "balloon-dog__ripple";
      ring.style.setProperty("--ripple-delay", `${i * 70}ms`);
      ring.style.setProperty("--ripple-scale", i === 0 ? "4.8" : "6.2");
      shock.appendChild(ring);
    }
    root.appendChild(shock);
    schedule(() => {
      shock.remove();
    }, 900);

    const started = performance.now();
    const duration = cfg.BURST_DURATION_MS || 2600;

    const drawParticle = (p) => {
      if (p.life <= 0) return;
      burstCtx.save();
      burstCtx.translate(p.x, p.y);
      burstCtx.rotate(p.rot);
      burstCtx.globalAlpha = Math.max(0, Math.min(1, p.life));

      if (p.kind === "frag") {
        const hw = p.w * 0.5;
        const hh = p.h * 0.5;
        burstCtx.beginPath();
        burstCtx.moveTo(-hw, -hh * 0.4);
        burstCtx.quadraticCurveTo(hw * 0.2, -hh, hw, -hh * 0.2);
        burstCtx.quadraticCurveTo(hw * 0.8, hh, hw * 0.1, hh);
        burstCtx.quadraticCurveTo(-hw, hh * 0.6, -hw, -hh * 0.4);
        burstCtx.closePath();
        burstCtx.fillStyle = p.color;
        burstCtx.fill();
        burstCtx.lineWidth = 1.5 * dpr;
        burstCtx.strokeStyle = p.stroke;
        burstCtx.stroke();
        burstCtx.fillStyle = "rgba(255,255,255,0.35)";
        burstCtx.fillRect(-hw * 0.5, -hh * 0.45, hw * 0.45, Math.max(1, 1.5 * dpr));
      } else if (p.kind === "circle") {
        burstCtx.beginPath();
        burstCtx.arc(0, 0, p.w * 0.55, 0, Math.PI * 2);
        burstCtx.fillStyle = p.color;
        burstCtx.fill();
      } else if (p.kind === "spark") {
        burstCtx.fillStyle = p.color;
        burstCtx.beginPath();
        burstCtx.arc(0, 0, p.w, 0, Math.PI * 2);
        burstCtx.fill();
      } else if (p.kind === "ribbon") {
        const flutter = 0.55 + Math.abs(Math.cos(p.wobble)) * p.flutter;
        burstCtx.scale(flutter, 1);
        burstCtx.fillStyle = p.color;
        burstCtx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
      } else {
        const flutter = 0.5 + Math.abs(Math.cos(p.wobble)) * (p.flutter || 0.5);
        burstCtx.scale(flutter, 1);
        burstCtx.fillStyle = p.color;
        burstCtx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
      }

      burstCtx.restore();
    };

    const tick = (now) => {
      if (!burstCtx || !burstCanvas) return;
      const elapsed = now - started;
      burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);

      let alive = 0;
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (p.life <= 0) continue;
        p.vy += gravity;
        p.vx *= drag;
        p.vy *= drag;
        if (p.wobble != null) {
          p.wobble += p.wobbleSpeed || 0.1;
          p.vx += Math.sin(p.wobble) * 0.12 * dpr;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= p.decay;
        if (p.life > 0) {
          alive += 1;
          drawParticle(p);
        }
      }

      if (alive > 0 && elapsed < duration) {
        burstRaf = requestAnimationFrame(tick);
      } else {
        stopBurst();
      }
    };

    burstRaf = requestAnimationFrame(tick);
  };

  const writeClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch (error) {
      /* Fall through to execCommand */
    }
    const helperInput = document.createElement("textarea");
    helperInput.value = text;
    helperInput.setAttribute("readonly", "");
    helperInput.style.position = "absolute";
    helperInput.style.left = "-9999px";
    document.body.appendChild(helperInput);
    helperInput.select();
    const ok = document.execCommand("copy");
    helperInput.remove();
    if (!ok) throw new Error("copy failed");
  };

  const applyContact = () => {
    const { name, role, email, phone, phoneHref, linkedin } = cfg.CONTACT;
    if (contactName) contactName.textContent = name;
    if (contactRole) contactRole.textContent = role;
    if (contactLinkedin) contactLinkedin.href = linkedin;
    if (contactEmailLabel) contactEmailLabel.textContent = email;
    if (contactPhone) contactPhone.href = phoneHref;
    if (contactPhoneLabel) contactPhoneLabel.textContent = phone;
  };

  const progressRatio = () => Math.min(1, pumps / cfg.MAX_PUMPS);

  const clamp01 = (n) => Math.max(0, Math.min(1, n));

  const smoothstep = (edge0, edge1, x) => {
    const t = clamp01((x - edge0) / (edge1 - edge0 || 1));
    return t * t * (3 - 2 * t);
  };

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const easeOutBack = (t) => {
    const c1 = 1.55;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const easeGrow = (t) => (cfg.GROW_EASE === "outCubic" ? easeOutCubic(t) : easeOutBack(t));

  const stageLabel = () => {
    const r = progressRatio();
    let label = cfg.STAGE_LABELS[0].label;
    cfg.STAGE_LABELS.forEach((s) => {
      if (r >= s.at) label = s.label;
    });
    return label;
  };

  const opacityForLayer = (layer, r) => {
    const stages = cfg.COLOR_STAGES || [];
    const span = cfg.COLOR_BLEND_SPAN || 0.14;
    const idx = stages.findIndex((s) => s.layer === layer);
    if (idx < 0) return 0;

    const prevUntil = idx === 0 ? 0 : stages[idx - 1].until;
    const until = stages[idx].until;
    /* Soft edges around the stage boundaries */
    const enterStart = prevUntil - span * 0.5;
    const enterEnd = prevUntil + span * 0.5;
    const exitStart = until - span * 0.5;
    const exitEnd = until + span * 0.5;

    const fadeIn = idx === 0 ? 1 : smoothstep(enterStart, enterEnd, r);
    const fadeOut = idx === stages.length - 1 ? 1 : 1 - smoothstep(exitStart, exitEnd, r);
    return Math.max(0, Math.min(1, Math.min(fadeIn, fadeOut)));
  };

  const activeLayerAt = (r) => {
    const stages = cfg.COLOR_STAGES || [];
    for (let i = 0; i < stages.length; i += 1) {
      if (r <= stages[i].until) return stages[i].layer;
    }
    return stages.length ? stages[stages.length - 1].layer : "beige";
  };

  const updateLayerBlend = () => {
    const r = progressRatio();
    dogLayers.forEach((img) => {
      const layer = img.getAttribute("data-dog-layer");
      const op = reduceMotion
        ? layer === activeLayerAt(r)
          ? 1
          : 0
        : opacityForLayer(layer, r);
      img.style.opacity = String(op);
      img.classList.toggle("is-active", op > 0.04);
    });
  };

  const applyDogTransform = () => {
    if (!dogScaleEl) return;
    dogScaleEl.style.setProperty("--dog-scale", String(dogAnim.scale));
    dogScaleEl.style.transform = `rotate(${dogAnim.rot}deg) scale(${dogAnim.scale * dogAnim.sx}, ${
      dogAnim.scale * dogAnim.sy
    })`;
    requestHoseUpdate();
  };

  const stopDogAnimLoop = () => {
    if (dogAnimRaf) {
      cancelAnimationFrame(dogAnimRaf);
      dogAnimRaf = 0;
    }
  };

  const pumpCycleMs = () => (cfg.SQUASH_PEAK_MS || 110) + (cfg.GROW_MS || 560);

  const tickDogAnim = (now) => {
    dogAnimRaf = 0;
    let keepGoing = false;
    const squashMs = cfg.SQUASH_PEAK_MS || 110;
    const growMs = cfg.GROW_MS || 560;

    if (dogAnim.mode === "pump") {
      const elapsed = now - dogAnim.startedAt;
      if (elapsed < squashMs) {
        const t = elapsed / squashMs;
        const peak = Math.sin(t * Math.PI);
        dogAnim.scale = dogAnim.fromScale;
        dogAnim.sx = 1 - (cfg.SQUASH_X || 0.09) * peak;
        dogAnim.sy = 1 + (cfg.SQUASH_Y || 0.14) * peak;
        dogAnim.rot = (cfg.TILT_DEG || 2.6) * 0.45 * Math.sin(t * Math.PI);
        keepGoing = true;
      } else if (elapsed < squashMs + growMs) {
        const t = (elapsed - squashMs) / growMs;
        const e = easeGrow(Math.min(1, t));
        dogAnim.scale = dogAnim.fromScale + (dogAnim.targetScale - dogAnim.fromScale) * e;
        const settle = easeOutCubic(t);
        /* Slightly rounder as it fills: organic balloon feel */
        dogAnim.sx = 1 + (cfg.SETTLE_X || 0.035) * settle;
        dogAnim.sy = 1 - (cfg.SETTLE_Y || 0.02) * settle;
        dogAnim.rot = (cfg.TILT_DEG || 2.6) * Math.sin(t * Math.PI) * (1 - t);
        keepGoing = t < 1;
      } else {
        dogAnim.scale = dogAnim.targetScale;
        dogAnim.sx = 1 + (cfg.SETTLE_X || 0.035);
        dogAnim.sy = 1 - (cfg.SETTLE_Y || 0.02);
        dogAnim.rot = 0;
        if (!exploded && pumps >= cfg.MAX_PUMPS) {
          dogAnim.mode = "tense";
          dogAnim.startedAt = now;
        } else if (!exploded && pumps >= cfg.WOBBLE_FROM_PUMP) {
          dogAnim.mode = "wobble";
          dogAnim.startedAt = now;
        } else {
          dogAnim.mode = "idle";
        }
        keepGoing = dogAnim.mode === "wobble" || dogAnim.mode === "tense";
      }
    } else if (dogAnim.mode === "wobble" && !exploded) {
      const t = (now - dogAnim.startedAt) / 1000;
      dogAnim.rot = Math.sin(t * 3.4) * 2.5;
      dogAnim.sx = 1 + (cfg.SETTLE_X || 0.035) + Math.sin(t * 5.1) * 0.018;
      dogAnim.sy = 1 - (cfg.SETTLE_Y || 0.02) - Math.sin(t * 5.1) * 0.012;
      keepGoing = true;
    } else if (dogAnim.mode === "tense" && !exploded) {
      const t = (now - dogAnim.startedAt) / 1000;
      dogAnim.rot = Math.sin(t * 14) * 3.4;
      dogAnim.sx = 1 + (cfg.SETTLE_X || 0.035) + Math.sin(t * 18) * 0.03;
      dogAnim.sy = 1 - (cfg.SETTLE_Y || 0.02) - Math.sin(t * 18) * 0.025;
      dogAnim.scale = dogAnim.targetScale * (1 + Math.sin(t * 20) * 0.012);
      keepGoing = true;
    } else if (dogAnim.mode === "popHold" && !exploded) {
      const t = clamp01((now - dogAnim.startedAt) / Math.max(120, cfg.HOLD_BEFORE_POP_MS * 0.35));
      dogAnim.scale = dogAnim.targetScale * (1 + 0.06 * easeOutCubic(t));
      dogAnim.sx = 1.05;
      dogAnim.sy = 0.96;
      dogAnim.rot = Math.sin(now / 40) * 2;
      keepGoing = t < 1;
    }

    applyDogTransform();
    updateLayerBlend();

    if (keepGoing) {
      dogAnimRaf = requestAnimationFrame(tickDogAnim);
    }
  };

  const ensureDogAnimLoop = () => {
    if (!dogAnimRaf) dogAnimRaf = requestAnimationFrame(tickDogAnim);
  };

  const setProgress = () => {
    if (statusEl) statusEl.textContent = stageLabel();
    updateLayerBlend();
  };

  const setScaleVisual = (withPumpMotion) => {
    if (!dogScaleEl) return;
    const target = cfg.SCALES[Math.min(pumps, cfg.SCALES.length - 1)] || 1;

    if (reduceMotion || !withPumpMotion) {
      dogAnim.mode = "idle";
      dogAnim.scale = target;
      dogAnim.targetScale = target;
      dogAnim.fromScale = target;
      dogAnim.sx = 1;
      dogAnim.sy = 1;
      dogAnim.rot = 0;
      applyDogTransform();
      updateLayerBlend();
      return;
    }

    dogAnim.fromScale = dogAnim.scale;
    dogAnim.targetScale = target;
    dogAnim.startedAt = performance.now();
    dogAnim.mode = "pump";
    ensureDogAnimLoop();
  };

  const spawnAirParticles = () => {
    if (!fxEl || reduceMotion) return;
    for (let i = 0; i < cfg.AIR_PARTICLE_COUNT; i += 1) {
      const p = document.createElement("span");
      p.className = "balloon-dog__air";
      p.style.setProperty("--air-x", `${(Math.random() - 0.5) * 70}px`);
      p.style.setProperty("--air-y", `${-20 - Math.random() * 50}px`);
      p.style.setProperty("--air-delay", `${Math.random() * 80}ms`);
      fxEl.appendChild(p);
      schedule(() => p.remove(), 700);
    }
  };

  const updateHose = () => {
    if (!stageEl || !hoseSvg || !hosePath || !tailAnchor || !nozzleAnchor) return;
    if (exploded || (playEl && playEl.hidden)) {
      hosePath.setAttribute("d", "");
      hoseSvg.classList.add("is-hidden");
      return;
    }
    hoseSvg.classList.remove("is-hidden");

    const stageBox = stageEl.getBoundingClientRect();
    if (stageBox.width < 1 || stageBox.height < 1) return;

    hoseSvg.setAttribute("viewBox", `0 0 ${stageBox.width} ${stageBox.height}`);
    hoseSvg.setAttribute("width", String(stageBox.width));
    hoseSvg.setAttribute("height", String(stageBox.height));

    const dogBox = dogScaleEl
      ? dogScaleEl.getBoundingClientRect()
      : tailAnchor.getBoundingClientRect();
    const nozzleBox = nozzleAnchor.getBoundingClientRect();

    const x1 = nozzleBox.left + nozzleBox.width * 0.5 - stageBox.left;
    const y1 = nozzleBox.top + nozzleBox.height * 0.15 - stageBox.top;
    const x2 = dogBox.left + dogBox.width * cfg.TAIL_ANCHOR.x - stageBox.left;
    const y2 = dogBox.top + dogBox.height * cfg.TAIL_ANCHOR.y - stageBox.top;

    const pumping = pumpVisual && pumpVisual.classList.contains("is-pumping");
    const dogLeft = dogBox.left - stageBox.left;
    const dogRight = dogBox.right - stageBox.left;
    const dogBottom = dogBox.bottom - stageBox.top;
    const stacked = y1 > y2 + 36;
    let path;

    if (stacked) {
      /* Mobile: pump sits under the dog, so bow the hose around the rear
         instead of a midpoint that cuts through the body. */
      const pad = Math.max(28, dogBox.width * 0.22);
      const aroundRight = x2 >= dogLeft + dogBox.width * 0.5;
      const pull = pumping ? 5 : 0;
      const wayX = aroundRight ? dogRight + pad : dogLeft - pad;
      const wayY = dogBottom + 6 - pull;
      const mid1x = (x1 + wayX) / 2;
      const mid2y = (y2 + wayY) / 2;
      path = `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mid1x.toFixed(1)} ${(wayY + 10).toFixed(1)} ${wayX.toFixed(1)} ${wayY.toFixed(1)} Q ${wayX.toFixed(1)} ${mid2y.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    } else {
      const midX = (x1 + x2) / 2;
      const midY = Math.min(y1, y2) - (pumping ? 10 : 22) - Math.abs(x2 - x1) * 0.08;
      const sag = pumping ? 6 : 0;
      path = `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${midX.toFixed(1)} ${(midY + sag).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }

    hosePath.setAttribute("d", path);
  };

  const requestHoseUpdate = () => {
    if (hoseRaf) cancelAnimationFrame(hoseRaf);
    hoseRaf = requestAnimationFrame(() => {
      hoseRaf = 0;
      updateHose();
    });
  };

  const pumpHandle = () => {
    if (!pumpVisual || reduceMotion) {
      requestHoseUpdate();
      return;
    }
    pumpVisual.classList.add("is-pumping");
    requestHoseUpdate();
    schedule(() => {
      pumpVisual.classList.remove("is-pumping");
      requestHoseUpdate();
    }, cfg.PUMP_ANIM_MS);
  };

  const showReveal = () => {
    if (playEl) playEl.hidden = true;
    if (hosePath) hosePath.setAttribute("d", "");
    if (hoseSvg) hoseSvg.classList.add("is-hidden");
    if (revealEl) {
      revealEl.hidden = false;
      revealEl.setAttribute("aria-hidden", "false");
      revealEl.classList.remove("is-in");
      void revealEl.offsetWidth;
      revealEl.classList.add("is-in");
    }
    if (copyEmailBtn) {
      schedule(() => copyEmailBtn.focus({ preventScroll: true }), 80);
    }
  };

  const hideReveal = () => {
    if (revealEl) {
      revealEl.hidden = true;
      revealEl.setAttribute("aria-hidden", "true");
      revealEl.classList.remove("is-in");
    }
    if (playEl) playEl.hidden = false;
    requestHoseUpdate();
  };

  const hideDogVisuals = () => {
    if (dogScaleEl) dogScaleEl.classList.add("is-gone");
    dogLayers.forEach((img) => {
      img.style.visibility = "hidden";
    });
  };

  const showDogVisuals = () => {
    dogLayers.forEach((img) => {
      img.style.visibility = "";
    });
  };

  const explode = () => {
    exploded = true;
    busy = true;
    if (statusEl) statusEl.textContent = "Pop";
    updateLayerBlend();

    if (!reduceMotion) {
      dogAnim.mode = "popHold";
      dogAnim.startedAt = performance.now();
      dogAnim.targetScale = cfg.SCALES[cfg.SCALES.length - 1] || dogAnim.scale;
      ensureDogAnimLoop();
    }

    const runFx = () => {
      dogAnim.mode = "idle";
      stopDogAnimLoop();
      hideDogVisuals();
      if (hosePath) hosePath.setAttribute("d", "");
      if (hoseSvg) hoseSvg.classList.add("is-hidden");

      if (!reduceMotion) {
        spawnPopBurst();
      }

      schedule(() => {
        showReveal();
        busy = false;
      }, reduceMotion ? 0 : cfg.REVEAL_DELAY_MS || 520);
    };

    if (reduceMotion) {
      runFx();
      return;
    }

    schedule(runFx, cfg.HOLD_BEFORE_POP_MS * 0.35);
  };

  const doPump = () => {
    if (busy || exploded) return;

    if (reduceMotion) {
      pumps = cfg.MAX_PUMPS;
      setProgress();
      explode();
      return;
    }

    if (pumps >= cfg.MAX_PUMPS) return;

    busy = true;
    pumps += 1;
    setProgress();
    setScaleVisual(true);
    pumpHandle();
    spawnAirParticles();

    if (pumps >= cfg.MAX_PUMPS) {
      schedule(() => {
        explode();
      }, pumpCycleMs() + (cfg.HOLD_BEFORE_POP_MS || 620) * 0.55);
      return;
    }

    schedule(() => {
      busy = false;
      requestHoseUpdate();
    }, pumpCycleMs());
  };

  const reset = () => {
    clearTimers();
    clearFx();
    stopDogAnimLoop();
    pumps = 0;
    busy = false;
    exploded = false;

    showDogVisuals();
    if (dogScaleEl) {
      dogScaleEl.classList.remove("is-gone");
      dogScaleEl.style.transform = "";
      dogScaleEl.style.setProperty("--dog-scale", "1");
    }
    dogAnim.mode = "idle";
    dogAnim.scale = 1;
    dogAnim.fromScale = 1;
    dogAnim.targetScale = 1;
    dogAnim.sx = 1;
    dogAnim.sy = 1;
    dogAnim.rot = 0;
    if (pumpVisual) pumpVisual.classList.remove("is-pumping");

    hideReveal();
    setProgress();
    setScaleVisual(false);
    requestHoseUpdate();
    if (copyFeedback) copyFeedback.textContent = "";

    const firstTrigger = root.querySelector(".balloon-dog__dog");
    if (firstTrigger) firstTrigger.focus({ preventScroll: true });
  };

  applyContact();
  if (root && cfg.COLOR_CROSSFADE_MS) {
    root.style.setProperty("--balloon-color-fade", `${cfg.COLOR_CROSSFADE_MS}ms`);
  }
  setProgress();
  setScaleVisual(false);

  pumpTriggers.forEach((btn) => {
    on(btn, "click", (e) => {
      e.preventDefault();
      doPump();
    });
  });

  if (replayBtn) {
    on(replayBtn, "click", (e) => {
      e.preventDefault();
      reset();
    });
  }

  if (copyEmailBtn) {
    on(copyEmailBtn, "click", async () => {
      const email = (cfg.CONTACT.email || "").trim();
      if (!email) return;
      try {
        await writeClipboard(email);
        if (copyFeedback) copyFeedback.textContent = "Email copied to clipboard.";
      } catch (error) {
        if (copyFeedback) copyFeedback.textContent = "Could not copy email. Please copy it manually.";
      }
    });
  }

  on(window, "resize", requestHoseUpdate, { passive: true });

  if (typeof ResizeObserver !== "undefined" && stageEl) {
    const ro = new ResizeObserver(() => requestHoseUpdate());
    ro.observe(stageEl);
  }

  /* Keep hose attached during scale/wobble transitions */
  const hoseTick = () => {
    if (!exploded && playEl && !playEl.hidden) updateHose();
    hoseRaf = 0;
  };
  const scheduleHoseTick = () => {
    if (!hoseRaf) hoseRaf = requestAnimationFrame(hoseTick);
  };
  if (!reduceMotion) {
    hoseInterval = window.setInterval(scheduleHoseTick, 80);
  } else {
    requestHoseUpdate();
  }

  if (typeof MutationObserver !== "undefined") {
    const mo = new MutationObserver(() => {
      if (!document.contains(root)) {
        clearTimers();
        stopHoseLoop();
        stopDogAnimLoop();
        clearFx();
        listeners.forEach(({ el, type, handler, options }) => {
          el.removeEventListener(type, handler, options);
        });
        listeners.length = 0;
        mo.disconnect();
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  requestHoseUpdate();

  root._balloonDogConfig = cfg;
  root._balloonDogReset = reset;
})();
