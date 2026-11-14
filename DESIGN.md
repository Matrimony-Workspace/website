# Divine Companion — Design System

**Structure** is borrowed from relate.org.uk (photo hero with typed headline, centred-wordmark header, off-canvas menu, colour bands, plum-style footer). **The skin is our own**: rose & violet, Bricolage Grotesque, wedding-inspired shapes and light line doodles — so the site never reads as a copy.

---

## 1. Principles
1. **Warm, hopeful, a little romantic** — never clinical. Counselling first, matches second.
2. **Colour bands, not boxes.** Full-bleed lilac → mist → blush → violet, joined by a wavy ribbon.
3. **Wedding vocabulary instead of circles.** Petals, eight-petal blooms, the mandap **arch**, sparkles and a loose **thread** — used as background shapes and as photo masks.
4. **Light illustration.** Thin single-line doodles (heart-knot, chai cups, marigold, speech bubbles), always visible, drifting gently with scroll. Original drawings — no copied artwork.
5. **Sans-serif only.** Personality comes from Bricolage's soft quirks, not from italics or serifs.
6. **Everything moves with the scroll**, gently. Nothing loops on a timer except the hero carousel and the heartbeat.

## 2. Colour (`src/app/globals.css`)
| Token | Hex | Use |
|---|---|---|
| `ink` | `#24132F` | Aubergine — all text on light surfaces |
| `violet` | `#5B2A86` | Brand: ribbon, footer, menu, primary buttons, numbers, doodle strokes |
| `violet-light` | `#7444A3` | Blooms on violet surfaces, hovers |
| `rose` | `#F2709C` | Accent: CTAs on photos/violet, sparkles, footer rule |
| `lilac` | `#EBE0FB` | Main content band |
| `orchid` | `#D5C0F5` | Shapes on lilac |
| `blush` | `#FCE3EC` | Stories band, soft cards |
| `petal` | `#F9C6D8` | Wavy ribbon, tape labels, counsellor notes, shapes on blush |
| `mist` | `#FBF8FE` | Page/story background, text on dark |

Contrast: ink on lilac 14.9:1 · ink on rose 6.1:1 · mist on violet 9.0:1 · violet on mist 9.2:1 — all AA.
Rules: rose is a **fill**, never body text. Buttons on photo/violet = rose + ink text; on light = violet + mist text.

## 3. Typography
| Role | Font | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** 600/700 | Headlines, numbers, buttons, menu, wordmark. Tracking −0.02 to −0.03em. |
| Body | **DM Sans** 400/500/600 | 16–20px, line-height 1.4–1.5. |

Scale (desktop → mobile): hero 64/68 → 40/44 · statement 40/47 → 26/32 · h2 40–56 → 30–36 · h3 44/48 → 30/34 · card title 28/32 → 22/28 · body 18/25 · small 14/20. Accent words (`*word*`) change **colour**, not style.

## 4. Layout
- Container 1450px max, 20px gutters (40px ≥1024px).
- **Ribbon** (top): violet, 40px, dismissible.
- **Header** 80px: store icons left · wordmark centred · **"Discover your love type"** pill + burger right. Transparent/white over the hero photo, solid mist once scrolled. Phones: the love-type CTA becomes a floating violet pill after the hero.
- **Hero**: full-bleed photo carousel, typed "I want…" headline, rose pill, dots + chevrons.
- **Wavy pillar ribbon**: layered petal-pink waves tucked under the hero, carrying the value-pillar marquee.
- **Main band (lilac)**: statement → "Counselling for every stage of love" + arch-topped audience cards → stats → thread → "Get ready for love" (violet, arch photo) → closing statement.
- **The experience (mist)**: Hotplate-style steps — tape label, title, bullets, floating product card, arch photo; hand-drawn violet arrows that draw with scroll. Step 4 is the scattered finale (cards + looping video polaroids around centred text).
- **Stories (blush)**: arch-topped photo cards in a marquee that slows on hover.
- **Footer (violet)**: wordmark + CTA · contact + app · rose rule · links.

## 5. Shapes & doodles
- `Shapes.tsx`: `Petal`, `Bloom`, `Arch`, `Sparkle`, `Thread`. `currentColor`; use a lighter tint of the band (orchid on lilac, lilac on mist, petal on blush, violet-light on violet).
- `Doodles.tsx`: `HeartKnot`, `ChaiCups`, `Marigold`, `Bubbles` — 1.75px violet strokes, always fully visible (no draw-in); they only drift with scroll.
- Photo masks: `.mask-arch` (mandap arch) and `.mask-bloom` (scalloped bloom).
- Product cards are the only rounded white surfaces (16px radius, soft aubergine shadow).

## 6. Photography & video
- Unsplash photos (free licence) and Pixabay clips (Pixabay Content License), Indian people/weddings where possible. Credits: `src/config/photos.ts`.
- **House grade** baked into every file: −10% saturation, +5% contrast, rosy soft-light wash, lifted aubergine blacks, violet vignette. Videos get the same grade in ffmpeg, are trimmed to 6s loops, muted, ≤450KB, with poster frames.

## 7. Motion
- Lenis smooth scroll; GSAP + ScrollTrigger.
- **Floating shapes & doodles** (`data-float`): always visible; they drift and turn with scroll, scrubbed, each at its own speed/direction.
- Story arrows: the only drawn lines — the line traces across ~650px of scroll, the arrowhead traces in last. Paths use `pathLength=1000` (GSAP rounds px values, so a length of 1 would blink).
- Reveals: 24px rise + fade, staggered. Hero headline types with a caret.
- `prefers-reduced-motion`: no smooth scroll, no drift, no typing/autoplay — everything static and visible.

## 8. Naming
- The personality test is called **Soul Compass**; navigation says **Personality Quiz** (globally understood); the CTA invites: **"Discover your love type"**.
