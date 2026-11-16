# Two appendices: source map and implementation

Source: the user-provided KTBS Mathematics 2026–27 Part 1, printed pp112–132 (A1), and Part 2, printed pp106–116 (A2). These are appendices, not chapters 15–16; the index retains fourteen main chapters and has a separate appendix section. Internal numeric keys 15/16 are implementation identifiers only. The PDF files are not deployed. One embedded source forest figure is extracted for the sampling exercise, with its reference and interpretation retained; other explanations and prompts are authored adaptations.

## Inventory

A1 has 25 guided checkpoints, 83 source-mapped activities and 7 fresh independent responses. The activities include all 15 numbered examples (multi-part examples remain grouped), both named theorems, three foundational investigations, and all 63 exercise subparts:

| Exercise | Activities |
| --- | ---: |
| A1.1 | 17 |
| A1.2 | 7 |
| A1.3 | 6 |
| A1.4 | 15 |
| A1.5 | 12 |
| A1.6 | 6 |

Coverage includes precise statements, quantifiers and domains, sufficient conditions, deduction versus true premises, observations/conjectures/theorems, exhaustive cases, rational closure, the circle-region counterexample, converse Pythagoras, negation scope, converses, contradiction, parity/divisibility and the shortest perpendicular. The BPT exercise uses an area proof to avoid assuming its conclusion. The regions lab explicitly assumes general position; its binomial-count formula is labelled an extension rather than attributed to the source as a proved result.

A2 has 20 guided checkpoints, 13 source-mapped activities and 7 fresh independent responses. The six exercise activities cover A2.1 Q1, A2.2 Q1(i)/(ii), Q2, Q3 and A2.3 Q1. Two worked examples, fish illustration, five stages, terminology, introduction and importance are also mapped. All five modelling stages are present, including validation/revision. The forest task displays the actual source figure and supplies a sampling method, not a fabricated exact census. Its numerical illustration is explicitly separate from image measurements. School-result input values are explicitly illustrative; actual school data has not been invented or fetched.

## Source corrections and language ambiguities

- A1.1 Q1(iii): distinguish ageing from reaching old age; state the book's ordinary intended reading.
- A1.1 Q3(iii): the source key uses exclusive “either/or”; inclusive OR gives a different judgement. Both interpretations are explained.
- A1.2 Q5: opposite angle D is 80°, not the answer key's 180°.
- A1.2 Q7: 3721=61²; the primality premise is false, despite valid deduction form.
- A1.4 Q2(iii): “one” can mean at least one (correct negation) or exactly one (not equivalent, consistent with key). Explain scope rather than silently rewriting the source.
- A1.4 Q2(iv): “all not” is not the same as “not all”; use an unambiguous existence claim.
- A2 Example 2: 20×1200/1790≈13.41%, not printed 13.14%.
- A2.2 Q3: 800×1200/54000≈17.78%, not key's 17.74%.
- Instalment comparisons explicitly use the book's principal-month simple-interest approximation, not full amortisation; payment dates and fees matter. Do not silently substitute a different loan convention.

## Interaction and review

Four stable routes per appendix: guided study, textbook practice, appendix check, coverage. All response records are independent of existing chapter records, saved by task/step IDs in local browser storage. Guided checks, written self-review and numeric correctness are separate. Proofs and modelling explanations are never auto-graded from their text: submission, model comparison and criterion checks record only self-review. Teacher verification remains pending. Fresh independent questions hide solutions until submission and have no hints.

Interactive tools: irregular-circle chord diagram and region conjecture, implication/converse/negation truth values, mark–recapture including impossible inputs and zero recaptures, rabbit recurrence with pair/individual counts, fair ordered dice, and five-year mean/trend forecasting. Forecasts outside 0–100% are exposed as model limitations. Lab edits are temporary; written responses persist.

## Reference lock / decisions

Build target: existing NoteStack lesson system, as documented in REAL-NUMBERS-PILOT.md and REAL-NUMBERS-COMPLETE-COVERAGE.md. Refero skill applied. Preserve navy #182c42, blue #3156a1, white, DM Sans/Manrope and the focused single-activity structure. Reuse Brilliant demonstration stage (style b36dc35b-59df-4a85-8927-9a46308575e0) for live mathematical tools and Duolingo check/feedback/continue sequence (screen 91791b8a-26e5-4020-b987-6227803a6987) for lesson progression. Existing tables, labelled native controls, status copy, hints and review affordances are reused. Appendix cards follow the established chapter index and are structurally separated rather than changing the main chapter numbering.

## Validation

Automated tests cover exercise inventory, sections, examples, theorems, valid response schemas, ungraded written state, recurrence initial conditions, capture zero/invalid inputs, source finance corrections, region counterexamples and impossible forecasts. Browser validation and production evidence are recorded after verification below.

Local validation: 58 unit tests passed; TypeScript and the static/Cloudflare production build passed. Headless Chromium completed all 45 guided checks, 96 source activities and 14 independent responses, including submission/model/checklist flow, coverage links and save/reload restoration. Separate checks covered live lab controls, invalid and zero recaptures, month-16 rabbit count, forecast validation, source-figure loading, appendix labels and all eight appendix routes at 320px/390px with no page overflow or browser runtime errors. Desktop/mobile screenshots were inspected; the final visual pass corrected appendix heading labels and enlarged numeric input targets.
