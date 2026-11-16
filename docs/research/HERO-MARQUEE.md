# Hero artwork marquee

Build target: user-provided screenshot and existing NoteStack hero composition. Refero workflow applied; existing visual research is in NOTESTACK-DESIGN.md (Counter-Print book-led compositions, Preply clarity and Awwwards publication catalog). Preserve the split hero, pale grid, circular backing, subject cover typography and blue/green/ochre cover roles. The collection artwork leads, followed by Mathematics, Science and Social Science, using the original editable cover assets rather than unrelated imagery.

The four compositions move continuously horizontally at a constant speed; a second decorative set creates a seamless loop. Preserve existing copy and product actions. Hover/focus pauses motion; an explicit toggle supports touch and keyboard. Reduced motion disables animation and exposes a horizontally scrollable, snapping four-panel strip, with decorative duplicates hidden. No new image download or third-party animation library is required. Animation uses only transform.

Validation: TypeScript and the static/Cloudflare production build passed. Chromium verified panel order, advancing transform, hover pause, manual pause/play, reduced-motion scrolling to the fourth panel and no page overflow at 320/390px. Desktop and mobile screenshots were inspected; no browser runtime errors were observed.
