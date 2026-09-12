(function initHeroScramble() {
  const visual = document.querySelector(
    ".home-stack > .stack-card.hero .hero-visual--portrait"
  );
  const canvas = visual && visual.querySelector(".hero-scramble");
  const portrait = visual && visual.querySelector(".hero-portrait-img");
  if (!visual || !canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*+=/<>{}[]|_~!?@^:;.-";
  const WORDS = [
    "DESIGN SYSTEM",
    "WEB DEV",
    "FIGMA",
    "CLAUDE",
    "MCP",
    "USER TESTS",
    "PERSONA",
    "POSTHOG",
    "DATA",
  ];
  const WORD_HOLD_MS = 6000;
  const IDLE_GRID_PER_SEC = 0.16;
  const LETTER_LOCK_PER_SEC = IDLE_GRID_PER_SEC * 14 * 3;
  const LETTER_FADE_PER_SEC = LETTER_LOCK_PER_SEC;
  const MAX_WORDS = 3;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let cellW = 14;
  let cellH = 18;
  let glyphs = [];
  let lastX = null;
  let lastY = null;
  let hotX = -1;
  let hotY = -1;
  let showHot = false;
  let fontFamily = "ui-monospace, monospace";
  let idleAlpha = 0.14;
  let hotAlpha = 0.4;
  let wordAlpha = 0.58;
  let fg = "227, 208, 193";
  let settleTimer = 0;
  let running = false;
  let raf = 0;
  let lastTs = 0;
  let swapCarry = 0;
  let wordQueue = [];
  let activeWords = [];
  let nextSpawnAt = 0;
  let clearCell = [];

  const randChar = () => CHARS[(Math.random() * CHARS.length) | 0];

  const shuffle = (list) => {
    const next = list.slice();
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = (Math.random() * (i + 1)) | 0;
      const tmp = next[i];
      next[i] = next[j];
      next[j] = tmp;
    }
    return next;
  };

  const nextPhrase = () => {
    if (!wordQueue.length) wordQueue = shuffle(WORDS);
    return wordQueue.pop();
  };

  const readTheme = () => {
    const styles = getComputedStyle(visual);
    fontFamily = styles.getPropertyValue("--font-mono").trim() || fontFamily;
    idleAlpha = Number(styles.getPropertyValue("--scramble-idle")) || 0.14;
    hotAlpha = Number(styles.getPropertyValue("--scramble-hot")) || 0.4;
    wordAlpha = Number(styles.getPropertyValue("--scramble-word")) || 0.58;
    fg = (styles.getPropertyValue("--scramble-rgb").trim() || fg).replace(/\s+/g, "");
  };

  const distToSegSq = (px, py, x1, y1, x2, y2) => {
    const vx = x2 - x1;
    const vy = y2 - y1;
    const len = vx * vx + vy * vy;
    if (len < 1) {
      const dx = px - x2;
      const dy = py - y2;
      return dx * dx + dy * dy;
    }
    let t = ((px - x1) * vx + (py - y1) * vy) / len;
    t = Math.max(0, Math.min(1, t));
    const dx = px - (x1 + t * vx);
    const dy = py - (y1 + t * vy);
    return dx * dx + dy * dy;
  };

  const occupiedIndices = () => {
    const taken = new Set();
    activeWords.forEach((word) => {
      word.cells.forEach((cell) => {
        taken.add(cell.index);
        const col = cell.index % cols;
        const row = (cell.index / cols) | 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nCol = col + dx;
            const nRow = row + dy;
            if (nCol < 0 || nRow < 0 || nCol >= cols || nRow >= rows) continue;
            taken.add(nRow * cols + nCol);
          }
        }
      });
    });
    return taken;
  };

  const cellIsClear = (index) => Boolean(clearCell[index]);

  const buildClearMap = () => {
    clearCell = new Array(cols * rows).fill(false);
    if (!portrait || !portrait.naturalWidth || !width || !height) return;

    const imgW = portrait.naturalWidth;
    const imgH = portrait.naturalHeight;
    const scale = Math.min(width / imgW, height / imgH);
    const dispW = imgW * scale;
    const dispH = imgH * scale;
    const ox = (width - dispW) / 2;
    const oy = height - dispH;

    const sample = document.createElement("canvas");
    sample.width = imgW;
    sample.height = imgH;
    const sctx = sample.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;
    sctx.drawImage(portrait, 0, 0);
    let pixels;
    try {
      pixels = sctx.getImageData(0, 0, imgW, imgH).data;
    } catch (err) {
      return;
    }

    const blocked = new Array(cols * rows).fill(false);
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        let cover = false;
        for (let sy = 0; sy < 3 && !cover; sy += 1) {
          for (let sx = 0; sx < 3 && !cover; sx += 1) {
            const px = (col + (sx + 0.5) / 3) * cellW;
            const py = (row + (sy + 0.5) / 3) * cellH;
            const ix = Math.floor((px - ox) / scale);
            const iy = Math.floor((py - oy) / scale);
            if (ix < 0 || iy < 0 || ix >= imgW || iy >= imgH) continue;
            if (pixels[(iy * imgW + ix) * 4 + 3] > 28) cover = true;
          }
        }
        blocked[row * cols + col] = cover;
      }
    }

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        let near = blocked[row * cols + col];
        if (!near) {
          for (let dy = -1; dy <= 1 && !near; dy += 1) {
            for (let dx = -1; dx <= 1 && !near; dx += 1) {
              const nr = row + dy;
              const nc = col + dx;
              if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
              if (blocked[nr * cols + nc]) near = true;
            }
          }
        }
        clearCell[row * cols + col] = !near;
      }
    }
  };

  const pickWordSlot = (phrase, taken) => {
    const letters = phrase.split("");
    const len = letters.length;
    if (cols < len || rows < 2) return null;

    const spots = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col <= cols - len; col += 1) {
        let clear = true;
        for (let i = 0; i < len; i += 1) {
          const index = row * cols + col + i;
          if (taken.has(index)) {
            clear = false;
            break;
          }
          if (letters[i] !== " " && !cellIsClear(index)) {
            clear = false;
            break;
          }
        }
        if (clear) spots.push({ row, col });
      }
    }

    if (!spots.length) return null;
    const spot = spots[(Math.random() * spots.length) | 0];
    return letters.map((letter, i) => ({
      index: spot.row * cols + spot.col + i,
      letter,
    }));
  };

  const trySpawnWord = () => {
    if (activeWords.length >= MAX_WORDS) return false;
    const phrase = nextPhrase();
    const cells = pickWordSlot(phrase, occupiedIndices());
    if (!cells) return false;
    const order = shuffle(
      cells.map((_, i) => i).filter((i) => cells[i].letter !== " ")
    );
    activeWords.push({
      cells,
      locked: cells.map((cell) => cell.letter === " "),
      fade: cells.map((cell) => (cell.letter === " " ? 1 : 0)),
      lockOrder: order,
      lockCursor: 0,
      formed: false,
      dissolving: false,
      holdUntil: 0,
      lockCarry: 0,
    });
    return true;
  };

  const isWordCell = (index) =>
    activeWords.some((word) => word.cells.some((cell) => cell.index === index));

  const rebuild = () => {
    const rect = visual.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cellH = width < 420 ? 16 : 18;
    cellW = Math.round(cellH * 0.72);
    cols = Math.ceil(width / cellW);
    rows = Math.ceil(height / cellH);
    glyphs = new Array(cols * rows);
    for (let i = 0; i < glyphs.length; i += 1) {
      glyphs[i] = randChar();
    }
    readTheme();
    activeWords = [];
    nextSpawnAt = 0;
    buildClearMap();
  };

  const idleSwap = (dt) => {
    if (!glyphs.length) return;
    swapCarry += glyphs.length * IDLE_GRID_PER_SEC * dt;
    const swaps = Math.min(glyphs.length, Math.floor(swapCarry));
    swapCarry -= swaps;
    for (let n = 0; n < swaps; n += 1) {
      const i = (Math.random() * glyphs.length) | 0;
      if (isWordCell(i)) continue;
      glyphs[i] = randChar();
    }
  };

  const updateWords = (now, dt) => {
    if (now >= nextSpawnAt) {
      trySpawnWord();
      nextSpawnAt = now + 480 + Math.random() * 1600;
    }

    for (let w = activeWords.length - 1; w >= 0; w -= 1) {
      const word = activeWords[w];

      if (!word.formed && !word.dissolving) {
        word.cells.forEach((cell, i) => {
          if (word.locked[i] || cell.letter === " ") return;
          if (Math.random() < IDLE_GRID_PER_SEC * dt) {
            glyphs[cell.index] = randChar();
          }
        });

        word.lockCarry += LETTER_LOCK_PER_SEC * dt;
        while (word.lockCarry >= 1 && word.lockCursor < word.lockOrder.length) {
          word.lockCarry -= 1;
          const i = word.lockOrder[word.lockCursor];
          word.lockCursor += 1;
          word.locked[i] = true;
          const cell = word.cells[i];
          glyphs[cell.index] = cell.letter === " " ? " " : cell.letter;
        }

        if (word.lockCursor >= word.lockOrder.length) {
          word.formed = true;
          word.holdUntil = now + WORD_HOLD_MS;
          word.cells.forEach((cell) => {
            glyphs[cell.index] = cell.letter === " " ? " " : cell.letter;
          });
        }
      } else if (word.formed && !word.dissolving && now >= word.holdUntil) {
        word.dissolving = true;
        word.lockCarry = 0;
      } else if (word.dissolving) {
        word.lockCarry += LETTER_LOCK_PER_SEC * dt;
        while (word.lockCarry >= 1 && word.lockCursor > 0) {
          word.lockCarry -= 1;
          word.lockCursor -= 1;
          const i = word.lockOrder[word.lockCursor];
          word.locked[i] = false;
        }
      }

      let allFadedOut = word.dissolving;
      word.cells.forEach((cell, i) => {
        if (cell.letter === " ") return;
        const target = word.locked[i] ? 1 : 0;
        const fade = word.fade[i];
        if (fade < target) {
          word.fade[i] = Math.min(target, fade + LETTER_FADE_PER_SEC * dt);
        } else if (fade > target) {
          word.fade[i] = Math.max(target, fade - LETTER_FADE_PER_SEC * dt);
        }
        if (word.fade[i] <= 0) {
          if (word.dissolving && glyphs[cell.index] === cell.letter) {
            glyphs[cell.index] = randChar();
          }
        } else if (word.locked[i] || word.dissolving) {
          glyphs[cell.index] = cell.letter;
        }
        if (word.fade[i] > 0.001) allFadedOut = false;
      });

      if (word.dissolving && allFadedOut) {
        activeWords.splice(w, 1);
      }
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `500 ${Math.round(cellH * 0.72)}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const radius = Math.max(72, Math.min(width, height) * 0.28);
    const radiusSq = radius * radius;
    const formed = new Map();
    const forming = new Set();
    activeWords.forEach((word) => {
      word.cells.forEach((cell, i) => {
        if (cell.letter === " ") return;
        if (word.fade[i] > 0) formed.set(cell.index, word.fade[i]);
        else if (!word.formed && !word.dissolving && !word.locked[i]) forming.add(cell.index);
      });
    });

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const i = row * cols + col;
        const glyph = glyphs[i];
        if (!glyph || glyph === " ") continue;

        const cx = (col + 0.5) * cellW;
        const cy = (row + 0.5) * cellH;
        let influence = 0;

        if (showHot && !formed.has(i) && !forming.has(i)) {
          const dx = cx - hotX;
          const dy = cy - hotY;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const t = 1 - Math.sqrt(distSq) / radius;
            influence = t * t;
          }
        }

        let alpha = idleAlpha + influence * (hotAlpha - idleAlpha);
        if (forming.has(i)) alpha = idleAlpha + (wordAlpha - idleAlpha) * 0.35;
        if (formed.has(i)) {
          alpha = idleAlpha + (wordAlpha - idleAlpha) * formed.get(i);
        }

        ctx.fillStyle = `rgba(${fg},${alpha.toFixed(3)})`;
        ctx.fillText(glyph, cx, cy);
      }
    }
  };

  const tick = (ts) => {
    if (!running) return;
    const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016);
    lastTs = ts;
    idleSwap(dt);
    updateWords(ts, dt);
    draw();
    raf = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || reduceMotion) return;
    running = true;
    lastTs = performance.now();
    raf = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  };

  const scrambleAlong = (x1, y1, x2, y2) => {
    const radius = Math.max(72, Math.min(width, height) * 0.28);
    const radiusSq = radius * radius;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const i = row * cols + col;
        if (isWordCell(i)) continue;
        const cx = (col + 0.5) * cellW;
        const cy = (row + 0.5) * cellH;
        const distSq = distToSegSq(cx, cy, x1, y1, x2, y2);
        if (distSq >= radiusSq) continue;
        const t = 1 - Math.sqrt(distSq) / radius;
        const influence = t * t;
        if (Math.random() < 0.28 + influence * 0.72) {
          glyphs[i] = randChar();
        }
      }
    }
  };

  const pointerAt = (event) => {
    const rect = visual.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const onTravel = (event) => {
    if (reduceMotion) return;
    const { x, y } = pointerAt(event);
    const fromX = lastX === null ? x : lastX;
    const fromY = lastY === null ? y : lastY;
    scrambleAlong(fromX, fromY, x, y);
    lastX = x;
    lastY = y;
    hotX = x;
    hotY = y;
    showHot = true;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => {
      showHot = false;
    }, 90);
  };

  visual.addEventListener("pointermove", onTravel, { passive: true });

  visual.addEventListener("pointerleave", () => {
    lastX = null;
    lastY = null;
    showHot = false;
    window.clearTimeout(settleTimer);
  });

  visual.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType !== "touch") return;
      onTravel(event);
    },
    { passive: true }
  );

  const themeObserver = new MutationObserver(readTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const resizeObserver = new ResizeObserver(() => {
    rebuild();
    if (!running) draw();
  });
  resizeObserver.observe(visual);

  const visibility = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible && !reduceMotion) start();
      else stop();
    },
    { threshold: 0.05 }
  );
  visibility.observe(visual);

  rebuild();
  draw();
  if (portrait) {
    if (portrait.complete && portrait.naturalWidth) buildClearMap();
    else portrait.addEventListener("load", () => buildClearMap(), { once: true });
  }
  if (!reduceMotion) start();
})();
