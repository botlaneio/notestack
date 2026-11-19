# NoteStack design system

The tokens live in `src/app/design-system.css`, which loads after `globals.css`. Use the `--ns-*` variables for new work.

## Look

NoteStack looks like a bright, friendly study app. Pages sit on a pale grey canvas with white cards and a simple white top bar. The headline is centred, every subject has its own colourful card, buttons are pills and shadows are soft. Phones come first because most students study on one.

## Colour

| Token | Value | Use |
|---|---|---|
| `--ns-accent` | `#4f46e5` | NoteStack indigo, the only action colour: buttons, links, active chips. White text on it is 6.3:1. |
| `--ns-accent-hover` / `--ns-accent-wash` | `#4338ca` / `#eef0ff` | Hover, tinted promo panels |
| `--ns-ink` / `--ns-text-muted` | `#1f2537` / `#586178` | Text, secondary text (5.8:1 on the canvas) |
| `--ns-canvas` / `--ns-surface` | `#f6f7fb` / `#fff` | Page background, cards |
| `--ns-border` | `#dfe3ec` | Hairlines |
| Subject cards | maths `#d7e8ff`, science `#d3f4e3`, social `#ffe3c8`, collection `#e6e1ff` | Behind covers and subject panels only |

## Type

DM Sans throughout. Body text uses weight 400 and headings 700. Nothing a student reads is under 12px, and body text on phones is 15 to 16px.

## Shape and space

- 8px spacing scale (`--ns-space-1` to `--ns-space-10`).
- Radius: 8px inputs, 16px cards, 24px feature cards and panels, pills for buttons and chips.
- One soft shadow per element (`--ns-shadow-sm`, `-md`, `-lg`).
- Tap targets of at least 44px.
