# NoteStack / Karnataka SSLC pilot storefront
A NoteStack presentation demo under Vedant Ventures, evolving the earlier FMPL-inspired storefront with actual Meta Astryx components.

## Run
`npm install`, `npm run dev`, `npm run build`. Run `node scripts-check.mjs` for rendering, cart pricing, data and asset checks. `python scripts/make-samples.py` regenerates the original two-page PDF samples (requires reportlab).

## Demo experience
Three proposed English-medium Karnataka SSLC Class 10 packs: Mathematics, Science and Social Science at ₹600 each. All three automatically apply the proposed ₹1,500 bundle price. Search, subject filters, saved packs, pack details, contents tabs, interactive three-page sample reader, sample PDFs, persistent bag, simulated checkout and browser-local sample library.

No real payment, account, checkout backend or full subject material. All educational sample content is original and illustrative, pending teacher/final syllabus review. No claim of school or board endorsement. Digital delivery is a demonstration assumption. notestack.shop is the intended brand domain and has not been connected here.

## Design and verification
Source decisions: docs/research/NOTESTACK-DESIGN.md. Prior FMPL research is retained as historical reference. Browser QA remains blocked by the CUA environment; unit pricing, React rendering, assets and production build are checked.
