# Account frontend
Routes: /sign-in, /sign-up, /forgot-password, /account. Storefront header and footer link into the pages; account route is an honest signed-out screen rather than fake purchase/profile data.

Design lock: existing NoteStack canvas, navy/blue/coral roles, Manrope/DM Sans and original subject-cover artwork retained. Monday registration screen 3ca62aea-39a7-4b66-ae74-7215ea636090 supplies split composition and labelled field hierarchy; Cal recovery 48a1e812-f5d1-48ce-a9a3-655111c33289 supplies one-email reset structure and back-to-sign-in link. Source palettes, logos and imagery rejected in favour of existing NoteStack tokens. No fabricated reviews or customer claims. Shared auth layout adapts to one column on mobile.

Implementation: actual Astryx TextInput with inline attached error status, Button submit, root Neutral theme. Reusable typed AuthForm and pure validation. Required name (signup), email, password; signup minimum 8 characters; sign-in preserves existing-password flexibility. Password show/hide, autocomplete, accessible labels, first-invalid-field focus, service-status focus and live message. Native forms prevent default network submission. No credentials enter URLs, localStorage, analytics or network requests. No account/session/email success is fabricated. Availability is visible before submission.

Scope: frontend only. Backend provider, email verification/delivery, password reset token handling, session enforcement and protected account data require later integration. No fake social login or placeholder legal acceptance.

Validation: TypeScript and production/static builds; validation tests for missing/malformed data, signup vs sign-in rules, password recovery and unavailable-service wording. Static route checks for titles, required fields and links. Browser QA remains unavailable due to the previously established CUA runtime error.
