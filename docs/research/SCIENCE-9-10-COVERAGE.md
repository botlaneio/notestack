# Science9–10 source coverage and optical visuals

Source: user upload ch9-10.pdf,48 PDF pages, printed61–108 (with source pagination anomalies outside these chapters). The opening61–63 repeat the completed Heredity ending. Chapter9 is complete at64–90 and Chapter10 at91–100. The later Our Environment excerpt is outside this requested batch and is not represented as a completed chapter. Part1 Chapter6 still lacks its source afterp60; these Part2 pages do not resolve that gap.

## Inventory

Chapter9:25 guided checkpoints, including separate image-position cases;89 source tasks =14 foundations +1 summary +13 activities +5 complete tables +14 in-text questions (p72:4,p75:2,p79:5,p88:3) +4 worked examples +19 exercise parts (all17 original questions, with Q8 split into3) +2 saved written diagram parts for numerical Q10/Q11 +17 figure tasks. All16 source refractive-index entries are retained.

Chapter10:14 guided checkpoints;44 source tasks =13 foundations +1 summary +2 activities +4 in-text questions +13 exercise parts (all12 original questions, with Q5 split into2) +1 separately saved written diagram for Q7 +10 source-figure tasks. Each chapter also has7 app-authored independent questions. Written explanations/drawings use saved reasoning and explicit self-review, not automatic scientific correctness or a mastery certificate.

## Reference lock and design decisions

The established Refero/NoteStack study target remains the direct-build reference: navy/blue/white, DM Sans/Manrope, focused question–hint–feedback progression and Brilliant-style demonstration panels. The user explicitly requested labelled diagrams and interactive visuals in prior Science batches. Source ray construction/table descriptions and the actual Figure10.1 eye image were inspected to establish scientific structure. No new marketing or layout direction is introduced.

| Decision | Reference / requirement | Implementation |
|---|---|---|
| Make image construction inspectable | Source mirror/lens figures and image tables | Analytically constructed rays, object/focus presets, signed outputs and ray-direction arrows |
| Separate actual and apparent paths | Source geometric-optics conventions | Solid actual rays, dashed virtual/hypothetical extensions, pole/centre/focus rules |
| Preserve readable phone diagrams | User visual request and existing study UI | Scalable SVG plus native Enlarge diagram disclosure with a keyboard-focusable scroll region |
| Keep anatomy legible | Source Figure10.1 | Nine numbered structures and a readable label key; cornea, lens and retina distinguished |
| Distinguish physical mechanisms | Source Chapter10 phenomena | Separate correction, dispersion/recombination/rainbow and atmospheric/scattering views |
| Accept book rounding without weakening exact Maths checks | Source rounded optical worked examples | Explicit optional precision per numeric field; exact expressions remain valid; old fields retain strict behaviour |

Six tool contexts: mirror images, lens images/power, slab refraction, eye anatomy/accommodation/correction, prism/spectrum/rainbow, and atmospheric refraction/scattering. Every numbered source figure is mapped. The six concave-mirror/convex-lens cases and both convex-mirror/concave-lens limits have dedicated redraws; source ray-rule figures have selected ray views, including normal retracing through C. Optical drawings are ideal thin/paraxial or explicitly qualitative schematics, not scale measurements, clinical anatomy or personal prescriptions. Colour identifies construction rays; solid/dashed styles and text carry meaning too.

## Scientific and numerical scope

Mirror:1/v+1/u=1/f and m=−v/u. Lens:1/v−1/u=1/f and m=v/u. Objects are on the incident-left side, u<0; f sign follows the stated type. Exact object-at-focus cases have no finite image position. Object-at-infinity cases are point-image limits. Spherical f≈R/2 and thin-element formulas are paraxial approximations, not claims about arbitrary aperture/aberration. All computed rays meet at the signed formula result; real and virtual images use the correct side for their element.

Snell:n1sin(i)=n2sin(r); parallel slab faces return direction when the external medium matches. The optional total-internal-reflection setting is explicitly beyond the core transmitted-slab task. Indices depend on wavelength/conditions and optical density is not mass density. Power uses metres, not centimetres. Near/far eye-correction examples ignore spectacle–eye separation. Accommodation changes focusing while retinal distance stays approximately fixed. An uncorrected hypermetropic focus behind the retina is a hypothetical extension; myopic rays reach the retina after converging early.

Dispersion separates wavelengths already in white light; VIBGYOR names regions of a continuous spectrum. Primary-rainbow diagrams involve two refractions and internal reflection, with many droplets contributing to an observed bow. Star twinkling/planet averaging is a general contrast, not an absolute claim planets never twinkle. The approximate2minute sunrise/sunset advances are not location-specific predictions. Scattering depends on particle regime; red is not never scattered, and blue sky also depends on illumination and vision. Source donation statistics are identified as historical/unverified-current; screening, retrieval and suitability belong to accredited eye banks. No solar-focusing or clinical procedure is performed or assigned as a home action.

## Validation

All95 unit/model/inventory/regression tests pass. Checks cover signed source calculations, three-ray intersection consistency, focus/infinity limits, Snell/normal-incidence/slab/TIR distinctions, metre-based powers, eye conjugates and explicitly scoped rounding. TypeScript and the production Cloudflare static build pass. Chromium completes all39 guided checkpoints,133 source tasks and14 independent responses, including wrong-answer/hint evidence, numerical checking, written self-review, recap, save/reload, coverage links and isolated storage. All133 source solutions were opened at320px without document overflow or runtime errors. Six tool contexts,24 mirror/lens position combinations,27 source-figure views, rounded versus incorrect numeric entry, and the expanded scrollable diagram were checked. Mobile mirror/eye and desktop lens screenshots were inspected; the lens caption was clarified to describe transmission rather than mirror reflection. The shared enlarged-diagram component also passes the prior Reproduction/Heredity visual regression (all18 source-figure views). Maths navigation and the Chapter6 source gap remain correct. All106 local study routes return HTTP200. A final production smoke check precedes live deployment verification.
