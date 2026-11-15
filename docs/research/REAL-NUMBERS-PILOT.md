# Real Numbers guided pilot

## Scope and content
User-supplied outline: 1.1 Introduction; 1.2 The Fundamental Theorem of Arithmetic; 1.3 Revisiting Irrational Numbers; 1.4 Summary. Original explanations and questions; not a reproduction of textbook pages. Teacher review pending. Includes HCF/LCM applications, square-root proofs and a rational-plus-irrational extension. No Euclid algorithm or unrelated chapter.

## Reference lock and decision ledger
Build target: existing NoteStack design system (navy #182c42, maths blue #3156a1, DM Sans/Manrope, white surfaces). Keep existing storefront identity.

| Decision | Source | Adaptation |
| --- | --- | --- |
| Single focused activity with generous whitespace | Brilliant hands-on optimism, style b36dc35b-59df-4a85-8927-9a46308575e0 | Live factor lab is the visual demonstration; tinted backing confined to the experiment |
| Clear progress, check then feedback then continue | Duolingo lesson screen 91791b8a-26e5-4020-b987-6227803a6987 | One primary action; no lives or penalty system |
| Revisiting errors before completion recap | Duolingo Beginner Lesson Completion flow 11811 | Recap links to any step with a mistake or hint |
| Tactile choices and readable compact copy | Duolingo buoyant bite-sized delight, style bd4b3de7-fd30-4620-a8ca-e850b0f2817b | 44px+ targets, clearly selected options; preserve NoteStack typography and colour roles |
| Local progress and explain-simply option | User request and existing frontend-only architecture | No account claim or cross-device sync; local saving explicitly labelled |

Reject: marketing hero in the lesson, unrelated decorative imagery, fabricated AI chat, mastery certificates based on retries, streak pressure. Green marks successful checks only. Amber is supportive feedback, not a punitive error. Media: code-native factor tree with real mathematical relationships.

## State and accessibility
15 checks. Correct answer required for Continue. Section navigation permits review and exploration, but summary requires all checks. Historical wrong answers/hints remain in revision record after correction. Versioned, sanitised local storage, restored after hydration; storage failures announced. Reset requires confirmation. Native radio groups, semantic fieldsets/legends, visible focus, live feedback, focus moved to new heading, accessible progress. Shared-device limitations shown.

## Validation
10 unit tests passed, including state sanitisation, retry history and restoring earned completion. Typecheck and static/Cloudflare build passed. Headless Chromium completed all 15 questions, wrong-answer retry, hints, both factor routes, reload/resume, personalised recap/review and confirmed reset. Desktop (1440px) and mobile (390px) screenshots inspected: existing brand retained, readable choices, no horizontal page overflow, visible success/hint distinctions. No browser runtime errors.
