---
name: Valença & Moraes Advocacia
description: Escritório generalista em Jundiaí construído com o material de um prédio comercial modernista paulista.
colors:
  pastilha: "#1e4a3c"
  pastilha-funda: "#143329"
  pastilha-media: "#2c5e4e"
  pastilha-clara: "#c9d9cf"
  sobre-pastilha: "#f1f0eb"
  sobre-pastilha-suave: "#b8cdc2"
  cal: "#f1f0eb"
  cal-escura: "#e4e3dc"
  rejunte: "#cfcec5"
  campo-fundo: "#fbfbf8"
  campo-borda: "#7a7f7b"
  grafite: "#24272a"
  grafite-suave: "#50565a"
  bronze: "#8a5a2c"
  bronze-claro: "#c99a62"
  area-civel: "#2d5d6e"
  area-trabalhista: "#2f6b57"
  area-familia: "#a4553a"
  area-consumidor: "#8a6a1f"
  area-previdenciario: "#59677a"
  area-empresarial: "#5f6638"
  erro: "#a2382b"
typography:
  display:
    fontFamily: "Gloock, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.5rem, 1.6rem + 4.2vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Gloock, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Gloock, 'Iowan Old Style', Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "Gloock, 'Iowan Old Style', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1
  lead:
    fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
  small:
    fontFamily: "'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0"
  controle: "2px"
spacing:
  modulo: "3.5rem"
  pastilha: "0.875rem"
  secao-celular: "5.25rem"
  secao-desktop: "7rem"
  margem-celular: "1.25rem"
  margem-tablet: "2rem"
  container: "75rem"
components:
  button-placa:
    backgroundColor: "{colors.pastilha}"
    textColor: "{colors.cal}"
    typography: "{typography.label}"
    rounded: "{rounded.controle}"
    padding: "0.875rem 1.625rem"
    height: "3.5rem"
  button-placa-hover:
    backgroundColor: "{colors.pastilha-funda}"
    textColor: "{colors.cal}"
  button-placa-sobre-pastilha:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.pastilha-funda}"
    typography: "{typography.label}"
    rounded: "{rounded.controle}"
    padding: "0.875rem 1.625rem"
    height: "3.5rem"
  button-contorno:
    backgroundColor: "transparent"
    textColor: "{colors.pastilha}"
    typography: "{typography.label}"
    rounded: "{rounded.controle}"
    padding: "0.875rem 1.625rem"
    height: "3.5rem"
  button-contorno-hover:
    backgroundColor: "{colors.pastilha}"
    textColor: "{colors.cal}"
  chip-assunto:
    backgroundColor: "transparent"
    textColor: "{colors.sobre-pastilha}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "2.75rem"
  chip-assunto-selected:
    backgroundColor: "{colors.pastilha-clara}"
    textColor: "{colors.pastilha-funda}"
  field:
    backgroundColor: "{colors.campo-fundo}"
    textColor: "{colors.grafite}"
    typography: "{typography.body}"
    rounded: "{rounded.controle}"
    padding: "0.75rem 1rem"
    height: "3.25rem"
  nav-link:
    textColor: "{colors.sobre-pastilha-suave}"
    typography: "{typography.label}"
    padding: "0 0.875rem"
    height: "2.75rem"
  nav-link-active:
    textColor: "{colors.sobre-pastilha}"
  area-cell:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.grafite}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1.75rem 1.75rem"
  directory-board:
    backgroundColor: "{colors.cal}"
    textColor: "{colors.grafite}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1.5rem"
---

# Design System: Valença & Moraes Advocacia

## Overview

**Creative North Star: "Edifício Modernista Paulista"**

The office lives in a modernist commercial building in central Jundiaí, and the page is built from that building's materials: green glass-tile (pastilha) fields that occupy whole sections, a whitewashed concrete (cal) floor, graphite text, bronze reserved for window frames, numerals and rules, and the cobogó (a perforated breeze-block wall: light passes, privacy stays) as the figure of confidentiality plus transparency. Every surface is a material of that building, never an app card floating over a background.

The grid is architectural. The cobogó module is the grid module (3.5rem, 56px); section rhythm, band heights and the tile grout all derive from it. Density is calm and legible: large Gloock headings on balanced lines, Source Sans 3 body at 17px, one primary action per viewport. The cobogó is a wall, never a filter: photos stay whole and stand in front of it. Motion is nearly absent; the one authored moment is the hero's cobogó wall sliding half a module as the page scrolls.

The world rejects the category's navy-and-gold with scales and gavel, and equally rejects startup legal-tech gloss. No floating cards, no soft generic shadows, no eyebrow labels.

**Key Characteristics:**
- Whole-section color fields (pastilha green or cal), not tinted cards.
- One module (3.5rem) governs cobogó openings, section spacing and grout.
- The cobogó is a wall behind photos or a band on its own, never a mask over a photo.
- Bronze appears only as 1px offset frames, numerals, rules and small square markers.
- Square geometry; controls carry a 2px radius, everything else is 0.
- One inverted "placa" (primary action) per viewport.
- One authored motion moment (the cobogó wall sliding), static under reduced motion.

## Colors

A two-material palette (green glass tile and whitewashed concrete) with graphite text, a bronze metal accent, and a muted family of tile tones that only name practice areas.

### Primary
- **Pastilha Green** (pastilha): the building's glass-tile field. Fills the header, hero, the attendance timeline, the contact panel and the footer as full-bleed sections; fills the placa on cal; theme color of the browser chrome.
- **Deep Pastilha** (pastilha-funda): hover state of the placa, footer field, the solid ground of the cobogó wall, text on a cal placa, and the page's overscroll color.
- **Middle Pastilha** (pastilha-media): rules and borders inside green fields, the color of the cobogó openings, the backing behind the hero photo, scrollbar thumb.
- **Pale Pastilha** (pastilha-clara): selected chip fill and success notices.

### Secondary
- **Bronze** (bronze): window-frame metal on cal. 1px offset frames, numerals, underline color of text links, FAQ plus/minus glyph, small square markers, global focus outline.
- **Light Bronze** (bronze-claro): the same metal on green. Frames, step numerals, the nav underline, footer column headings. On pastilha it measures 3.94:1, so it is limited to large numerals, headings at label weight and decoration.

### Tertiary
- **Area Tones** (area-civel, area-trabalhista, area-familia, area-consumidor, area-previdenciario, area-empresarial): one tile tone per practice area, used only as the tone field at the head of that area's cell in the pastilha wall. Cal text and icons sit on them.

### Neutral
- **Cal** (cal): whitewashed concrete page floor and the default surface of every light section; also the text color on green (sobre-pastilha holds the same value).
- **Dark Cal** (cal-escura): alternate floor for testimonials and the contact section, hover fill in lists.
- **Grout** (rejunte): 1px dividers, list rules and the grout lines of the area wall.
- **Graphite** (grafite): body and heading text on cal; the heavier top rule that opens FAQ and testimonial lists; the directory board border.
- **Soft Graphite** (grafite-suave): supporting text on cal (6.53:1 on cal, 5.79:1 on cal-escura) and the dotted leaders of the directory board.
- **Soft On-Pastilha** (sobre-pastilha-suave): supporting text on green (5.98:1 on pastilha).
- **Field Surface / Field Border** (campo-fundo, campo-borda): form controls only; the border measures 3.93:1 against the floor.
- **Error** (erro): invalid field border, focus outline and message.

### Named Rules
**The Two Materials Rule.** A section is either a pastilha field or a cal floor. Color is applied to the whole section, never to a card floating on it.

**The Bronze Is Metal Rule.** Bronze is the frame of a window, not paint: 1px offset frames, numerals, rules, underlines and tiny square markers only. Never a fill, never a button, never body text.

**The One Tone Per Area Rule.** Area tones exist only to tile the head of their area's cell. They do not color headings, links or any other surface.

## Typography

**Display Font:** Gloock (with Iowan Old Style, Georgia, serif)
**Body Font:** Source Sans 3 (with system-ui, -apple-system, sans-serif)

**Character:** Gloock is the high-contrast lettering of a modernist lobby sign; Source Sans 3 is the plain, legible voice of someone explaining things clearly on a phone. Gloock is used at a single weight (400); Source Sans 3 at 400, 600 and 700.

### Hierarchy
- **Display** (Gloock 400, clamp(2.5rem → 4.75rem), 1.02): the hero H1 only, cal on pastilha.
- **Headline** (Gloock 400, clamp(2rem → 3.25rem), 1.08): every section H2, balanced wrapping.
- **Title** (Gloock 400, 1.5–2rem, 1.2): H3 in area cells, timeline steps, profiles, FAQ questions (1.375–1.5rem) and the mobile menu (1.75rem).
- **Numeral** (Gloock 400, 2rem in the directory board up to 5.5rem in the timeline): figures are set in the display face, in bronze or pastilha, never in the text face.
- **Lead** (Source Sans 3 400, 1.125–1.3125rem, 1.6, max 34–38rem): supporting paragraph under a headline.
- **Body** (Source Sans 3 400, 1.0625rem, 1.6): running text, lining numerals, pretty wrapping.
- **Label** (Source Sans 3 700, 1rem–1.0625rem): buttons, field labels, chip text, nav (600).
- **Small** (Source Sans 3 400, 0.9375rem): hints, notes, footer address, registration lines.

### Named Rules
**The Lobby Sign Rule.** Headings and numerals are Gloock 400 and nothing else; emphasis comes from size, never from bold display type.

**The No Kicker Rule.** A heading stands on its own. No small uppercase label above a section title.

## Layout

A 12-column grid inside a 75rem container, with 1.25rem side margins on phones and 2rem from 640px. The cobogó module (3.5rem, 56px) is the unit of vertical rhythm: sections breathe 1.5 modules top and bottom on phones and 2 modules from 1024px; the area wall opens 2.5–3 modules down; the cobogó band above the footer is 1 module tall on phones and 2 on desktop; the tile grout is a quarter module (14px).

Headings and their supporting paragraph usually split across the grid on desktop (heading in columns 1–5/6, text from column 7/8, bottom-aligned) and stack on phones. The hero puts text in columns 1–7 and the photo in 8–12, the photo extending one module down over the next section. Behind it the cobogó wall is offset down and right: on desktop it starts 1 module + 0.75rem below the top and 1 module in from the column's left edge, runs 1 module past the right edge and 1 module below the photo; on phones the offsets are half a module. The hero clips it horizontally. Breakpoints in use: 640px, 768px, 1024px, 1280px. The header is sticky (4rem, 4.5rem from 1024px); anchor scroll padding is 5rem.

## Elevation & Depth

The system is flat. Depth is architectural: a section changes material (green to cal), a photo sits in front of a 1px bronze frame offset 0.75rem down and right (the caixilho), and the hero photo hangs in front of an offset cobogó wall and overlaps the next section by one module. There are no blurred shadows anywhere, including the floating WhatsApp button and its panel.

### Shadow Vocabulary
- **Placa edge** (`box-shadow: inset 0 0 0 1px <deep pastilha>, 0 2px 0 <bronze>`): a hard 2px bronze sill under the primary action (cal placa on green uses `inset 0 0 0 1px <cal>, 0 2px 0 <light bronze>`).
- **Overlay sill** (`box-shadow: 0 2px 0 <bronze>` on the panel, `0 2px 0 <light bronze>` plus a 1px deep-pastilha ring on the button): the floating WhatsApp button and its panel get the same hard sill as the placa, not a drop shadow.
- **Pin ring** (2px cal ring): separates the map pin from the map.
- **Hairline outline** (`box-shadow: inset 0 0 0 1px currentColor`): outline buttons and chips draw their border inside the box.

### Named Rules
**The Wall Behind Rule.** The cobogó stands behind a photo or alone; it never goes over a photo.

**The Window Frame Rule.** Raise a photo by framing it (1px bronze line, offset 0.75rem toward the bottom right), not by shadowing it.

**The Sill Not Glow Rule.** If something needs weight, give it a hard 2px edge. Never a blurred drop shadow, not even on floating elements.

## Shapes

Square. Containers, cells, photos, chips and panels have 0 radius; interactive controls (buttons, fields) carry a 2px radius, just enough to read as manufactured hardware. Circles exist only as the openings of the cobogó wall (24.5px openings on the 56px module, plus 8.3px openings offset half a module onto the vertices), the map pin (a circle with its bottom-right corner squared) and the third-party WhatsApp mark. Borders are 1px throughout; markers are 0.5rem squares.

## Components

### Buttons
Tactile hardware set into the wall.
- **Shape:** gently squared (2px), min-height 3.5rem (one module), padding 0.875rem × 1.625rem, Source Sans 3 700 at 1.0625rem.
- **Placa (primary):** the single inverted surface per viewport. Pastilha with cal text on cal sections; cal with deep-pastilha text on green sections. Edge described under Elevation. Hover darkens to deep pastilha (on green: lightens to white). Active nudges down 1px. Full width on phones where it is the main action.
- **Contorno (secondary):** transparent with a 1px inset outline in currentColor; fills pastilha on hover (cal on green). Used for the header WhatsApp action.
- **Arrow link (tertiary):** bold pastilha text, 1px bronze underline at 0.35em offset, trailing arrow that moves 3px on hover; underline turns currentColor on hover.
- **Transitions:** 200ms with the exit ease cubic-bezier(0.16, 1, 0.3, 1).

### Chips
- **Style:** rectangular subject chips in the hero, 2.75rem tall, transparent with a 1px pale-pastilha inset outline at 62% on green.
- **State:** selected fills pale pastilha with deep-pastilha text (aria-pressed); one selection at a time, optional, and it rewrites the placa's WhatsApp message.

### Cards / Containers
There are no floating cards. Grouped content is either a pastilha wall (cells sharing 1px grout) or a list separated by grout rules, opened by a graphite or bronze top rule. Panels on cal use a 1px graphite or grout border and no shadow.

### Inputs / Fields
- **Style:** near-white field surface, 1px field border, 2px radius, min-height 3.25rem, padding 0.75rem × 1rem, body size text. Labels sit above in Label weight; optional marks in soft graphite; hints at Small size.
- **Focus:** 2px solid pastilha outline at 2px offset, border turns pastilha.
- **Error:** border and focus outline switch to error red; message below in Small 600 with an icon. Hover darkens the border to soft graphite.
- **Select:** native appearance removed, a graphite chevron drawn with gradients.

### Navigation
Header continuous with the hero field: pastilha, sticky, 1px middle-pastilha bottom rule. Wordmark set in Gloock. Desktop links are Source Sans 3 600 in soft on-pastilha, 2.75rem targets, with a 1px light-bronze underline that scales in from the left on hover and stays on the current item (text turns cal). Mobile opens a full-height pastilha panel listing items in Gloock 1.75rem between middle-pastilha rules, ending with a full-width placa.

### Pastilha Wall (signature)
Practice areas as one tiled panel: a 1px grout border and 1px grout gaps between cal cells (1/2/3 columns). Each cell opens with a tone field in its area tone, overlaid by a 14px light grout grid (white at 16%), holding a cal line icon. The whole cell is the link target; hover lifts the cell surface slightly and brightens the tile.

### Cobogó Wall (signature)
A breeze-block wall: a deep-pastilha ground with middle-pastilha circular openings, 24.5px on the 56px module, plus 8.3px openings offset half a module onto the vertices. It appears in two places only. In the hero it stands behind the photo, which shows whole and unframed on a middle-pastilha backing, offset down and right as described under Layout. With scroll-driven animation support and no reduced-motion preference, the wall slides half a module up and left as the hero exits the viewport (`animation-timeline: view()`, exit 0–80%, linear). Without support it stays put; under reduced motion it never moves. The wall returns exactly once more, static and on its own, as the band between contact and footer (1 module tall on phones, 2 on desktop).

### Directory Board (signature)
Indicators read like a lobby room directory: a cal panel with a 1px graphite border, each row a Source Sans 3 600 label, a dotted soft-graphite leader filling the gap, and the value in Gloock 2rem pastilha, baseline-aligned.

### Caixilho Frame
Portraits and secondary photos (outside the hero) sit in front of a 1px bronze frame offset 0.75rem down and right (light bronze on green). Portraits are black and white.

### Timeline Steps
Steps on a green field joined by a light-bronze rule (vertical on phones, horizontal on desktop). Step numerals are Gloock in light bronze; steps still below the fold start as outline-only numerals and fill in as they enter view (600ms). Without JavaScript or under reduced motion, all steps are filled.

### Floating WhatsApp
A fixed bottom-right pastilha button with the WhatsApp mark and a retention panel above it. It hides while another placa (the hero's or the contact section's) is on screen or the mobile menu is open, so the viewport keeps one primary action. Like the placa, it is lifted only by a hard 2px bronze sill (light bronze under the button, bronze under the panel) plus its 1px ring or grout border; never a blurred shadow, even while floating over content.

## Do's and Don'ts

### Do:
- **Do** derive vertical spacing and band heights from the 3.5rem module (1, 1.5, 2, 2.5, 3 modules).
- **Do** give each viewport exactly one placa; demote everything else to the outline button or the arrow link.
- **Do** frame portraits and secondary photos with the 1px bronze caixilho offset 0.75rem, and keep portraits black and white; the hero photo is set against the cobogó wall instead.
- **Do** set every numeral and figure in Gloock, in bronze or pastilha.
- **Do** use the 2px solid outline at 2px offset for field focus, and the 2px bronze outline at 3px offset (light bronze on green) for every other focus.
- **Do** keep photos whole and set the cobogó wall behind them, offset down and right, or alone as a band.
- **Do** keep the wall's half-module slide as the only scroll-linked motion, with a static fallback and no motion under prefers-reduced-motion.

### Don't:
- **Don't** use navy-and-gold, scales, gavels or columns; don't drift toward startup legal-tech gloss.
- **Don't** place floating cards or blurred soft shadows on surfaces; depth is the 2px sill, the caixilho or a material change.
- **Don't** put an eyebrow or kicker label above a heading.
- **Don't** fill anything with bronze or set body text in it; light bronze on pastilha (3.94:1) is for large numerals and decoration only.
- **Don't** round containers; 2px on controls is the maximum radius.
- **Don't** use the big-number stat template for indicators; use the directory board.
- **Don't** lay the cobogó over a photo as a mask; it never covers faces, hands or any image.
- **Don't** add a second cobogó animation or reuse the area tones outside the pastilha wall.
