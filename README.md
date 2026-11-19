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

## Accounts and sign-in
Students can create an account, sign in, sign out and manage their devices. The account service is a Cloudflare Worker (`cloudflare/src/`) in front of the static site; only `/api/*` requests reach it.

- Storage: Cloudflare D1 database `notestack-accounts`, created on first deploy. Tables are created automatically on the first request (`SCHEMA` in `cloudflare/src/auth.ts`).
- Passwords: PBKDF2-SHA256, 100,000 iterations, per-user salt. Plain passwords are never stored or logged.
- Sessions: a random 256-bit token in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie (`ns_session`), stored only as a SHA-256 hash, valid 30 days.
- Sharing limit: each account can be signed in on 2 devices (`MAX_DEVICES`). A third sign-in signs out the least recently used device, which is told why. Students can see and remove devices on `/account/`. Lesson pages show the signed-in student's name and email.
- Abuse protection: 8 failed sign-ins for an email within 15 minutes locks that email for 15 minutes. State-changing requests must be same-origin JSON.
- Owned subjects: the `entitlements` table maps users to products: `mathematics`, `science`, `social-science`, or `core-collection` (all three). `/api/auth/session` returns the subjects a student owns, with the full pack expanded, and `/account/` shows each owned subject as its own book linking to its lessons. Payments will insert rows here (`AuthService.grant`). To grant a pack by hand, run this in the Cloudflare dashboard D1 console for `notestack-accounts`: `INSERT INTO entitlements (user_id, product_id, source, created_at) SELECT id, 'core-collection', 'manual', unixepoch()*1000 FROM users WHERE email = 'student@example.com';`
- Password reset: `/forgot-password/` emails a one-time link (valid 30 minutes, newest link only, at most 3 per hour) through Resend. `/reset-password/` sets the new password, signs out every device and signs in the current one. The response never reveals whether an email has an account. Needs the `RESEND_API_KEY` secret (`cd cloudflare && npx cf workers secrets update RESEND_API_KEY`); without it the page says reset is unavailable. The sender is `EMAIL_FROM` in `cloudflare/cloudflare.config.ts`.
- Lesson lock: the Worker checks every `/learn/<subject>/<chapter>/` request. Students who own the subject (or the full pack) get the page; everyone else is sent to `/unlock/`. Each subject's chapter list and first chapter stay free (`FREE_CHAPTERS` in `cloudflare/src/auth.ts`). Lesson text is also inside the site's JavaScript files, so this stops sharing and casual access but not someone digging through those files.
- House account: emails in `ADMIN_EMAILS` (`cloudflare/cloudflare.config.ts`, currently admin@botlane.io) open every subject, have no device limit, and can use `/admin/` to find students, unlock or remove packs, and sign them out. Admin powers need the email to be confirmed. Unlocking a pack emails the student.
- Email confirmation: sign-up emails a confirmation link (`/verify-email/`, valid 48 hours, at most 3 per hour). The account page asks unconfirmed students to confirm and can resend the link. A password reset also confirms the email.
- Change password: on `/account/`. Needs the current password and signs out every other device.
- Progress: lesson pages record the last chapter opened and let students mark a chapter done. `/account/` shows "Continue where you left off" and chapters done per subject. Saved per account, so it follows the student across devices.
- Not yet: payments, phone OTP and account deletion.

API: `POST /api/auth/sign-up`, `POST /api/auth/sign-in`, `POST /api/auth/sign-out`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `POST /api/auth/verify-email`, `POST /api/auth/resend-verification`, `POST /api/auth/change-password`, `GET /api/auth/session`, `DELETE /api/auth/devices/:id`, `POST /api/progress`, and for admins `GET /api/admin/users?q=`, `POST /api/admin/grant`, `POST /api/admin/revoke`, `POST /api/admin/sign-out`.

Local testing of accounts needs the Worker, not `npm run dev`: run `npm run build:cloudflare`, then `npx vite preview --config cloudflare/vite.config.ts` and open the printed URL. `npm run dev` still works for content pages; sign-in there reports that accounts are unavailable.


## Cloudflare deployment

Cloudflare Workers Static Assets serves the Next.js static export, and the Worker in `cloudflare/src/worker.ts` handles `/api/*` (accounts). No payment backend exists yet.

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
`/learn/maths/` lists fourteen interactive guided chapters linked from the homepage. The existing `/learn/maths/real-numbers/` URL and saved progress remain supported.

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

### Chapters 11–12: mensuration batch
Areas Related to Circles (18 guided checks) and Surface Areas and Volumes (22) have the same four-mode workspace, mapping all source questions into 37 exercise activities, plus 15 worked-example/foundation activities and 14 independent tasks. New explorers compare sector/segment complements and joined/separate composite boundaries. See `docs/research/CHAPTERS-11-12-COMPLETE-COVERAGE.md` for constants, rounding, boundary conventions and the complete source map. Statistics and Probability remain outside this batch.

### Chapters 13–14: complete curriculum
Statistics and Probability each include 25 guided checks, with 79 source exercise activities, 27 example/foundation activities and 14 independent tasks across the pair. Accessible source tables, live frequency calculations, ordered dice/coin sample spaces and a finite-trial simulator extend the same four-mode workspace. See `docs/research/CHAPTERS-13-14-COMPLETE-COVERAGE.md` for the complete inventory, explicit rounding/model assumptions and assessment boundaries. All Chapters 1–14 are now represented; written work still requires teacher verification.
