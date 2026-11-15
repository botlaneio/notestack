# Next.js frontend migration
Migrated the existing repository to /workspace/sites/notestack. Retained Site identity and private access. Replaced Vite with actual Next.js 16.4.6; App Router server layout/page, client Astryx Theme + Next Link provider, metadata, missing-page route and ordering-information route.

Removed simulated checkout, success state and browser-local fake library. Replaced preview messaging with prelaunch store copy. Retained sample-content qualifications because full verified material is not yet present. Saved bag/favourites initialise identically on server/client and restore after mount; persistence waits for restoration.

Default build/start use normal Next.js. Optional static export supports current Sites hosting; backend work will require a server runtime. No authentication, payment, order creation or paid-file delivery is falsely represented as implemented.

Validation: meaningful cart validation/pricing tests, TypeScript checks, Next.js production build, static-export build and exported-route/asset checks. Browser verification remains unavailable due to the known CUA runtime failure.
