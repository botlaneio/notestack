# Textbook coverage audit

Audit date: 19 November 2026. Scope: 14 Maths chapters, 12 Science chapters, 33 Social Science chapters and the two Maths appendices.

## Finding

The chapter rollout is complete. Full textbook-item coverage and independent answer accuracy are not certified. The earlier statement that all chapters are available is supported by the application inventory. It must not be interpreted as a completed page-by-page accuracy review.

## Evidence checked

- Located and extracted all 19 PDFs retained in the workspace. Source names, PDF page counts and SHA-256 fingerprints are recorded in source-files.json. Overlapping extracts are separate files, rather than additional chapters.
- Enumerated all 59 main chapter configurations. Every chapter has a guide and workbook configuration, and none declares sourcePending. This is an application status check, not proof that every source item is present.
- Compared source numbered worked-example identifiers with Maths Chapters 2–7 practice references. Counts match respectively 5, 10, 9, 16, 8 and 10, with no missing identifier in those chapters.
- Compared readable numbered Science activity identifiers against practice references. No unmatched identifier was found in the inspected text. Some PDFs use encoded fonts and split text, so absence from extraction is not evidence of absence from the textbook.
- Reviewed the earlier Maths and Science coverage documents and regression tests. They contain detailed inventories and source corrections. These are implementation evidence rather than independent certification of every solution.
- Revisited the later Social Science source pages and their JSON mappings and interactive components. The confirmed visual and granularity gaps below prevent a full-coverage claim.

## Confirmed gaps and limits

| Area | Finding | Work needed before certification |
|---|---|---|
| Social 12, Soils | The source has a regional soil-distribution map. The current explorer gives selected point examples, rather than the full regional extent and legend. | Map each source region and its legend to a reviewed reconstruction or explicit guided map-reading activity. |
| Social 18, Freedom Struggle | Thirty guided steps cover the numbered questions and several broad topics across a 23-page chapter. Several portraits, sidebars and individual leader accounts are combined under broad foundation entries. | Build an explicit page/item ledger and verify each account against an individual explanation. |
| Social 22, World Organisations | The source diagram has all six UN principal organs. The comparison tool includes only selected organs alongside agencies. | Provide a complete six-organ visual and distinguish organs, funds, specialised agencies and separate organisations. |
| Social 25–29, Geography | Source maps show crop, mineral, transport, industrial and hazard regions. Explorers use three representative locations per chapter. | Review the full mapped source content, legends, route extents and regions. Three dots cannot certify complete map coverage. |
| Social 11–33 generally | Numbered end questions are mapped, but later batches have few explicit source-map, portrait or sidebar records. | Reconcile every source visual and unnumbered activity individually. Reference counts alone are insufficient. |
| Maths and Science visuals | Earlier inventories and schematic diagrams exist. This audit has not independently validated every label, orientation, datum or required construction against the source image. | Complete a figure-by-figure visual check and record the result. |
| Written answers across subjects | Saved model comparison and self-review are available. The application explicitly leaves factual and reasoning verification pending. | Independent subject review of model answers and written-work criteria. |
| Fieldwork and projects | Several tasks are preparation plans or source-based alternatives. They cannot establish that a visit, experiment, discussion or interview occurred. | Preserve their activity status and assess actual student work separately. |

## Chapter inventory

Counts below describe implemented entries. They do not measure complete source coverage. Visual-reference counts search explicit reference/prompt labels and may undercount visuals rendered through shared components.

| Subject | Chapter | Title | Guided steps | Practice entries | Independent entries | Explicit visual references |
|---|---:|---|---:|---:|---:|---:|
| Maths | 1 | Real Numbers | 30 | 26 | 9 | 0 |
| Maths | 2 | Polynomials | 18 | 24 | 7 | 7 |
| Maths | 3 | Pair of Linear Equations in Two Variables | 19 | 49 | 7 | 0 |
| Maths | 4 | Quadratic Equations | 19 | 40 | 7 | 0 |
| Maths | 5 | Arithmetic Progressions | 21 | 115 | 7 | 0 |
| Maths | 6 | Triangles | 21 | 60 | 7 | 3 |
| Maths | 7 | Coordinate Geometry | 21 | 36 | 7 | 1 |
| Maths | 8 | Introduction to Trigonometry | 25 | 66 | 7 | 1 |
| Maths | 9 | Some Applications of Trigonometry | 18 | 23 | 7 | 0 |
| Maths | 10 | Circles | 20 | 26 | 7 | 1 |
| Maths | 11 | Areas Related to Circles | 18 | 25 | 7 | 1 |
| Maths | 12 | Surface Areas and Volumes | 22 | 27 | 7 | 0 |
| Maths | 13 | Statistics | 25 | 35 | 7 | 0 |
| Maths | 14 | Probability | 25 | 71 | 7 | 0 |
| Science | 1 | Chemical Reactions and Equations | 27 | 67 | 7 | 0 |
| Science | 2 | Acids, Bases and Salts | 37 | 72 | 7 | 0 |
| Science | 3 | Metals and Non-metals | 27 | 71 | 7 | 0 |
| Science | 4 | Carbon and its Compounds | 31 | 63 | 7 | 0 |
| Science | 5 | Life Processes | 26 | 68 | 7 | 0 |
| Science | 6 | Control and Coordination | 23 | 66 | 13 | 10 |
| Science | 7 | How do Organisms Reproduce? | 21 | 63 | 7 | 12 |
| Science | 8 | Heredity | 12 | 30 | 7 | 6 |
| Science | 9 | Light – Reflection and Refraction | 25 | 89 | 7 | 17 |
| Science | 10 | The Human Eye and the Colourful World | 14 | 44 | 7 | 10 |
| Science | 11 | Electricity | 17 | 102 | 7 | 13 |
| Science | 12 | Magnetic Effects of Electric Current | 13 | 61 | 7 | 16 |
| Social Science | 1 | The Advent of Europeans to India | 23 | 52 | 7 | 1 |
| Social Science | 2 | The Extension of the British Rule | 17 | 29 | 7 | 0 |
| Social Science | 3 | The Impact of the British Rule in India | 26 | 49 | 7 | 0 |
| Social Science | 4 | Opposition to British Rule in Karnataka and Wodeyars of Mysore | 26 | 59 | 7 | 8 |
| Social Science | 5 | Social and Religious Reform Movements | 22 | 57 | 7 | 9 |
| Social Science | 6 | Public Administration—An Introduction | 24 | 52 | 7 | 0 |
| Social Science | 7 | Challenges of India and Their Remedies | 25 | 56 | 7 | 9 |
| Social Science | 8 | Social Stratification | 14 | 28 | 7 | 0 |
| Social Science | 9 | Work and Economic Life | 20 | 39 | 7 | 3 |
| Social Science | 10 | India — Geographical Position and Physical Features | 26 | 60 | 7 | 3 |
| Social Science | 11 | India – Seasons | 11 | 16 | 2 | 1 |
| Social Science | 12 | India – Soils | 11 | 15 | 2 | 1 |
| Social Science | 13 | India – Forest Resources | 15 | 20 | 2 | 1 |
| Social Science | 14 | India – Water Resources | 16 | 25 | 2 | 0 |
| Social Science | 15 | Economy and Government | 19 | 28 | 2 | 0 |
| Social Science | 16 | Bank Transactions | 17 | 25 | 2 | 0 |
| Social Science | 17 | The First War of Indian Independence (1857) | 10 | 12 | 2 | 0 |
| Social Science | 18 | The Freedom Struggle | 30 | 68 | 2 | 1 |
| Social Science | 19 | India after Independence | 10 | 18 | 2 | 0 |
| Social Science | 20 | World Wars and India’s Role | 15 | 19 | 2 | 0 |
| Social Science | 21 | India’s Foreign Policy and Global Challenges | 14 | 17 | 2 | 0 |
| Social Science | 22 | World Organisations | 26 | 30 | 2 | 1 |
| Social Science | 23 | Collective Behaviour and Protests | 17 | 21 | 2 | 0 |
| Social Science | 24 | Social Challenges | 19 | 23 | 2 | 0 |
| Social Science | 25 | India – Land Use and Agriculture | 14 | 20 | 2 | 1 |
| Social Science | 26 | India – Mineral and Power Resources | 12 | 14 | 2 | 2 |
| Social Science | 27 | India – Transport and Communication | 15 | 22 | 2 | 1 |
| Social Science | 28 | India – Major Industries | 14 | 18 | 2 | 1 |
| Social Science | 29 | India – Natural Disasters | 11 | 15 | 2 | 1 |
| Social Science | 30 | Rural Development | 16 | 18 | 2 | 1 |
| Social Science | 31 | Public Finance and Budget | 18 | 24 | 2 | 0 |
| Social Science | 32 | Entrepreneurship | 12 | 16 | 2 | 0 |
| Social Science | 33 | Consumer Education and Protection | 15 | 24 | 2 | 0 |

The Maths appendices are implemented separately and are outside the 59 main-chapter rows.

## Completion criterion

Certification requires a ledger covering every source page, numbered exercise/subpart, worked example, activity, table, sidebar and figure, with the implemented location and a reviewed result. Rows currently represented only by broad topics or sample locations remain unresolved. Passing software tests and HTTP checks establish application behaviour, not that certification.
## Maths appendices

| Appendix | Practice entries | Independent entries |
|---|---:|---:|
| Proofs in Mathematics | 83 | 7 |
| Mathematical Modelling | 13 | 7 |

Software regression result during this audit: all 137 existing tests pass. The remaining coverage and accuracy findings above are unaffected by that result.

## First remediation batch

The UN explorer now includes all six principal organs with their individual roles. Specialised agencies have a separate selector group. A dedicated source-visual review task is mapped to printed page 54.

Soils and Chapters 25–29 now have guided full-map-reading checklists covering categories, source legends, regions, routes, orientation, source dates and annotation review. Their coverage pages include explicit visual-review tasks. These activities require the learner’s supplied textbook. The application still uses representative locator points rather than reconstructed regional polygons or complete route geometry. The corresponding visual-reconstruction and independent-review findings remain open.

The Freedom Struggle page/item ledger, later sidebars and portraits, and independent Maths/Science accuracy review also remain open. This batch does not certify whole-book completeness.

First-batch validation: all 137 regression tests and the production build pass. Mobile browser checks verify all six organ buttons and roles, the agency selector group, exactly one map-reading panel per lesson, working checklist state and source-review entries in all six coverage pages. The mobile UN display was visually inspected.

## Second remediation batch — Freedom Struggle

Chapter 18 now has 68 written practice entries, including 34 newly explicit source-detail tasks. The source-detail ledger identifies printed pages 6–26 individually, with the existing exercise/activity mappings covering pp26–28. The lesson provides an expandable source-detail selector and links to the corresponding writing tasks.

New entries cover moderate and nationalist portraits, northeastern resistance, satyagraha sidebars, Jallianwala Bagh responses, Calcutta and Lahore sidebars, Karnataka salt campaigns, the Esoor account, farmers and labour movements, the INA foundation sequence, Ambedkar’s publications and institutions, Nehru, Jinnah, partition and the inline reading/essay activities. Historical photographs are interpreted through named accounts rather than reproduced.

Explicit corrections include the Congress Socialist Party’s founders, the 1947 arrival of Mountbatten, Ambedkar’s Baroda office and the distinction between prisoners of war and war criminals. Unverified publication attribution and the claimed 1827 labour-movement origin are flagged for bibliographic checking. The ledger records independent accuracy review as pending; it does not certify every source claim.

Second-batch validation: all 137 existing tests pass and the production build succeeds. Browser checks cover all 34 source-detail cards at 320px, their target task links, four sampled writing/submission/reload flows and the complete 68-entry coverage page. A long-selector overflow found during testing was corrected. The resulting mobile source-detail panel was visually inspected.

## Chapter 19 source activities

Five additional written tasks cover the peace discussion (p29), parliamentary democracy sidebar (p30), Patel portrait and privy purses (pp30–31), Andhra statehood sequence (p32), and statehood list (p33). The chapter now has 18 practice entries. Each new entry includes a hint and worked response.

## Six geography map lessons

The six map-reading panels now include all nine map figures identified on the supplied chapter pages, including their printed legends and labels. Printed references are 103 (Soils), 85–86 (Agriculture), 92, 93 and 96 (Minerals and Energy), 100 (Transport), 110 (Industries) and 115 (Natural Disasters). Industry centres and disaster locations use point symbols in the printed figures. The chapter checklists also cover topics discussed outside those figures.
