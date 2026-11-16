# NoteStack
The frontend for NoteStack, a Vedant Ventures study-material store for English-medium Karnataka SSLC Class 10 Mathematics, Science and Social Science.

## Stack
- Next.js 16.4.6, App Router, React 19
- TypeScript app shell, metadata and catalogue model; migrated storefront component in JSX
- Meta Astryx core + Neutral theme 0.7.16, themed for NoteStack
- CSS, original SVG subject-pack artwork, downloadable sample PDFs

## Development
Node >=20.9.0 and npm are required.

```sh
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` creates the normal Next.js production application; `npm start` serves it. `npm run build:static` exports the current frontend to `out/` for static hosting. The export is only for the current frontend: server routes, authentication and payment integrations will need a Next.js runtime when added.

## Checks
```sh
npm test
npm run typecheck
npm run build
```

## Project structure
- `src/app/`: server-rendered routes, layouts, metadata, Astryx providers and global CSS
- `src/components/`: storefront interactions and shared brand component
- `src/data/`: catalogue and sample content, ready to replace with a content source
- `src/lib/`: catalogue model and cart pricing/validation
- `public/notestack/`: brand and subject-pack SVGs
- `public/samples/`: free sample PDFs
- `tests/`: cart validation and bundle-pricing tests

## Current scope
This is the actual prelaunch storefront frontend. Search, subject filters, saved packs, product details, interactive sample notes, downloads and a persistent bag are implemented. Browser state loads after hydration to avoid server/client markup mismatches.

Orders are not yet open. The simulated checkout, fake order success and demo library have been removed. `/checkout` is an ordering-information page until real checkout is connected. No payment, login, purchase history or paid-file access backend has been implemented. Pricing, final pack contents and delivery format are still business decisions. Sample content is pending teacher/syllabus review.

Cloudflare hosting is configured for `notestack.shop`; DNS activation is pending the registrar nameserver change. The existing Sites deployment is separate. Browser QA is unavailable in this environment; build, typechecking and data/business-rule checks are used.

## Account frontend
`/sign-in`, `/sign-up`, `/forgot-password` and `/account` are implemented and linked from the storefront. Shared Astryx forms provide client-side validation, password visibility, autocomplete and accessible error feedback. The account page is a signed-out entry point. Authentication is not connected: forms explicitly report unavailability rather than creating fake accounts, sessions or reset emails. Credentials are not saved in browser storage or submitted anywhere.


## Cloudflare deployment

Cloudflare Workers Static Assets serves the current Next.js static export. No authentication or payment backend is added by deployment.

```sh
npm ci
npm run build:cloudflare
npm run deploy:cloudflare
```

The Cloudflare Vite build copies `out/` without transforming Next's output. Configuration lives in `cloudflare/`; `cf deploy --prebuilt` deploys the validated build. Local deployment requires `cf auth login` or `CLOUDFLARE_API_TOKEN`. Never commit credentials.

Workers Builds is connected to `botlaneio/notestack`, with production builds on `main`. Build command: `npm run build:cloudflare`; deploy command: `npm run deploy:cloudflare`. It uses the existing account build token.

The Cloudflare zone is on the Free plan. At Hostinger, change the domain's nameservers to `eoin.ns.cloudflare.com` and `nova.ns.cloudflare.com` after ensuring any existing mail/verification DNS records are copied. The Cloudflare zone initially contained no records; the Worker custom domain is configured automatically. Nameserver changes and certificate activation can take time.

When server routes, real authentication or payments are added, revisit the static export hosting choice.


## Guided Maths chapters
`/learn/maths/` lists ten interactive guided chapters linked from the homepage. The existing `/learn/maths/real-numbers/` URL and saved progress remain supported.

- Real Numbers: 30 guided checks, a prime-factor explorer, all 21 textbook exercise subparts, 5 additional written theorem/example tasks, an independent chapter check and a source coverage map.
- Polynomials: 18 guided checks, graph zeroes and quadratic/cubic coefficient relationships.
- Pair of Linear Equations in Two Variables: 19 guided checks, three graph cases, substitution and elimination.
- Quadratic Equations: 19 guided checks, factorisation and discriminant/root exploration.
- Arithmetic Progressions: 21 guided checks, a sequence builder, nth terms and sums.
- Triangles: 21 guided checks, similar figures, BPT and its converse, similarity criteria and a parallel-cut explorer.
- Coordinate Geometry: 21 guided checks, distances, internal division, midpoint and two coordinate explorers.

Every chapter has worked explanations, two hints per check, retries, simpler wording and a revision recap. Content coverage was checked against the user-supplied KTBS Maths Part 1 and Part 2 2026–27 PDFs; explanations and practice are original and awaiting teacher review. The PDF is not included in the published assets.

Progress saves separately per chapter in one browser. It is not account-based or synced across devices. The shared lesson player preserves the Chapter 1 storage key and validates restored state against each chapter’s question set.


### Real Numbers source coverage
The `/learn/maths/real-numbers/` workspace now has guided learning, `/practice/`, `/check/` and `/coverage/` modes. All Chapter 1 sections, theorem statements, seven worked examples and 21 exercise subparts are explicitly mapped in `docs/research/REAL-NUMBERS-COMPLETE-COVERAGE.md`. Calculations are checked; proof drafts are saved and explicitly self-reviewed against models, not automatically graded as correct. Teacher verification remains pending. Legacy guided progress is migrated by question ID, and inserting new checkpoints does not grant completion of the new material. Chapters 2–7 now use the same four-mode workspace; see `docs/research/CHAPTERS-2-7-COMPLETE-COVERAGE.md` for the per-item inventory and assessment boundaries.

### Chapters 2–7 expanded practice
All six chapters include `/practice/`, `/coverage/` and `/check/` routes, mapping 257 exercise subparts and 67 foundation/worked-example activities, plus 42 fresh independent tasks. Fractions and square roots are accepted in typed answers. Written work and graph construction remain explicit self-review rather than automatic proof grading. Construction points, drafts and answers save separately for each chapter and mode.

### Chapters 8–10: Part 2
Introduction to Trigonometry (25 guided checks), Some Applications of Trigonometry (18), and Circles (20) now have the same four-mode workspace. The source map includes 84 exercise subparts, 31 worked-example/foundation activities and 21 independent tasks. New explorers cover angle-dependent ratios, elevation with eye height, and tangent counts/contact geometry. See `docs/research/CHAPTERS-8-10-COMPLETE-COVERAGE.md` for every source item, domain restrictions and assessment boundaries. Chapters 11 onward are outside this update.
