# Animated NoteStack mark
Reference lock: preserve existing navy tile, white three-page stack, dimensions and wordmark. Apply the already-used Refero motion guidance: feedback through small movement, 120ms hover/focus, 320ms entrance with 35ms stagger, transform/opacity only, and static reduced-motion fallback. No new visual direction or dependency.

LogoIcon is a typed, server-renderable React SVG component. Pages settle upward once on entry; hover or keyboard focus gently separates the top/bottom layers. Press returns the stack to rest. Nested SVG groups keep entry and interaction transforms independent. No looping animation, JavaScript timer or layout shift. Small Brand instances are static by default; Brand animated and LogoIcon animated props allow explicit control. An optional label supports accessible standalone use; wordmark-adjacent instances are decorative. Print and reduced-motion preferences disable movement.

Integration: shared Brand covers storefront, footer, authentication pages, account and ordering-information pages automatically. Browser visual QA is still unavailable; TypeScript and production/static compilation validate the implementation.
