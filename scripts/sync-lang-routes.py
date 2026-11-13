#!/usr/bin/env python3
"""Create /fr, /ro, and /dk HTML stubs so language URLs work locally and on GitHub Pages."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREFIXES = ("fr", "ro", "dk")
SKIP = {"404.html"}
STUB = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Octavia Sirbu</title>
    <style>
      html,
      body {
        margin: 0;
        background: #f5f0ec;
        min-height: 100%;
      }
    </style>
    <script src="/lang-router.js"></script>
  </head>
  <body></body>
</html>
"""

html_files = (
    list(ROOT.glob("*.html"))
    + list((ROOT / "blogs").glob("*.html"))
    + list((ROOT / "studio").glob("*.html"))
)
written = 0
for prefix in PREFIXES:
    for src in html_files:
        if src.name in SKIP:
            continue
        dest = ROOT / prefix / src.relative_to(ROOT)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(STUB, encoding="utf-8")
        written += 1
print(f"Wrote {written} language route stubs")
