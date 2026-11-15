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


## Guided chapter pilot
`/learn/maths/real-numbers/` is a free interactive Chapter 1 pilot linked from the homepage. It follows the supplied Real Numbers outline with 15 checks, a factor-tree explorer, worked explanations, graduated hints, retries and a revision recap. Progress saves locally in one browser; it is not account-based or synced across devices. Original content is awaiting teacher review.
