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

The custom domain has not been connected. The current Site remains private. Browser QA is unavailable in this environment; build, typechecking and data/business-rule checks are used.
