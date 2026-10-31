---
name: Cozy Olive Journal
colors:
  surface: '#fbfaf1'
  surface-dim: '#dbdad3'
  surface-bright: '#fbfaf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ec'
  surface-container: '#efeee6'
  surface-container-high: '#e9e8e1'
  surface-container-highest: '#e3e3db'
  on-surface: '#1b1c17'
  on-surface-variant: '#46483c'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f2f1e9'
  outline: '#77786b'
  outline-variant: '#c7c8b8'
  surface-tint: '#58632c'
  primary: '#535e27'
  on-primary: '#ffffff'
  primary-container: '#6b773d'
  on-primary-container: '#f1ffb7'
  inverse-primary: '#c0cd8a'
  secondary: '#8e4862'
  on-secondary: '#ffffff'
  secondary-container: '#fda5c2'
  on-secondary-container: '#793750'
  tertiary: '#755b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d0a619'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce9a4'
  primary-fixed-dim: '#c0cd8a'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#414b16'
  secondary-fixed: '#ffd9e3'
  secondary-fixed-dim: '#ffb0c9'
  on-secondary-fixed: '#3b041e'
  on-secondary-fixed-variant: '#72314a'
  tertiary-fixed: '#ffe08e'
  tertiary-fixed-dim: '#eec138'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#fbfaf1'
  on-background: '#1b1c17'
  surface-variant: '#e3e3db'
typography:
  display:
    fontFamily: Comfortaa
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.5px
  headline-lg:
    fontFamily: Comfortaa
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Comfortaa
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Comfortaa
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  title-md:
    fontFamily: Comfortaa
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Quicksand
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Quicksand
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
  body-sm:
    fontFamily: Quicksand
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-lg:
    fontFamily: Comfortaa
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.5px
  label-md:
    fontFamily: Comfortaa
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.5px
  label-sm:
    fontFamily: Comfortaa
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style
The design system evokes the warmth, mindfulness, and sensory comfort of physical stationery, cottagecore planning, and hand-illustrated daily logs. Rooted in a tactile cartoon style, it softens digital productivity into a low-stress, joyful ritual reminiscent of paper spiral notebooks, washi tape, and botanical stamps.

Key aesthetic tenants include:
- **Playful Tactility:** Thick, warm cartoon outlines combined with chunky solid drop shadows create a delightful physical presence.
- **Organic Earthiness:** The grounding muted olive canvas sets a focused, calming stage, allowing warm cream cards and pastel stickers to pop like notebook cutouts.
- **Friendly Approachability:** Rounded corners, bubbly typography, and handwritten-styled functional accents strip away sterile corporate pressure in favor of cozy encouragement.

## Colors
The palette balances natural botanicals with sweet, playful confectionery accents:

- **Primary Canvas (`#6B773D` / `#707B3B`):** Muted earthy olive green serving as the outer grounding backdrop and high-level frame.
- **Neutral Paper Surfaces (`#F5F4EC`, `#EFECE1`):** Creamy, unbleached paper card tones used for interactive containers, task lists, and main work surfaces to provide high legibility and soft contrast.
- **Deep Structural Linework (`#2B3A1C`, `#1F2815`):** Forest ink green used for thick cartoon borders, text, and hard offset drop shadows.
- **Secondary Accent (`#FFA7C4`, `#FFB8D2`):** Soft pastel blossom pink for favorite badges, flower indicators, and celebratory highlights.
- **Tertiary Accent (`#FFD147`):** Warm sunny golden yellow for sparkles, priority markers, and active tab ribbons.
- **Mint Tint (`#A8C69F`):** Minty sage green used for completed states, subtle pill chips, and secondary buttons.

## Typography
Typography reinforces the rounded, friendly, and hand-lettered notebook identity:
- **Comfortaa** governs headings, buttons, and callout labels, bringing geometric, bubbly curvature that feels gentle and cartoonish.
- **Quicksand** brings open, legible rounded geometry to body copy, note descriptions, and multi-line task contents while maintaining organic warmth.
- Mobile scaling ensures headline titles retain heavy, lovable visual weight without overflowing compact card surfaces.

## Layout & Spacing
The layout structure mimics a centered paper sketchbook or physical journal canvas:
- Mobile environments treat the screen as an open pocket notebook, using `margin: 1rem` and compact vertical card stacks.
- Tablet and desktop viewports anchor content within centered notebook binders (max-width 680px for focused single column, 1040px for two-page split layouts) against the calming olive backdrop.
- Grid structures prioritize cozy density: elements sit close together like organized stickers and handwritten items, avoiding overly vacant, cold corporate negative space.

## Elevation & Depth
Elevation eschews blurry modern drop shadows in favor of tactile cartoon drop-offsets and layered paper cutouts:
- **Cartoon Hard Offset:** Raised elements (interactive buttons, floating cards, sticker tags) use a crisp solid shadow: `3px 3px 0px #2B3A1C` or `4px 4px 0px #1F2815`.
- **Thick Outlines:** All elevated containers sport a prominent `2px` or `2.5px` solid border in dark forest green (`#2B3A1C`), providing a clean graphic novel illustration aesthetic.
- **Active / Pressed Translation:** Buttons and interactive cards depress along the diagonal offset on hover/press (`translate(2px, 2px)` with shadow reducing to `1px 1px 0px`), creating an ultra-satisfying tactile mechanical feel.
- **Paper Stack Layering:** Nested panels use natural tone shifts (`#F5F4EC` primary container, `#EFECE1` embedded inset wells) rather than gradient shading.

## Shapes
Shapes feature soft, pebble-like curvature paired with cartoon rigidity:
- Outer cards and dialogs use generous `1.5rem` (`rounded-xl`) to resemble rounded spiral journals or sticker backings.
- Standard buttons, badges, and input fields use `0.75rem` to `1rem` corner rounding, avoiding harsh geometric sharp corners entirely.
- Small indicators, tabs, and checkboxes incorporate playful squircle or pill contours to preserve the warm handmade charm.

## Components

### Buttons
- **Primary Button:** Background in mint sage (`#A8C69F`) or paper cream (`#F5F4EC`), 2.5px solid border `#2B3A1C`, 3px hard offset shadow `#1F2815`, uppercase bold Comfortaa text with subtle letter spacing.
- **Accent Button:** Blossom pink (`#FFA7C4`) background with forest green text and borders for celebratory or key conversion actions.
- **Hover/Active State:** Displaces 2px down and right, decreasing the hard offset shadow to simulate physical pressing.

### Cards & Notebook Sheets
- Cream surface (`#F5F4EC`) with 2.5px border in `#2B3A1C`.
- Decorated with subtle cartoon notebook spiral ring details or binder tabs along the edges using accent colors (pastel pink, golden yellow).
- Internal dividers styled as soft dotted or dashed forest green lines (`1.5px dashed #2B3A1C/30`).

### Checkboxes & Radio Buttons
- Checkbox frames use squircle-rounded squares with 2px forest green borders and cream fills.
- Checked states trigger a bright pop: filled with blossom pink (`#FFA7C4`) or mint green (`#A8C69F`), displaying a hand-drawn forest green checkmark or playful flower glyph.

### Input Fields
- Cream paper background with inset border (`2px solid #2B3A1C`), soft pill or `0.75rem` corners.
- Focus state thickens border color without blue halo rings, adding a warm golden yellow highlight dot or tab indicator.

### Chips & Tags
- Shaped as miniature tape strips or pill stickers with `0.5rem` to `1rem` border radii.
- Colors rotate between pastel pink, butter yellow, and mint sage with dark forest green micro-labels.

### Botanical & Notebook Accents
- Sparkle glyphs (4-point golden yellow stars) mark streaks and completed goals.
- Floral progress badges and leaf markers denote priority and category grouping.